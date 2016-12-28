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
      "physicianname":"Physician Services",
      "SpecialistName":"Specialist",
      "physicianservices":"20",
      "Specialist":"40",
      "physician":"200",
      "specialists":"400"
    },
    "OutNetwork":{
      "familyname":"Family Physician",
      "Specialistservice":"Specialist",
      "familyphysician":"20",
      "Specialist":"40",
      "family":"20",
      "specialists":"40"
    }
  }
}



   yield put(MyPlanActions.myplanSuccess(data))

   }
