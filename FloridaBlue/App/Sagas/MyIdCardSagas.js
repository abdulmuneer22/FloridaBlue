import { call, put} from 'redux-saga/effects'
import MyIdCardActions from '../Redux/MyIdCardRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * myidcard (api) {
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getMyIdCard)
  if (response.status == '200') {
    // dispatch success
    var idCarddata = response.data.data
    /* data = {
      srcData: idCardData,
      idCardHeaderVisible: false
    } */
    yield put(MyIdCardActions.myIdCardSuccess(idCarddata))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failure ')
    var error = response.problem
    yield put(MyIdCardActions.myIdCardFailure(error))
  }
}
