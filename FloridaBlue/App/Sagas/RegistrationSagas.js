import {
  call,
  put
} from 'redux-saga/effects'

import RegistrationActions from '../Redux/RegistrationRedux'
// request to regiter

export function* registration(api, {
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

  console.log("username+password" + contractNumber + firstName + lastName + dateOfBirth + zipCode);

  const response = yield call(api.postIdentification,contractNumber,firstName,lastName,dateOfBirth,zipCode);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    var error = null;
    var data = response.data
    yield put(RegistrationActions.registrationSuccess(data));
  } else {
    // dispatch successful logins
    console.log("I am coming from failure")
    var error = "Invaid input provided"
    var data = {
      "reasonCode": "999",
      "reasonDesc": "Invalid input provided"
    }
    yield put(RegistrationActions.registrationFailure(data))
  }
}


export function* sendregistrationCode(api, {
  registrationcode
})
{

  var registrationcode = registrationcode
  console.log("username+password" + email + confirmemail+ uniqueuserid + password + confirmpassword);
  const response = yield call(api.postIdentification,contractNumber,firstName,lastName,dateOfBirth,zipCode);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    yield put(RegistrationActions.sendregistrationSuccesscode(registrationcode));
  } else {
    // dispatch successful logins
    console.log("I am coming from failure ")
    var error = "Invaid input provided"
    var data = {
      "reasonCode": "999",
      "reasonDesc": "Invalid input provided"
    }
    yield put(RegistrationActions.registrationFailure(data))
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
  const response = yield call(api.postIdentification,contractNumber,firstName,lastName,dateOfBirth,zipCode);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    yield put(RegistrationActions.sendregistrationAnswers(questionone,questiontwo.questionthree,answerone,answertwo,answerthree));
  } else {
    // dispatch successful logins
    console.log("I am coming from failure ")
    var error = "Invaid input provided"
    var data = {
      "reasonCode": "999",
      "reasonDesc": "Invalid input provided"
    }
    yield put(RegistrationActions.registrationFailure(data))
  }
}


export function* sendconfirm(api, {
  confirm
})
{

  var confirm = confirm
  console.log("username+password" + confirm);
  const response = yield call(api.postIdentification,contractNumber,firstName,lastName,dateOfBirth,zipCode);

  console.log(JSON.stringify(response));

  if (response.ok) {
    // dispatch failure
    console.log("I am coming from success");
    yield put(RegistrationActions.sendconfirm(confirm));
  } else {
    // dispatch successful logins
    console.log("I am coming from failure ")
    var error = "Invaid input provided"
    var data = {
      "reasonCode": "999",
      "reasonDesc": "Invalid input provided"
    }
    yield put(RegistrationActions.registrationFailure(data))
  }
}
