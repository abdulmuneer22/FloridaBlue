import { put, call } from 'redux-saga/effects'
import SearchDataActions from '../Redux/SearchDataRedux'
// import axios from 'axios'

export function * searchdata (api) {
  console.tron.log('I am coming from searchdoctor sagas')
    // api.setsmTokenHeaders(smToken);
  const response = yield call(api.getConfig)
  if (response.ok) {
    // dispatch success
    var data = response.data.data
    yield put(SearchDataActions.searchdataSuccess(data))
  } else {
    // dispatch successful logins
    console.tron.log('I am coming from failuer ')
    var error = response.status
    yield put(SearchDataActions.searchdataFailure(error))
  }
}
