import { call, put} from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import MemberActions from '../Redux/MemberRedux'
import SupportActions from '../Redux/SupportRedux'
import apiIndex from '../Services/Api'
var urlConfig = require('../UrlConfig');
// attempts to login
export function * login (api, {username, password}) {
  var username = username
  var password = password
  var setLogin
  console.tron.log('username+password' + JSON.stringify(username) + password)
  
  const response = yield call(api.getUser, username, password)
  
  if (response.status == '200') {
    var responseURL = response.responseURL
    var smToken = response.headers['set-cookie']
    let logoutUrl = '';
    if (response.data.data) {
      logoutUrl = response.data.data.logoutUrl;
      if (response.data.data.Login) {
        setLogin = response.data.data.Login
      } else {
        setLogin = null
      }
    }
    console.tron.log('loginvalue at saga' + setLogin)
    if (setLogin) {
      // we are displacing these action by this time we knew that member loged in success fully
      yield put(MemberActions.memberRequest())

      responseURL = 'login'
      var error = null
    }
    
    yield put(LoginActions.loginSuccess(username, responseURL,smToken,logoutUrl))
  } else if (response.status == '401') {
    // dispatch failure
    console.tron.log('I am coming from failuer ')
    var error = response.status
  //  alert('The user ID or password you have entered is incorrect. Please try again.')
    yield put(LoginActions.loginFailure(error))
  } else if (response.status == null) {
    console.tron.log('I am coming from failuer ')
    var error = 'I am being redirected'
    yield put(LoginActions.loginFailure(error))
  }
}

export function * logout (api,{logoutUrl}) {
  
  if(logoutUrl == undefined || logoutUrl == null)
  {
   logoutUrl = urlConfig.logoutURL
  }
  const logout = apiIndex.create(baseURL = logoutUrl)
  const response = yield call(logout.getLogout)
  console.tron.log('response of logout' + response)
  if (response.status == '200') {
    yield put(LoginActions.logout())
  } else {
    
    var error = 'Not Successfully Logout'
    yield put(LoginActions.loginFailure(error))
  }
}

export function * getTou (api) {
  const response = yield call(api.getTOU)
  console.tron.log(JSON.stringify(response.data))
  if (response.status == '200') {
    var getTou = response.data
    yield put(LoginActions.updateTou(getTou))
  } else {
    var error = response.status
    yield put(LoginActions.loginFailure(error))
  }
}

export function * sendConfirm (api) {
  const response = yield call(api.putTou)
  console.tron.log(JSON.stringify(response.data))
  if (response.status == '200') {
    var getTou = response.data
    console.tron.log('put tou' + response.data)
  } else {
    var error = 'I am being errored'
    yield put(LoginActions.loginFailure(error))
  }
}
