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
/*
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
*/
