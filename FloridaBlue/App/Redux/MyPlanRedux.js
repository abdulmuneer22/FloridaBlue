// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myplanRequest: [],
  myplanSuccess: ['data'],
  myplanFailure: ['error']
})

export const MyPlanTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null ,
  fetching: false,
  error: null,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true,data:null })

// we've successfully logged in
export const success = (state: Object, action: Object) =>{
  const {data} = action
  return state.merge({fetching: false, data})
}
// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error ,data:null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MYPLAN_REQUEST]: request,
  [Types.MYPLAN_SUCCESS]: success,
  [Types.MYPLAN_FAILURE]: failure
})


/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isMyPlanIn = (myplanState: Object) => myplanState.myplan.data !== null
