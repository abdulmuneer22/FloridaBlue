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
  TouchableWithoutFeedback,
  NativeModules,
  Platform
} from 'react-native'
var urlConfig = require('../../UrlConfig')
var TouchManager = NativeModules.TouchManager

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
import { Images, Metrics, Colors, Fonts } from '../../Themes'
// import {FlbIcon} from'./FlbIcon'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor, MKSpinner, MKCheckbox } from 'react-native-material-kit'
import LoginView from './LoginView'
import LoginButtonView from './LoginButtonView'
import LogoView from './LogoView'
import SignUpView from './SignUpView'
import Clouds from './Clouds'
import CityScape from './CityScape'
import { Spinner } from 'native-base'

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

var component = null

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
    component = this
  }

  componentDidMount () {
    this.props.clearLogin()
    RCTNetworking.clearCookies((cleared) => {
      console.tron.log('clearing local cookies for the app login')
    })

    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton)

    if (Platform.OS === 'ios') {
      TouchManager.checkTouchStatus((error, touchInfo) => {
        var touchStatus = touchInfo[0]
        if (touchStatus == 'AUTHENTICATED') {
          this.props.changeCredentialStored(true)
          this.props.changeTouchEnabled(true)
          if (this.props.origin != 'logout') {
            this._authenticateUserWithTouch()
          }
        } else if (touchStatus == 'ENABLED') {
          this.props.changeCredentialStored(false)
          this.props.changeTouchEnabled(true)
        } else {
          this.props.changeCredentialStored(false)
          this.props.changeTouchEnabled(false)
        }
      })
    }
    /*
    BackAndroid.addEventListener('hardwareBackPress', function () {
         console.log('inside back handler',component.props.currentSceneValue)

          if(  component.props.currentSceneValue && component.props.currentSceneValue ==='login'){
                         if(component.props.currentSceneValue =='drawer' || component.props.currentSceneValue =='WelcomeDashBoard'){
            console.log('currentscence',component.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackAndroid.exitApp() },
              ]
            );
          }else {

            console.log('currentscence',component.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackAndroid.exitApp() },
              ]
            );
          }
          }

      return true
     })
  */
  }

  componentWillReceiveProps (newProps) {
    var responseURL = newProps.responseURL
    if (this.props != newProps) {
      if (this.isAttempting && !newProps.fetching && newProps.error === null && responseURL) {
        // Successfully logged in..
        if (responseURL == 'login') {
          if (!newProps.mfetching) {
            if (!newProps.merror) {
              // Successfully fetched the member data..
              if (newProps.termsOfUse) {
                // User has accepted the TOU..
                if (newProps.visibleDashboard) {
                  if (newProps.touchEnabled && !newProps.credentialStored) {
                    NavigationActions.TouchTOU()
                  } else {
                    NavigationActions.WelcomeDashBoard()
                  }
                } else {
                  NavigationActions.ErrorPage()
                }
              } else {
                // User has not accepted the TOU..
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
            console.tron.log('clearing local cookies for the app')
          })
          this.props.attemptLogout(this.props.logoutUrl)
          if (newProps.credentialStored) {
            this._disableTouchID()
          }

          Alert.alert('Login', 'Please use your user ID and password to log in. You must be a Florida Blue member.',
            [
              {
                text: 'OK'
              }
            ])

        // Disabled Account
        } else if (responseURL.includes('apsparam=usrlocked')) {
          RCTNetworking.clearCookies((cleared) => {
            console.tron.log('clearing local cookies for the app')
          })
          this.props.attemptLogout(this.props.logoutUrl)
          if (newProps.credentialStored) {
            this._disableTouchID()
          }

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
          if (newProps.credentialStored) {
            this._disableTouchID()
          }

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
      } else {
        if (newProps.error == '401') {
          this.props.clearLogin()
          if (newProps.credentialStored) {
            this._disableTouchID()
          }
          console.tron.log('coming from future contract scenarios')
          RCTNetworking.clearCookies((cleared) => {
            console.tron.log('clearing local cookies for the app')
          })
          Alert.alert('Login', 'The user ID or password you have entered is incorrect. Please try again.', [
            {
              text: 'OK'
            }
          ])
        } else if (newProps.error != null && newProps.error != '401') {
          this.props.clearLogin()
          if (newProps.credentialStored) {
            this._disableTouchID()
          }
          console.tron.log('coming from future contract')
          RCTNetworking.clearCookies((cleared) => {
            console.tron.log('clearing local cookies for the app')
          })
          Alert.alert('Login', 'Oops! Looks like we\'re having trouble with your request. Please try again later',
            [
          { text: 'OK', onPress: () => NavigationActions.login() }

            ],
        { cancelable: false }

          )
        }
      }
    }
  // end of IF condition
  }

  _handleTouchCheckbox () {
    if (this.props.touchEnabled) {
      this.props.changeTouchEnabled(false)
    } else {
      this.props.changeTouchEnabled(true)
    }
  }

  _authenticateUserWithTouch () {
    TouchManager.authenticateUser((error, authInfo) => {
      var authObject = authInfo[0]
      var authStatus = authObject['authStatus']
      if (authStatus == 'YES') {
        TouchManager.retrieveCredentials((error, credentials) => {
          if (error) {
            this._disableTouchID()
            Alert.alert(
              'Oops!',
              'An error occured retrieving your credentials. We\'ve reset your securly stored data. Please login normally to re-enable Touch ID.',
              [
                {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'}
              ],
              { cancelable: false }
            )
          } else {
            var password = credentials[0]
            var username = credentials[1]
            this.isAttempting = true
            this.props.attemptLogin(username, password)
          }
        })
      } else {
        var showError = true
        var errorMessage = ''
        var errorTitle = 'Oops!'
        var errorCode = authObject['authErrorCode']

        switch (errorCode) {
          case '999':
            errorMessage = 'Touch ID is not configured on your device. Please visit your settings to configure Touch ID.'
            break
          case '001':
            errorMessage = 'Sorry, authentication failed. Please ensure you are using the correct fingerprint.'
            break
          case '002':
            showError = false
            break
          default:
            errorMessage = 'Sorry, authentication failed. Please ensure you are using the correct fingerprint.'
        }

        if (showError) {
          Alert.alert(
            errorTitle,
            errorMessage,
            [
              {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
          )
        }
      }
    })
  }

  _disableTouchID () {
    TouchManager.removeCredentials((error, credentials) => {
      var status = credentials[0]
      if (status == 'SUCCESS') {
        this.props.changeTouchEnabled(false)
        this.props.changeCredentialStored(false)
        NavigationActions.pop()
      }
    })
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
    } else if (!username && password) {
      Alert.alert('Login', 'Please enter your User ID', [
        {
          text: 'OK'
        }
      ])
    } else if (username && !password) {
      Alert.alert('Login', 'Please enter your Password.', [
        {
          text: 'OK'
        }
      ])
    } else {
      this.isAttempting = true
      this.props.attemptLogin(username, password)
    }
  }

  handleBackButton () {
    return true
  }

  _moreInfo () {
    return (
      <View style={styles.informationPopup}>
        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.webAccessibilityURL})}>
            <Text style={styles.popupchildText}>
              Accessibility
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.ndnoticeURL})}>
            <Text style={styles.popupchildText}>
              Nondiscrimination
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.termsOfUseURL})}>
            <Text style={styles.popupchildText}>
              Terms of Use
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.internetStatementURL})}>
            <Text style={styles.popupchildText}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.browseDoctorsURL})}>
            <Text style={styles.popupchildText}>
              Find Care
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.supportURL})}>
            <Text style={styles.popupchildText}>
              Support
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.floridaBlueURL})}>
            <Text style={styles.popupchildText}>
              floridablue.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.anotherLanguageURL})}>
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

          <Image source={Images.background} style={styles.backgroundImage} />

          <Clouds />
          <CityScape />

          <View keyboardShouldPersistTaps='always' style={styles.container}>

            <LogoView>
              <Image source={Images.clearLogo} style={styles.logo} />
            </LogoView>

            <LoginView>
              <View style={styles.row}>
                <MKTextField
                  ref='username'
                  style={styles.textField}
                  textInputStyle={{flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.props.handleChangeUserName}
                  value={this.props.username}
                  underlineColorAndroid={Colors.coal}
                  onSubmitEditing={() => this.refs.password.focus()}
                  placeholder={I18n.t('username')}
                  placeholderTextColor={Colors.steel} />
              </View>

              <View style={styles.row}>
                <MKTextField
                  ref='password'
                  style={styles.textField}
                  textInputStyle={{flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                  keyboardType='default'
                  returnKeyType='done'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry
                  password
                  onChangeText={this.props.handleChangePassword}
                  value={this.props.password}
                  underlineColorAndroid={Colors.coal}
                  placeholder={I18n.t('userpassword')}
                  placeholderTextColor={Colors.steel} />
              </View>

              {Platform.OS === 'ios' && !this.props.credentialStored ?
                <TouchableOpacity style={styles.touchRow} onPress={() => { this._handleTouchCheckbox() }}>
                  <MKCheckbox style={styles.radio} checked={this.props.touchEnabled} disabled />
                  <Text style={styles.link}>{I18n.t('enableTouchID')}</Text>
                </TouchableOpacity>
                :
                <View style={styles.forgotRow}>
                  <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})}>
                    <Text style={styles.link}>{I18n.t('forgotPassword')}</Text>
                  </TouchableOpacity>
                </View> }
            </LoginView>

            <LoginButtonView>
              {this.props.mfetching ? <SingleColorSpinner strokeColor={Colors.orange} style={styles.spinnerView} /> : <TouchableOpacity onPress={() => { this._handleLogin() }}>
                <Image style={{width: Metrics.screenWidth * 0.5,
                  borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
                  height: Metrics.screenHeight * 0.064,
                  marginTop: Platform.OS == 'ios' ? Metrics.smallMargin * Metrics.screenHeight * 0.001 : Metrics.smallMargin * Metrics.screenHeight * 0.0001}}
                  source={Images.loginButtonGreen} />
              </TouchableOpacity> }
            </LoginButtonView>
            <SignUpView>
              <TouchableOpacity onPress={() => NavigationActions.screen_1()}>
                <Text style={styles.link}>{I18n.t('signUp')}</Text>
              </TouchableOpacity>
              { Platform.OS === 'ios' && this.props.credentialStored ?
                <View style={styles.touchRow}>
                  <TouchableOpacity onPress={() => { this._authenticateUserWithTouch() }}>
                    <Image style={styles.touchCoin} source={Images.touchIdCoin} />
                  </TouchableOpacity>
                </View> : null
              }

              { Platform.OS === 'ios' && !this.props.credentialStored ?
                <View style={styles.forgotRow}>
                  <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})}>
                    <Text style={styles.link}>{I18n.t('forgotPassword')}</Text>
                  </TouchableOpacity>
                </View>
                :
                  null
              }
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
    visibleDashboard: state.member.visibleDashboard,
    touchEnabled: state.login.touchEnabled,
    touchCheckboxVisible: state.login.touchCheckboxVisible,
    logoutUrl: state.login.logoutUrl,
    credentialStored: state.login.credentialStored
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
    attemptLogout: (logoutUrl) => dispatch(LoginActions.logoutRequest(logoutUrl)),
    clearLogin: () => dispatch(LoginActions.logout()),
    changeTouchEnabled: (touchEnabled) => dispatch(LoginActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(LoginActions.changeCredentialStored(credentialStored))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
