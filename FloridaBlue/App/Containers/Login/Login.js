import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';

import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';


var logo =require('./logo.png')
const window = Dimensions.get('window');

import styles from './LoginStyle'

class Login extends Component{
  constructor(){
    super();
    this.state = {
      username : "",
      password : "",
      modalVisible : false
    }
  }


  _handleLogin(){
      console.log("Login fetch")
      //var username = this.state.username
      //var password = this.state.password
      //end point to do api call


  /*          fetch("https://login-unita.bcbsfl.com/Basic/Login", {
        method: "GET",
        headers: {
            'Authorization': "Basic " + btoa("username" + ":" + "password")
        }
    })
    .then((response) => response.text())
    .then((quote) => {
        AlertIOS.alert(Test)
    })
    .done();
  */




  /*
  if(!this.state.username | !this.state.password){
         alert("Please enter user name and password!")
   }else{
          axios.get('https://login-unita.bcbsfl.com/Basic/Login',{

        uid: this.state.username,
        password:this.state.password
    })
        .then((response)=>{
            console.log(response.data)
            if(response.data.loginSuccessful === true){
                this.props.navigator.push({name:'Screen_1'})
            }else{
                alert("Incorrect User Name or Password")
            }
            })
    }

  */
  var username= 'mbrunit'
  var password = 'FLBlue29'
  //const hash = new Buffer(`${username}:${password}`).toString('base64')

  //const hash='bWJydW5pdDpGTEJsdWUyOQ=='
  axios.get('https://login-unita.bcbsfl.com/Basic/Login', {
     auth: {
   username: username,
   password :password
 },

  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  }


  _moreInfo(){
    if(this.state.modalVisible === true){
      return(
        <View style={{
          backgroundColor : 'rgba(179, 189, 188, 0.3)',
          //margin : 5,
          width : window.width -10,
          height : 140,
          padding : 5,
          borderRadius : 6 ,
          flexWrap : 'wrap',
          flexDirection : 'row',
          paddingBottom : 10
        }}>

        <View style={styles.popupchild}>

        <Icon name="chevron-right" size={12} color="black" />

        <TouchableOpacity>
        <Text style={styles.popupchildText}>
         Terms of Use
        </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Privacy Policy
        </Text>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Accessibility
        </Text>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Need Help?
        </Text>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Meaningful Access
        </Text>
        </View>

        </View>
      );
    }else{
      return(
        <TouchableOpacity style={{
          height : 20,
          marginBottom:120
        }}
        onPress={()=>{this.props.navigator.push({name:'screen_1'})}}
        >
        <Text style={styles.regularText}>
        Im new Sign-up
        </Text>
        </TouchableOpacity>
      );
    }
  }
  render(){
    return(
      <View style={styles.mainContainer}>
      <View style={{flex : 1,backgroundColor : 'rgba(0,0,0,0)',justifyContent : 'center' }}>
      <View style={styles.wrapper}>
      <Image
        style={{
          width: 300,
          height: 65,
          marginBottom : 30
        }}
        source={logo}
      />
        <TextInput
        style={styles.textInput}
        onChangeText={(text) => this.setState({username : text})}
        value={this.state.username}
        placeholder="User ID"
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        />
        <TextInput
        style={styles.textInput}
        onChangeText={(text) => this.setState({password : text})}
        value={this.state.password}
        placeholder="Password"
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        underlineColorAndroid='rgba(0,0,0,0)'
        secureTextEntry={true}
        />
        <View style={styles.forgotPassword}>
        <Text style={styles.regularText}>
        Forgot your Password
        </Text>
        </View>


        <TouchableOpacity style={styles.button}
        onPress={()=>{
          this._handleLogin()
        }}>

        <Text style={styles.buttonText}>
        Log-in
        </Text>
        </TouchableOpacity>



        {
          this._moreInfo()
        }
        <TouchableOpacity style={styles.circle}
        onPress={()=>{
          if(this.state.modalVisible === true){
          this.setState({modalVisible : false})
        }else{
          this.setState({modalVisible : true})
        }
        }}
        >
        <Text style={{
          fontWeight : 'bold'
        }}>
        i
        </Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    );
  }
}

export default Login
