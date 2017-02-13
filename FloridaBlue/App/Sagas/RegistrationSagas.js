import {
  call,
  put
} from 'redux-saga/effects'

import RegistrationActions from '../Redux/RegistrationRedux'
// request to regiter

export function* sendIdentificationRequest (api, {
  contractNumber,
  firstName,
  lastName,
  dateOfBirth,
  zipCode
}) {
  var contractNumber = contractNumber
  var firstName = firstName
  var lastName = lastName
  var dateOfBirth = dateOfBirth
  var zipCode = zipCode

  const response = yield call(api.postIdentification, contractNumber, firstName, lastName, dateOfBirth, zipCode)

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
