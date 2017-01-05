import {
  call,
  put
} from 'redux-saga/effects'

import RegistrationActions from '../Redux/RegistrationRedux'
// request to regiter

export function* registration(api, {
  contactnumber,
  firstname,
  lastname,
  dob,
  zip
}) {
  var contactnumber = contactnumber
  var firstname = firstname
  var lastname = lastname
  var dob = dob
  var zip = zip

  console.log("username+password" + contactnumber + firstname + lastname + dob + zip);

  const response = yield call(api.postIdentification,contactnumber,firstname,lastname,dob,zip);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    yield put(RegistrationActions.registrationSuccess(contactnumber, firstname, lastname, dob, zip));
  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "Invalid Credentials. Please enter correctly."
    yield put(RegistrationActions.registrationFailure(error))
  }
}
