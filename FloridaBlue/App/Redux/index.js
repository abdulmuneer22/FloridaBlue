// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    member: require('./MemberRedux').reducer,
    myplan: require('./MyPlanRedux').reducer,
    support: require('./SupportRedux').reducer,
    myidcard: require('./MyIdCardRedux').reducer,
    hsa: require('./HsaRedux').reducer,
    language: require('./LanguageRedux').reducer,
    stafflanguage: require('./StaffLanguageRedux').reducer,
    doctorlanguage: require('./DoctorLanguageRedux').reducer,
    doctordetail: require('./DoctorDetailRedux').reducer,
    searchdoctor: require('./SearchDoctorRedux').reducer,
    searchdata: require('./SearchDataRedux').reducer,
    saveprovider: require('./SaveProviderRedux').reducer,
    registration: require('./RegistrationRedux').reducer,
    provider: require('./ProviderRedux').reducer,
    claims: require('./ClaimsRedux.js').reducer,
    claimslist: require('./ClaimsListRedux').reducer,
    claimdetail: require('./ClaimDetailRedux').reducer,
    claimsSummary: require('./ClaimsSummaryRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
