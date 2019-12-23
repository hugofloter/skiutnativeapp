import { fetch_ as fetchAPI, retrieveStorage, deleteStorage } from "./fetch";
import User from '../../models/user';

export const REQUEST_LOGIN = Symbol('CONNECT.REQUEST_LOGIN');
export const SUCCESS_LOGIN = Symbol('CONNECT.REQUEST_LOGIN');
export const ERROR_LOGIN = Symbol('CONNECT.REQUEST_LOGIN');
export const CLEAR = Symbol('CONNECT.CLEAR')

function getToken({ connect }) {
  if(!connect) {
    return null;
  }

  return connect.token;
}

export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    connect: {
      pending: true,
      isLogged: false,
      errorLog: false
    }
  }
}

export function successLogin({ token, user }) {
  return {
    type: SUCCESS_LOGIN,
    connect: {
      token,
      user,
      isLogged: true,
      pending: false,
      errorLog: false
    }
  }
}

export function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error,
    connect: {
      pending: false,
      isLogged: false,
      errorLog: true
    }
  }
}

export function clear() {
  return {
    type: CLEAR,
    connect: {}
  }
}

export function login(data) {
  return (dispatch, getState) => {
    dispatch(requestLogin())
    fetchAPI({ data }).then(
      (response) => {
        dispatch(successLogin(response))
      }
    ).catch((err) => {
      dispatch(errorLogin(err))
    })
  }
}

export function relog() {
  return (dispatch, getState) => {
    dispatch(requestLogin())
    retrieveStorage().then(
      (data) => {
        dispatch(successLogin(data))
      }
    ).catch((err) => { dispatch(errorLogin(err))})
  }
}

export function logout(){
  return async (dispatch) => {
    await deleteStorage();
    dispatch(clear());
  }
}

export function getAuthorizationHeader(state) {
  return getToken(state);
}

export function isLogged(state) {
  const { connect } = state;

  return Boolean(connect && connect.isLogged)
}

export function isPending(state) {
  const { connect } = state;

  return Boolean(connect && connect.pending)
}

export function errorLog(state) {
  const { connect } = state;

  return Boolean(connect && connect.errorLog)
}

export function getConnectedUser(state) {
  const { connect } = state;

  if(connect && connect.user) {
    const user = new User(connect.user)
    return user
  }
  return null;
}
