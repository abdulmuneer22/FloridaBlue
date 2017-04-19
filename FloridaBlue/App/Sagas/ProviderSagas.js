import {call, put} from 'redux-saga/effects'
import ProviderActions from '../Redux/ProviderRedux'

export function * sendNetworkListRequest (api, {data}) {
  const response = yield call(api.postNetworkList, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendNetworkListSuccess(data))
  } else {
    yield put(ProviderActions.sendNetworkListFailure(data))
  }
}

export function * sendProviderSearchRequest (api, {data}) {
  const response = yield call(api.postProviderSearch, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendProviderSearchSuccess(data))
  } else {
    yield put(ProviderActions.sendProviderSearchFailure(data))
  }
}

export function * sendCareTypeRequest (api, {data}) {
  const response = yield call(api.getCareTypes, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendCareTypeSuccess(data))
  } else {
    yield put(ProviderActions.sendCareTypeFailure(data))
  }
}

export function * sendSpecialityTypeRequest (api, {selectedCategoryCode}) {
  console.log(data)
  const response = yield call(api.getSpecialityTypes, selectedCategoryCode)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.changeCategoryCode(selectedCategoryCode))
    yield put(ProviderActions.sendSpecialityTypeSuccess(data))
  } else {
    yield put(ProviderActions.sendSpecialityTypeFailure(data))
  }
}
