import {
  call,
  put
} from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import LoginActions from '../Redux/LoginRedux'
import axios from 'axios'
// attempts to login
export function* member(api, {
  smToken
}) {
  //    api.setsmTokenHeaders(smToken);
  const response = yield call(api.getMember)
  console.log(JSON.stringify(response));
  if (response.data.status.code = "200") {
    // dispatch success
    var Name = response.data.data.firstName + " " + response.data.data.lastName;
    yield put(MemberActions.memberSuccess(Name))
  } else {
    console.log("I am coming from failuer ")
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
