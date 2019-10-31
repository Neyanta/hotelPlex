import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import searchReducer from "./searchReducer";
import hotelReducer from "./hotelReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  loginReducer,
  searchReducer,
  hotelReducer,
  adminReducer
});
