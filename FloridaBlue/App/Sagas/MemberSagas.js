import { call, put } from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import LoginActions from '../Redux/LoginRedux'
import MyPlanActions from '../Redux/MyPlanRedux'
import HsaActions from '../Redux/HsaRedux'
import SupportActions from '../Redux/SupportRedux'
import ClaimsActions from '../Redux/ClaimsRedux'
import MyIdCardActions from '../Redux/MyIdCardRedux'

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
    var idCardRequest = getIdCardRequest(defaultContract)
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
    
    yield put(MyIdCardActions.myIdCardRequest(idCardRequest))
    console.tron.log(memberSearchRequest)
    yield put(SupportActions.supportRequest())
    yield put(ClaimsActions.claimsSummaryRequest())
    yield put(ClaimsActions.claimsListRequest())
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

export function getIdCardRequest(defaultContract){
    let idRequest = {
      "BCNumber": null,
      "BSNumber": null,
      "FirstName": "KRISHNA",
      "GroupDivisionNumber": "ZBL",
      "GroupID": "99999",
      "GroupName": "NON-QHP INDIVIDUAL UNDER65 ESS",
      "HccID": "H89133887",
      "LOB": "IBO",
      "LastName": "RAMA",
      "MemberID": "11250075218",
      "MiddleName": null,
      "PlanCode": "1409",
      "PlanDisplayName": null,
      "PlanOption": "BLUEOPTIONS SN/FM PLAN 1409-R3",
      "RXBIN": "012833",
      "RXPCN": "FLBC",
      "SourceSystem": "NASCO",
      "hasHMOProduct": false,
      "isActive": true,
      "isBaptistGroup": false,
      "isBlueCare": false,
      "isBlueChoice": false,
      "isBlueOptions": true,
      "isBlueSelect": false,
      "isCityofJaxGroup": false,
      "isDentalOnlyContract": false,
      "isEmployeeGroup": false,
      "isFederalOnExchange": false,
      "isGatorCareGroup": false,
      "isGroup": false,
      "isHMO": false,
      "isHMOInd": false,
      "isHSA": true,
      "isHealthProduct": true,
      "isIndividualContract": true,
      "isIndividualGroup": true,
      "isIntegratedDentalContract": false,
      "isLargeGroupTraditional": false,
      "isLifeOnly": false,
      "isMedicarePartD": false,
      "isMedicareSupplemental": false,
      "isNASCOEnrolledMemberContract": true,
      "isNaplesGroup": false,
      "isO65MBSP": false,
      "isO65MBSPMIPPA": false,
      "isO65MBSPMedAdvantage": false,
      "isOver65": false,
      "isOver65BlueMedicareHMOCSNPPreferred": false,
      "isOver65BlueMedicareHMOLifeTime": false,
      "isOver65BlueMedicareHMOMyTime": false,
      "isOver65BlueMedicareHMOMyTimePlus": false,
      "isOver65BlueMedicareHMOMyTimePreferred": false,
      "isOver65BlueMedicareHMOMyTimeSelect": false,
      "isOver65BlueMedicareHMOPreferredPOS": false,
      "isOver65BlueMedicareHMOPrimeTime": false,
      "isOver65BlueMedicarePPO": false,
      "isOver65BlueMedicareRegionalPPO": false,
      "isOver65BlueMedicareSupplement": false,
      "isOver65BlueMedicareSupplementSelect": false,
      "isOver65MedicareAdv": false,
      "isOver65MedicareAdvantage": false,
      "isOver65MedicarePartD": false,
      "isOver65MedicareSupp": false,
      "isOver65MedicareSupplement": false,
      "isPharmacyProduct": true,
      "isSmallGroupTraditional": false,
      "isStateGroup": false,
      "isSubscriber": true,
      "isTraditional": false
    }

    return idRequest;
}
