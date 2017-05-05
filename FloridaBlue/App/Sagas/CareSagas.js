import {
  call,
  put
} from 'redux-saga/effects'
import CareActions from '../Redux/CareRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * care (api, data) {
  const response = yield call(api.getCare, data)
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(CareActions.careSuccess(data))
  } else {
    // dispatch successful logins
    var error = response.status
    yield put(CareActions.careFailure(error))
  }
}
