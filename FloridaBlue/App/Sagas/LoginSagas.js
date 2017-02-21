import {
  call,
  put
} from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function* login (api, {
    username,
    password
  }) {
  var username = username
  var password = password
  console.log('username+password' + JSON.stringify(username) + password)
  //  api.setHeaders(username, password);
  const response = yield call(api.getUser, username, password)
  console.log(JSON.stringify(response))

  if (response.status == '200') {
    var responseURL = response.responseURL
    var smToken
    var login

    if (response.data.data) {
      var cookieItems = response.headers['set-cookie']
      console.log('cookieItems' + cookieItems)
      var pattern = /^SMSESSION/
      if (pattern.test(cookieItems)) {
        var elements = cookieItems.split(';')
        smToken = elements[0]
      }
      console.log('after parsing' + smToken)
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
      console.log('jsession' + setcookie)
    }

    yield put(LoginActions.loginSuccess(username, responseURL, smToken))
  } else if (response.status == '401') {
      // dispatch failure
    console.log('I am coming from failuer ')
    var error = 'Invalid Credentials. Please enter correctly.'
    alert('Invalid Credentials. Please enter correctly.')
    yield put(LoginActions.loginFailure(error))
  } else if (response.status == null) {
    console.log('I am coming from failuer ')
    var error = 'I am being redirected'
    yield put(LoginActions.loginFailure(error))
  }
}

export function* logout (apiforlogout) {
  const response = yield call(apiforlogout.getLogout)
  console.log('response of logout' + response)
}

export function* getTou (api) {
  const response = yield call(api.getTOU)
  console.log(JSON.stringify(response.data))
  if (response.status == '200') {
    var getTou = response.data
    yield put(LoginActions.updateTou(getTou))
  } else {
    var error = 'I am being errored'
    yield put(LoginActions.loginFailure(error))
  }
}
