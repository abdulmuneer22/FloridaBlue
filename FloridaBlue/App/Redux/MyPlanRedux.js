// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myplanRequest: ['input'],
  myplanSuccess: ['data'],
  myplanFailure: ['error'],
  myplanClickleft: [],
  myplanClickright: [],
  myplanClickpreferred: []

})

export const MyPlanTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  error: null,
  leftActive: true,
  rightActive: false,
  preferredActive: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true, data: {}, error: null, leftActive: true, rightActive: false, preferredActive: false})

// we've successfully logged in
export const success = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, data, error: null, leftActive: true, rightActive: false, preferredActive: false })
}
// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error, data: {}, leftActive: true, rightActive: false, preferredActive: false })

  // we've successfully logged in
export const rightclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: false, rightActive: true, preferredActive: false})
}
  // we've successfully logged in
export const leftclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: true, rightActive: false, preferredActive: false})
}
  // we've successfully logged in

export const preferredclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: false, rightActive: false, preferredActive: true})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MYPLAN_REQUEST]: request,
  [Types.MYPLAN_SUCCESS]: success,
  [Types.MYPLAN_FAILURE]: failure,
  [Types.MYPLAN_CLICKLEFT]: leftclick,
  [Types.MYPLAN_CLICKRIGHT]: rightclick,
  [Types.MYPLAN_CLICKPREFERRED]: preferredclick
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isMyPlanIn = (myplanState: Object) => myplanState.myplan.data !== null
