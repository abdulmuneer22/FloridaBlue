import React, { Component } from 'react'
import {
  Alert,
  Text,
  View,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Image,
  Navigator,
  Modal,
  Dimensions,
  BackAndroid,
  TouchableWithoutFeedback
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var RCTNetworking = require('RCTNetworking')
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import MemberActions from '../../Redux/MemberRedux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import SupportActions from '../../Redux/SupportRedux'
import styles from './LoginStyle'
import { Images, Metrics, Colors } from '../../Themes'
// import {FlbIcon} from'./FlbIcon'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import LoginView from './LoginView'
import LoginButtonView from './LoginButtonView'
import LogoView from './LogoView'
import SignUpView from './SignUpView'
import Clouds from './Clouds'
import CityScape from './CityScape'

const goToWebView = () => NavigationActions.MyView({text: 'Hello World!'})
var logo = require('./logo.png')
const window = Dimensions.get('window')

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void,
  responseURL : string,
  smToken : string,
  termsOfUse : boolean,
  attemptMyPlan :() => void,
  attemptMember :() => void,
  attemptSupportScreen :() => void,
  merror :string,
  handleChangeUserName :() => any,
  passhandleChangePasswordword :() => any,
  clearLogin:() => void,
  visibleDashboard : boolean
}

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class Login extends Component {
  props: LoginScreenProps
  isAttempting : boolean

  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      modalVisible: false
    }

    this.isAttempting = false
  }

  _handleLogin () {
    // clearing local cookies before going to PMI
    RCTNetworking.clearCookies((cleared) => {})
    Keyboard.dismiss()
    var username = this.props.username
    var password = this.props.password

    if (!username && !password) {
      Alert.alert('Login', 'Please enter your User ID/Password.', [
        {
          text: 'OK'
        }
      ])
     // alert('Please enter your user ID/Password.')
    } else
    if (!username && password) {
      Alert.alert('Login', 'Please enter your user ID', [
        {
          text: 'OK'
        }
      ])
    } else
    if (username && !password) {
      Alert.alert('Login', 'Please enter your Password.', [
        {
          text: 'OK'
        }
      ])
    } else {
        // const { username, password } = this.state
      this.isAttempting = true
        // attempt a login - a saga is listening to pick it up from here.
      this.props.attemptLogin(username, password)
    }
  }

  componentDidMount () {
    this.props.clearLogin()
    RCTNetworking.clearCookies((cleared) => {
      console.log('clearing local cookies for the app')
    })

    BackAndroid.addEventListener('hardwareBackPress', function () {
      console.log('android back')
 // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
 // Typically you would use the navigator here to go to the last state.

      return true
    })
  }

  componentWillReceiveProps (newProps) {
   // this.forceUpdate()   makes to rerender the stuff     Got the issue of redering
  // Did the login attempt complete?

    console.log('I am receving new props' + newProps.responseURL)
    console.log('I am receving new smToken' + newProps.smToken)
    var responseURL = newProps.responseURL
    if (this.props != newProps) {
      if (this.isAttempting && !newProps.fetching && newProps.error === null && responseURL) {
   // if (this.props.responseURL != newProps.responseURL) {
      // login path
        if (responseURL == 'login') {
          if (!newProps.mfetching) {
            if (!newProps.merror) {
              // Need to work on the applicaiton

              if (newProps.termsOfUse) {
                if (newProps.visibleDashboard) {
                  NavigationActions.WelcomeDashBoard()
                } else {
                  NavigationActions.ErrorPage()
                }
              } else {
                NavigationActions.Termsofuse({'origin': 'login'})
              }
            } else {
              NavigationActions.ErrorPage()
            }
          }
        } else if (responseURL.includes('updateSecurityHintsAnswers')) {
          NavigationActions.screen_4({'username': this.props.username})
        // Unauthorized User
        } else if (responseURL.includes('mob/error/accessdenied')) {
          RCTNetworking.clearCookies((cleared) => {
            console.log('clearing local cookies for the app')
          })
          this.props.attemptLogout()
          Alert.alert('Login', 'Please use your user ID and password to log in. You must be a Florida Blue member.',
            [
              {
                text: 'OK'
              }
            ])

        // Disabled Account
        } else if (responseURL.includes('apsparam=usrlocked')) {
          RCTNetworking.clearCookies((cleared) => {
            console.log('clearing local cookies for the app')
          })
          this.props.attemptLogout()

          Alert.alert('Login', 'Your account is locked.  Click Support for help', [
            {
              text: 'OK',
              onPress: () => NavigationActions.MyView({
                responseURL: newProps.responseURL + '?channel=mobile'
              })
            }
          ])

        // Password About to Expire
        } else {
          this.props.clearLogin()
          if (responseURL.includes('updatePassword.do')) {
            Alert.alert('Login', 'You must change your password now.', [
              {
                text: 'OK',
                onPress: () => NavigationActions.MyView({
                  responseURL: newProps.responseURL + '?channel=mobile'
                })
              }
            ])
          } else {
            NavigationActions.MyView({
              responseURL: newProps.responseURL + '?channel=mobile'
            })
          }
        }
    // }
      } else {
        if (newProps.error == '401') {
          this.props.clearLogin()
           console.log('coming from future contract scenarios')
          RCTNetworking.clearCookies((cleared) => {
            console.log('clearing local cookies for the app')
          })
          Alert.alert('Login', 'The user ID or password you have entered is incorrect. Please try again.', [
            {
              text: 'OK'
            }
          ])
        } else if (newProps.error != null && newProps.error != '401') {
          this.props.clearLogin()
          console.log('coming from future contract')
          RCTNetworking.clearCookies((cleared) => {
            console.log('clearing local cookies for the app')
          })
          Alert.alert('Login', 'Oops! Looks Like There\'s a, Problem. ', [
            {
              text: 'OK'
            }
          ])
        }
      }
    }
  // end of IF condition
  }

  _moreInfo () {
    return (
      <View style={styles.informationPopup}>
        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/general/web-accessibility'})}>
            <Text style={styles.popupchildText}>
              Accessibility
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/ndnotice'})}>
            <Text style={styles.popupchildText}>
              Nondiscrimination
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/terms-of-use'})}>
            <Text style={styles.popupchildText}>
              Terms of Use
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/internet-privacy-statement'})}>
            <Text style={styles.popupchildText}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://providersearch.floridablue.com/providersearch/pub/index.htm'})}>
            <Text style={styles.popupchildText}>
              Browse for Doctors
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/general/contact-us'})}>
            <Text style={styles.popupchildText}>
              Support
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/'})}>
            <Text style={styles.popupchildText}>
              Floridablue.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/languageservices?_ga=1.102498241.1713434787.1485183405#es'})}>
            <Text style={styles.popupchildText}>
              Speak Another Language?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    var transparent
    if (this.props.mfetching) {
      transparent = 0.5
    } else {
      transparent = 1
    }
    return (
      <View style={{position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: window.height,
        opacity: transparent,
        backgroundColor: Colors.snow
      }} >

        <View style={styles.container}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
          <Clouds />
          <CityScape />

          <View keyboardShouldPersistTaps style={styles.container}>

            <LogoView>
              <Image source={Images.clearLogo} style={styles.logo} />
            </LogoView>

            <LoginView>
              <View style={styles.row}>
                <MKTextField
                  ref='username'
                  style={styles.textField}
                  textInputStyle={{flex: 1}}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.props.handleChangeUserName}
                  value={this.props.username}
                  underlineColorAndroid={Colors.coal}
                  onSubmitEditing={() => this.refs.password.focus()}
                  placeholder={I18n.t('username')} />
              </View>

              <View style={styles.row}>
                <MKTextField
                  ref='password'
                  style={styles.textField}
                  textInputStyle={{flex: 1}}
                  keyboardType='default'
                  returnKeyType='done'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry
                  password
                  onChangeText={this.props.handleChangePassword}
                  value={this.props.password}
                  underlineColorAndroid={Colors.coal}
                  placeholder={I18n.t('password')} />
              </View>
              {this.props.mfetching ? <SingleColorSpinner strokeColor={Colors.flBlue.ocean} style={styles.spinnerView} /> : <View />}
              <View style={styles.forgotRow}>
                <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://registration-stga.bcbsfl.com/ecir/public/fps.do?channel=mobile&userType=member'})}>
                  <Text style={styles.link}>{I18n.t('forgotPassword')}</Text>
                </TouchableOpacity>
              </View>
            </LoginView>

            <LoginButtonView>
              <TouchableOpacity onPress={() => { this._handleLogin() }}>
                <Image style={{width: Metrics.screenWidth * 0.5,
                  borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
                  height: Metrics.screenHeight * 0.064}}
                  source={Images.loginButtonGreen} />
              </TouchableOpacity>
            </LoginButtonView>
            <SignUpView>
              <TouchableOpacity onPress={() => NavigationActions.screen_1()}>
                <Text style={styles.link}>{I18n.t('signUp')}</Text>
              </TouchableOpacity>
            </SignUpView>

          </View>

          {this.state.modalVisible && this._moreInfo()}

          <View style={styles.footer}>
            <View>
              <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => {
                if (this.state.modalVisible === true) {
                  this.setState({modalVisible: false})
                } else {
                  this.setState({modalVisible: true})
                }
              }}>
                <Image source={Images.infoIcon} />
              </TouchableWithoutFeedback>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    mfetching: state.member.fetching,
    error: state.login.error,
    responseURL: state.login.responseURL,
    smToken: state.login.smToken,
    termsOfUse: state.member.termsOfUse,
    merror: state.member.error,
    username: state.login.username,
    password: state.login.password,
    visibleDashboard: state.member.visibleDashboard
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeUserName: (username) => dispatch(LoginActions.changeUserName(username)),
    handleChangePassword: (password) => dispatch(LoginActions.changePassword(password)),
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest()),
    attemptLogout: () => dispatch(LoginActions.logoutRequest()),
    clearLogin: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
