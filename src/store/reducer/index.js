import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
const rootReducer = combineReducers({
  items: itemReducer,
  user: authReducer,
});
export default rootReducer;
