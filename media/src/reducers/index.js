import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import login from "./login";
const reducers = combineReducers({ login });
const store = () => {
  return createStore(reducers, composeWithDevTools());
};
export default store();
