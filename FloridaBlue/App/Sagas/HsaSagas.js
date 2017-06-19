import { call, put} from 'redux-saga/effects'
import HsaActions from '../Redux/HsaRedux'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * hsa (api, {financialProduct}) {
  //    api.setsmTokenHeaders(smToken)
  const response = yield call(api.getHsa, financialProduct)
  if (response.data.status.code == '200') {
    // dispatch success
    var data = response.data.data
    yield put(HsaActions.hsaSuccess(data))
  } else {
    console.tron.log('failure ', response)
    var error = response.status

    yield put(HsaActions.hsaFailure(error))
  }
}
