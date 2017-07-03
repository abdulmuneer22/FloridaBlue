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

export function * postFCMToken (api, {data}) {
  // make the call to the api
  const response = yield call(api.postFCMToken, data)
  // success?
  if (response.ok) {
   // yield put(NotificationActions.notificationSucces())
    console.log('hey I am coming from succes', response)
  } else {
    console.log('I am coming from failure')
    const error = response.status
  //  yield put(NotificationActions.notificationFailure(error))
  }
}

export function * postArchive (api, {archiveObject}) {
  // make the call to the api
  console.log('before post', archiveObject)
  const response = yield call(api.postArchive, archiveObject)
  // success?
  if (response.ok) {
   // yield put(NotificationActions.notificationSucces())
    console.log('hey I am coming archive succes', response)
  } else {
    console.log('I am coming from archive failure')
    const error = response.status
  //  yield put(NotificationActions.notificationFailure(error))
  }
}
