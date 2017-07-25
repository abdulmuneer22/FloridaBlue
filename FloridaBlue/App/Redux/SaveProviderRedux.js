import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addProviderRequest: ['data'],
  addProviderSuccess: ['data'],
  addProviderFailure: null,
  removeProviderRequest: ['savedProviderKey'],
  removeProviderSuccess: ['data'],
  removeProviderFailure: null
})

export const ProviderList = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  data: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const requestAddProvider = (state) => {
  return state.merge({ fetching: true, data: null })
}

// successful temperature lookup
export const successAddProvider = (state, action) => {
  const { data } = action

  return state.merge({ fetching: false, error: null, data })
}

// failed to get the temperature
export const failureAddProvider = (state) => {
  return state.merge({ fetching: false, error: true, data: null })
}

export const requestRemoveProvider = (state) => {
  return state.merge({ fetching: true, data: null })
}

// successful temperature lookup
export const successRemoveProvider = (state, action) => {
  const { data } = action
  return state.merge({ fetching: false, error: null, data })
}

// failed to get the temperature
export const failureRemoveProvider = (state) => {
  return state.merge({ fetching: false, error: true, data: null })
}

/* ------------- Hookup Reducers To Types........... */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_PROVIDER_REQUEST]: requestAddProvider,
  [Types.ADD_PROVIDER_SUCCESS]: successAddProvider,
  [Types.ADD_PROVIDER_FAILURE]: failureAddProvider,
  [Types.REMOVE_PROVIDER_REQUEST]: requestRemoveProvider,
  [Types.REMOVE_PROVIDER_SUCCESS]: successRemoveProvider,
  [Types.REMOVE_PROVIDER_FAILURE]: failureRemoveProvider
})
