import {
  call,
  put
} from 'redux-saga/effects'
import MyPlanActions from '../Redux/MyPlanRedux'
import LoginActions from '../Redux/LoginRedux'
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
  var data = response.data ;
  console.log(JSON.stringify(data));
  yield put(LoginActions.loginSuccess(Name,smToken))
  yield put(MyPlanActions.myplanSuccess(data))

} else {
  // dispatch successful logins
 console.log("I am coming from failuer ")
 var error = "WRONG"
  yield put(MyPlanActions.myplanFailure(error))
}

   }
