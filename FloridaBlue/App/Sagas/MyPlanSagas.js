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
//api.setsmTokenHeaders(smToken);
const response = yield call(api.getPlan)
console.log(JSON.stringify(response));
if (response.data.status.code = "200") {
  // dispatch failure
  console.log("I am coming from success ")
  var Name ="testing" ;
  var data = response.data.data ;
  console.log(JSON.stringify(data));
  var cookieItems = response.headers['set-cookie']
  console.log("cookieItems" + cookieItems);
  var pattern = /^SMSESSION/;
   if (pattern.test(cookieItems)) {
      //console.log(item)
      var elements = cookieItems.split(';')
      var smTokenNew = elements[0]
        /*var smToken = smToken.replace('SMSESSION=', '')*/
    }
  console.log("smToken"+smTokenNew);
  yield put(LoginActions.loginSuccess(Name,smTokenNew))
  yield put(MyPlanActions.myplanSuccess(data))

} else {
  // dispatch successful logins
 console.log("I am coming from failuer ")
 var error = "WRONG"
  yield put(MyPlanActions.myplanFailure(error))
}

   }
