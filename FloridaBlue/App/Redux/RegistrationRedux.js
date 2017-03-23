// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  changeContractNumber: ['contractNumber'],
  changeFirstName: ['firstName'],
  changeLastName: ['lastName'],
  changeDateOfBirth: ['dateOfBirth'],
  changeZipCode: ['zipCode'],
  changePhoneNumber: ['phoneNumber'],
  changeEmailVerified: ['emailVerified'],
  changeEmail: ['email'],
  changeConfirmEmail: ['confirmEmail'],
  changeEmailUpdated: ['emailUpdated'],
  changeCreateUserId: ['createUserId'],
  changePassword: ['password'],
  changeConfirmPassword: ['confirmPassword'],
  changeEnterCode: ['enterCode'],
  changeSecurityHint1: ['securityHint1'],
  changeSecurityAnswer1: ['securityAnswer1'],
  changeSecurityHint2: ['securityHint2'],
  changeSecurityAnswer2: ['securityAnswer2'],
  changeSecurityHint3: ['securityHint3'],
  changeSecurityAnswer3: ['securityAnswer3'],
  changeCommElect: ['commElect'],
  changeShowCommElect: ['showCommElect'],
  changeReasonCode: ['data'],
  changeIdentificationStatus: ['identificationStatus'],
  changeIdentificationStatusMessage: ['identificationStatusMessage'],
  changePersonalInformationStatus: ['personalInformationStatus'],
  changePersonalInformationStatusMessage: ['personalInformationStatusMessage'],
  changeRegistrationCodeStatus: ['registrationCodeStatus'],
  changeRegistrationCodeStatusMessage: ['registrationCodeStatusMessage'],
  changeSecurityHintsStatus: ['securityHintsStatus'],
  changeSecurityHintsStatusMessage: ['securityHintsStatusMessage'],
  changeRegisterUserStatus: ['registerUserStatus'],
  changeRegisterUserStatusMessage: ['registerUserStatusMessage'],
  changeToken: ['token'],
  sendIdentificationRequest: ['data'],
  sendIdentificationSuccess: ['data'],
  sendIdentificationFailure: ['data'],
  sendPersonalInformationRequest: ['data'],
  sendPersonalInformationSuccess: ['data'],
  sendPersonalInformationFailure: ['data'],
  sendRegistrationCodeRequest: ['data'],
  sendRegistrationCodeSuccess: ['data'],
  sendRegistrationCodeFailure: ['data'],
  sendSecurityHintsRequest: ['data'],
  sendSecurityHintsSuccess: ['data'],
  sendSecurityHintsFailure: ['data'],
  registerUserRequest: ['data', 'token'],
  registerUserSuccess: ['data'],
  registerUserFailure: ['data'],
  clearRegistration: []
})

export const RegistrationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  identificationStatus: null,
  identificationStatusMessage: null,
  personalInformationStatus: null,
  personalInformationStatusMessage: null,
  registrationCodeStatus: null,
  registrationCodeStatusMessage: null,
  securityHintsStatus: null,
  securityHintsStatusMessage: null,
  registerUserStatus: null,
  registerUserStatusMessage: null,
  contractNumber: null,
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  zipCode: null,
  phoneNumber: null,
  emailVerified: false,
  email: null,
  confirmEmail: null,
  emailUpdated: null,
  createUserId: null,
  password: null,
  confirmPassword: null,
  enterCode: null,
  securityHint1: null,
  securityAnswer1: null,
  securityHint2: null,
  securityAnswer2: null,
  securityHint3: null,
  securityAnswer3: null,
  commElect: null,
  showCommElect: null,
  token: null,
  tempRegCode: null,
  questionone: null,
  questiontwo: null,
  questionthree: null,
  answerone: null,
  answertwo: null,
  answerthree: null,
  confirm: null,
  fetching: false,
  error: null,
  data: null
})

/* ------------- Reducers ------------- */

// //////////////////////////
// Identification
// //////////////////////////
// _sendIdentificationRequest
export const _sendIdentificationRequest = (state: Object) => state.merge({ fetching: true })

// sendIdentificationSuccess
export const _sendIdentificationSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, emailVerified: data.emailVerified, email: data.homeEmail, commElect: data.defaultEOB, showCommElect: data.collectEOB, token: data.token, identificationStatus: data.identificationStatus, identificationStatusMessage: data.identificationStatusMessage})

// _sendIdentificationFailure
export const _sendIdentificationFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, identificationStatus: data.identificationStatus, identificationStatusMessage: data.identificationStatusMessage })

// //////////////////////////
// PersonalInformation
// //////////////////////////
// _sendPersonalInformationRequest
export const _sendPersonalInformationRequest = (state: Object) => state.merge({ fetching: true })

// _sendPersonalInformationSuccess
export const _sendPersonalInformationSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, token: data.token, tempRegCode: data.tempRegCode, personalInformationStatus: data.personalInformationStatus, personalInformationStatusMessage: data.personalInformationStatusMessage})

// _sendPersonalInformationFailure
export const _sendPersonalInformationFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, personalInformationStatus: data.personalInformationStatus, personalInformationStatusMessage: data.personalInformationStatusMessage})

// //////////////////////////
// RegistrationCode
// //////////////////////////
// _sendRegistrationCodeRequest
export const _sendRegistrationCodeRequest = (state: Object) => state.merge({ fetching: true })

// sendRegistrationCodeSuccess
export const _sendRegistrationCodeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, token: data.token, registrationCodeStatus: data.registrationCodeStatus, registrationCodeStatusMessage: data.registrationCodeStatusMessage})

// _sendRegistrationCodeFailure
export const _sendRegistrationCodeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, registrationCodeStatus: data.registrationCodeStatus, registrationCodeStatusMessage: data.registrationCodeStatusMessage})

// //////////////////////////
// SecurityHints
// //////////////////////////
// _sendSecurityHintsRequest
export const _sendSecurityHintsRequest = (state: Object) => state.merge({ fetching: true })

// sendSecurityHintsSuccess
export const _sendSecurityHintsSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, token: data.token, securityHintsStatus: data.securityHintsStatus, securityHintsStatusMessage: data.securityHintsStatusMessage})

// _sendSecurityHintsFailure
export const _sendSecurityHintsFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, securityHintsStatus: data.securityHintsStatus, securityHintsStatusMessage: data.securityHintsStatusMessage})

// //////////////////////////
// RegisterUser
// //////////////////////////
// _registerUserRequest
export const _registerUserRequest = (state: Object) => state.merge({ fetching: true })

// registerUserSuccess
export const _registerUserSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, token: data.token, registerUserStatus: data.registerUserStatus, registerUserStatusMessage: data.registerUserStatusMessage})

// _registerUserFailure
export const _registerUserFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, registerUserStatus: data.registerUserStatus, registerUserStatusMessage: data.registerUserStatusMessage })

// //////////////////////////
// Props
// //////////////////////////
// contractNumber
export const _changeContractNumber = (state: Object, {contractNumber}: Object) =>
      state.merge({fetching: false, contractNumber})

// firstName
export const _changeFirstName = (state: Object, {firstName}: Object) =>
      state.merge({fetching: false, firstName})

// lastName
export const _changeLastName = (state: Object, {lastName}: Object) =>
      state.merge({fetching: false, lastName})

// dateOfBirth
export const _changeDateOfBirth = (state: Object, {dateOfBirth}: Object) =>
      state.merge({fetching: false, dateOfBirth})

// zipCode
export const _changeZipCode = (state: Object, {zipCode}: Object) =>
      state.merge({fetching: false, zipCode})

// phoneNumber
export const _changePhoneNumber = (state: Object, {phoneNumber}: Object) =>
      state.merge({fetching: false, phoneNumber})

// emailVerified
export const _changeEmailVerified = (state: Object, {emailVerified}: Object) =>
      state.merge({fetching: false, emailVerified})

// email
export const _changeEmail = (state: Object, {email}: Object) =>
      state.merge({fetching: false, email})

// confirmEmail
export const _changeConfirmEmail = (state: Object, {confirmEmail}: Object) =>
      state.merge({fetching: false, confirmEmail})

// emailUpdated
export const _changeEmailUpdated = (state: Object, {emailUpdated}: Object) =>
      state.merge({fetching: false, emailUpdated})

// createUserId
export const _changeCreateUserId = (state: Object, {createUserId}: Object) =>
      state.merge({fetching: false, createUserId})

// password
export const _changePassword = (state: Object, {password}: Object) =>
      state.merge({fetching: false, password})

// confirmPassword
export const _changeConfirmPassword = (state: Object, {confirmPassword}: Object) =>
      state.merge({fetching: false, confirmPassword})

// enterCode
export const _changeEnterCode = (state: Object, {enterCode}: Object) =>
      state.merge({fetching: false, enterCode})

// securityHint1
export const _changeSecurityHint1 = (state: Object, {securityHint1}: Object) =>
      state.merge({fetching: false, securityHint1})

// securityAnswer1
export const _changeSecurityAnswer1 = (state: Object, {securityAnswer1}: Object) =>
      state.merge({fetching: false, securityAnswer1})

// securityHint2
export const _changeSecurityHint2 = (state: Object, {securityHint2}: Object) =>
      state.merge({fetching: false, securityHint2})

// securityAnswer2
export const _changeSecurityAnswer2 = (state: Object, {securityAnswer2}: Object) =>
      state.merge({fetching: false, securityAnswer2})

// securityHint3
export const _changeSecurityHint3 = (state: Object, {securityHint3}: Object) =>
      state.merge({fetching: false, securityHint3})

// securityAnswer3
export const _changeSecurityAnswer3 = (state: Object, {securityAnswer3}: Object) =>
      state.merge({fetching: false, securityAnswer3})

// reasonCode
export const _changeReasonCode = (state: Object, {data}: Object) =>
      state.merge({fetching: false, data})

// identificationStatus
export const _changeIdentificationStatus = (state: Object, {identificationStatus}: Object) =>
      state.merge({fetching: false, identificationStatus})

// identificationStatusMessage
export const _changeIdentificationStatusMessage = (state: Object, {identificationStatusMessage}: Object) =>
      state.merge({fetching: false, identificationStatusMessage})

// personalInformationStatus
export const _changePersonalInformationStatus = (state: Object, {personalInformationStatus}: Object) =>
      state.merge({fetching: false, personalInformationStatus})

// personalInformationStatusMessage
export const _changePersonalInformationStatusMessage = (state: Object, {personalInformationStatusMessage}: Object) =>
      state.merge({fetching: false, personalInformationStatusMessage})

// registrationCodeStatus
export const _changeRegistrationCodeStatus = (state: Object, {registrationCodeStatus}: Object) =>
      state.merge({fetching: false, registrationCodeStatus})

// registrationCodeStatusMessage
export const _changeRegistrationCodeStatusMessage = (state: Object, {registrationCodeStatusMessage}: Object) =>
      state.merge({fetching: false, registrationCodeStatusMessage})

// securityHintsStatus
export const _changeSecurityHintsStatus = (state: Object, {securityHintsStatus}: Object) =>
      state.merge({fetching: false, securityHintsStatus})

// securityHintsStatusMessage
export const _changeSecurityHintsStatusMessage = (state: Object, {securityHintsStatusMessage}: Object) =>
      state.merge({fetching: false, securityHintsStatusMessage})

// registerUserStatus
export const _changeRegisterUserStatus = (state: Object, {registerUserStatus}: Object) =>
      state.merge({fetching: false, registerUserStatus})

// registerUserStatusMessage
export const _changeRegisterUserStatusMessage = (state: Object, {registerUserStatusMessage}: Object) =>
      state.merge({fetching: false, registerUserStatusMessage})

// commElect
export const _changeCommElect = (state: Object, {commElect}: Object) =>
      state.merge({fetching: false, commElect})

// showCommElect
export const _changeShowCommElect = (state: Object, {showCommElect}: Object) =>
      state.merge({fetching: false, showCommElect})

// token
export const _changeToken = (state: Object, {token}: Object) =>
      state.merge({fetching: false, token})
// clear registration
export const _clear = (state: Object) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CONTRACT_NUMBER]: _changeContractNumber,
  [Types.CHANGE_FIRST_NAME]: _changeFirstName,
  [Types.CHANGE_LAST_NAME]: _changeLastName,
  [Types.CHANGE_DATE_OF_BIRTH]: _changeDateOfBirth,
  [Types.CHANGE_ZIP_CODE]: _changeZipCode,
  [Types.CHANGE_PHONE_NUMBER]: _changePhoneNumber,
  [Types.CHANGE_EMAIL_VERIFIED]: _changeEmailVerified,
  [Types.CHANGE_EMAIL]: _changeEmail,
  [Types.CHANGE_CONFIRM_EMAIL]: _changeConfirmEmail,
  [Types.CHANGE_EMAIL_UPDATED]: _changeEmailUpdated,
  [Types.CHANGE_CREATE_USER_ID]: _changeCreateUserId,
  [Types.CHANGE_PASSWORD]: _changePassword,
  [Types.CHANGE_CONFIRM_PASSWORD]: _changeConfirmPassword,
  [Types.CHANGE_COMM_ELECT]: _changeCommElect,
  [Types.CHANGE_SHOW_COMM_ELECT]: _changeShowCommElect,
  [Types.CHANGE_TOKEN]: _changeToken,
  [Types.CHANGE_ENTER_CODE]: _changeEnterCode,
  [Types.CHANGE_SECURITY_HINT1]: _changeSecurityHint1,
  [Types.CHANGE_SECURITY_ANSWER1]: _changeSecurityAnswer1,
  [Types.CHANGE_SECURITY_HINT2]: _changeSecurityHint2,
  [Types.CHANGE_SECURITY_ANSWER2]: _changeSecurityAnswer2,
  [Types.CHANGE_SECURITY_HINT3]: _changeSecurityHint3,
  [Types.CHANGE_SECURITY_ANSWER3]: _changeSecurityAnswer3,
  [Types.CHANGE_REASON_CODE]: _changeReasonCode,
  [Types.CHANGE_IDENTIFICATION_STATUS]: _changeIdentificationStatus,
  [Types.CHANGE_IDENTIFICATION_STATUS_MESSAGE]: _changeIdentificationStatusMessage,
  [Types.CHANGE_PERSONAL_INFORMATION_STATUS]: _changePersonalInformationStatus,
  [Types.CHANGE_PERSONAL_INFORMATION_STATUS_MESSAGE]: _changePersonalInformationStatusMessage,
  [Types.CHANGE_REGISTRATION_CODE_STATUS]: _changeRegistrationCodeStatus,
  [Types.CHANGE_REGISTRATION_CODE_STATUS_MESSAGE]: _changeRegistrationCodeStatusMessage,
  [Types.CHANGE_REGISTER_USER_STATUS]: _changeRegisterUserStatus,
  [Types.CHANGE_REGISTER_USER_STATUS_MESSAGE]: _changeRegisterUserStatusMessage,
  [Types.CHANGE_SECURITY_HINTS_STATUS]: _changeSecurityHintsStatus,
  [Types.CHANGE_SECURITY_HINTS_STATUS_MESSAGE]: _changeSecurityHintsStatusMessage,
  [Types.SEND_IDENTIFICATION_REQUEST]: _sendIdentificationRequest,
  [Types.SEND_IDENTIFICATION_SUCCESS]: _sendIdentificationSuccess,
  [Types.SEND_IDENTIFICATION_FAILURE]: _sendIdentificationFailure,
  [Types.SEND_PERSONAL_INFORMATION_REQUEST]: _sendPersonalInformationRequest,
  [Types.SEND_PERSONAL_INFORMATION_SUCCESS]: _sendPersonalInformationSuccess,
  [Types.SEND_PERSONAL_INFORMATION_FAILURE]: _sendPersonalInformationFailure,
  [Types.SEND_REGISTRATION_CODE_REQUEST]: _sendRegistrationCodeRequest,
  [Types.SEND_REGISTRATION_CODE_SUCCESS]: _sendRegistrationCodeSuccess,
  [Types.SEND_REGISTRATION_CODE_FAILURE]: _sendRegistrationCodeFailure,
  [Types.SEND_SECURITY_HINTS_REQUEST]: _sendSecurityHintsRequest,
  [Types.SEND_SECURITY_HINTS_SUCCESS]: _sendSecurityHintsSuccess,
  [Types.SEND_SECURITY_HINTS_FAILURE]: _sendSecurityHintsFailure,
  [Types.REGISTER_USER_REQUEST]: _registerUserRequest,
  [Types.REGISTER_USER_SUCCESS]: _registerUserSuccess,
  [Types.REGISTER_USER_FAILURE]: _registerUserFailure,
  [Types.CLEAR_REGISTRATION]: _clear
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
