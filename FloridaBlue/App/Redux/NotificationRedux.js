// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onChangeFCMToken: ['FCMToken'],
  refreshTokenToUnsubscribe: ['refreshToken'],
  onOpenedFromTray: ['openedFromTray'],
  onLocalNotificaton: ['localNotification'],
  notificationSuccess: ['notificaition'],
  notificationFailure: ['error']
})

export const NotificationActions = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  FCMToken: null,
  refreshToken: null,
  notification: null,
  localNotification: false,
  openedFromTray: false,
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

// we've had to set FCM Token
export const FCMToken = (state : Object, {FCMToken}: Object) => state.merge({FCMToken})

// we've had to set remote notificaiton tray if true
export const onOpenedFromTray = (state : Object, {onOpenedFromTray}: Object) => state.merge({onOpenedFromTray})

// we've had to set remote notificaiton tray if true
export const localNotification = (state : Object, {localNotification}: Object) => state.merge({localNotification})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATION]: request,
  [Types.NOTIFICATION_SUCCESS]: success,
  [Types.NOTIFICATION_FAILURE]: failure,
  [Types.ON_CHANGE_F_C_M_TOKEN]: FCMToken,
  [Types.REFRESH_TOKEN_TO_UNSUBSCRIBE]: FCMToken,
  [Types.ON_OPENED_FROM_TRAY]: onOpenedFromTray,
  [Types.ON_LOCAL_NOTIFICATION]: localNotification

})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
