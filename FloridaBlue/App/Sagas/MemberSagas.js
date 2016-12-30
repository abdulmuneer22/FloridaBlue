import {
  call,
  put
} from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import LoginActions from '../Redux/LoginRedux'
import axios from 'axios'
// attempts to login
export function * member (api,{smToken}) {

    api.setsmTokenHeaders(smToken);
    const response = yield call(api.getMember)
    console.log(JSON.stringify(response));
    if (response.ok) {
      // dispatch failure
      console.log("I am coming from success ")
      var Name = response.data.firstName+" "+response.data.lastName ;

      yield put(LoginActions.loginSuccess(Name,smToken))
      yield put(MemberActions.memberSuccess(Name))

    } else {
      // dispatch successful logins
     console.log("I am coming from failuer ")
      yield put(LoginActions.loginFailure('WRONG'))
    }

  }
