import { call, put} from 'redux-saga/effects'
import ClaimDetailActions from '../Redux/ClaimDetailRedux'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * claimdetail (api, {claimid}) {
  //    api.setsmTokenHeaders(smToken)
  console.tron.log('claimid' + claimid)
  const response = yield call(api.getClaimDetail, claimid)
  console.tron.log(JSON.stringify(response))
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    yield put(ClaimDetailActions.claimDetailSuccess(data))
  } else {
    console.tron.log('failure ', response)
    var error = response.status

    yield put(ClaimDetailActions.claimDetailFailure(error))
  }
}
