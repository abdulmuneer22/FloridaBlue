import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native';

import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions as NavigationActions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginActions from '../../Redux/LoginRedux'
import styles from './LoginStyle'
import { Images, Metrics, Colors } from '../../Themes'
//import {FlbIcon} from'./FlbIcon'
import I18n from 'react-native-i18n'

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
    if (this.isAttempting && !newProps.fetching && newProps.error === null) {
      if (newProps.responseURL == 'login') {
        NavigationActions.WelcomeDashBoard()
      } else {
        console.log("new props"+newProps.responseURL);
        NavigationActions.MyView({responseURL:newProps.responseURL})
      }
    }
  }

  /*
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
  */

  render(){
    return(
      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.logoView}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>
          <View style={styles.form}>
            <View style={styles.row}>
              <TextInput
                ref='username'
                style={styles.textInput}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => this.setState({username : text})}
                value={this.state.username}
                underlineColorAndroid={Colors.coal}
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder={I18n.t('username')} />
            </View>

            <View style={styles.row}>
              <TextInput
                ref='password'
                style={styles.textInput}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={(text) => this.setState({password : text})}
                value={this.state.password}
                underlineColorAndroid={Colors.coal}
                onSubmitEditing={() => {}}
                placeholder={I18n.t('password')} />
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={()=> NavigationActions.MyView({responseURL : 'https://registration-stga.bcbsfl.com/ecir/public/MemberFPSSelect.do'})}>
                <Text style={styles.link}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={() => {this._handleLogin()}}>
              <Image source={Images.loginButton} />
            </TouchableOpacity>
          </View>
          <View style={[styles.row, {backgroundColor: 'transparent'}]}>
            <TouchableOpacity  onPress={()=>NavigationActions.screen_1()}>
              <Text style={styles.link}>{I18n.t('signUp')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
