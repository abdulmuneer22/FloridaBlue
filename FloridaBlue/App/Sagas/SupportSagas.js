import {
  call,
  put
} from 'redux-saga/effects'
import SupportActions from '../Redux/SupportRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * support (api) {
  console.tron.log('I am coming from support')
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getSupport)
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(SupportActions.supportSuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(SupportActions.supportFailure(error))
  }
}
