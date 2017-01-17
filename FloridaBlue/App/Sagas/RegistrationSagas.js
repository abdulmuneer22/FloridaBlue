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
    console.log("I am coming from success");
    yield put(RegistrationActions.registrationSuccess(contactnumber, firstname, lastname, dob, zip));
  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "Invaid input provided"
    yield put(RegistrationActions.registrationFailure(error))
  }
}


export function* sendregistrationCode(api, {
  registrationcode
})
{

  var registrationcode = registrationcode
  console.log("username+password" + email + confirmemail+ uniqueuserid + password + confirmpassword);
  const response = yield call(api.postIdentification,contactnumber,firstname,lastname,dob,zip);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    yield put(RegistrationActions.sendregistrationSuccesscode(registrationcode));
  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "Invaid input provided"
    yield put(RegistrationActions.registrationFailure(error))
  }
}


export function* sendregistrationAnswers(api, {
  questionone,
  questiontwo,
  questionthree,
  answerone,
  answertwo,
  answerthree
})
{

  var questionone = questionone
  var questiontwo = questiontwo
  var questionthree = questionthree
  var answerone = answerone
  var answertwo = answertwo
  var answerthree = answerthree
  console.log("username+password" + questionone + questiontwo+ questionthree + answerone + answertwo + answerthree);
  const response = yield call(api.postIdentification,contactnumber,firstname,lastname,dob,zip);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    yield put(RegistrationActions.sendregistrationAnswers(questionone,questiontwo.questionthree,answerone,answertwo,answerthree));
  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "Invaid input provided"
    yield put(RegistrationActions.registrationFailure(error))
  }
}


export function* sendconfirm(api, {
  confirm
})
{

  var confirm = confirm
  console.log("username+password" + confirm);
  const response = yield call(api.postIdentification,contactnumber,firstname,lastname,dob,zip);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    yield put(RegistrationActions.sendconfirm(confirm));
  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "Invaid input provided"
    yield put(RegistrationActions.registrationFailure(error))
  }
}
