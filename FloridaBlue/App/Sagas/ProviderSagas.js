import {call, put} from 'redux-saga/effects'
import ProviderActions from '../Redux/ProviderRedux'

export function * sendNetworkListRequest (api, {data}) {
  const response = yield call(api.postNetworkList, data)

  if (response.ok) {
    var data = response.data
    console.log('im network data' + data)
    console.tron.log('im network data' + data)
    for (var i = 0; i < data.data.memberNetworkList.length; i++) {
      var networkItem = data.data.memberNetworkList[i]
      var networkCodeList = []
      if (networkItem['health']) {
        networkCodeList.push(networkItem['networkCode'])
      }
    }

    yield put(ProviderActions.changeNetworkCodeList(networkCodeList))
    yield put(ProviderActions.sendNetworkListSuccess(data))
  } else {
    var error = response.problem
    console.log('im network error' + error)
    console.tron.log('im network error' + error)
    yield put(ProviderActions.sendNetworkListFailure(error))
  }
}

export function * sendProviderSearchRequest (api, {data}) {
  const response = yield call(api.postProviderSearch, data)
  if (response.ok) {
    var data = response.data
    console.log('im provider data' + data)
    console.tron.log('im provider data' + data)
    yield put(ProviderActions.sendProviderSearchSuccess(data))
  } else {
    var error = response.problem
    yield put(ProviderActions.sendProviderSearchFailure(error))
  }
}

export function * sendPharmacySearchRequest (api, {data}) {
  const response = yield call(api.postPharmacySearch, data)
  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.sendPharmacySearchSuccess(data))
  } else {
    var error = response.problem
    console.log('im pharmacy error' + error)
    console.tron.log('im pharmacy error' + error)
    yield put(ProviderActions.sendPharmacySearchFailure(error))
  }
}

export function * sendUrgentSearchRequest (api, {data}) {
  const response = yield call(api.postUrgentSearch, data)
  if (response.ok) {
    var data = response.data
    console.log('im urgent data' + data)
    console.tron.log('im urgent data' + data)
    yield put(ProviderActions.sendUrgentSearchSuccess(data))
  } else {
    var error = response.problem
    console.log('im urgent search error' + error)
    console.tron.log('im urgent search error' + error)
    yield put(ProviderActions.sendUrgentSearchFailure(error))
  }
}

export function * sendCareTypeRequest (api, {data}) {
  const response = yield call(api.getCareTypes, data)

  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.sendCareTypeSuccess(data))
  } else {
    var error = response.problem
    console.log('im care error' + error)
    console.tron.log('im care error' + error)
    yield put(ProviderActions.sendCareTypeFailure(error))
  }
}

export function * sendSpecialityTypeRequest (api, {selectedCategoryCode}) {
  console.log(data)
  const response = yield call(api.getSpecialityTypes, selectedCategoryCode)

  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.changeCategoryCode(selectedCategoryCode))
    yield put(ProviderActions.sendSpecialityTypeSuccess(data))
  } else {
    var error = response.problem
    console.log('im speciality error' + error)
    console.tron.log('im speciality error' + error)
    yield put(ProviderActions.sendSpecialityTypeFailure(error))
  }
}

export function * sendDoctorLanguageRequest (api, {data}) {
  const response = yield call(api.getDoctorLanguage, data)

  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.sendDoctorLanguageSuccess(data))
  } else {
    var error = response.problem
    console.log('im doctor lang error' + error)
    console.tron.log('im doctor lang error' + error)
    yield put(ProviderActions.sendDoctorLanguageFailure(error))
  }
}

export function * sendStaffLanguageRequest (api, {data}) {
  const response = yield call(api.getStaffLanguage, data)

  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.sendStaffLanguageSuccess(data))
  } else {
    var error = response.problem
    console.log('im staff lang error' + error)
    console.tron.log('im staff lang error' + error)
    yield put(ProviderActions.sendStaffLanguageFailure(error))
  }
}

export function * sendConfigTypeRequest (api) {
  const response = yield call(api.getConfig, data)

  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.sendConfigTypeSuccess(data))
  } else {
    var error = response.problem
    console.log('im Config error' + error)
    console.tron.log('im Config error' + error)
    yield put(ProviderActions.sendConfigTypeFailure(error))
  }
}

export function * sendDoctorDetailRequest (api, {data}) {
  const response = yield call(api.getDoctorDetail, data)

  if (response.ok) {
    var data = response.data
    yield put(ProviderActions.sendDoctorDetailSuccess(data))
  } else {
    var error = response.problem
    console.log('im doctor detail error' + error)
    console.tron.log('im doctor detail error' + error)
    yield put(ProviderActions.sendDoctorDetailFailure(error))
  }
}
