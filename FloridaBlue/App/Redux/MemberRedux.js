// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  memberRequest: [],
  memberSuccess: ['username', 'termsOfUse', 'visibilityRules', 'visibleDashboard', 'defaultContract', 'logoutUrl'],
  memberFailure: ['error']
})

export const MemberTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  termsOfUse: null,
  error: null,
  visibilityRules: null,
  fetching: false,
  visibleDashboard: null,
  logoutUrl: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true })

// we've successfully logged in
export const success = (state: Object, {username, termsOfUse, visibilityRules, visibleDashboard, defaultContract, logoutUrl}: Object) =>
  state.merge({ fetching: false, error: null, username, termsOfUse, visibilityRules, visibleDashboard, defaultContract, logoutUrl})

// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MEMBER_REQUEST]: request,
  [Types.MEMBER_SUCCESS]: success,
  [Types.MEMBER_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isMemberIn = (memberState: Object) => memberState.username !== null
