// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registrationRequest: ['contactnumber' ,'firstname','lastname','dob','zip'],
  registrationSuccess: ['contactnumber' ,'firstname','lastname','dob','zip'],
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
  error : null 
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, {contactnumber,firstname,lastname,dob,zip}: Object) =>
  state.merge({fetching: false, contactnumber,firstname,lastname,dob,zip})

// we've had a problem logging in
export const failure = (state: Object, {error}: Object) =>
  state.merge({ fetching: false, error })

// we've logged out


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTRATION_REQUEST]: request,
  [Types.REGISTRATION_SUCCESS]: success,
  [Types.REGISTRATION_FAILURE]: failure,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
