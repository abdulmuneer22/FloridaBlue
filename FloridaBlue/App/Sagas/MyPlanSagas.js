import { put } from 'redux-saga/effects'
import MyPlanActions from '../Redux/MyPlanRedux'
//import axios from 'axios'
// attempts to login
export function * myplan () {
console.log("I am coming from myplan")
  var data =
{
  "hsaamount" :{
    "currentBalance": "10000",
    "yearToDateContribution": "2000",
    "yearToDateDistribution": "2000"
},
"annualDeductible": {
    "benefitValue": "50",
    "usedDeductible": "22",
    "remainingValue":28,
    "coverageType": "Individual/Family"
  },
  "oop": {
    "benefitValue": "50",
    "usedOOP": "33",
    "remainingValue":17,
    "coverageType":"“Individual/Family"
  }
}



   yield put(MyPlanActions.myplanSuccess(data))

   }
