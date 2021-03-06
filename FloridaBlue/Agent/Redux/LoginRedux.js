// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username', 'responseURL', 'smToken', 'logoutUrl', 'touchDisclaimer'],
  changeAgreeTermsOfUse: ['agreeTermsOfUse'],
  getTou: [],
  updateTou: ['getTou'],
  logoutRequest: ['logoutUrl'],
  loginFailure: ['error'],
  sendConfirm: [],
  logout: [],
  changeUserName: ['username'],
  changePassword: ['password'],
  currentScene: ['currentSceneValue'],
  changeAgentLogin: ['agentLogin']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  password: null,
  error: null,
  responseURL: null,
  smToken: null,
  agreeTermsOfUse: null,
  getTou: null,
  fetching: false,
  logoutUrl: null,
  currentSceneValue: null,
  agentLogin: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true, responseURL: 'login'})

// we've successfully logged in
export const success = (state: Object, { username, responseURL, smToken, logoutUrl, touchDisclaimer}: Object) =>
  state.merge({ fetching: false, error: null, username, responseURL, smToken, logoutUrl, touchDisclaimer})

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error, responseURL: 'login' })

// agreeTermsOfUse
export const _changeAgreeTermsOfUse = (state: Object, {agreeTermsOfUse}: Object) =>
      state.merge({fetching: false, agreeTermsOfUse})

// we've logged out
export const logout = (state: Object) => state.merge({
  username: null,
  password: null,
  error: null,
  responseURL: null,
  smToken: null,
  agreeTermsOfUse: null,
  getTou: null,
  fetching: false,
  logoutUrl: null,
  touchDisclaimer: [],
  agentLogin: true
})

// we're getting TOu Markup
export const getTOU = (state: Object) => state.merge({ fetching: true, responseURL: 'login'})

// we are updating state
export const updateTOU = (state: Object, {getTou} : Object) =>
  state.merge({getTou, fetching: false})

// we are change username
export const username = (state: Object, {username} : Object) =>
  state.merge({username})
// we are change username
export const password = (state: Object, {password} : Object) =>
  state.merge({password})

  // we are updating currentScence
export const _changeCurrentSceneValue = (state: Object, {currentSceneValue} : Object) => state.merge({currentSceneValue})

// we are change touchAvailable
export const _changeAgentLogin = (state: Object, {agentLogin} : Object) => state.merge({agentLogin})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGOUT_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.CHANGE_USER_NAME]: username,
  [Types.CHANGE_PASSWORD]: password,
  [Types.GET_TOU]: getTOU,
  [Types.UPDATE_TOU]: updateTOU,
  [Types.CHANGE_AGREE_TERMS_OF_USE]: _changeAgreeTermsOfUse,
  [Types.SEND_CONFIRM]: request,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.CURRENT_SCENE]: _changeCurrentSceneValue,
  [Types.CHANGE_AGENT_LOGIN]: _changeAgentLogin
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
