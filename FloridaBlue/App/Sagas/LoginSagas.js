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
          if (response.data.data) {
            var cookieItems = response.headers['set-cookie']
            console.log("cookieItems" + cookieItems);
            var pattern = /^SMSESSION/;
            if (pattern.test(cookieItems)) {
              //console.log(item)
              var elements = cookieItems.split(';')
              var smToken = elements[0]
              var smToken = smToken.replace('SMSESSION=', '')
            }
            console.log("after parsing"+smToken)
            login = response.data.data.Login
          } else {
            login = null
          }
          if (login) {
            responseURL = 'login'
            var error = null

          } else {
            var error = null
            var setcookie = response.headers['set-cookie']
            console.log("jsession"+setcookie)
          }
    yield put(LoginActions.loginSuccess(username, responseURL,setcookie))
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
