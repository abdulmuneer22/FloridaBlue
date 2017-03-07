// a library to wrap and simplify api calls
import apisauce from 'apisauce'
global.Buffer = global.Buffer || require('buffer').Buffer

const APP_ID = '1001'

// our "constructor"
const create = (baseURL = 'https://mobapi-stga.bcbsfl.com/mob/api/v1/') => {
// const create = (baseURL = 'http://localhost:9000/mob/api/v1/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 60000
  })

  const naviMonitor = (response) => console.log('hey!  listen! ', response)
  api.addMonitor(naviMonitor)

  // Force OpenWeather API Key on all requests

  api.addRequestTransform((request) => {
    console.log('hey ther I am ' + JSON.stringify(request))
  })

  // Wrap api's addMonitor to allow the calling code to attach
  // additional monitors in the future.  But only in __DEV__ and only
  // if we've attached Reactotron to console (it isn't during unit tests).
  if (__DEV__ && console.tron) {
    api.addMonitor(console.tron.apisauce)
  }

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  /*
  const setHeaders = (username, password) => api.setHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(username + ":" + password)
  }) */

  const getUser = (username, password) => api.get('/login', {}, {
    'auth': {
      'username': username,
      'password': password
    }
  }
)
  const setsmTokenHeaders = (smToken) => api.setHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'set-cookie': smToken
  })

  const getMember = () => api.get('/members')
  const getPlan = (data) => api.post('/benefits',data.input)
  const getTOU = () => api.get('/tou')
  const getSupport = () => api.get('/support')
  const getHsa = () => api.get('/hsa/financialProduct/:financialProduct')
  const getLogout = () => api.get('logout.fcc')
  const putTou = () => api.put('/tou')

  const postIdentification = (data) => api.post('/identifications', {
    'User': {
      'applicationId': APP_ID,
      'contractnumber': data.contractNumber,
      'transactionId': data.contractNumber,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'dob': data.dateOfBirth,
      'zip': data.zipCode
    }
  })

  const postPersonalInformation = (data) => api.post('/codes', {
    'SendRegistrationCode': {
      'applicationId': APP_ID,
      'transactionId': data.contractNumber,
      'contractnumber': data.contractNumber,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'dob': data.dateOfBirth,
      'zip': data.zipCode,
      'token': data.token,
      'userid': data.createUserId,
      'password': data.password,
      'email': data.confirmEmail,
      'emailupdated': 'true',
      'eobOptin': data.commElect
    }
  })

  const postRegistrationCode = (data) => api.post('/codes/verifications', {
    'VerifyRegcode': {
      'applicationId': APP_ID,
      'transactionId': data.contractNumber,
      'contractnumber': data.contractNumber,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'dob': data.dateOfBirth,
      'zip': data.zipCode,
      'token': data.token,
      'code': data.enterCode
    }
  })

  const postSecurityHints = (data) => api.post('/hints', {
    'Hints': {
      'transactionId': data.contractNumber,
      'userID': data.createUserId,
      'hint1': data.securityHint1,
      'ans1': data.securityAnswer1,
      'hint2': data.securityHint2,
      'ans2': data.securityAnswer2,
      'hint3': data.securityHint3,
      'ans3': data.securityAnswer3

    }
  })

  const postRegisterUser = (data) => api.post('/registrations', {
    'RegisterUser': {
      'applicationId': APP_ID,
      'transactionId': data.contractNumber,
      'contractnumber': data.contractNumber,
      "dob": data.dateOfBirth,
      "email": data.email,
      "emailupdated": data.emailUpdated,
      "eobOptin": data.commElect,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "userid": data.createUserId,
      "password": data.password,
      "zip": data.zipCode,
      'token': data.token,
      'emailupdated': 'true'
    }
  })


  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getLogout,
    getUser,
    setsmTokenHeaders,
    getMember,
    getPlan,
    getSupport,
    postIdentification,
    postPersonalInformation,
    postRegistrationCode,
    postRegisterUser,
    postSecurityHints,
    getTOU,
    putTou
  }
}

// let's return back our create method as the default.
export default {
  create
}
