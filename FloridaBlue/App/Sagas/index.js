import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

// import { StartupTypes } from '../Redux/StartupRedux'
// import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { MemberTypes } from '../Redux/MemberRedux'
import { MyPlanTypes } from '../Redux/MyPlanRedux'
import { SupportTypes } from '../Redux/SupportRedux'
import { RegistrationTypes } from '../Redux/RegistrationRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { logout } from './LoginSagas'
import { member } from './MemberSagas'
import { myplan } from './MyPlanSagas'
import { support } from './SupportSagas'
import {sendIdentificationRequest} from './RegistrationSagas'
import {sendPersonalInformationRequest} from './RegistrationSagas'
// import { getTemperature } from './TemperatureSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
//const apiforRegistration = API.create(baseURL = 'https://registration-stga.bcbsfl.com/restservices/public')
const apiforRegistration = API.create(baseURL = 'http://localhost:3000/api')
const apiforlogout = API.create(baseURL = 'https://logout-stga.bcbsfl.com/')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    // some sagas receive extra parameters in addition to an action

    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, apiforlogout),
    takeLatest(MemberTypes.MEMBER_REQUEST, member, api),
    takeLatest(MyPlanTypes.MYPLAN_REQUEST, myplan, api),
    takeLatest(SupportTypes.SUPPORT_REQUEST, support, api),
    takeLatest(RegistrationTypes.SEND_IDENTIFICATION_REQUEST, sendIdentificationRequest, apiforRegistration),
    takeLatest(RegistrationTypes.SEND_PERSONAL_INFORMATION_REQUEST, sendPersonalInformationRequest, apiforRegistration)
  ]
}
