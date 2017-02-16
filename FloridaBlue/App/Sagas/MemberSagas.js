import {
  call,
  put
} from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import LoginActions from '../Redux/LoginRedux'
import MyPlanActions from '../Redux/MyPlanRedux'
import SupportActions from '../Redux/SupportRedux'
// attempts to login
export function* member (api, {
  smToken
}) {
  //    api.setsmTokenHeaders(smToken);

  const response = yield call(api.getMember)
  console.log(JSON.stringify(response))
  if (response.data.status.code = '200') {
    // dispatch success
    var Name = response.data.data.firstName 
    var visibilityRules = response.data.data.visibilityRule
    yield put(MyPlanActions.myplanRequest())
    yield put(MemberActions.memberSuccess(Name, visibilityRules))
  } else {
    console.log('I am coming from failuer ')
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
