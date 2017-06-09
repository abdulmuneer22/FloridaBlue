import { call, put } from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import LoginActions from '../Redux/LoginRedux'
import MyPlanActions from '../Redux/MyPlanRedux'
import HsaActions from '../Redux/HsaRedux'
import SupportActions from '../Redux/SupportRedux'

// attempts to login
export function * member (api, {smToken}) {
  //    api.setsmTokenHeaders(smToken)

  const response = yield call(api.getMember)
  console.tron.log('MEMBER')
  if (response.status == '200') {
    // dispatch success
    var Name = response.data.data.firstName
    var defaultContract = response.data.data.defaultContract
    var visibilityRules = response.data.data.visibilityRule
    var termsOfUse = response.data.data.visibilityRule.termsOfUse
    var claimsRule = response.data.data.visibilityRule.claims
    var benefitsRule = response.data.data.visibilityRule.benefitss
    var hsaTrue = response.data.data.visibilityRule.hsa
    var opd = response.data.data.visibilityRule.opd
    var financialProduct = response.data.data.defaultContract.financialProduct
    var visibleDashboard = response.data.data.visibleDashboard
    var isIndividualContract = response.data.data.visibilityRule.isIndividualContract
    var logoutUrl = response.data.data.logoutUrl
    console.tron.log('visibleDashboard', visibleDashboard)
    console.tron.log('financialProduct4' + financialProduct)
    console.tron.log('termsOfUse' + termsOfUse)
    var data = {
      'firstName': response.data.data.firstName,
      'lastName': response.data.data.lastName,
      'contractNumber': response.data.data.defaultContract.contractNumber,
      'pdfBenefit': response.data.data.visibilityRule.pdfBenefit,
      'dob': response.data.data.dob,
      'claimsRule': response.data.data.visibilityRule.claims,
      'benefitsRule': response.data.data.visibilityRule.benefits,
      'isIndividualContract': isIndividualContract
    }

    var dobArray = response.data.data.dob.split('-')
    var memberSearchRequest = {
      'memberContractNo': response.data.data.defaultContract.hccId,
      'memberFirstName': response.data.data.firstName,
      'memberLastName': response.data.data.lastName,
      'memberGender': response.data.data.defaultContract.gender,
      'memberDateOfBirthYear': dobArray[2],
      'memberDateOfBirthMonth': dobArray[0],
      'memberDateOfBirthDay': dobArray[1]
    }
    console.tron.log(memberSearchRequest)
    yield put(SupportActions.supportRequest())
    yield put(MyPlanActions.myplanRequest(data))
    if (hsaTrue && financialProduct != null) {
      yield put(HsaActions.hsaRequest(financialProduct))
    }
    yield put(MemberActions.memberSuccess(Name, termsOfUse, visibilityRules, visibleDashboard, defaultContract, logoutUrl, memberSearchRequest))
  } else {
    console.tron.log('failure ')
    console.tron.log(response)
    var error = response.problem
    yield put(MemberActions.memberFailure(error))
  }
}
