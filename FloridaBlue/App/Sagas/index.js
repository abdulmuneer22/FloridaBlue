import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

//import { StartupTypes } from '../Redux/StartupRedux'
//import { TemperatureTypes } from '../Redux/TemperatureRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { MemberTypes } from '../Redux/MemberRedux'
import { MyPlanTypes } from '../Redux/MyPlanRedux'
import { RegistrationTypes } from '../Redux/RegistrationRedux'

/* ------------- Sagas ------------- */

//import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { member } from './MemberSagas'
import { myplan } from './MyPlanSagas'
import { registration} from './RegistrationSagas'
//import { getTemperature } from './TemperatureSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugSettings.useFixtures ? FixtureAPI : API.create()
const apiforRegistration = API.create(baseURL='https://registration-stga.bcbsfl.com/restservices/public')

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    // some sagas receive extra parameters in addition to an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login , api),
    takeLatest(MemberTypes.MEMBER_REQUEST, member,api),
    takeLatest(MyPlanTypes.MYPLAN_REQUEST, myplan,api),
    takeLatest(RegistrationTypes.REGISTRATION_REQUEST,registration,apiforRegistration)
  ]
}
