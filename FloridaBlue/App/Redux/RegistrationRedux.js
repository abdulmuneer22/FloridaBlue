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
  changeEmail: ['email'],
  changeConfirmEmail: ['confirmEmail'],
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
  changeCommunicationsElectronically: ['communicationsElectronically'],
  changeReasonCode: ['data'],
  sendIdentificationRequest: ['data'],
  sendIdentificationSuccess: ['data'],
  sendIdentificationFailure: ['data'],
  sendPersonalInformationRequest: ['data'],
  sendPersonalInformationSuccess: ['data'],
  sendPersonalInformationFailure: ['data'],
  sendRegistrationCodeRequest: ['data'],
  sendRegistrationCodeSuccess: ['data'],
  sendRegistrationCodeFailure: ['data']
})

export const RegistrationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  contractNumber: null,
  firstName: null,
  lastName: null,
  dateOfBirth: null,
  zipCode: null,
  phoneNumber: null,
  email: null,
  confirmEmail: null,
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
  communicationsElectronically: null,
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

////////////////////////////
// Identification
////////////////////////////
// _sendIdentificationRequest
export const _sendIdentificationRequest = (state: Object) => state.merge({ fetching: true })

// sendIdentificationSuccess
export const _sendIdentificationSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, data})

// _sendIdentificationFailure
export const _sendIdentificationFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, data })

////////////////////////////
// PersonalInformation
////////////////////////////
// _sendPersonalInformationRequest
export const _sendPersonalInformationRequest = (state: Object) => state.merge({ fetching: true })

// sendPersonalInformationSuccess
export const _sendPersonalInformationSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, data})

// _sendPersonalInformationFailure
export const _sendPersonalInformationFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, data })

////////////////////////////
// RegistrationCode
////////////////////////////
// _sendRegistrationCodeRequest
export const _sendRegistrationCodeRequest = (state: Object) => state.merge({ fetching: true })

// sendRegistrationCodeSuccess
export const _sendRegistrationCodeSuccess = (state: Object, {data}: Object) =>
  state.merge({fetching: false, data})

// _sendRegistrationCodeFailure
export const _sendRegistrationCodeFailure = (state: Object, {data}: Object) =>
  state.merge({ fetching: false, data })

////////////////////////////
// Props
////////////////////////////
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

// email
export const _changeEmail = (state: Object, {email}: Object) =>
      state.merge({fetching: false, email})

// confirmEmail
export const _changeConfirmEmail = (state: Object, {confirmEmail}: Object) =>
      state.merge({fetching: false, confirmEmail})

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

// communicationsElectronically
export const _changeCommunicationsElectronically = (state: Object, {communicationsElectronically}: Object) =>
      state.merge({fetching: false, communicationsElectronically})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CONTRACT_NUMBER]: _changeContractNumber,
  [Types.CHANGE_FIRST_NAME]: _changeFirstName,
  [Types.CHANGE_LAST_NAME]: _changeLastName,
  [Types.CHANGE_DATE_OF_BIRTH]: _changeDateOfBirth,
  [Types.CHANGE_ZIP_CODE]: _changeZipCode,
  [Types.CHANGE_REASON_CODE]: _changeReasonCode,
  [Types.PHONE_NUMBER]: _changePhoneNumber,
  [Types.EMAIL]: _changeEmail,
  [Types.CONFIRM_EMAIL]: _changeConfirmEmail,
  [Types.CREATE_USER_ID]: _changeCreateUserId,
  [Types.PASSWORD]: _changePassword,
  [Types.CONFIRM_PASSWORD]: _changeConfirmPassword,
  [Types.CHANGE_RECEIVE_COMMUNICATIONS_ELECTRONICALLY]: _changeCommunicationsElectronically,
  [Types.ENTER_CODE]: _changeEnterCode,
  [Types.SECURITY_HINT1]: _changeSecurityHint1,
  [Types.SECURITY_ANSWER1]: _changeSecurityAnswer1,
  [Types.SECURITY_HINT2]: _changeSecurityHint2,
  [Types.SECURITY_ANSWER2]: _changeSecurityAnswer2,
  [Types.SECURITY_HINT3]: _changeSecurityHint3,
  [Types.SECURITY_ANSWER3]: _changeSecurityAnswer3,
  [Types.SEND_IDENTIFICATION_REQUEST]: _sendIdentificationRequest,
  [Types.SEND_IDENTIFICATION_SUCCESS]: _sendIdentificationSuccess,
  [Types.SEND_IDENTIFICATION_FAILURE]: _sendIdentificationFailure,
  [Types.SEND_PERSONAL_INFORMATION_REQUEST]: _sendPersonalInformationRequest,
  [Types.SEND_PERSONAL_INFORMATION_SUCCESS]: _sendPersonalInformationSuccess,
  [Types.SEND_PERSONAL_INFORMATION_FAILURE]: _sendPersonalInformationFailure,
  [Types.SEND_REGISTRATION_CODE_REQUEST]: _sendRegistrationCodeRequest,
  [Types.SEND_REGISTRATION_CODE_SUCCESS]: _sendRegistrationCodeSuccess,
  [Types.SEND_REGISTRATION_CODE_FAILURE]: _sendRegistrationCodeFailure
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
