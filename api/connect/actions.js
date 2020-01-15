import { fetch_ as fetchAPI } from "./fetch";
import { retrieveStorage, deleteStorage } from "../../utils/asyncStorage";
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
      isLogged: false
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
      pending: false
    }
  }
}

export function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error,
    connect: {
      pending: false,
      isLogged: false
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
    retrieveStorage('@skiutcapp:key').then(
      (data) => {
        fetchAPI({ data }).then(
          (response) => {
            dispatch(successLogin(response))
          }
        ).catch((err) => {
          dispatch(errorLogin(err))
        })
      }
    ).catch((err) => { dispatch(errorLogin(err))})
  }
}

export function refreshData() {
  return (dispatch, getState) => {
    retrieveStorage('@skiutcapp:key').then(
      (data) => {
        fetchAPI({ data }).then(
          (response) => {
            dispatch(successLogin(response))
          }
        ).catch((err) => err)
      }
    ).catch((err) => err)
  }
}

export function logout(){
  return async (dispatch) => {
    await deleteStorage('@skiutcapp:key');
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

export function getConnectedUser(state) {
  const { connect } = state;

  if(connect && connect.user) {
    const user = new User(connect.user)
    return user
  }
  return null;
}
