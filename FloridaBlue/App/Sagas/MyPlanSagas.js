import { put } from 'redux-saga/effects'
import MyPlanActions from '../Redux/MyPlanRedux'
//import axios from 'axios'
// attempts to login
export function * myplan () {

  var data =
{
  "hsaamount" :{
    "currentBalance": "10000",
    "yearToDateContribution": "2000",
    "yearToDateDistribution": "2000"
},
"plan":{
  "planName":"Blue Options PPO"
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
  },
  "DoctorServices":{
    "InNetwork":{
      "physicianservices":"20",
      "Specialist":"40",
      "physician":"200",
      "specialists":"400"
    },
    "OutNetwork":{
      "familyphysician":"20%",
      "Specialist":"40%",
      "family":"20%",
      "specialists":"40%"
    }
  }
}



   yield put(MyPlanActions.myplanSuccess(data))

   }
