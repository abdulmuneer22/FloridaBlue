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
  sendPharmacySearchRequest: ['data'],
  sendPharmacySearchSuccess: ['data'],
  sendPharmacySearchFailure: ['data'],
  sendUrgentSearchRequest: ['data'],
  sendUrgentSearchSuccess: ['data'],
  sendUrgentSearchFailure: ['data'],
  sendCareTypeRequest: ['data'],
  sendCareTypeSuccess: ['data'],
  sendCareTypeFailure: ['data'],
  sendSpecialityTypeRequest: ['selectedCategoryCode'],
  sendSpecialityTypeSuccess: ['data'],
  sendSpecialityTypeFailure: ['data'],
  sendDoctorLanguageRequest: ['data'],
  sendDoctorLanguageSuccess: ['data'],
  sendDoctorLanguageFailure: ['data'],
  sendStaffLanguageRequest: ['data'],
  sendStaffLanguageSuccess: ['data'],
  sendStaffLanguageFailure: ['data'],
  sendDoctorDetailRequest: ['data'],
  sendDoctorDetailSuccess: ['data'],
  sendDoctorDetailFailure: ['data'],
  sendConfigTypeRequest: [],
  sendConfigTypeSuccess: ['data'],
  sendConfigTypeFailure: ['data'],
  changeCategoryCode: ['categoryCode'],
  changeSubCategoryCode: ['subCategoryCode'],
  changeProviderName: ['providerName'],
  changePatientType: ['acceptingPatientsIndicator'],
  changeDoctorLanguage: ['providerLanguage'],
  changeStaffLanguage: ['staffLanguage'],
  changeProgramType: ['programsList'],
  changeTimeType: ['officeHours'],
  changeCareType: ['careType'],
  changeSpecialityType: ['specialityType'],
  changeCurrentLocation: ['currentLocation'],
  changeLatitude: ['latitude'],
  changeLongitude: ['longitude'],
  changeGenderType: ['gender'],
  changeAddress: ['address'],
  changeHomeAddress: ['homeAddress'],
  changeSearchRange: ['searchRange'],
  changeNetworkCodeList: ['networkCodeList'],
  changeLocationPermissionStatus: ['locationStatus'],
  changeAddressKey: ['addressKey'],
  changeProviderKey: ['providerKey'],
  changeLatDelta: ['latDelta'],
  changeLongDelta: ['longDelta'],
  providerClickleft: [],
  providerClickright: []

})

export const ProviderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  categoryCode: "ALL",
  subCategoryCode: "",
  providerName: "",
  careType: "",
  specialityType: "",
  currentLocation: "Unknown",
  latitude: 0,
  longitude: 0,
  address: "",
  homeAddress: "",
  acceptingPatientsIndicator:{},
  programsList:{},
  staffLanguage:{},
  providerLanguage:{},
  officeHours:{},
  gender: "",
  searchRange: 50,
  leftActive: true,
  rightActive: false,
  planCategoryList: [],
  planSubCategoryList: [],
  memberNetworkList: [],
  networkCodeList: [],
  providerKey: "",
  addressKey: "",
  locationStatus: ""
})

/* ------------- Reducers ------------- */

// sendNetworkListRequest
export const _sendNetworkListRequest = (state: Object) => state.merge({ fetching: true })

// sendNetworkListSuccess
export const _sendNetworkListSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.data.transactionId, memberNetworkList: data.data.memberNetworkList,})

// sendNetworkListFailure
export const _sendNetworkListFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendProviderSearchRequest
export const _sendProviderSearchRequest = (state: Object) => state.merge({ fetching: true })

// sendProviderSearchSuccess
export const _sendProviderSearchSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, data, error: null, leftActive: true, rightActive: false})

// sendProviderSearchFailure
export const _sendProviderSearchFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendPharmacySearchRequest
export const _sendPharmacySearchRequest = (state: Object) => state.merge({ fetching: true })

// sendPharmacySearchSuccess
export const _sendPharmacySearchSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, data, error: null, leftActive: true, rightActive: false})

// sendPharmacySearchFailure
export const _sendPharmacySearchFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendUrgentSearchRequest
export const _sendUrgentSearchRequest = (state: Object) => state.merge({ fetching: true })

// sendUrgentSearchSuccess
export const _sendUrgentSearchSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, data, error: null, leftActive: true, rightActive: false})

// sendUrgentSearchFailure
export const _sendUrgentSearchFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendCareTypeRequest
export const _sendCareTypeRequest = (state: Object) => state.merge({ fetching: true })

// sendCareTypeSuccess
export const _sendCareTypeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, more: data.more, planCategoryList: data.data.planCategoryList})

// sendCareTypeFailure
export const _sendCareTypeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// sendSpecialityTypeRequest
export const _sendSpecialityTypeRequest = (state: Object) => state.merge({ fetching: true })

// sendSpecialityTypeSuccess
export const _sendSpecialityTypeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, more: data.more, planSubCategoryList: data.data.planSubCategoryList})

// sendSpecialityTypeFailure
export const _sendSpecialityTypeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

  // sendDoctorLanguageRequest
export const _sendDoctorLanguageRequest = (state: Object) => state.merge({ fetching: true })

// sendDoctorLanguagSuccess
export const _sendDoctorLanguageSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, providerLanguages: data.data.languageList})

// sendDoctorLanguageFailure
export const _sendDoctorLanguageFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

  // sendStaffLanguageRequest
export const _sendStaffLanguageRequest = (state: Object) => state.merge({ fetching: true })

// sendStaffLanguagSuccess
export const _sendStaffLanguageSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, staffLanguages: data.data.languageList})

// sendStaffLanguageFailure
export const _sendStaffLanguageFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

  // sendDoctorDetailsRequest
export const _sendDoctorDetailRequest = (state: Object) => state.merge({ fetching: true })

// sendStaffLanguagSuccess
export const _sendDoctorDetailSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, doctordetail:data.data, error:null})

// sendDoctorDetailsFailure
export const _sendDoctorDetailFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

 // sendConfigTypeRequest
export const _sendConfigTypeRequest = (state: Object) => state.merge({ fetching: true})

// sendConfigTypeSuccess
export const _sendConfigTypeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false,  configData:data.data, error: null})

// sendConfigTypeFailure
export const _sendConfigTypeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

// categoryCode
export const _changeCategoryCode = (state: Object, {categoryCode}: Object) => state.merge({fetching: false, categoryCode})

// subCategoryCode
export const _changeSubCategoryCode = (state: Object, {subCategoryCode}: Object) => state.merge({fetching: false, subCategoryCode})

// providerName
export const _changeProviderName = (state: Object, {providerName}: Object) => state.merge({fetching: false, providerName})

// careType
export const _changeCareType = (state: Object, {careType}: Object) => state.merge({fetching: false, careType})

// specialityType
export const _changeSpecialityType = (state: Object, {specialityType}: Object) => state.merge({fetching: false, specialityType})

// currentLocation
export const _changeCurrentLocation = (state: Object, {currentLocation}: Object) => state.merge({fetching: false, currentLocation})

// latitude
export const _changeLatitude = (state: Object, {latitude}: Object) => state.merge({fetching: false, latitude})

// longitude
export const _changeLongitude = (state: Object, {longitude}: Object) => state.merge({fetching: false, longitude})

// address
export const _changeAddress = (state: Object, {address}: Object) => state.merge({fetching: false, address})

// homeAddress
export const _changeHomeAddress = (state: Object, {homeAddress}: Object) => state.merge({fetching: false, homeAddress})

// searchRange
export const _changeSearchRange = (state: Object, {searchRange}: Object) => state.merge({fetching: false, searchRange})

// locationStatus
export const _changeLocationPermissionStatus = (state: Object, {locationStatus}: Object) => state.merge({fetching: false, locationStatus})

// AcceptPatientType
export const _changePatientType = (state: Object, {acceptingPatientsIndicator}: Object) =>
      state.merge({fetching: false, acceptingPatientsIndicator})

// DoctorLanguage
export const _changeDoctorLanguage = (state: Object, {providerLanguage}: Object) =>
      state.merge({fetching: false, providerLanguage})

// StaffLanguage
export const _changeStaffLanguage = (state: Object, {staffLanguage}: Object) =>
      state.merge({fetching: false, staffLanguage})

// ProgramList
export const _changeProgramType = (state: Object, {programsList}: Object) =>
      state.merge({fetching: false, programsList})

// officeHours
export const _changeTimeType = (state: Object, {officeHours}: Object) =>
      state.merge({fetching: false, officeHours})

 // genderType
export const _changeGenderType = (state: Object, {gender}: Object) => state.merge({fetching: false, gender})

// networkList
export const _changeNetworkCodeList = (state: Object, {networkCodeList}: Object) => state.merge({fetching: false, networkCodeList})

// addressKey
export const _changeAddressKey = (state: Object, {addressKey}: Object) => state.merge({fetching: false, addressKey})

// providerKey
export const _changeProviderKey = (state: Object, {providerKey}: Object) => state.merge({fetching: false, providerKey})

// latDelta
export const _changeLatDelta = (state: Object, {latDelta}: Object) => state.merge({fetching: false, latDelta})

// longDelta
export const _changeLongDelta = (state: Object, {longDelta}: Object) => state.merge({fetching: false, longDelta})

// rightSwitch
export const rightclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: false, rightActive: true})
}

// leftSwitch
export const leftclick = (state: Object, action: Object) => {
  return state.merge({fetching: false, error: null, leftActive: true, rightActive: false})
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_NETWORK_LIST_REQUEST]: _sendNetworkListRequest,
  [Types.SEND_NETWORK_LIST_SUCCESS]: _sendNetworkListSuccess,
  [Types.SEND_NETWORK_LIST_FAILURE]: _sendNetworkListFailure,
  [Types.SEND_PROVIDER_SEARCH_REQUEST]: _sendProviderSearchRequest,
  [Types.SEND_PROVIDER_SEARCH_SUCCESS]: _sendProviderSearchSuccess,
  [Types.SEND_PROVIDER_SEARCH_FAILURE]: _sendProviderSearchFailure,
  [Types.SEND_PHARMACY_SEARCH_REQUEST]: _sendPharmacySearchRequest,
  [Types.SEND_PHARMACY_SEARCH_SUCCESS]: _sendPharmacySearchSuccess,
  [Types.SEND_PHARMACY_SEARCH_FAILURE]: _sendPharmacySearchFailure,
  [Types.SEND_URGENT_SEARCH_REQUEST]: _sendUrgentSearchRequest,
  [Types.SEND_URGENT_SEARCH_SUCCESS]: _sendUrgentSearchSuccess,
  [Types.SEND_URGENT_SEARCH_FAILURE]: _sendUrgentSearchFailure,
  [Types.SEND_CARE_TYPE_REQUEST]: _sendCareTypeRequest,
  [Types.SEND_CARE_TYPE_SUCCESS]: _sendCareTypeSuccess,
  [Types.SEND_CARE_TYPE_FAILURE]: _sendCareTypeFailure,
  [Types.SEND_SPECIALITY_TYPE_REQUEST]: _sendSpecialityTypeRequest,
  [Types.SEND_SPECIALITY_TYPE_SUCCESS]: _sendSpecialityTypeSuccess,
  [Types.SEND_SPECIALITY_TYPE_FAILURE]: _sendSpecialityTypeFailure,
  [Types.SEND_DOCTOR_LANGUAGE_REQUEST]: _sendDoctorLanguageRequest,
  [Types.SEND_DOCTOR_LANGUAGE_SUCCESS]: _sendDoctorLanguageSuccess,
  [Types.SEND_DOCTOR_LANGUAGE_FAILURE]: _sendDoctorLanguageFailure,
  [Types.SEND_STAFF_LANGUAGE_REQUEST]: _sendStaffLanguageRequest,
  [Types.SEND_STAFF_LANGUAGE_SUCCESS]: _sendStaffLanguageSuccess,
  [Types.SEND_STAFF_LANGUAGE_FAILURE]: _sendStaffLanguageFailure,
  [Types.SEND_DOCTOR_DETAIL_REQUEST]: _sendDoctorDetailRequest,
  [Types.SEND_DOCTOR_DETAIL_SUCCESS]: _sendDoctorDetailSuccess,
  [Types.SEND_DOCTOR_DETAIL_FAILURE]: _sendDoctorDetailFailure,
  [Types.SEND_CONFIG_TYPE_REQUEST]: _sendConfigTypeRequest,
  [Types.SEND_CONFIG_TYPE_SUCCESS]: _sendConfigTypeSuccess,
  [Types.SEND_CONFIG_TYPE_FAILURE]: _sendConfigTypeFailure,
  [Types.CHANGE_CATEGORY_CODE]: _changeCategoryCode,
  [Types.CHANGE_SUB_CATEGORY_CODE]: _changeSubCategoryCode,
  [Types.CHANGE_PROVIDER_NAME]: _changeProviderName,
  [Types.CHANGE_CARE_TYPE]: _changeCareType,
  [Types.CHANGE_SPECIALITY_TYPE]: _changeSpecialityType,
  [Types.CHANGE_CURRENT_LOCATION]: _changeCurrentLocation,
  [Types.CHANGE_LATITUDE]: _changeLatitude,
  [Types.CHANGE_LONGITUDE]: _changeLongitude,
  [Types.CHANGE_ADDRESS]: _changeAddress,
  [Types.CHANGE_HOME_ADDRESS]: _changeHomeAddress,
  [Types.CHANGE_PATIENT_TYPE]: _changePatientType,
  [Types.CHANGE_DOCTOR_LANGUAGE]: _changeDoctorLanguage,
  [Types.CHANGE_STAFF_LANGUAGE]: _changeStaffLanguage,
  [Types.CHANGE_PROGRAM_TYPE]: _changeProgramType,
  [Types.CHANGE_TIME_TYPE]: _changeTimeType,
  [Types.CHANGE_GENDER_TYPE]: _changeGenderType,
  [Types.CHANGE_SEARCH_RANGE]: _changeSearchRange,
  [Types.CHANGE_NETWORK_CODE_LIST]: _changeNetworkCodeList,
  [Types.CHANGE_LOCATION_PERMISSION_STATUS]: _changeLocationPermissionStatus,
  [Types.CHANGE_ADDRESS_KEY]: _changeAddressKey,
  [Types.CHANGE_PROVIDER_KEY]: _changeProviderKey,
  [Types.CHANGE_LAT_DELTA]: _changeLatDelta,
  [Types.CHANGE_LONG_DELTA]: _changeLongDelta,
  [Types.PROVIDER_CLICKLEFT]: leftclick,
  [Types.PROVIDER_CLICKRIGHT]: rightclick
})
