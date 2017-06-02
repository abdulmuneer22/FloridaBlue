import {
  call,
  put
} from 'redux-saga/effects'
import ClaimsListActions from '../Redux/ClaimsListRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * claimslist (api, data) {
  const response = yield call(api.getClaimsList, data)
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(ClaimsListActions.claimsListSuccess(data))
  } else {
    // dispatch successful logins
    var error = response.status
    yield put(ClaimsListActions.claimsListFailure(error))
  }
}
