import { call, put } from 'redux-saga/effects'
import NotificationActions from '../Redux/NotificatonRedux'

export function * getNotfication (api) {
  // make the call to the api
  const response = yield call(api.getNotfication)
  // success?
  if (response.ok) {
    const notificaiton = response.data
    yield put(NotificationActions.notificationSucces(notificaiton))
  } else {
    const error = response.status
    yield put(NotificationActions.notificationFailure(error))
  }
}

export function * postFCMToke (api, data) {
  // make the call to the api
  const response = yield call(api.postFCMToke(data))
  // success?
  if (response.ok) {
    const notificaiton = response.data
    yield put(NotificationActions.notificationSucces(notificaiton))
  } else {
    const error = response.status
    yield put(NotificationActions.notificationFailure(error))
  }
}
