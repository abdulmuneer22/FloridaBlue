import { put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import axios from 'axios'
// attempts to login
export function * login ({ username, password }) {
  var username = username
  var password = password
  console.log(username, password)
  //process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"
  axios.get('https://login-unita.bcbsfl.com/Basic/Login', {
      auth: {
        username: username,
        password :password
      },
      maxRedirects: 0
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

   })
  .catch(function (error) {
    console.log(error)
    /*
    var response = error.response
    console.log(response);
    // Read JSON response
    var httpStatusCode = response.status
    var status = response.headers.location

    // Check for login status
    var pattern = /Success/;
    if(pattern.test(status)) {
      console.log("Login Successful")
      // Grab SiteMinder Token
      var cookieItems = response.headers['set-cookie']
      cookieItems.forEach(function(item) {
        var pattern = /^SMSESSION/;
    if(pattern.test(item)) {
          console.log(item)
          var elements = item.split(';')
          var smToken = elements[0]
          var smToken = smToken.replace('SMSESSION=', '')
          console.log(smToken)
        }
      })
    }
    else {
      console.log("Login Failed")
    }
    */

   })


   console.log("I am coming from login ");
   yield put(LoginActions.loginSuccess(username))

   }
