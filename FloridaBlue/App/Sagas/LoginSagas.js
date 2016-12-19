import { put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import axios from 'axios'
// attempts to login
export function * login ({ username, password }) {
  var username = username
  var password = password
  axios.get('http://localhost:9000/login', {
      auth: {
    username: username,
    password :password
  },
   })
   .then((response)=>{

     console.log(response.data)
     console.log(response.status)
     console.log(response.headers)
     var data = response.data
     if(data.status === 'Success') {
     //  alert('Success!')
     } else {
       alert(data.message)
     }
     NavigationActions.WelcomeDashBoard()
   })
   .catch(function (error) {
     if(error.response) {
       console.log(error.response.data)
       console.log(error.response.status)
       console.log(error.response.headers)
     }

   })


   console.log("I am coming from login ");
   yield put(LoginActions.loginSuccess(username))

   }
