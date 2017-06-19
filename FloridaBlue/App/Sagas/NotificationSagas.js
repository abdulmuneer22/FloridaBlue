import { call, put } from 'redux-saga/effects'
import NotificationActions from '../Redux/NotificationRedux'

export function * getNotification (api) {
  // make the call to the api
  const response = yield call(api.getNotification)
  // success?
  if (response.ok) {
    const notification = response.data.data
    console.log('notifcation', response, notification)
    yield put(NotificationActions.notificationSuccess(notification))
  } else {
    const error = response.status
    yield put(NotificationActions.notificationFailure(error))
  }
}

export function * postFCMToken (api, data) {
  // make the call to the api
  const response = yield call(api.postFCMToken(data))
  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationSucces())
  } else {
    const error = response.status
    yield put(NotificationActions.notificationFailure(error))
  }
}
