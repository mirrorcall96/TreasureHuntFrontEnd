import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { signout } from "../../store/action/authActions";

const Signout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signout());
  }, [dispatch]);
  return <Redirect to="/" />;
};
export default Signout;
