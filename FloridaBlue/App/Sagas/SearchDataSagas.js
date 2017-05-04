import { put, call } from 'redux-saga/effects'
import SearchDataActions from '../Redux/SearchDataRedux'
// import axios from 'axios'

export function * searchdata (api) {
  console.log('I am coming from searchdoctor sagas')
    // api.setsmTokenHeaders(smToken);
  console.log('data of searchdoctor' + JSON.stringify(data))
  const response = yield call(api.getConfig)
  console.log(JSON.stringify(response))
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    yield put(SearchDataActions.searchdataSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = response.status
    yield put(SearchDataActions.searchdataFailure(error))
  }
}
