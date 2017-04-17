import {
  call,
  put
} from 'redux-saga/effects'
import SearchDoctorActions from '../Redux/SearchDoctorRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * searchdoctor (api, {data}) {
  console.log('I am coming from searchdoctor sagas')
    // api.setsmTokenHeaders(smToken);
  console.log('data of searchdoctor' + JSON.stringify(data))
  const response = yield call(api.getSearchDoctor, data)
  console.log(JSON.stringify(response))
  if (response.ok) {
    // dispatch success
    var responseData = response.data.data
    yield put(SearchDoctorActions.searchdoctorSuccess(responseData))
    
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = response.status
    yield put(SearchDoctorActions.searchdoctorFailure(error))
  }
}
