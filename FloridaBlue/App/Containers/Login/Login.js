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
import {Actions as NavigationActions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginActions from '../../Redux/LoginRedux'
import styles from './LoginStyle'


var logo =require('./logo.png')
const window = Dimensions.get('window');

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
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
    console.log("I am receving new props")
    if (this.isAttempting && !newProps.fetching && newProps.error === null) {
    //  NavigationActions.WelcomeDashBoard()
    console.log("HERRREEE: "+newProps.error);
        NavigationActions.WelcomeDashBoard()
    }
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
        <View style={{
          //borderColor : 'red',
          //borderWidth : 1,
          height : 140
        }}>
        <TouchableOpacity style={styles.button}
        onPress={()=>{
          this._handleLogin()


        }}>
        <Text style={styles.buttonText}>
        Log-in
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{
          height : 20,
          //borderColor : 'red',
          //borderWidth : 1,
          marginBottom : 120
        }}
        onPress={()=>NavigationActions.screen_1()}
        >

        <Text style={styles.regularText}>
        Im new Sign-up
        </Text>
        </TouchableOpacity>
        </View>
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

    <View>{this.props.error ? <Text style={{color:'red'}}>{this.props.error}</Text>:<Text></Text>}</View>
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
        Forgot your Password
        </Text>
        </View>


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
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
