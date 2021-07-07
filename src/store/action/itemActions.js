import * as actiontype from "./types";
import instance from "./instance";

export const fetchItem = () => async (dispatch) => {
  try {
    const res = await instance.get("/items");
    dispatch({
      type: actiontype.FETCH_ITEMS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const fetchHistory = () => async (dispatch) => {
  try {
    const res = await instance.get("/items/history");
    dispatch({
      type: actiontype.FETCH_HISTORY,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const openItem = (itemId, alertMessage) => async (dispatch) => {
  try {
    const res = await instance.get("/items/" + itemId);
    console.log(res.data);
    if (res.data.isTreasure === "TRUE")
      alertMessage({
        status: "success",
        message: "You Won with " + res.data.data,
      });
    else alertMessage({ status: "danger", message: "you lost :(" });
    dispatch({
      type: actiontype.OPEN_ITEM,
      payload: res.data,
    });
    dispatch({
      type: actiontype.REMOVE_BALANCE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
