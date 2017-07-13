// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Orientation from 'react-native-orientation'

const { Types, Creators } = createActions({
  changeTouchEnabled: ['touchEnabled'],
  changeCredentialStored: ['credentialStored'],
  changeTouchAvailable: ['touchAvailable'],
  changeGeolocationEnabled: ['geolocationEnabled'],
  changePushEnabled: ['pushEnabled'],
  changeOrientation: ['isPortrait']
})

export const SettingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  touchEnabled: false,
  credentialStored: false,
  touchAvailable: false,
  geolocationEnabled: false,
  pushEnabled: false,
  isPortrait: true
})

/* ------------- Reducers ------------- */

// we are change credentialStored
export const _changeCredentialStored = (state: Object, {credentialStored} : Object) => state.merge({credentialStored})

// we are change touchEnabled
export const _changeTouchEnabled = (state: Object, {touchEnabled} : Object) => state.merge({touchEnabled})

// we are change touchAvailable
export const _changeTouchAvailable = (state: Object, {touchAvailable} : Object) => state.merge({touchAvailable})

// we are change geolocationEnabled
export const _changeGeolocationEnabled = (state: Object, {geolocationEnabled} : Object) => state.merge({geolocationEnabled})

// we are change pushEnabled
export const _changePushEnabled = (state: Object, {pushEnabled} : Object) => state.merge({pushEnabled})

// we are change orientation
export const _changeOrientation = (state: Object, {isPortrait} : Object) => state.merge({isPortrait})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CREDENTIAL_STORED]: _changeCredentialStored,
  [Types.CHANGE_TOUCH_ENABLED]: _changeTouchEnabled,
  [Types.CHANGE_TOUCH_AVAILABLE]: _changeTouchAvailable,
  [Types.CHANGE_GEOLOCATION_ENABLED]: _changeGeolocationEnabled,
  [Types.CHANGE_PUSH_ENABLED]: _changePushEnabled,
  [Types.CHANGE_ORIENTATION]: _changeOrientation
})
