import {
  call,
  put
} from 'redux-saga/effects'
import ClaimsActions from '../Redux/ClaimsRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * claimslist (api, data) {
  const response = yield call(api.getClaimsList, data)
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(ClaimsActions.claimsListSuccess(data))
  } else {
    // dispatch successful logins
    var error = response.status
    yield put(ClaimsActions.claimsListFailure(error))
  }
}

// attempts to login
export function * claimDetail (api, {claimid}) {
  //    api.setsmTokenHeaders(smToken)
  console.tron.log('claimid' + claimid)
  const response = yield call(api.getClaimDetail, claimid)
  console.tron.log(JSON.stringify(response))
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    yield put(ClaimsActions.claimDetailSuccess(data))
  } else {
    console.tron.log('failure ', response)
    var error = response.status

    yield put(ClaimsActions.claimDetailFailure(error))
  }
}

// attempts to login
export function * claimsSummary (api) {
  console.tron.log('I am coming from claimsSummary Sagas')
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getClaimsSummary)
  if (response.status == '200') {
    // dispatch success
    //let summaryData = response.data.data
    let  summaryData = {
      claimsBreakDown: [
        {'amount': 2250.00, 'name': 'Your Discount'},
        {'amount': 2250.00, 'name': 'Florida Blue Paid'},
        {'amount': 700.00, 'name': 'Your Responsibility'},
        {'amount': 2250.00, 'name': 'Your Savings'},
        {'amount': 2250.00, 'name': 'Total Billed'}
      ]
    }
  //  console.tron.log('Data ' + JSON.stringify(data))
    yield put(ClaimsActions.claimsSummarySuccess(summaryData))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(ClaimsActions.claimsSummaryFailure(error))
  }
}
