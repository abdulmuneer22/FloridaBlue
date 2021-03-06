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
    var error = {}
    error.problem = response.problem
    if (response != null && response.data != undefined && response.data.data != undefined && 
     response.data.data.idCardWebViewURL != undefined) {
      error.idCardWebviewURL = response.data.data.idCardWebViewURL
    }
    yield put(MyIdCardActions.myIdCardFailure(error))
  }
}
