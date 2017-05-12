import { call, put} from 'redux-saga/effects'

import RegistrationActions from '../Redux/RegistrationRedux'
// request to regiter

var getReasonMessage = function (status) {
  let messages = {
    '000': 'Success',
    '-1000': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '002': "Looks like you're already signed up. Enter your User ID and Password to log in.",
    '004': "Oops! We can't find you in our system based on your response. Click Support for help.",
    '005': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '006': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '007': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '008': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '009': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '011': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '013': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '014': "Oops! Looks like you've tried to log in one too many times. Click Support for help.",
    '015': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '018': 'Having trouble? For help, please click Support below.',
    '020': 'Oops! You must be at least 18 to use this app. Check your birthday and try again.',
    '032': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '034': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '035': "Oops! Looks like you've entered an invalid code. Please try again, or click Support for help.",
    '036': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '037': "Oops! Looks like that's not a valid User ID. Please try again or click Hints  for help.",
    '038': "Oops! Looks like that's not a valid Password. Please try again or click Hints for help.",
    '040': 'Oops! Looks like that user ID is already registered. Please choose another one.',
    '041': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '042': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '043': "Oops! Looks like that's not a valid email address. Please try again.",
    '046': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '048': 'Oops! Your security answers must be different from your hints. Please try again.',
    '049': 'Oops! Looks like you used invalid characters for your security hints. Click Helpful Hints for more info.',
    '050': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '052': 'Please head to floridablue.com or bluemedicarefl.com to sign up for your member account.',
    '053': 'Please head to floridablue.com or bluemedicarefl.com to sign up for your member account.',
    '021': 'Please head to floridablue.com or bluemedicarefl.com to sign up for your member account.',
    '055': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '056': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '057': "Oops! Looks like we`re having trouble with your request. Please try again later.",
    '999': "Oops! Looks like we`re having trouble with your request. Please try again later."
  }

  console.tron.log(status)
  console.tron.log('im status' + status)
  var message = messages[status]

  return (message)
}

export function * sendIdentificationRequest (api, {data}) {
  const response = yield call(api.postIdentification, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.identificationStatus = data.reasonCode
    data.identificationStatusMessage = getReasonMessage(data.identificationStatus)
    console.tron.log(data)
    console.tron.log(data)
    console.tron.log('im reason code' + data.reasonCode)
    console.tron.log(data.reasonCode)
    yield put(RegistrationActions.sendIdentificationSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999',
      'identificationStatusMessage': 'Oops! Looks like we`re having trouble with your request. Please try again later.'
    }
   // data.identificationStatusMessage = getReasonMessage(data.indentificationStatus)
    console.tron.log(data)
    yield put(RegistrationActions.sendIdentificationFailure(data))
  }
}

export function * sendPersonalInformationRequest (api, {data}) {
  const response = yield call(api.postPersonalInformation, data)

  if (response.ok) {
    var error = null
    var data = response.data
    console.tron.log(response.data)
    data.personalInformationStatus = data.reasonCode
    data.personalInformationStatusMessage = getReasonMessage(data.personalInformationStatus)
    console.tron.log(data)
    yield put(RegistrationActions.sendPersonalInformationSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999',
      'identificationStatusMessage': 'Oops! Looks like we`re having trouble with your request. Please try again later.'
    }
    // data.personalInformationStatusMessage = getReasonMessage(data.personalInformationStatus)

    yield put(RegistrationActions.sendPersonalInformationFailure(data))
  }
}

export function * sendRegistrationCodeRequest (api, {data}) {
  const response = yield call(api.postRegistrationCode, data)
  console.tron.log(response)
  var sendData = data
  if (response.ok) {
    var error = null
    var data = response.data
    data.registrationCodeStatus = data.reasonCode
    data.registrationCodeStatusMessage = getReasonMessage(data.registrationCodeStatus)
    console.tron.log('hey I am successfully sent code')
    if (response.data.reasonCode == '000') {
      yield put(RegistrationActions.registerUserRequest(sendData, data.token))
    }
    yield put(RegistrationActions.sendRegistrationCodeSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999',
      'identificationStatusMessage': 'Oops! Looks like we`re having trouble with your request. Please try again later.'
    }
  //  data.registrationCodeStatusMessage = getReasonMessage(data.registrationCodeStatus)
    yield put(RegistrationActions.sendRegistrationCodeFailure(data))
  }
}

export function * sendSecurityHintsRequest (api, {data}) {
  const response = yield call(api.postSecurityHints, data)

  if (response.ok) {
    var error = null
    var data = response.data
    data.securityHintsStatus = data.reasoncode
    data.securityHintsStatusMessage = getReasonMessage(data.securityHintsStatus)
    console.tron.log(data)
    yield put(RegistrationActions.sendSecurityHintsSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999',
      'identificationStatusMessage': 'Oops! Looks like we`re having trouble with your request. Please try again later.'
    }
   // data.securityHintsStatusMessage = getReasonMessage(data.securityHintsStatus)
    yield put(RegistrationActions.sendSecurityHintsFailure(data))
  }
}

export function * registerUserRequest (api, {data, token}) {
  const response = yield call(api.postRegisterUser, data, token)

  if (response.ok) {
    var error = null
    var data = response.data
    data.registerUserStatus = data.reasonCode
    data.registerUserStatusMessage = getReasonMessage(data.registerUserStatus)
    console.tron.log(data)
    yield put(RegistrationActions.registerUserSuccess(data))
  } else {
    var error = 'Invaid input provided'
    var data = {
      'identificationStatus': '999',
      'identificationStatusMessage': 'Oops! Looks like we`re having trouble with your request. Please try again later.'
    }
  //  data.registerUserStatusMessage = getReasonMessage(data.registerUserStatus)
    yield put(RegistrationActions.registerUserFailure(data))
  }
}
