// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Orientation from 'react-native-orientation'

const { Types, Creators } = createActions({
  changeOrientation: ['isPortrait']
})

export const SettingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isPortrait: true
})

/* ------------- Reducers ------------- */

// we are change orientation
export const _changeOrientation = (state: Object, {isPortrait} : Object) => state.merge({isPortrait})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_ORIENTATION]: _changeOrientation
})
