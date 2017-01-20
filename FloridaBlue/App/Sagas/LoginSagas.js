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
    console.log(JSON.stringify(response));

    if (response.status == "200") {
      var responseURL = response.responseURL
      var login 
        if (response.data.data){
             login = response.data.data.Login
        }else {
          login = null
        }
        if (login ) {
           responseURL = 'login'
          var error = null
          yield put(LoginActions.loginSuccess(username, responseURL))
        } else {
          var error = null
          yield put(LoginActions.loginSuccess(username, responseURL))
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
