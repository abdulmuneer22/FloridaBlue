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
    hsa: require('./HsaRedux').reducer,
    language: require('./LanguageRedux').reducer,
    stafflanguage: require('./StaffLanguageRedux').reducer,
    doctorlanguage: require('./DoctorLanguageRedux').reducer,
    doctordetail: require('./DoctorDetailRedux').reducer,
    searchdoctor: require('./SearchDoctorRedux').reducer,
    searchdata: require('./SearchDataRedux').reducer,
    saveprovider: require('./SaveProviderRedux').reducer,
    registration: require('./RegistrationRedux').reducer,
    provider: require('./ProviderRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
