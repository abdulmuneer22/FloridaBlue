// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onChangeFCMToken: ['FCMToken'],
  refreshTokenToUnsubscribe: ['refreshToken']
})

export const NotificationActions = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  FCMToken: null,
  refreshToken: null,
  notification: null,
  local_notification: null,
  opened_from_tray: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true})

// we've successfully logged in
export const success = (state: Object, {notificaton}: Object) =>
  state.merge({ fetching: false, error: null, notificaton: null })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_CHANGE_FCMToken]: request,
  [Types.REFRESH_TOKEN_TO_UNSUBSCRIBE]: request
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
