// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  supportRequest: [],
  supportSuccess: ['data'],
  supportFailure: ['error']
})

export const SupportTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {} ,
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({fetching: true, data:{},error:null })

// we've successfully logged in
export const success = (state: Object, {data}:Object) =>{
  return state.merge({fetching: false, data, error:null, })
}
// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error ,data:{}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUPPORT_REQUEST]: request,
  [Types.SUPPORT_SUCCESS]: success,
  [Types.SUPPORT_FAILURE]: failure,

})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isSupportIn = (supportState: Object) => supportState.support.data !== null
