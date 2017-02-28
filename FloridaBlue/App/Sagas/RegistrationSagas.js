import {
  call,
  put
} from 'redux-saga/effects'

import RegistrationActions from '../Redux/RegistrationRedux'
// request to regiter

export function* sendIdentificationRequest (api, {
  data
}) {
  const response = yield call(api.postIdentification, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.identificationStatus = data.reasonCode
    console.tron.log(data)
    yield put(RegistrationActions.sendIdentificationSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999'
    }
    yield put(RegistrationActions.sendIdentificationFailure(data))
  }
}

export function* sendPersonalInformationRequest (api, {
  data
}) {
  const response = yield call(api.postPersonalInformation, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.personalInformationStatus = data.reasonCode
    console.tron.log(data)
    yield put(RegistrationActions.sendPersonalInformationSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'personalInformationStatus': '999'
    }
    yield put(RegistrationActions.sendPersonalInformationFailure(data))
  }
}

export function* sendRegistrationCodeRequest (api, {
  data
}) {
  const response = yield call(api.postRegistrationCode, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.registrationCodeStatus = data.reasonCode
    console.tron.log(data)
    yield put(RegistrationActions.sendRegistrationCodeSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'registrationCodeStatus': '999'
    }
    yield put(RegistrationActions.sendRegistrationCodeFailure(data))
  }
}

export function* sendSecurityHintsRequest (api, {
  data
}) {
  const response = yield call(api.postSecurityHints, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.securityHintsStatus = data.reasonCode
    console.tron.log(data)
    yield put(RegistrationActions.sendSecurityHintsSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'securityHintsStatus': '999'
    }
    yield put(RegistrationActions.sendSecurityHintsFailure(data))
  }
}

export function* registerUserRequest (api, {
  data
}) {
  const response = yield call(api.postRegisterUser, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.registerUserStatus = data.reasonCode
    console.tron.log(data)
    yield put(RegistrationActions.sendRegisterUserSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'registerUserStatus': '999'
    }
    yield put(RegistrationActions.sendRegisterUserFailure(data))
  }
}
