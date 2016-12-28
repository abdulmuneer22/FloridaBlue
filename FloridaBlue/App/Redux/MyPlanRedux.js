// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myplanRequest: [],
  myplanSuccess: ['data'],
  myplanFailure: ['error'],
  myplanClickleft: [],
  myplanClickright:[]
})

export const MyPlanTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null ,
  fetching: false,
  error: null,
  leftActive : true ,
  rightActive : false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true, data:null,leftActive : true ,rightActive : false})

// we've successfully logged in
export const success = (state: Object, action: Object) =>{
  const {data} = action
  return state.merge({fetching: false, data,leftActive : true ,rightActive : false })
}
// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error ,data:null,leftActive : true ,rightActive : false })

  // we've successfully logged in
  export const rightclick = (state: Object, action: Object) =>{
    return state.merge({fetching: false,leftActive:false,rightActive :true})
  }
  // we've successfully logged in
  export const leftclick = (state: Object, action: Object) =>{
    return state.merge({fetching: false,leftActive:true,rightActive :false})
  }
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MYPLAN_REQUEST]: request,
  [Types.MYPLAN_SUCCESS]: success,
  [Types.MYPLAN_FAILURE]: failure,
  [Types.MYPLAN_CLICKLEFT]:leftclick,
  [Types.MYPLAN_CLICKRIGHT]:rightclick
})


/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isMyPlanIn = (myplanState: Object) => myplanState.myplan.data !== null
