// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username', 'responseURL', 'smToken'],
  changeAgreeTermsOfUse: ['agreeTermsOfUse'],
  getTou: [],
  updateTou: ['getTou'],
  logoutRequest: [],
  loginFailure: ['error'],
  sendConfirm: [],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  responseURL: 'login',
  smToken: null,
  agreeTermsOfUse: null,
  getTou: null,
  fetching: false

})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true, responseURL: 'login'})

// we've successfully logged in
export const success = (state: Object, { username, responseURL, smToken}: Object) =>
  state.merge({ fetching: false, error: null, username, responseURL, smToken})

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error, responseURL: 'login' })

// agreeTermsOfUse
export const _changeAgreeTermsOfUse = (state: Object, {agreeTermsOfUse}: Object) =>
      state.merge({fetching: false, agreeTermsOfUse})

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

// we're getting TOu Markup
export const getTOU = (state: Object) => state.merge({ fetching: true, responseURL: 'login'})

// we are updating state

export const updateTOU = (state: Object, {getTou} : Object) =>
  state.merge({getTou})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGOUT_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.GET_TOU]: getTOU,
  [Types.UPDATE_TOU]: updateTOU,
  [Types.CHANGE_AGREE_TERMS_OF_USE]: _changeAgreeTermsOfUse,
  [Types.SEND_CONFIRM]: request,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
