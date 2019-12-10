import * as redux from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { apiReducer, APIMiddleware } from "./index";

const middleware = APIMiddleware();

const middlewareParameters = [
  thunk,
  middleware
]

if(process.env.NODE_ENV === "dev") {
  middlewareParameters.push(logger)
}

const reducers = [
  apiReducer
]

const reducerFn = (state, action) => {
  return reducers.reduce((previousState, reducer) => reducer(previousState, action), state);
}

export function createStore(initial) {
  return redux.createStore(
    reducerFn,
    initial,
    redux.applyMiddleware(...middlewareParameters)
  )
}
