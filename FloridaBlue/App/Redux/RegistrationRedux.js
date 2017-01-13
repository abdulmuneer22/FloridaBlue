// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registrationRequest: ['contactnumber' ,'firstname','lastname','dob','zip'],
  registrationSuccess: ['contactnumber' ,'firstname','lastname','dob','zip'],
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
  contactnumber: null,
  firstname: null,
  lastname: null,
  dob: null,
  zip: null,
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
export const success = (state: Object, {contactnumber,firstname,lastname,dob,zip}: Object) =>
  state.merge({fetching: false, contactnumber,firstname,lastname,dob,zip})

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

// we've logged out


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
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
