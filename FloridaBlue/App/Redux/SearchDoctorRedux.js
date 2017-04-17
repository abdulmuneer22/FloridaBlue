// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchdoctorRequest: ['data'],
  searchdoctorSuccess: ['data'],
  searchdoctorFailure: ['error'],
  searchdoctorClickleft: [],
  searchdoctorClickright: []
})

export const SearchDoctorTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  error: null,
  leftActive: true,
  rightActive: false,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true, data: {}, error: null, leftActive: true, rightActive: false })

// we've successfully logged in
export const success = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, data, error: null, leftActive: true, rightActive: false })
}
// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error, data: {}, leftActive: true, rightActive: false})

  // we've successfully logged in
export const rightclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: false, rightActive: true})
}
  // we've successfully logged in
export const leftclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: true, rightActive: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCHDOCTOR_REQUEST]: request,
  [Types.SEARCHDOCTOR_SUCCESS]: success,
  [Types.SEARCHDOCTOR_FAILURE]: failure,
  [Types.SEARCHDOCTOR_CLICKLEFT]: leftclick,
  [Types.SEARCHDOCTOR_CLICKRIGHT]: rightclick
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isSearchDoctorIn = (searchdoctorState: Object) => searchdoctorState.searchdoctor.data !== null
