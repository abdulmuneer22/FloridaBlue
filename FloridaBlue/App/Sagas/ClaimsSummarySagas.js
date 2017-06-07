import { call, put} from 'redux-saga/effects'
import ClaimsSummaryActions from '../Redux/ClaimsSummaryRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * claimsSummary (api) {
  console.tron.log('I am coming from claimsSummary Sagas')
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getClaimsSummary)
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data;
    data = {
      claimsBreakDown: [
        {"number": 2250.00, "name": 'Your Discount'},
        {"number": 2250.00, "name": 'Florida Blue Paid'},
        {"number": 700.00, "name": 'Your Responsibility'}
      ]
    }
    console.tron.log('Data ' + JSON.stringify(data));
    yield put(ClaimsSummaryActions.claimsSummarySuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(ClaimsSummaryActions.claimsSummaryFailure(error))
  }
}
