import {
  call,
  put
} from 'redux-saga/effects'
import DoctorLanguageActions from '../Redux/DoctorLanguageRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * doctorlanguage (api, data) {
  console.tron.log('I am coming from doctor language')
    // api.setsmTokenHeaders(smToken);
  console.tron.log('data of doctor language' + JSON.stringify(data))
  const response = yield call(api.getDoctorLanguage, data)
  console.tron.log(JSON.stringify(response))
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    yield put(DoctorLanguageActions.doctorlanguageSuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.status
    yield put(DoctorLanguageActions.doctorlanguageFailure(error))
  }
}
