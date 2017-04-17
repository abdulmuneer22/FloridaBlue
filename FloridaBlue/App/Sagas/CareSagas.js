import {
  call,
  put
} from 'redux-saga/effects'
import CareActions from '../Redux/CareRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * care (api, data) {
  console.log('I am coming from care sagas')
    // api.setsmTokenHeaders(smToken);
  console.log('data of care' + JSON.stringify(data))
  const response = yield call(api.getCare, data)
  console.log(JSON.stringify(response))
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(CareActions.careSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = response.status
    yield put(CareActions.careFailure(error))
  }
}
