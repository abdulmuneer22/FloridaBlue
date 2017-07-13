import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { getTou } from './LoginSagas'
import { logout } from './LoginSagas'
import {sendConfirm} from './LoginSagas'

// import { getTemperature } from './TemperatureSagas'
var urlConfig = require('../UrlConfig')

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const apiforRegistration = API.create(baseURL = urlConfig.registrationURL)
// const apiforSecurity = API.create(baseURL = 'https://registration-stga.bcbsfl.com/ers/api/v1/users/')
// const apiforRegistration = API.create(baseURL = 'http://localhost:3000/api')
const apiforlogout = API.create(baseURL = urlConfig.logoutURL)

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    // some sagas receive extra parameters in addition to an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, apiforlogout),
    takeLatest(LoginTypes.GET_TOU, getTou, api),
    takeLatest(LoginTypes.SEND_CONFIRM, sendConfirm, api),
  ]
}
