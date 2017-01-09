import {
  call,
  put
} from 'redux-saga/effects'
import MyPlanActions from '../Redux/MyPlanRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function* myplan(api, {
  smToken
}) {
  console.log("I am coming from myplan")
    //api.setsmTokenHeaders(smToken);
  const response = yield call(api.getPlan)
  console.log(JSON.stringify(response));
  if (response.data.status.code = "200") {
    // dispatch success
    yield put(MyPlanActions.myplanSuccess(data))

  } else {
    // dispatch successful logins
    console.log("I am coming from failuer ")
    var error = "WRONG"
    yield put(MyPlanActions.myplanFailure(error))
  }

}
