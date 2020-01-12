import * as redux from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { apiReducer, APIMiddleware, APIEndpoint } from "./index";
import User from "../models/user";
import Potin from "../models/potin";
import News from "../models/news";
import Groups from "../models/groups";
import AnimationUser from "../models/animation"
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
export const potins = new APIEndpoint(`${API_URL}/potins`, Potin);
export const potinsAdmin = new APIEndpoint(`${API_URL}/potins/admin`, Potin, {name: "adminPotin"});
export const news = new APIEndpoint(`${API_URL}/news`, News);
export const groups = new APIEndpoint(`${API_URL}/groups`, Groups);
export const qrcode = new APIEndpoint(`${API_URL}/animation`, AnimationUser);
export const qrcodeAdmin = new APIEndpoint(`${API_URL}/animation/admin`, AnimationUser, {name: "adminAnim"});
