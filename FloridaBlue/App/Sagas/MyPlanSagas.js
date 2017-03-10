import {
  call,
  put
} from 'redux-saga/effects'
import MyPlanActions from '../Redux/MyPlanRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * myplan (api, data) {
  console.log('I am coming from myplan')
    // api.setsmTokenHeaders(smToken);
  console.log('data of myplan' + JSON.stringify(data))
  const response = yield call(api.getPlan, data)
  console.log(JSON.stringify(response))
  if (response.status = '200') {
    // dispatch success
    var data = response.data.data
    yield put(MyPlanActions.myplanSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = 'WRONG'
    yield put(MyPlanActions.myplanFailure(error))
  }
}
