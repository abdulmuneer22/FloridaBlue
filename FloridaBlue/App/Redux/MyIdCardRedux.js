// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myIdCardRequest: [],
  myIdCardSuccess: ['data'],
  myIdCardFailure: ['error']
})

export const MyIdCardTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true, data: {}, error: null })

// we've successfully logged in
export const success = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, data, error: null })
}
// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error, data: {}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_ID_CARD_REQUEST]: request,
  [Types.MY_ID_CARD_SUCCESS]: success,
  [Types.MY_ID_CARD_FAILURE]: failure

})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isMyIdCardIn = (myIdCardState: Object) => myIdCardState.myidcard.data !== null
