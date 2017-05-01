import {call, put} from 'redux-saga/effects'
import ProviderActions from '../Redux/ProviderRedux'

export function * sendNetworkListRequest (api, {data}) {
  const response = yield call(api.postNetworkList, data)

  if (response.ok) {
    var error = null
    var data = response.data

    for (var i = 0; i < data.data.memberNetworkList.length; i++) {
      var networkItem = data.data.memberNetworkList[i]
      var networkCodeList = []
      if (networkItem["health"]) {
        networkCodeList.push(networkItem["networkCode"])
      }
    }

    yield put(ProviderActions.changeNetworkCodeList(networkCodeList))
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
    var data=response.data
    yield put(ProviderActions.sendProviderSearchFailure(data))
  }
}

export function * sendPharmacySearchRequest (api, {data}) {
  const response = yield call(api.postPharmacySearch, data)
  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendPharmacySearchSuccess(data))
  } else {
    var data=response.data
    yield put(ProviderActions.sendPharmacySearchFailure(data))
  }
}

export function * sendUrgentSearchRequest (api, {data}) {
  const response = yield call(api.postUrgentSearch, data)
  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendUrgentSearchSuccess(data))
  } else {
    var data=response.data
    yield put(ProviderActions.sendUrgentSearchFailure(data))
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

export function * sendDoctorLanguageRequest (api, {data}) {

  const response = yield call(api.getDoctorLanguage, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendDoctorLanguageSuccess(data))
  } else {
    var data=response.data
    yield put(ProviderActions.sendDoctorLanguageFailure(data))
  }
}

export function * sendStaffLanguageRequest (api, {data}) {
  const response = yield call(api.getStaffLanguage, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendStaffLanguageSuccess(data))
  } else {
    var data=response.data
    yield put(ProviderActions.sendStaffLanguageFailure(data))
  }
}

export function * sendConfigTypeRequest (api) {
  const response = yield call(api.getConfig, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendConfigTypeSuccess(data))
  } else {
    var data=response.data
    yield put(ProviderActions.sendConfigTypeFailure(data))
  }
}

export function * sendDoctorDetailRequest (api, {data}) {
  const response = yield call(api.getDoctorDetail, data)

  if (response.ok) {
    var error = null
    var data = response.data
    yield put(ProviderActions.sendDoctorDetailSuccess(data))
  } else {
    var data=response.data
    yield put(ProviderActions.sendDoctorDetailFailure(data))
  }
}
