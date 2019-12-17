import * as redux from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { apiReducer, APIMiddleware, APIEndpoint } from "./index";
import User from "../models/user";
import { API_URL } from "../config";
import { connectReducer } from "./connect/"

const middleware = APIMiddleware();

const middlewareParameters = [
  thunk,
  middleware
]

if(process.env.NODE_ENV === "dev") {
  middlewareParameters.push(logger)
}

const reducers = [
  apiReducer,
  connectReducer
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

export const users = new APIEndpoint(`${API_URL}/users`, User);
