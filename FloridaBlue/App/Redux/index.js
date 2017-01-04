// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({

//    temperature: require('./TemperatureRedux').reducer,

//    search: require('./SearchRedux').reducer,

  //  temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
  //  search: require('./SearchRedux').reducer,

    member: require('./MemberRedux').reducer,
    myplan: require('./MyPlanRedux').reducer,
    registration: require('./RegistrationRedux').reducer

  })

  return configureStore(rootReducer, rootSaga)
}
