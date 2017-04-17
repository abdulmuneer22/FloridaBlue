import {
  call,
  put
} from 'redux-saga/effects'
import DoctorDetailActions from '../Redux/DoctorDetailRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * doctordetail (api, data) {
  console.log('I am coming from doctordetail sagas')
    // api.setsmTokenHeaders(smToken);
  console.log('data of doctordetail' + JSON.stringify(data))
  const response = yield call(api.getDoctorDetail, data)
  console.log(JSON.stringify(response))
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(DoctorDetailActions.doctordetailSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = response.status
    yield put(DoctorDetailActions.doctordetailFailure(error))
  }
}
