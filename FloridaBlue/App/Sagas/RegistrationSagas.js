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
  var lastname = firstname
  var dob = firstname
  var zip = firstname

  console.log("username+password" + contactnumber + firstname + lastname + dob + zip);

  const response = yield call(api.postIdentification,contactnumber,firstname,lastname,dob,zip);

  console.log(JSON.stringify(response));

  if (response.data.status == "Success") {
    // dispatch failure
    console.log("I am coming from success ");
    console.log("smstoken" + response.data.smToken);
    var smToken = response.data.smToken;
    yield put(RegistrationActions.registrationSuccess(contactnumber, firstname, lastname, dob, zip));
  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "Invalid Credentials. Please enter correctly."
    yield put(RegistrationActions.registrationFailure(error))
  }
}
