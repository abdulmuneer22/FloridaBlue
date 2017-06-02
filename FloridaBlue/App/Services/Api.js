// a library to wrap and simplify api calls
import apisauce from 'apisauce'
var urlConfig = require('../UrlConfig')
global.Buffer = global.Buffer || require('buffer').Buffer

const APP_ID = '1001'

// our "constructor"
const create = (baseURL = urlConfig.mobApiUrl) => {
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
      'Cache-Control': 'no-cache',
      'Accept': 'text/html,application/json'
    },
    // 10 second timeout...
    timeout: 60000
  })

  const naviMonitor = (response) => console.tron.log('hey!  listen! ', response)
  api.addMonitor(naviMonitor)

  // Force OpenWeather API Key on all requests

  api.addRequestTransform((request) => {
    console.tron.log('hey ther I am ', request)
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
/*
  const setsmTokenHeaders = (smToken) => api.setHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  */

  const getMember = () => api.get('/members')
  const getPlan = (data) => api.post('/benefits', data.input)
  const getTOU = () => api.get('/tou')
  const getSupport = () => api.get('/support')
  const getMyIdCard = () => api.get('/support')
  const getHsa = (financialProduct) => api.get('/hsa/financialProduct/' + financialProduct)
  const getLogout = () => api.get('')
  const putTou = () => api.get('/termsOfUse')
  const getConfig = () => api.get('/opd/config')
  const getClaimDetail = (claimid) => api.get('claims/detail/' + claimid)

  const getStaffLanguage = (data) => api.post('/opd/languages', {
    'language': 'EN',
    'who': 'staff'
  })

  const getDoctorLanguage = (data) => api.post('/opd/languages', {
    'language': 'EN',
    'who': 'doctor'
  })

  const getDoctorDetail = (data) => api.post('/opd/details', {
    'language': 'EN',
    'providerKey': data && data.providerKey,
    'addressKey': data && data.addressKey,
    'networkList': data.networkCodeList,
    'planCode': ''
  })

  const getCareTypes = (data) => api.post('/opd/types', {
    'language': 'EN',
    'planCode': ''
  })

  const getSpecialityTypes = (selectedCategoryCode) => api.post('/opd/specialty', {
    'language': 'EN',
    'planCode': '',
    'categoryCode': selectedCategoryCode
  })

  const postNetworkList = (data) => api.post('/opd/networks', {
    'language': 'EN'
  })

  const postProviderSearch = (data) =>
    api.post('/opd/search', {
      'language': 'EN',
      'planCode': '',
      'start': data && data.start ? data.start : 1,
      'end': data && data.end ? data.end : 30,
      'categoryCode': data && data.categoryCode ? data.categoryCode : '',
      'searchRange': data && data.searchRange ? data.searchRange : 50,
      'address': data && data.address ? data.address : '',
      'sortColumn': 'PROGRAM',
      'sortType': 'ASCENDING',
      'subCategoryCode': data && data.subCategoryCode ? data.subCategoryCode : '',
      'originLatitude': data.latitude,
      'originLongitude': data.longitude,
      'zipCode': 0,
      'state': '',
      'city': '',
      'county': '',
      'acceptingPatientsIndicator': data && data.acceptingPatientsIndicator && data.acceptingPatientsIndicator.selectedPatientType ? data.acceptingPatientsIndicator.selectedPatientType : '',
      'programsList': data && data.programsList && data.programsList.selectedProgramType ? data.programsList.selectedProgramType : '',
      'networkList': data.networkCodeList,
      'providerLanguage': data && data.providerLanguage && data.providerLanguage.selectedDoctorLanguage ? data.providerLanguage.selectedDoctorLanguage : '',
      'providerName': data.providerName,
      'providerFirstName': '',
      'staffLanguage': data && data.staffLanguage && data.staffLanguage.selectedStaffLanguage ? data.staffLanguage.selectedStaffLanguage : '',
      'gender': data && data.gender ? data.gender : '',
      'officeHours': data && data.officeHours && data.officeHours.selectedTime ? data.officeHours.selectedTime : '',
      'hospitalAffiliation': '',
      'providerNumber': '',
      'medicalGroup': '',
      'inIpa': '',
      'ipaNumber': '',
      'pharmacyType': '',
      'extendedSupply': '',
      'open24Hours': false,
      'saveLocation': '',
      'hospitalOption': '',
      'networksFlag': false,
      'memberSearchRequest': {}
    }
  )

  const postPharmacySearch = (data) => api.post('/opd/pharmacy/search', {
    'language': 'EN',
    'planCode': '',
    'start': 1,
    'end': 25,
    'searchRange': data && data.searchRange ? data.searchRange : 50,
    'address': data && data.address ? data.address : '',
    'sortColumn': 'DISTANCE',
    'sortType': 'ASCENDING',
    'originLatitude': data.latitude,
    'originLongitude': data.longitude,
    'zipCode': 0,
    'state': '',
    'city': '',
    'county': '',
    'acceptingPatientsIndicator': data && data.acceptingPatientsIndicator && data.acceptingPatientsIndicator.selectedPatientType ? data.acceptingPatientsIndicator.selectedPatientType : '',
    'programsList': data && data.programsList && data.programsList.selectedProgramType ? data.programsList.selectedProgramType : '',
    'networkList': data.networkCodeList,
    'providerLanguage': data && data.providerLanguage && data.providerLanguage.selectedDoctorLanguage ? data.providerLanguage.selectedDoctorLanguage : '',
    'providerName': data.providerName,
    'providerFirstName': '',
    'staffLanguage': data && data.staffLanguage && data.staffLanguage.selectedStaffLanguage ? data.staffLanguage.selectedStaffLanguage : '',
    'gender': data && data.gender ? data.gender : '',
    'officeHours': data && data.officeHours && data.officeHours.selectedTime ? data.officeHours.selectedTime : '',
    'hospitalAffiliation': '',
    'providerNumber': '',
    'medicalGroup': '',
    'inIpa': '',
    'ipaNumber': '',
    'pharmacyType': '',
    'extendedSupply': '',
    'open24Hours': false,
    'saveLocation': '',
    'hospitalOption': '',
    'networksFlag': false,
    'memberSearchRequest': data.member.memberSearchRequest
  }
  )

  const postUrgentSearch = (data) => api.post('/opd/urgent/search', {
    'language': 'EN',
    'planCode': '',
    'start': 1,
    'end': data && data.end ? data.end : 30,
    'address': data && data.address ? data.address : '',
    'originLatitude': data.latitude,
    'originLongitude': data.longitude,
    'networkList': data.networkCodeList
  }
  )

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
    'hint1': data.securityHint1,
    'ans1': data.securityAnswer1,
    'hint2': data.securityHint2,
    'ans2': data.securityAnswer2,
    'hint3': data.securityHint3,
    'ans3': data.securityAnswer3
  })

  const postRegisterUser = (data, token) => api.post('/registrations', {
    'RegisterUser': {
      'applicationId': APP_ID,
      'transactionId': data.contractNumber,
      'contractnumber': data.contractNumber,
      'dob': data.dateOfBirth,
      'email': data.email,
      'emailupdated': data.emailUpdated,
      'eobOptin': data.commElect,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'userid': data.createUserId,
      'password': data.password,
      'zip': data.zipCode,
      'token': token,
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
    getMember,
    getPlan,
    getSupport,
    postNetworkList,
    postProviderSearch,
    postPharmacySearch,
    postUrgentSearch,
    postIdentification,
    postPersonalInformation,
    postRegistrationCode,
    postRegisterUser,
    postSecurityHints,
    getTOU,
    putTou,
    getHsa,
    getMyIdCard,
    getDoctorLanguage,
    getStaffLanguage,
    getDoctorDetail,
    getCareTypes,
    getSpecialityTypes,
    getConfig,
    getClaimDetail
  }
}

// let's return back our create method as the default.
export default {
  create
}
