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
    registration: require('./RegistrationRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
