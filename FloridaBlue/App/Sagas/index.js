import { takeLatest } from 'redux-saga/effects'
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
import { HsaTypes } from '../Redux/HsaRedux'
import { MyIdCardTypes } from '../Redux/MyIdCardRedux'
import { ProviderList } from '../Redux/SaveProviderRedux'
import { SearchDataTypes } from '../Redux/SearchDataRedux'
import { RegistrationTypes } from '../Redux/RegistrationRedux'
import { ProviderTypes } from '../Redux/ProviderRedux'
import { ClaimsTypes } from '../Redux/ClaimsRedux'
import { NotificationTypes } from '../Redux/NotificationRedux'
import { PaymentTypes } from '../Redux/PaymentRedux'

/* ------------- Sagas ------------- */

// import { startup } from './StartupSagas'
import { login } from './LoginSagas'
import { getTou } from './LoginSagas'
import { logout } from './LoginSagas'
import {sendConfirm} from './LoginSagas'
import { member } from './MemberSagas'
import { myplan } from './MyPlanSagas'
import { support } from './SupportSagas'
import { hsa } from './HsaSagas'
import { myidcard } from './MyIdCardSagas'
import { addSavedProvider, removeSavedProvider } from './SaveProviderSagas'
import { searchdata } from './SearchDataSagas'
import {sendIdentificationRequest} from './RegistrationSagas'
import {sendPersonalInformationRequest} from './RegistrationSagas'
import {sendRegistrationCodeRequest} from './RegistrationSagas'
import {sendSecurityHintsRequest} from './RegistrationSagas'
import {registerUserRequest} from './RegistrationSagas'
import {sendNetworkListRequest} from './ProviderSagas'
import {sendProviderSearchRequest} from './ProviderSagas'
import {sendPharmacySearchRequest} from './ProviderSagas'
import {sendUrgentSearchRequest} from './ProviderSagas'
import {sendCareTypeRequest} from './ProviderSagas'
import {sendSpecialityTypeRequest} from './ProviderSagas'
import {sendAdvancedSpecialityTypeRequest} from './ProviderSagas'
import {sendDoctorLanguageRequest} from './ProviderSagas'
import {sendStaffLanguageRequest} from './ProviderSagas'
import {sendConfigTypeRequest} from './ProviderSagas'
import {sendDoctorDetailRequest} from './ProviderSagas'
import {claimslist} from './ClaimsSagas'
import {paymentsRequest} from './PaymentSagas'
import {paymentBarcodeRequest} from './PaymentSagas'
// import {claimsMemberList} from './ClaimsSagas'
import {claimDetail} from './ClaimsSagas'
import {claimsSummary} from './ClaimsSagas'
import {getNotification} from './NotificationSagas'
import {postFCMToken} from './NotificationSagas'
import {postArchive} from './NotificationSagas'

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
    takeLatest(MemberTypes.MEMBER_REQUEST, member, api),
    takeLatest(MyPlanTypes.MYPLAN_REQUEST, myplan, api),
    takeLatest(SupportTypes.SUPPORT_REQUEST, support, api),
    takeLatest(HsaTypes.HSA_REQUEST, hsa, api),
    takeLatest(MyIdCardTypes.MY_ID_CARD_REQUEST, myidcard, api),
    takeLatest(ProviderList.ADD_PROVIDER_REQUEST, addSavedProvider),
    takeLatest(ProviderList.REMOVE_PROVIDER_REQUEST, removeSavedProvider),
    takeLatest(SearchDataTypes.SEARCHDATA_REQUEST, searchdata, api),
    takeLatest(RegistrationTypes.SEND_IDENTIFICATION_REQUEST, sendIdentificationRequest, apiforRegistration),
    takeLatest(RegistrationTypes.SEND_PERSONAL_INFORMATION_REQUEST, sendPersonalInformationRequest, apiforRegistration),
    takeLatest(RegistrationTypes.SEND_REGISTRATION_CODE_REQUEST, sendRegistrationCodeRequest, apiforRegistration),
    takeLatest(RegistrationTypes.SEND_SECURITY_HINTS_REQUEST, sendSecurityHintsRequest, api),
    takeLatest(RegistrationTypes.REGISTER_USER_REQUEST, registerUserRequest, apiforRegistration),
    takeLatest(ProviderTypes.SEND_NETWORK_LIST_REQUEST, sendNetworkListRequest, api),
    takeLatest(ProviderTypes.SEND_PROVIDER_SEARCH_REQUEST, sendProviderSearchRequest, api),
    takeLatest(ProviderTypes.SEND_PHARMACY_SEARCH_REQUEST, sendPharmacySearchRequest, api),
    takeLatest(ProviderTypes.SEND_URGENT_SEARCH_REQUEST, sendUrgentSearchRequest, api),
    takeLatest(ProviderTypes.SEND_CARE_TYPE_REQUEST, sendCareTypeRequest, api),
    takeLatest(ProviderTypes.SEND_SPECIALITY_TYPE_REQUEST, sendSpecialityTypeRequest, api),
    takeLatest(ProviderTypes.SEND_ADVANCED_SPECIALITY_TYPE_REQUEST, sendAdvancedSpecialityTypeRequest, api),
    takeLatest(ProviderTypes.SEND_DOCTOR_LANGUAGE_REQUEST, sendDoctorLanguageRequest, api),
    takeLatest(ProviderTypes.SEND_STAFF_LANGUAGE_REQUEST, sendStaffLanguageRequest, api),
    takeLatest(ProviderTypes.SEND_CONFIG_TYPE_REQUEST, sendConfigTypeRequest, api),
    takeLatest(ProviderTypes.SEND_DOCTOR_DETAIL_REQUEST, sendDoctorDetailRequest, api),
    takeLatest(ProviderTypes.SEND_ASYNC_PROVIDER_SEARCH_REQUEST, sendProviderSearchRequest, api),
    takeLatest(ProviderTypes.SEND_ASYNC_PHARMACY_SEARCH_REQUEST, sendPharmacySearchRequest, api),
    takeLatest(ProviderTypes.SEND_ASYNC_URGENT_SEARCH_REQUEST, sendUrgentSearchRequest, api),
    takeLatest(ClaimsTypes.CLAIMS_LIST_REQUEST, claimslist, api),
    takeLatest(ClaimsTypes.CLAIM_DETAIL_REQUEST, claimDetail, api),
    takeLatest(ClaimsTypes.CLAIMS_SUMMARY_REQUEST, claimsSummary, api),
    takeLatest(ClaimsTypes.ASYNC_CLAIM_LIST_REQUEST, claimslist, api),
    takeLatest(NotificationTypes.GET_NOTIFICATION, getNotification, api),
    takeLatest(NotificationTypes.POST_F_C_M_TOKEN, postFCMToken, api),
    takeLatest(NotificationTypes.POST_ARCHIVE, postArchive, api),
    takeLatest(PaymentTypes.PAYMENTS_REQUEST, paymentsRequest, api),
    takeLatest(PaymentTypes.PAYMENT_BARCODE_REQUEST, paymentBarcodeRequest, api)
  ]
}
