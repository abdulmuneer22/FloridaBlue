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
    if (response.status = "200") {
      // dispatch success
      /*
      var cookieItems = response.headers['set-cookie']
      console.log("cookieItems" + cookieItems);
      var pattern = /^SMSESSION/;
       if (pattern.test(cookieItems)) {
          //console.log(item)
          var elements = cookieItems.split(';')
          var smToken = elements[0]
            /*var smToken = smToken.replace('SMSESSION=', '')
        }
        */
        var smToken ="yash" ;
      console.log("smToken"+smToken);
      yield put(LoginActions.loginSuccess(username,smToken))

      }
      else {
        // dispatch failure
        console.log("I am coming from failuer ")
        if (response.status == "401")
          var error = "Invalid Credentials. Please enter correctly."
        yield put(LoginActions.loginFailure(error))
      }
    }
