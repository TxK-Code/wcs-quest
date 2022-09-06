import { createStore, applyMiddleware, combineReducers } from "redux";
// import usersReducer from "./articles/signinReducer";

import charactersReducer from "./articles/charactersReducer";
import allCharactersReducer from "./articles/allCharactersReducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  // usersReducer,
  charactersReducer,
  allCharactersReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
