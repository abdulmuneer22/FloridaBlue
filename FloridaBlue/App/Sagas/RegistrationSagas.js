import {
  call,
  put
} from 'redux-saga/effects'

import RegistrationActions from '../Redux/RegistrationRedux'
// request to regiter

var getReasonMessage = function (status) {
  /*
  For all error codes except the one (002) - Error Message - Your request cannot be completed at this time. If problem persists, refer to the contact information on Contact Us section for further assistance.

  For 002, user found in LDAP - Error Message - You have already registered an account with us, please return to the log in page and enter your username and password  "
  */
  console.tron.log(status)
  console.log('im status' + status)
  var message = ''
  if (status === '002') {
    message = 'You have already registered an account with us, please return to the log in page and enter your username and password.'
  } else {
    message = 'Your request cannot be completed at this time. If problem persists, refer to the contact information on Contact Us section for further assistance.'
  }

  return (message)
}

export function * sendIdentificationRequest (api, {
  data
}) {
  const response = yield call(api.postIdentification, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.identificationStatus = data.reasonCode
    data.identificationStatusMessage = getReasonMessage(data.identificationStatus)
    console.tron.log(data)
    console.log(data)
    console.log('im reason code' + data.reasonCode)
    console.tron.log(data.reasonCode)
    yield put(RegistrationActions.sendIdentificationSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999'
    }
    data.identificationStatusMessage = getReasonMessage(data.indentificationStatus)
    yield put(RegistrationActions.sendIdentificationFailure(data))
  }
}

export function * sendPersonalInformationRequest (api, {
  data
}) {
  const response = yield call(api.postPersonalInformation, data)

  if (response.ok) {
    var error = null
    var data = response.data
    console.log(response.data)
    data.personalInformationStatus = data.reasonCode
    data.personalInformationStatusMessage = getReasonMessage(data.personalInformationStatus)
    console.tron.log(data)
    yield put(RegistrationActions.sendPersonalInformationSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'personalInformationStatus': '999'
    }
    data.personalInformationStatusMessage = getReasonMessage(data.personalInformationStatus)
    yield put(RegistrationActions.sendPersonalInformationFailure(data))
  }
}

export function * sendRegistrationCodeRequest (api, {
  data
}) {
  const response = yield call(api.postRegistrationCode, data)
  var sendData = data ;
  if (response.ok) {
    var error = null
    var data = response.data
    data.registrationCodeStatus = data.reasonCode
    data.registrationCodeStatusMessage = getReasonMessage(data.registrationCodeStatus)
    yield put(RegistrationActions.registerUserRequest(sendData,data.token))
    yield put(RegistrationActions.sendRegistrationCodeSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'registrationCodeStatus': '999'
    }
    data.registrationCodeStatusMessage = getReasonMessage(data.registrationCodeStatus)
    yield put(RegistrationActions.sendRegistrationCodeFailure(data))
  }
}

export function * sendSecurityHintsRequest (api, {
  data
}) {
  const response = yield call(api.postSecurityHints, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.securityHintsStatus = data.reasoncode
    data.securityHintsStatusMessage = getReasonMessage(data.securityHintsStatus)
    console.tron.log(data)
    yield put(RegistrationActions.sendSecurityHintsSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'securityHintsStatus': '999'
    }
    data.securityHintsStatusMessage = getReasonMessage(data.securityHintsStatus)
    yield put(RegistrationActions.sendSecurityHintsFailure(data))
  }
}

export function * registerUserRequest (api, {
  data,token
}) {
  const response = yield call(api.postRegisterUser,data,token)

  if (response.ok) {
    var error = null
    var data = response.data
    data.registerUserStatus = data.reasonCode
    data.registerUserStatusMessage = getReasonMessage(data.registerUserStatus)
    console.tron.log(data)
    yield put(RegistrationActions.registerUserSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'registerUserStatus': '999'
    }
    data.registerUserStatusMessage = getReasonMessage(data.registerUserStatus)
    yield put(RegistrationActions.registerUserFailure(data))
  }
}
