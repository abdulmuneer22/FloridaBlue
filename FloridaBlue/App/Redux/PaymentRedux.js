// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentsRequest: [],
  paymentsSuccess: ['data'],
  paymentsFailure: ['error'],
  paymentBarcodeRequest:[],
  paymentBarcodeSuccess: ['data'],
  paymentBarcodeFailure :['error']
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

// we're attempting to do Payment
export const _paymentsRequest = (state: Object) => state.merge({fetching: true })

// successfull Payment
export const _paymentsSuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, paymentslist: data, error: null })
}
// Failure Payment
export const _paymentsFailure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error, data: {}})

  // we're attempting for PaymentBarcode
export const _paymentBarcodeRequest = (state: Object) => state.merge({fetching: true })

// successfull PaymentBarcode
export const _paymentBarcodeSuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, paymentsbarcode: data, error: null })
}
// Failure PaymentBarcode
export const _paymentBarcodeFailure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error, data: {}})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENTS_REQUEST]: _paymentsRequest,
  [Types.PAYMENTS_SUCCESS]: _paymentsSuccess,
  [Types.PAYMENTS_FAILURE]: _paymentsFailure,
  [Types.PAYMENT_BARCODE_REQUEST]: _paymentBarcodeRequest,
  [Types.PAYMENT_BARCODE_SUCCESS]: _paymentBarcodeSuccess,
  [Types.PAYMENT_BARCODE_FAILURE]: _paymentBarcodeFailure

})