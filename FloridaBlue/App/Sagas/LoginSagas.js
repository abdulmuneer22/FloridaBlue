import {
  call,
  put
} from 'redux-saga/effects'

import LoginActions from '../Redux/LoginRedux'
import axios from 'axios'
// attempts to login
export function* login(api,{username, password}) {
  var username = username
  var password = password

  console.log("username+password" + JSON.stringify(username)+password);
     api.setHeaders(username,password);
  const response = yield call(api.getUser, username, password)
  console.log(JSON.stringify(response));
  if (response.ok) {
    // dispatch failure
     console.log("I am coming from success ")
     console.log("smstoken"+response.data.smToken);
     var smToken =  response.data.smToken
    yield put(LoginActions.loginSuccess(username,smToken))

  } else {
    // dispatch successful logins
   console.log("I am coming from failuer ")
    yield put(LoginActions.loginFailure('WRONG'))
  }

}
