import {
  call,
  put
} from 'redux-saga/effects'
import MyPlanActions from '../Redux/MyPlanRedux'
//import axios from 'axios'
// attempts to login
export function * myplan (api,{smToken}) {
console.log("I am coming from myplan")


api.setsmTokenHeaders(smToken);
const response = yield call(api.getPlan)
console.log(JSON.stringify(response));
if (response.ok) {
  // dispatch failure
  console.log("I am coming from success ")
  var Name ="testing" ;
//  yield put(LoginActions.loginSuccess(Name,smToken))
  yield put(MyPlanActions.myplanSuccess(response.data))

} else {
  // dispatch successful logins
 console.log("I am coming from failuer ")
  yield put(MyPlanActions.myplanFailure('WRONG'))
}

   }
