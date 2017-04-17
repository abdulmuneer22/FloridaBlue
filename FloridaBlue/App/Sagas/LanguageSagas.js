import {
  call,
  put
} from 'redux-saga/effects'
import LanguageActions from '../Redux/LanguageRedux'
import LoginActions from '../Redux/LoginRedux'

// attempts to login

export function * language (api, data) {
  console.log('I am coming from language')
    // api.setsmTokenHeaders(smToken);
  console.log('data of language' + JSON.stringify(data))
  const response = yield call(api.getLanguage, data)
  console.log(JSON.stringify(response))
  if (response.status == '200') {
    // dispatch success
    var data = response.data.data
    yield put(LanguageActions.languageSuccess(data))
  } else {
    // dispatch successful logins
    console.log('I am coming from failuer ')
    var error = response.status
    yield put(LanguageActions.languageFailure(error))
  }
}
