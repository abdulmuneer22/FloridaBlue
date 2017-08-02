import { call, put} from 'redux-saga/effects'
import apiIndex from '../Services/Api'
var urlConfig = require('../UrlConfig')

// export function * getTou (api) {
//   const response = yield call(api.getTOU)
//   if (response.status == '200') {
//     var getTou = response.data
//     yield put(LoginActions.updateTou(getTou))
//   } else {
//     var error = response.status
//     yield put(LoginActions.loginFailure(error))
//   }
// }
