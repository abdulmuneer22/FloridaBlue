import {
  call,
  put
} from 'redux-saga/effects'
import ClaimsActions from '../Redux/ClaimsRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * claimslist (api, {data}) {
  const response = yield call(api.getClaimsList, data)
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    var noPrefClaims = {'memberId': '', 'memberName': 'All'}
    data.members.splice(0, 0, noPrefClaims)
    
    yield put(ClaimsActions.claimsListSuccess(data))
  } else {
    // dispatch successful logins
    var error = response.status
    yield put(ClaimsActions.claimsListFailure(error))
  }
}

// // attempts to login
// export function * claimsMemberList (api) {

//   const response = yield call(api.getClaimsMemberList)
//   if (response.status == '200') {
//     // dispatch success
//     //var data = response.data.data
//     console.tron.log('calimsMemberList called  successfully');

//           let claimsMemberList =  [
//               {
//                 "memberCode": "Professional",
//                 "memberName": "Professional"
//               },
//               {
//                 "memberCode": "Institutional",
//                 "memberName": "Institutional"
//               }
//           ]

//     yield put(ClaimsActions.claimsMemberListSuccess(claimsMemberList))
//   } else {
//     // dispatch successful logins
//     var error = response.status
//     yield put(ClaimsActions.claimsMemberListFailure(error))
//   }
// }

// attempts to login
export function * claimDetail (api, {claimid}) {
  //    api.setsmTokenHeaders(smToken)
  console.tron.log('claimid' + claimid)
  const response = yield call(api.getClaimDetail, claimid)
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
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getClaimsSummary)
  if (response.status == '200') {
    // dispatch success
    // let summaryData = response.data.data
    let summaryData = {
      claimsBreakDown: [
        {'amount': 2250.00, 'name': 'Your Discount'},
        {'amount': 2250.00, 'name': 'Florida Blue Paid'},
        {'amount': 700.00, 'name': 'Your Responsibility'},
        {'amount': 2250.00, 'name': 'Your Savings'},
        {'amount': 2250.00, 'name': 'Total Billed'}
      ]
    }
    yield put(ClaimsActions.claimsSummarySuccess(summaryData))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.problem
    yield put(ClaimsActions.claimsSummaryFailure(error))
  }
}
