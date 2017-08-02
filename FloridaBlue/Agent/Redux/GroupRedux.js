// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({

})

export const GroupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({

})

/* ------------- Reducers ------------- */

// we are change orientation
// export const _changeOrientation = (state: Object, {isPortrait} : Object) => state.merge({isPortrait})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {

})
