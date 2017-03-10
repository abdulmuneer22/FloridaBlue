import { call, put} from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import MemberActions from '../Redux/MemberRedux'
import SupportActions from '../Redux/SupportRedux'
// attempts to login
export function * login (api, {username, password}) {
  var username = username
  var password = password
  var setLogin
  console.log('username+password' + JSON.stringify(username) + password)
  console.log(response)
  const response = yield call(api.getUser, username, password)
  if (response.status == '200' || response.status == '404') {
    var responseURL = response.responseURL
    var smToken = response.headers['set-cookie']
    if (response.data.data) {
      if (response.data.data.Login) {
        setLogin = response.data.data.Login
      } else {
        setLogin = null
      }
    }
    console.log('loginvalue at saga' + setLogin)
    if (setLogin) {
      // we are displacing these action by this time we knew that member loged in success fully
      yield put(MemberActions.memberRequest())
      yield put(SupportActions.supportRequest())
      responseURL = 'login'
      var error = null
    }
    yield put(LoginActions.loginSuccess(username, responseURL, smToken))
  } else if (response.status == '401') {
    // dispatch failure
    console.log('I am coming from failuer ')
    var error = 'The user ID or password you have entered is incorrect. Please try again.'
    alert('The user ID or password you have entered is incorrect. Please try again.')
    yield put(LoginActions.loginFailure(error))
  } else if (response.status == null) {
    console.log('I am coming from failuer ')
    var error = 'I am being redirected'
    yield put(LoginActions.loginFailure(error))
  }
}

export function * logout (apiforlogout) {
  const response = yield call(apiforlogout.getLogout)
  console.log('response of logout' + response)
}

export function * getTou (api) {
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

export function * sendConfirm (api) {
  const response = yield call(api.putTou)
  console.log(JSON.stringify(response.data))
  if (response.status == '200') {
    var getTou = response.data
    console.log('put tou' + response.data)
  } else {
    var error = 'I am being errored'
    yield put(LoginActions.loginFailure(error))
  }
}
