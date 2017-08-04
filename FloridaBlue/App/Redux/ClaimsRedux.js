// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  claimDetailRequest: ['claimid'],
  claimDetailSuccess: ['data'],
  claimDetailFailure: ['error'],
  claimsListRequest: ['data'],
  claimsListSuccess: ['data'],
  claimsListFailure: ['error'],
  claimsSummaryRequest: [],
  claimsSummarySuccess: ['data'],
  claimsSummaryFailure: ['error'],
  changeListLimit: ['listLimit'],
  changeDatePickerVisible: ['datePickerVisible'],
  changeStartDate: ['startDate'],
  changeEndDate: ['endDate'],
  changeProviderName: ['providerName'],
  changeMemberName: ['memberName'],
  changeMemberId: ['memberId'],
  changeStart: ['start'],
  changeEnd: ['end'],
  changeSortBy: ['sortBy'],
  asyncClaimListRequest: ['data'],
  changeMemberList: ['memberList']
})

export const ClaimsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: false,
  error: null,
  listLimit: 10,
  datePickerVisible: false,
  startDate: '',
  endDate: '',
  providerName: '',
  memberName: '',
  memberId: '',
  start: 1,
  end: 10,
  sortBy: [],
  memberList: []
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const _claimDetailRequest = (state: Object) => state.merge({fetching: true, data: {}, error: null })

// we've successfully logged in
export const _claimDetailSuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, claimdetail: data, error: null })
}
// we've had a problem logging in
export const _claimDetailFailure = (state: Object, {error}: Object) => state.merge({ fetching: false, error, data: {}})

// we're attempting to login
export const _claimListRequest = (state: Object) => state.merge({fetching: true, error: null })

// claimlistSearchRequest
export const _asyncClaimListRequest = (state: Object) => state.merge({asyncfetching: true})

// we've successfully logged in
export const _claimListSuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, asyncfetching: false, claimslist: data, error: null })
}

// we've had a problem logging in
export const _claimListFailure = (state: Object, {error}: Object) => state.merge({ fetching: false, error, data: {}})

// we're attempting to login
export const _claimSummaryRequest = (state: Object) => state.merge({fetching: true, data: {}, error: null })

// we've successfully logged in
export const _claimSummarySuccess = (state: Object, {data}:Object) => {
  return state.merge({fetching: false, claimsSummary: data, error: null })
}
// we've had a problem logging in
export const _claimSummaryFailure = (state: Object, {error}: Object) => state.merge({ fetching: false, error, data: {}})

// listLimit
export const _changeListLimit = (state: Object, {listLimit}: Object) => state.merge({listLimit})

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

// memberId
export const _changeMemberId = (state: Object, {memberId}: Object) => state.merge({memberId})

// start
export const _changeStart = (state: Object, {start}: Object) => state.merge({start})

// end
export const _changeEnd = (state: Object, {end}: Object) => state.merge({end})

// sortBy
export const _changeSortBy = (state: Object, {sortBy}: Object) => state.merge({sortBy})

// end
export const _changeMemberList = (state: Object, {memberList}: Object) => state.merge({memberList})

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
  [Types.CHANGE_LIST_LIMIT]: _changeListLimit,
  [Types.CHANGE_DATE_PICKER_VISIBLE]: _changeDatePickerVisible,
  [Types.CHANGE_START_DATE]: _changeStartDate,
  [Types.CHANGE_END_DATE]: _changeEndDate,
  [Types.CHANGE_PROVIDER_NAME]: _changeProviderName,
  [Types.CHANGE_MEMBER_NAME]: _changeMemberName,
  [Types.CHANGE_MEMBER_ID]: _changeMemberId,
  [Types.CHANGE_START]: _changeStart,
  [Types.CHANGE_END]: _changeEnd,
  [Types.CHANGE_SORT_BY]: _changeSortBy,
  [Types.ASYNC_CLAIM_LIST_REQUEST]: _asyncClaimListRequest,
  [Types.CHANGE_MEMBER_LIST] : _changeMemberList
})

/* ------------- Selectors ------------- */

// // Is the current user logged in?
// export const isClaimDetailIn = (claimDetailState: Object) => claimDetailState.claimdetail.data !== null
 // export const isClaimsListIn = (claimsListState: Object) => claimsListState.claimslist.data !== null
 // export const isClaimsSummaryIn = (claimsSummaryState: Object) => claimsSummaryState.claimsSummary.data !== null
