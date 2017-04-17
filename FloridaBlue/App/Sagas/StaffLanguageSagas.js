import {
  call,
  put
} from 'redux-saga/effects'
import StaffLanguageActions from '../Redux/StaffLanguageRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * stafflanguage (api, data) {
  console.log('I am coming from Staff language')
    // api.setsmTokenHeaders(smToken);
  console.log('data of Staff language' + JSON.stringify(data))
  const response = yield call(api.getStaffLanguage, data)
  console.log(JSON.stringify(response))
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    yield put(StaffLanguageActions.stafflanguageSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = response.status
    yield put(StaffLanguageActions.stafflanguageFailure(error))
  }
}
