// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentRequest: [],
  paymentSuccess: ['data'],
  paymentFailure: ['error']
})

export const PaymentTypes = Types
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
  [Types.PAYMENT_REQUEST]: request,
  [Types.PAYMENT_SUCCESS]: success,
  [Types.PAYMENT_FAILURE]: failure

})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isMyIdCardIn = (paymentState: Object) => paymentState.payment.data !== null