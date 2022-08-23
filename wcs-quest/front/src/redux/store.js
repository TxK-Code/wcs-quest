import { createStore, applyMiddleware, combineReducers } from "redux";
// import usersReducer from "./articles/signinReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  // usersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
