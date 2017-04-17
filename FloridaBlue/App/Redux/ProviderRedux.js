import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendNetworkListRequest: ['data'],
  sendNetworkListSuccess: ['data'],
  sendNetworkListFailure: ['data'],
  sendProviderSearchRequest: ['data'],
  sendProviderSearchSuccess: ['data'],
  sendProviderSearchFailure: ['data'],
  sendCareTypeRequest: ['data'],
  sendCareTypeSuccess: ['data'],
  sendCareTypeFailure: ['data'],
  sendSpecialityTypeRequest: ['data'],
  sendSpecialityTypeSuccess: ['data'],
  sendSpecialityTypeFailure: ['data']
})

export const ProviderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null
})

/* ------------- Reducers ------------- */

// sendNetworkListRequest
export const _sendNetworkListRequest = (state: Object) => state.merge({ fetching: true })

// sendNetworkListSuccess
export const _sendNetworkListSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, memberNetworkList: data.memberNetworkList,})

// sendNetworkListFailure
export const _sendNetworkListFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })


// sendProviderSearchRequest
export const _sendProviderSearchRequest = (state: Object) => state.merge({ fetching: true })

// sendProviderSearchSuccess
export const _sendProviderSearchSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, originLatitude: data.originLatitude, originLongitude: data.originLongitude, originCity: data.originCity, originStateCode: data.originStateCode,
    originStateName: data.originStateName, originZipCode: data.originZipCode, originCountryCode: data.originCountryCode, count: data.count, totalCount: data.totalCount, providerList: data.providerList, networkOptionList: data.networkOptionList,
    networkList: data.networkList, languageCodes: data.languageCodes, acceptedPlanList: data.acceptedPlanList, preferredPharmacyIn: data.preferredPharmacyIn, handicappedAccessIn: data.handicappedAccessIn})

// sendProviderSearchFailure
export const _sendProviderSearchFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendCareTypeRequest
export const _sendCareTypeRequest = (state: Object) => state.merge({ fetching: true })

// sendCareTypeSuccess
export const _sendCareTypeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, more: data.more, planCategoryList: data.planCategoryList})

// sendCareTypeFailure
export const _sendCareTypeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendSpecialityTypeRequest
export const _sendSpecialityTypeRequest = (state: Object) => state.merge({ fetching: true })

// sendSpecialityTypeSuccess
export const _sendSpecialityTypeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, more: data.more, planSubCategoryList: data.planSubCategoryList})

// sendSpecialityTypeFailure
export const _sendSpecialityTypeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

/* ------------- Hookup Reducers To Types ------------- */

  export const reducer = createReducer(INITIAL_STATE, {
    [Types.SEND_NETWORK_LIST_REQUEST]: _sendNetworkListRequest,
    [Types.SEND_NETWORK_LIST_SUCCESS]: _sendNetworkListSuccess,
    [Types.SEND_NETWORK_LIST_FAILURE]: _sendNetworkListFailure,
    [Types.SEND_PROVIDER_SEARCH_REQUEST]: _sendProviderSearchRequest,
    [Types.SEND_PROVIDER_SEARCH_SUCCESS]: _sendProviderSearchSuccess,
    [Types.SEND_PROVIDER_SEARCH_FAILURE]: _sendProviderSearchFailure,
    [Types.SEND_CARE_TYPE_REQUEST]: _sendCareTypeRequest,
    [Types.SEND_CARE_TYPE_SUCCESS]: _sendCareTypeSuccess,
    [Types.SEND_CARE_TYPE_FAILURE]: _sendCareTypeFailure,
    [Types.SEND_SPECIALITY_TYPE_REQUEST]: _sendSpecialityTypeRequest,
    [Types.SEND_SPECIALITY_TYPE_SUCCESS]: _sendSpecialityTypeSuccess,
    [Types.SEND_SPECIALITY_TYPE_FAILURE]: _sendSpecialityTypeFailure
  })