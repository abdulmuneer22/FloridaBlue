// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onChangeFCMToken: ['FCMToken'],
  refreshTokenToUnsubscribe: ['refreshToken'],
  onOpenedFromTray: ['openedFromTray'],
  onLocalNotification: ['localNotification'],
  notificationSuccess: ['notification', 'unreadNotification'],
  notificationFailure: ['error'],
  getNotification: [],
  postFCMToken: ['data'],
  postArchive: ['archiveObject'],
  markAllRead: ['allRead'],
  deleteNotification: ['newData']
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  FCMToken: null,
  refreshToken: null,
  notification: null,
  localNotification: false,
  openedFromTray: false,
  error: null,
  fetching: false,
  unreadNotification: null,
  allRead: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true, allRead: false})

// we've successfully logged in
export const success = (state: Object, {notification, unreadNotification}: Object) =>
  state.merge({fetching: false, error: null, notification: notification, unreadNotification: unreadNotification, allRead: false})

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've had to set FCM Token
export const FCMToken = (state : Object, {FCMToken}: Object) => state.merge({FCMToken})

// we've had to set remote notificaiton tray if true
export const onOpenedFromTray = (state : Object, {openedFromTray}: Object) => state.merge({openedFromTray})

// we've had to set remote notificaiton tray if true
export const localNotification = (state : Object, {localNotification}: Object) => state.merge({localNotification})

// we've had to set read notificaiton to   true
export const readCount = (state : Object, {allRead}: Object) => state.merge({allRead})

// delete Notification from the redux
export const deleteNotification = (state : Object, {newData}: Object) => state.merge({
  notification: newData
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_NOTIFICATION]: request,
  [Types.NOTIFICATION_SUCCESS]: success,
  [Types.NOTIFICATION_FAILURE]: failure,
  [Types.ON_CHANGE_F_C_M_TOKEN]: FCMToken,
  [Types.REFRESH_TOKEN_TO_UNSUBSCRIBE]: FCMToken,
  [Types.ON_OPENED_FROM_TRAY]: onOpenedFromTray,
  [Types.ON_LOCAL_NOTIFICATION]: localNotification,
  [Types.POST_F_C_M_Token]: request,
  [Types.MARK_ALL_READ]: readCount,
  [Types.DELETE_NOTIFICATION]: deleteNotification
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isLoggedIn = (loginState: Object) => loginState.username !== null
