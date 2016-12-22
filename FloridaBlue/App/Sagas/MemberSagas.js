import { put } from 'redux-saga/effects'
import MemberActions from '../Redux/MemberRedux'
import axios from 'axios'
// attempts to login
export function * member () {
  var userName = "" ;
  axios.get('http://localhost:9000/members')
   .then((response)=>{
     console.log(response.data)
     console.log(response.status)
     console.log(response.headers)
     userName = response.data.firstName+response.data.lastName ;
     //var data = response.data
     /*
     if(data.status === 'Success') {
     //  alert('Success!')
     } else {
       alert(data.message)
     }*/
   })
   .catch(function (error) {
     if(error.response) {
       console.log(error.response.data)
       console.log(error.response.status)
       console.log(error.response.headers)
     }
   })

   yield put(MemberActions.memberSuccess("John Smith"))

   }
