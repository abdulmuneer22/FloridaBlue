// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  claimDetailRequest: ['claimid'],
  claimDetailSuccess: ['data'],
  claimDetailFailure: ['error'],
  claimsListRequest: [],
  claimsListSuccess: ['data'],
  claimsListFailure: ['error'],
  claimsSummaryRequest: [],
  claimsSummarySuccess: ['data'],
  claimsSummaryFailure: ['error'],
  changeDatePickerVisible: ['datePickerVisible'],
  changeStartDate: ['startDate'],
  changeEndDate: ['endDate'],
  changeProviderName: ['providerName'],
  changeMemberName: ['memberName']
})

export const ClaimsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  error: null,
  datePickerVisible: false,
  startDate: 'Start Date',
  endDate: 'End Date',
  providerName: '',
  memberName: ''
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const _claimDetailRequest = (state: Object) => state.merge({fetching: true, data: {}, error: null })

// we've successfully logged in
export const _claimDetailSuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, data, error: null })
}
// we've had a problem logging in
export const _claimDetailFailure = (state: Object, {error}: Object) => state.merge({ fetching: false, error, data: {}})

// we're attempting to login
export const _claimListRequest = (state: Object) => state.merge({fetching: true, data: {}, error: null })

// we've successfully logged in
export const _claimListSuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, data, error: null })
}

// we've had a problem logging in
export const _claimListFailure = (state: Object, {error}: Object) => state.merge({ fetching: false, error, data: {}})

// we're attempting to login
export const _claimSummaryRequest = (state: Object) => state.merge({fetching: true, data: {}, error: null })

// we've successfully logged in
export const _claimSummarySuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, data, error: null })
}
// we've had a problem logging in
export const _claimSummaryFailure = (state: Object, {error}: Object) => state.merge({ fetching: false, error, data: {}})

// datePickerVisible
export const _changeDatePickerVisible = (state: Object, {datePickerVisible}: Object) => state.merge({datePickerVisible})

// startDate
export const _changeStartDate = (state: Object, {startDate}: Object) => state.merge({startDate})

// endDate
export const _changeEndDate = (state: Object, {endDate}: Object) => state.merge({endDate})

// providerName
export const _changeProviderName = (state: Object, {providerName}: Object) => state.merge({providerName})

// memberName
export const _changeMemberName = (state: Object, {memberName}: Object) => state.merge({memberName})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLAIM_DETAIL_REQUEST]: _claimDetailRequest,
  [Types.CLAIM_DETAIL_SUCCESS]: _claimDetailSuccess,
  [Types.CLAIM_DETAIL_FAILURE]: _claimDetailFailure,
  [Types.CLAIMS_LIST_REQUEST]: _claimListRequest,
  [Types.CLAIMS_LIST_SUCCESS]: _claimListSuccess,
  [Types.CLAIMS_LIST_FAILURE]: _claimListFailure,
  [Types.CLAIMS_SUMMARY_REQUEST]: _claimSummaryRequest,
  [Types.CLAIMS_SUMMARY_SUCCESS]: _claimSummarySuccess,
  [Types.CLAIMS_SUMMARY_FAILURE]: _claimSummaryFailure,
  [Types.CHANGE_DATE_PICKER_VISIBLE]: _changeDatePickerVisible,
  [Types.CHANGE_START_DATE]: _changeStartDate,
  [Types.CHANGE_END_DATE]: _changeEndDate,
  [Types.CHANGE_PROVIDER_NAME]: _changeProviderName,
  [Types.CHANGE_MEMBER_NAME]: _changeMemberName
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isClaimDetailIn = (claimDetailState: Object) => claimDetailState.claimdetail.data !== null
export const isClaimsListIn = (claimsListState: Object) => claimsListState.claimslist.data !== null