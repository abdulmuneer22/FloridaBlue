import {
  call,
  put
} from 'redux-saga/effects'

import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function* login(api, {
    username,
    password
  }) {
    var username = username
    var password = password
    console.log("username+password" + JSON.stringify(username) + password);
    api.setHeaders(username, password);
    const response = yield call(api.getUser, username, password)
    if (response.status == "200") {
      let responseData = null
      if(response.data !== null) {
        responseData = response.data
      }
      if(responseData === null || (responseData.data === null || responseData.data['Login'] !== 'Success')){
        yield put(LoginActions.loginFailure('Account is locked'))
      }else {
        yield put(LoginActions.loginSuccess(username))
      }
    } else if (response.status == "401") {
      // dispatch failure
      console.log("I am coming from failuer ")
      var error = "Invalid Credentials. Please enter correctly."
      yield put(LoginActions.loginFailure(error))
    } else if(response.status == null){
      console.log("I am coming from failuer ")
      var error = "I am being redirected"
      yield put(LoginActions.loginFailure(error))
    }
  }
