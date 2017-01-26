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
  Modal,
  ScrollView
} from 'react-native';

import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions as NavigationActions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginActions from '../../Redux/LoginRedux'
import styles from './LoginStyle'
import {Images} from '../../Themes'
//import {FlbIcon} from'./FlbIcon'




const goToWebView = () => NavigationActions.MyView({text: 'Hello World!'});
var logo =require('./logo.png')
const window = Dimensions.get('window');

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void,
  responseURL : string
}



class Login extends Component{
   props: LoginScreenProps
   isAttempting : boolean

  constructor(){
    super();
    this.state = {
      username : "",
      password : "",
      modalVisible : false
    }

      this.isAttempting = false
  }

  _handleLogin(){

var username = this.state.username
var password = this.state.password

if(!this.state.username | !this.state.password){
       alert("Please enter user name and password!")
 }else{
   //const { username, password } = this.state
 this.isAttempting = true
 // attempt a login - a saga is listening to pick it up from here.
 this.props.attemptLogin(username, password)
}

}




componentWillReceiveProps (newProps) {
    this.forceUpdate()
      // Did the login attempt complete?
    console.log("I am receving new props" + newProps.responseURL)
  //  if (this.isAttempting && !newProps.fetching && newProps.error === null) {
      //if (newProps.responseURL == 'login') {
        //NavigationActions.WelcomeDashBoard()
        NavigationActions.MyView({responseURL:'https://mwe-stga.bcbsfl.com/wps/myportal/mbs'})
    //  } else {
    //    console.log("new props"+newProps.responseURL);
    //    NavigationActions.MyView({responseURL:newProps.responseURL})
    //  }
  //  }
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

        <TouchableOpacity onPress={()=> NavigationActions.MyView({responseURL : 'https://www.floridablue.com/terms-of-use'})}>

        <Text style={styles.popupchildText}>
         Terms of Use
        </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <TouchableOpacity
          onPress={()=> NavigationActions.MyView({responseURL : 'https://www.floridablue.com/internet-privacy-statement'})}>
        <Text style={styles.popupchildText}>
         Privacy Policy
        </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />

        <TouchableOpacity
          onPress={()=> NavigationActions.MyView({responseURL : 'https://www.floridablue.com/general/web-accessibility'})}>
        <Text style={styles.popupchildText}>
         Accessibility
        </Text>
        </TouchableOpacity>

        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <TouchableOpacity
          onPress={()=> NavigationActions.MyView({responseURL : 'https://www.floridablue.com/general/web-accessibility'})}>
        <Text style={styles.popupchildText}>
         Need Help?
        </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <TouchableOpacity
          onPress={()=> NavigationActions.MyView({responseURL : 'https://www.floridablue.com/general/web-accessibility'})}>
        <Text style={styles.popupchildText}>
         Meaningful Access
        </Text>
        </TouchableOpacity>
        </View>

        </View>
      );
    }else{
      return(
        <View style={{
          //borderColor : 'red',
          //borderWidth : 1,
          height : 140
        }}>
        <TouchableOpacity
        onPress={()=>{
          this._handleLogin()
        }}>
        <Image
        source={Images.loginIn}
        resizeMode="stretch"
        style={styles.button}
        />

        </TouchableOpacity>

        <TouchableOpacity style={{
          height : 20,
          //borderColor : 'red',
          //borderWidth : 1,
          marginBottom : 120
        }}
        onPress={()=>NavigationActions.screen_1()}
        >

        <Text style={styles.regularTex}>
        Im new Sign-up

        </Text>
        </TouchableOpacity>
        </View>
      );
    }
  }
  render(){
    return(

    <View style={{flex : 1, justifyContent : 'center' }}>

      <View style={styles.wrapper}>

      <Image
        style={{
          width: 300,
          height: 100,
          marginBottom : 30
        }}
        source={Images.clouds}
        resizeMode="stretch"
      >
      <Image
        style={{
          width: 300,
          height: 100,
          marginBottom : 30
        }}
        source={Images.logInlog}
        resizeMode="stretch"
      />
</Image>
</View>


    <View style={styles.logincard}>
     <View>{this.props.error ? <Text style={{color:'red'}}>{this.props.error}</Text>:<Text></Text>}
     </View>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => this.setState({username : text})}
        value={this.state.username}
        placeholder="User ID"
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardType='default'
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
        Forgot User ID/Password
        </Text>
        </View>
        </View>

        <View style={{flex : 1, justifyContent : 'center' ,backgroundColor:'white'}}>
        <View style={styles.wrapper}>
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

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    responseURL : state.login.responseURL
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
