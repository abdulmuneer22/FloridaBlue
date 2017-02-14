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

  console.log(JSON.stringify(response))

  if (response.ok) {
    // dispatch failure
    console.log('I am coming from success')
    var error = null
    var data = response.data
    yield put(RegistrationActions.sendIdentificationSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failure')
    var error = 'Invaid input provided'
    var data = {
      'reasonCode': '999',
      'reasonDesc': 'Invalid input provided'
    }
    yield put(RegistrationActions.sendIdentificationFailure(data))
  }
}

export function* sendPersonalInformationRequest (api, {
  data
}) {

  const response = yield call(api.postIdentification, data)

  console.log(JSON.stringify(response))

  if (response.ok) {
    // dispatch failure
    console.log('I am coming from success')
    var error = null
    var data = response.data
    yield put(RegistrationActions.sendIdentificationSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failure')
    var error = 'Invaid input provided'
    var data = {
      'reasonCode': '999',
      'reasonDesc': 'Invalid input provided'
    }
    yield put(RegistrationActions.sendIdentificationFailure(data))
  }
}
