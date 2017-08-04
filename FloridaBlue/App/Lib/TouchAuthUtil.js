import { Platform, NativeModules } from 'react-native'

var iOSTouchManager = NativeModules.TouchManager
var AndroidTouchManager = NativeModules.TouchManager

export function CheckTouchStatus() {
  if (Platform.OS === 'ios') {
    console.tron.log("iOS")
    iOSTouchManager.checkTouchStatus((error, iosStatus) => {
      handleTouchStatus(iosStatus)
    })
  } else {
    console.tron.log("Android")
    AndroidTouchManager.checkTouchStatus((androidStatus) => {
      handleTouchStatus(androidStatus)
    })
  }
}

export function Authenticate() {

}

export function DisableTouch() {

}

export function EnableTouch() {

}

function handleTouchStatus(touchStatus) {
  console.tron.log(touchStatus)
}
