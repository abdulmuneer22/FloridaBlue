import { call, put} from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import LoginActions from '../Redux/LoginRedux'
import MyPlanActions from '../Redux/MyPlanRedux'
import HsaActions from '../Redux/HsaRedux'
import SupportActions from '../Redux/SupportRedux'
// attempts to login
export function * member (api, {smToken}) {
  //    api.setsmTokenHeaders(smToken)

  const response = yield call(api.getMember)
  console.log(JSON.stringify(response))
  if (response.data.status.code == '200') {
    // dispatch success
    var Name = response.data.data.firstName
    var visibilityRules = response.data.data.visibilityRule
    var termsOfUse = response.data.data.visibilityRule.termsOfUse
    var claimsRule = response.data.data.visibilityRule.claims
    var benefitsRule =response.data.data.visibilityRule.benefits
    var hsaTrue=response.data.data.visibilityRule.hsa
    console.log('financialProduct4' +financialProduct)
    console.log('termsOfUse' + termsOfUse)
    var data = {
            "firstName": response.data.data.firstName,
            "lastName": response.data.data.lastName,
            "contractNumber": response.data.data.defaultContract.hccId,
            "memberID": response.data.data.memberId,
            "dob": response.data.data.dob,
            "claimsRule":response.data.data.visibilityRule.claims,
            "benefitsRule":response.data.data.visibilityRule.benefits
           }
    if (hsaTrue && financialProduct != null) {
      yield put(HsaActions.hsaRequest(financialProduct))
    }
    yield put(MyPlanActions.myplanRequest(data))
    if(hsaTrue && financialProduct!=null){
        yield put(HsaActions.hsaRequest(financialProduct))
    }
    yield put(MemberActions.memberSuccess(Name, termsOfUse, visibilityRules))
  } else {
    console.log('failure ')
     var error = '99'
    yield put(MemberActions.memberFailure(error))
  }
}
