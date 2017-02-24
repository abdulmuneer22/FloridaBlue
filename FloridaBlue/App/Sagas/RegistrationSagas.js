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

  console.tron.log(response)

  if (response.ok) {
    console.tron.log('postIdentification success')
    var error = null
    var data = response.data
    data.screen1Status = data.reasonCode
    yield put(RegistrationActions.sendIdentificationSuccess(data))
  } else {
    console.tron.log('postIdentification failure')
    var error = 'Invaid input provided'
    var data = {
      'screen1Status': '999'
    }
    yield put(RegistrationActions.sendIdentificationFailure(data))
  }
}

export function* sendPersonalInformationRequest (api, {
  data
}) {
  const response = yield call(api.postPersonalInformation, data)

  console.tron.log(response)

  if (response.ok) {
    console.tron.log('postPersonalInformation success')
    var error = null
    var data = response.data
    data.screen2Status = data.reasonCode
    yield put(RegistrationActions.sendPersonalInformationSuccess(data))
  } else {
    console.tron.log('postPersonalInformation failure')
    var error = 'Invaid input provided'
    var data = {
      'screen2Status': '999'
    }
    yield put(RegistrationActions.sendPersonalInformationFailure(data))
  }
}

export function* sendRegistrationCodeRequest (api, {
  data
}) {
  const response = yield call(api.postRegistrationCode, data)

  console.tron.log(response)

  if (response.ok) {
    console.tron.log('postRegistrationCode success')
    var error = null
    var data = response.data
    data.screen3Status = data.reasonCode
    yield put(RegistrationActions.sendRegistrationCodeSuccess(data))
  } else {
    console.tron.log('postRegistrationCode failure')
    var error = 'Invaid input provided'
    var data = {
      'screen3Status': '999'
    }
    yield put(RegistrationActions.sendRegistrationCodeFailure(data))
  }
}
