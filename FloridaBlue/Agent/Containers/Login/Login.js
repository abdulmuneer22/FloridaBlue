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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import styles from './LoginStyle'
import Flb from '../../Themes/FlbIcon'
import { Images, Metrics, Colors, Fonts } from '../../Themes'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor, MKSpinner, MKCheckbox } from 'react-native-material-kit'
import LoginView from './LoginView'
import LoginButtonView from './LoginButtonView'
import LogoView from './LogoView'
import SignUpView from './SignUpView'
import Clouds from './Clouds'
import CityScape from './CityScape'
import { Spinner } from 'native-base'
import HideableView from 'react-native-hideable-view'
import CheckBox from 'react-native-checkbox'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const goToWebView = () => NavigationActions.MyView({text: 'Hello World!'})
const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')
let RCTNetworking = require('RCTNetworking')
let logo = require('./logo.png')
let component = null

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
    component = this
    this._handleLogin = this._handleLogin.bind(this)
  }

  componentDidMount () {
    this.props.clearLogin()
    RCTNetworking.clearCookies((cleared) => {
      console.tron.log('clearing local cookies for the app login')
    })

    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton)
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
    // var responseURL = newProps.responseURL
    // if (this.props != newProps) {
    //   if (this.isAttempting && !newProps.fetching && newProps.error === null && responseURL) {
    //     // Successfully logged in..
    //     if (responseURL == 'login') {
    //       if (!newProps.mfetching) {
    //         if (!newProps.merror) {
    //           // Successfully fetched the member data..
    //           if (newProps.termsOfUse) {
    //             // User has accepted the TOU..
    //             if (newProps.visibleDashboard) {
    //               if (newProps.touchEnabled && !newProps.credentialStored) {
    //                 NavigationActions.TouchTOU()
    //               } else {
    //                 this.props.handleChangePassword('')
    //                 NavigationActions.WelcomeDashBoard()
    //               }
    //             } else {
    //               NavigationActions.ErrorPage()
    //             }
    //           } else {
    //             // User has not accepted the TOU..
    //             NavigationActions.Termsofuse({'origin': 'login'})
    //           }
    //         } else {
    //           NavigationActions.ErrorPage()
    //         }
    //       }
    //     } else if (responseURL.includes('updateSecurityHintsAnswers')) {
    //       NavigationActions.screen_4({'username': this.props.username})
    //     // Unauthorized User
    //     } else if (responseURL.includes('mob/error/accessdenied')) {
    //       RCTNetworking.clearCookies((cleared) => {
    //         console.tron.log('clearing local cookies for the app')
    //       })
    //       this.props.attemptLogout(this.props.logoutUrl)
    //       if (newProps.credentialStored) {
    //         this._disableTouchID()
    //       }
    //
    //       Alert.alert('Login', 'Please use your user ID and password to log in. You must be a Florida Blue member.',
    //         [
    //           {
    //             text: 'OK'
    //           }
    //         ])
    //
    //     // Disabled Account
    //     } else if (responseURL.includes('apsparam=usrlocked')) {
    //       RCTNetworking.clearCookies((cleared) => {
    //         console.tron.log('clearing local cookies for the app')
    //       })
    //       this.props.attemptLogout(this.props.logoutUrl)
    //       if (newProps.credentialStored) {
    //         this._disableTouchID()
    //       }
    //
    //       Alert.alert('Login', 'For security reasons, your account has been locked. Click OK to unlock your account.', [
    //         {
    //           text: 'OK',
    //           onPress: () => NavigationActions.MyView({
    //             responseURL: newProps.responseURL + '?channel=mobile'
    //           })
    //         }
    //       ])
    //
    //     // Password About to Expire
    //     } else {
    //       this.props.clearLogin()
    //       if (newProps.credentialStored) {
    //         this._disableTouchID()
    //       }
    //
    //       if (responseURL.includes('updatePassword.do')) {
    //         Alert.alert('Login', 'Welcome back! Please reset your password now, and then you can log in.', [
    //           {
    //             text: 'OK',
    //             onPress: () => NavigationActions.MyView({
    //               responseURL: newProps.responseURL + '?channel=mobile'
    //             })
    //           }
    //         ])
    //       } else {
    //         NavigationActions.MyView({
    //           responseURL: newProps.responseURL + '?channel=mobile'
    //         })
    //       }
    //     }
    //   } else {
    //     if (newProps.error == '401') {
    //       this.props.clearLogin()
    //       if (newProps.credentialStored) {
    //         this._disableTouchID()
    //         Alert.alert('Login', 'Looks like something has changed. Please log in using your user ID and password to set up Touch ID.', [
    //           {
    //             text: 'OK'
    //           }
    //         ])
    //       } else {
    //         Alert.alert('Login', 'The user ID or password you have entered is incorrect. Please try again.', [
    //           {
    //             text: 'OK'
    //           }
    //         ])
    //       }
    //       console.tron.log('coming from future contract scenarios')
    //       RCTNetworking.clearCookies((cleared) => {
    //         console.tron.log('clearing local cookies for the app')
    //       })
    //     } else if (newProps.error != null && newProps.error != '401') {
    //       this.props.clearLogin()
    //       if (newProps.credentialStored) {
    //         this._disableTouchID()
    //       }
    //       console.tron.log('coming from future contract')
    //       RCTNetworking.clearCookies((cleared) => {
    //         console.tron.log('clearing local cookies for the app')
    //       })
    //       Alert.alert('Login', 'Oops! Looks like you’re having trouble connecting. Check your network and try again.',
    //         [
    //       { text: 'OK', onPress: () => NavigationActions.login() }
    //
    //         ],
    //     { cancelable: false }
    //
    //       )
    //     }
    //   }
    // }
  // end of IF condition
  }

  _handleLogin () {
    // // clearing local cookies before going to PMI
    // RCTNetworking.clearCookies((cleared) => {})
    // Keyboard.dismiss()
    // var username = this.props.username
    // var password = this.props.password
    //
    // if (!username && !password) {
    //   Alert.alert('Login', 'Please enter your User ID/Password.', [
    //     {
    //       text: 'OK'
    //     }
    //   ])
    //  // alert('Please enter your user ID/Password.')
    // } else if (!username && password) {
    //   Alert.alert('Login', 'Please enter your User ID', [
    //     {
    //       text: 'OK'
    //     }
    //   ])
    // } else if (username && !password) {
    //   Alert.alert('Login', 'Please enter your Password.', [
    //     {
    //       text: 'OK'
    //     }
    //   ])
    // } else {
    //   this.isAttempting = true
    //   this.props.attemptLogin(username, password)
    // }
  }

  handleBackButton () {
    return true
  }

  _moreInfo () {
    return (
      <View style={styles.informationPopup}>
        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.webAccessibilityURL})
            gaTracker.trackEvent('More Info', 'Accessibility') }} >
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Accessibility
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.ndnoticeURL})
            gaTracker.trackEvent('More Info', 'Nondiscrimination') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Nondiscrimination
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.termsOfUseURL})
            gaTracker.trackEvent('More Info', 'Terms of Use') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Terms of Use
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.internetStatementURL})
            gaTracker.trackEvent('More Info', 'Privacy Policy') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.browseDoctorsURL})
            gaTracker.trackEvent('More Info', 'Unsecured OPD') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Find Care
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.supportURL})
            gaTracker.trackEvent('More Info', 'Support') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Support
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.floridaBlueURL})
            gaTracker.trackEvent('More Info', 'floridablue.com') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              floridablue.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => {
            NavigationActions.MyView({responseURL: urlConfig.anotherLanguageURL})
            gaTracker.trackEvent('More Info', 'Speak Another Language') }}>
            <Text allowFontScaling={false} style={styles.popupchildText}>
              Speak Another Language?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderAgentLogin() {
    return (
      <View>
        <LoginView>
          <View style={styles.loginContainer}>
            <View style={styles.textFieldContainer}>
              <MKTextField
                ref='username'
                style={styles.textField}
                textInputStyle={{flex: 1, color: Colors.flBlue.anvil, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
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
            <View style={styles.textFieldContainer}>
              <MKTextField
                ref='password'
                style={styles.textField}
                textInputStyle={{flex: 1, color: Colors.flBlue.anvil, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                password
                onChangeText={this.props.handleChangePassword}
                onSubmitEditing={this._handleLogin}
                value={this.props.password}
                underlineColorAndroid={Colors.coal}
                placeholder={I18n.t('userpassword')}
                placeholderTextColor={Colors.steel} />
            </View>
            <View style={styles.textFieldContainer}>
              <MKTextField
                ref='password'
                style={styles.textField}
                textInputStyle={{flex: 1, color: Colors.flBlue.anvil, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                password
                onChangeText={this.props.handleChangePassword}
                onSubmitEditing={this._handleLogin}
                value={this.props.password}
                underlineColorAndroid={Colors.coal}
                placeholder={'Site Password'}
                placeholderTextColor={Colors.steel} />
            </View>
          </View>
        </LoginView>

        <LoginButtonView>
          {this.props.mfetching || this.props.fetching
            ? <SingleColorSpinner strokeColor={Colors.orange} style={styles.spinnerView} />
          : <TouchableOpacity onPress={() => { this._handleLogin() }}>
            <Image style={{width: Metrics.screenWidth * 0.5,
              borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
              height: Metrics.screenHeight * 0.064}}
              source={Images.loginButtonGreen} />
          </TouchableOpacity> }
        </LoginButtonView>
      </View>
    )
  }

  render () {
    let transparent
    if (this.props.mfetching || this.props.fetching) {
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

          <View keyboardShouldPersistTaps='always' style={styles.container}>

            <LogoView>
              <Image source={Images.clearLogo} style={styles.logo} />
            </LogoView>

            { this._renderAgentLogin() }

            <SignUpView>
              <TouchableOpacity style={styles.agentLinkContainer} onPress={() => {
                NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})
                gaTracker.trackEvent('Login', 'Forgot Password')}}>
                <Text allowFontScaling={false} style={styles.agentLink}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.agentLinkContainer} onPress={() => {}}>
                <Text allowFontScaling={false} style={styles.agentLink}>{'Back to Member Login'}</Text>
              </TouchableOpacity>
            </SignUpView>
          </View>

          {this.state.modalVisible && this._moreInfo()}

          <View style={styles.footer}>
            <View>
              <Text allowFontScaling={false} style={styles.footerText}>{I18n.t('footerText')}</Text>
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
    logoutUrl: state.login.logoutUrl,
    agentLogin: state.login.agentLogin
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
    changeAgentLogin: (agentLogin) => dispatch(LoginActions.changeAgentLogin(agentLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
