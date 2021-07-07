import instance from "./instance";
import decode from "jwt-decode";
import * as actiontype from "./types";
import { fetchHistory } from "./itemActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const signup = (user, history, errorAlert) => async (dispatch) => {
  try {
    let res = await instance.post("/signup", user);
    dispatch(await setUser(res.data.token));
    dispatch(fetchHistory());
    errorAlert({
      status: "success",
      message: "Welcome to the family!",
    });
  } catch (error) {
    errorAlert({
      status: "danger",
      message: "Email already exist",
    });
    console.log(error.message);
  }
};
export const signin = (user, history, errorAlert) => {
  return async (dispatch) => {
    try {
      let res = await instance.post("/signin", user);
      dispatch(await setUser(res.data.token));
      dispatch(fetchHistory());
      errorAlert({
        status: "success",
        message: "Welcome Back!",
      });
    } catch (error) {
      errorAlert({
        status: "danger",
        message: "The username or password is incorrect",
      });
      console.log(error.message);
    }
  };
};
export const checkForToken = () => async (dispatch) => {
  const token = cookies.get("myToken");
  console.log(token);
  if (token) {
    const currentTime = Date.now();
    const user = decode(token);
    if (user.exp > currentTime) {
      dispatch(await setUser(token));
      dispatch(fetchHistory());
      return;
    }
  }
  dispatch(await setUser());
};
export const signout = () => async (dispatch) => {
  dispatch(await setUser());
};
export const addBalance = (amount) => async (dispatch) => {
  try {
    let res = await instance.post("/balance", { balance: amount });
    dispatch({
      type: actiontype.ADD_BALANCE,
      payload: res.data.balance,
    });
  } catch (error) {
    console.log(error);
  }
};
export const setUser = async (token) => {
  if (token) {
    instance.defaults.headers.common.Authorization = "Bearer " + token;
    let res = await instance.post("/balance", { balance: 0 });
    cookies.set("myToken", token, { path: "/" });
    return {
      type: actiontype.SET_USER,
      payload: { ...decode(token), balance: res.data.balance },
    };
  } else {
    delete instance.defaults.headers.common.Authorization;
    cookies.remove("myToken");
    return {
      type: actiontype.SET_USER,
      payload: null,
    };
  }
};
