import {
  call,
  put
} from 'redux-saga/effects'
import SpecialityActions from '../Redux/SpecialityRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * speciality (api, data) {
  console.tron.log('I am coming from speciality')
    // api.setsmTokenHeaders(smToken);
  console.tron.log('data of speciality' + JSON.stringify(data))
  const response = yield call(api.getSpeciality, data)
  console.tron.log(JSON.stringify(response))
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(SpecialityActions.specialitySuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.status
    yield put(SpecialityActions.specialityFailure(error))
  }
}
