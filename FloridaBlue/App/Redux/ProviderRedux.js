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
  sendSpecialityTypeRequest: ['selectedCategoryCode'],
  sendSpecialityTypeSuccess: ['data'],
  sendSpecialityTypeFailure: ['data'],
  sendDoctorLanguageRequest: ['data'],
  sendDoctorLanguageSuccess: ['data'],
  sendDoctorLanguageFailure: ['data'],
  sendStaffLanguageRequest: ['data'],
  sendStaffLanguageSuccess: ['data'],
  sendStaffLanguageFailure: ['data'],
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
  changeKnownCareState: ['knownCareState'],
  changeUnknownCareState: ['unknownCareState'],
  changeSavedProviderState: ['savedProviderState'],
  changeSpecialityState: ['specialityState'],
  changeCurrentLocaleState: ['currentLocaleState'],
  changeNewLocationState: ['newLocationState'],
  changeCurrentLocation: ['currentLocation'],
  changeLatitude: ['latitude'],
  changeLongitude: ['longitude'],
  changeGenderType:['gender'],
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
  knownCareState: false,
  unknownCareState: false,
  savedProviderState: true,
  specialityState: false,
  currentLocaleState: false,
  newLocationState: false,
  currentLocation: "Unknown",
  latitude: 0,
  longitude: 0,
  acceptingPatientsIndicator:"",
  programsList:"",
  staffLanguage:"",
  providerLanguage:"",
  officeHours:"",
  gender:"",
  leftActive: true,
  rightActive: false,
  planCategoryList: [],
  planSubCategoryList: []
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
  state.merge({fetching: false, data, error: null, leftActive: true, rightActive: false})

// sendProviderSearchFailure
export const _sendProviderSearchFailure = (state: Object, {data}: Object) =>
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
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, providerLanguage: data.data.languageList})

// sendDoctorLanguageFailure
export const _sendDoctorLanguageFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, code: data.status.code, message: data.status.message, error: data.status.error })

  // sendStaffLanguageRequest
export const _sendStaffLanguageRequest = (state: Object) => state.merge({ fetching: true })

// sendStaffLanguagSuccess
export const _sendStaffLanguageSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, transactionId: data.transactionId, totalCount: data.totalCount, staffLanguage: data.data.languageList})

// sendStaffLanguageFailure
export const _sendStaffLanguageFailure = (state: Object, {data}: Object) =>
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

// knownCareState
export const _changeKnownCareState = (state: Object, {knownCareState}: Object) => state.merge({fetching: false, knownCareState})

// unknownCareState
export const _changeUnknownCareState = (state: Object, {unknownCareState}: Object) => state.merge({fetching: false, unknownCareState})

// savedProviderState
export const _changeSavedProviderState = (state: Object, {savedProviderState}: Object) => state.merge({fetching: false, savedProviderState})

// specialityState
export const _changeSpecialityState = (state: Object, {specialityState}: Object) => state.merge({fetching: false, specialityState})

// currentLocaleState
export const _changeCurrentLocaleState = (state: Object, {currentLocaleState}: Object) => state.merge({fetching: false, currentLocaleState})

// newLocationState
export const _changeNewLocationState = (state: Object, {newLocationState}: Object) => state.merge({fetching: false, newLocationState})

// currentLocation
export const _changeCurrentLocation = (state: Object, {currentLocation}: Object) => state.merge({fetching: false, currentLocation})

// latitude
export const _changeLatitude = (state: Object, {latitude}: Object) => state.merge({fetching: false, latitude})

// longitude
export const _changeLongitude = (state: Object, {longitude}: Object) => state.merge({fetching: false, longitude})

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
     
 // officeHours
export const _changeGenderType = (state: Object, {gender}: Object) =>
      state.merge({fetching: false, gender})

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
  [Types.SEND_CONFIG_TYPE_REQUEST]: _sendConfigTypeRequest,
  [Types.SEND_CONFIG_TYPE_SUCCESS]: _sendConfigTypeSuccess,
  [Types.SEND_CONFIG_TYPE_FAILURE]: _sendConfigTypeFailure,
  [Types.CHANGE_CATEGORY_CODE]: _changeCategoryCode,
  [Types.CHANGE_SUB_CATEGORY_CODE]: _changeSubCategoryCode,
  [Types.CHANGE_PROVIDER_NAME]: _changeProviderName,
  [Types.CHANGE_CARE_TYPE]: _changeCareType,
  [Types.CHANGE_SPECIALITY_TYPE]: _changeSpecialityType,
  [Types.CHANGE_KNOWN_CARE_STATE]: _changeKnownCareState,
  [Types.CHANGE_UNKNOWN_CARE_STATE]: _changeUnknownCareState,
  [Types.CHANGE_SAVED_PROVIDER_STATE]: _changeSavedProviderState,
  [Types.CHANGE_SPECIALITY_STATE]: _changeSpecialityState,
  [Types.CHANGE_CURRENT_LOCALE_STATE]: _changeCurrentLocaleState,
  [Types.CHANGE_NEW_LOCATION_STATE]: _changeNewLocationState,
  [Types.CHANGE_CURRENT_LOCATION]: _changeCurrentLocation,
  [Types.CHANGE_LATITUDE]: _changeLatitude,
  [Types.CHANGE_LONGITUDE]: _changeLongitude,
  [Types.CHANGE_PATIENT_TYPE]: _changePatientType,
  [Types.CHANGE_DOCTOR_LANGUAGE]: _changeDoctorLanguage,
  [Types.CHANGE_STAFF_LANGUAGE]: _changeStaffLanguage,
  [Types.CHANGE_PROGRAM_TYPE]: _changeProgramType,
  [Types.CHANGE_TIME_TYPE]: _changeTimeType,
  [Types.CHANGE_GENDER_TYPE]: _changeGenderType,
  [Types.PROVIDER_CLICKLEFT]: leftclick,
  [Types.PROVIDER_CLICKRIGHT]: rightclick
})
