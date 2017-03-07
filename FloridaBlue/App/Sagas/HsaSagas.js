import {
  call,
  put
} from 'redux-saga/effects'
import HsaActions from '../Redux/HsaRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function* hsa (api) {
  console.log('I am coming from HSA')
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getHsa)
  console.log(JSON.stringify(response))
  if (response.data.status.code = '200') {
    // dispatch success
    var data = response.data.data
    yield put(HsaActions.hsaSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failure ')
    var error = 'WRONG'
    yield put(HsaActions.hsaFailure(error))
  }
}
