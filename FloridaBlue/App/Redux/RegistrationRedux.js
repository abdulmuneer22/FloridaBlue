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
  registrationRequest: ['contractNumber' ,'firstName','lastName','dateOfBirth','zipCode'],
  registrationSuccess: ['contractNumber' ,'firstName','lastName','dateOfBirth','zipCode'],
  sendregistrationRequest: ['email' ,'confirmemail','uniqueuserid','password','confirmpassword'],
  sendregistrationSuccess: ['email' ,'confirmemail','uniqueuserid','password','confirmpassword'],
  sendregistrationRequestcode :['registrationcode'],
  sendregistrationSuccesscode :['registrationcode'],
  sendregistrationRequestanswers :['questionone','questiontwo','questionthree','answerone','answertwo','answerthree'],
  sendregistrationSuccessanswers :['questionone','questiontwo','questionthree','answerone','answertwo','answerthree'],
  sendregistrationRequestconfirm : ['confirm'],
  sendregistrationSuccessconfirm : ['confirm'],
  registrationFailure: ['error'],
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
  fetching : false,
  error : null,
  email : null,
  confirmemail : null,
  uniqueuserid : null ,
  password : null ,
  confirmpassword : null,
  registrationcode : null ,
  questionone : null,
  questiontwo : null,
  questionthree : null,
  answerone: null ,
  answertwo: null ,
  answerthree: null,
  confirm : null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, {contractNumber,firstName,lastName,dateOfBirth,zipCode}: Object) =>
  state.merge({fetching: false, contractNumber,firstName,lastName,dateOfBirth,zipCode})

export const sendsuccess = (state: Object, {email,confirmemail,uniqueuserid,password,confirmpassword}: Object) =>
    state.merge({fetching: false, email,confirmemail,uniqueuserid,password,confirmpassword})

export const sendcode = (state: Object, {registrationcode}: Object) =>
      state.merge({fetching: false, registrationcode})

export const sendanswers = (state: Object, {questionone ,questiontwo, questionthree, answerone, answertwo, answerthree}: Object) =>
      state.merge({fetching: false,questionone ,questiontwo, questionthree, answerone, answertwo, answerthree })

export const sendconfirm = (state: Object, {sendconfrim}: Object) =>
      state.merge({fetching: false,sendconfrim})

// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error })

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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CONTRACT_NUMBER]: _changeContractNumber,
  [Types.CHANGE_FIRST_NAME]: _changeFirstName,
  [Types.CHANGE_LAST_NAME]: _changeLastName,
  [Types.CHANGE_DATE_OF_BIRTH]: _changeDateOfBirth,
  [Types.CHANGE_ZIP_CODE]: _changeZipCode,
  [Types.REGISTRATION_REQUEST]: request,
  [Types.REGISTRATION_SUCCESS]: success,
  [Types.SENDREGISTRATION_REQUEST]: request,
  [Types.SENDREGISTRATION_SUCCESS]: sendsuccess,
  [Types.SENDREGISTRATION_REQUESTCODE] : request,
  [Types.SENDREGISTRATION_SUCCESSCODE]: sendcode,
  [Types.SENDREGISTRATION_REQUESTANSWERS]: request,
  [Types.SENDREGISTRATION_SUCCESSANSWERS]: sendanswers,
  [Types.SENDREGISTRATION_REQUESTCONFIRM]: request,
  [Types.SENDREGISTRATION_SUCCESSCONFIRM]: sendconfirm,
  [Types.REGISTRATION_FAILURE]: failure,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
