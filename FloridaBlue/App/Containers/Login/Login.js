import React, { Component } from 'react'
import {
  Alert,
  Text,
  View,
  ScrollView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Image,
  Navigator,
  Modal,
  Dimensions,
  BackHandler,
  TouchableWithoutFeedback,
  NativeModules,
  Platform
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import MemberActions from '../../Redux/MemberRedux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import SupportActions from '../../Redux/SupportRedux'
import SettingActions from '../../Redux/SettingRedux'
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
import HideableView from 'react-native-hideable-view'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import Orientation from 'react-native-orientation'
import Popover, { PopoverTouchable } from 'react-native-modal-popover'
import { CheckTouchStatus, Authenticate, DisableTouch, EnableTouch } from '../../Lib/TouchAuthUtil'

const goToWebView = () => NavigationActions.MyView({text: 'Hello World!'})
const Divider = () => { return <View style={styles.divider} /> }
const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let iOSTouchManager = NativeModules.TouchManager
let AndroidTouchManager = NativeModules.TouchManager
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)
let RCTNetworking = require('RCTNetworking')
let logo = require('./logo.png')

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

let component = null

class Login extends Component {
  props: LoginScreenProps
  isAttempting : boolean

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      modalVisible: false,
      isPortrait: true
    }
    this.isAttempting = false
    component = this

    this._authenticateUserWithTouch = this._authenticateUserWithTouch.bind(this)
    this._handleTouchCheckbox = this._handleTouchCheckbox.bind(this)
    this._handleLogin = this._handleLogin.bind(this)
    this._orientationDidChange = this._orientationDidChange.bind(this)
    this._handleAgentLogin = this._handleAgentLogin.bind(this)
    this._infoMenu = this._infoMenu.bind(this)
    this._handleSetState = this._handleSetState.bind(this)
  }

  componentWillMount () {
    if (DeviceInfo.getManufacturer() === 'samsung') {
      console.log('hey samsung!')
      console.log(DeviceInfo.isTablet())
    } else if (DeviceInfo.getManufacturer() === 'ios') {
      console.log('yo apple!')
    }

    console.log('is it a tablet bro?', DeviceInfo.isTablet())
    const initial = Orientation.getInitialOrientation()

    if (initial === 'PORTRAIT') {
      console.log('Hey, Im going to mount in P mode on Login')
    } else {
      console.log('Hey, Im going to mount in L mode on login')
    }
  }

  componentDidMount () {
    gaTracker.trackScreenView('Login')
    this.props.clearLogin()
    RCTNetworking.clearCookies((cleared) => {
      console.tron.log('clearing local cookies for the app login')
    })

    if (Platform.OS === 'ios') {
      iOSTouchManager.checkTouchStatus((error, iosStatus) => {
        this._handleTouchStatus(iosStatus[0])
      })
    } else {
      AndroidTouchManager.checkTouchStatus((androidStatus) => {
        this._handleTouchStatus(androidStatus)
      })
    }

    if (this.props.origin == 'loginExpired') {
      Alert.alert('Logged Out', 'Your session expired. Please log in again.',
        [
          {
            text: 'OK'
          }
        ])
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    Orientation.addOrientationListener(this._orientationDidChange)
    /*
    BackHandler.addEventListener('hardwareBackPress', function () {
         console.log('inside back handler',component.props.currentSceneValue)

          if(  component.props.currentSceneValue && component.props.currentSceneValue ==='login'){
                         if(component.props.currentSceneValue =='drawer' || component.props.currentSceneValue =='WelcomeDashBoard'){
            console.log('currentscence',component.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
              ]
            );
          }else {

            console.log('currentscence',component.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
              ]
            );
          }
          }

      return true
     })
  */
  }

  _orientationDidChange (orientation) {
    if (orientation === 'LANDSCAPE') {
      this.setState({isPortrait: false})
      console.log('Hey, Im in landscape mode on login')
    } else {
      this.setState({isPortrait: true})
      console.log('Hey, Im in portrait mode on login')
    }
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
                    this.props.handleChangePassword('')
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

          Alert.alert('Login', 'For security reasons, your account has been locked. Click OK to unlock your account.', [
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
            Alert.alert('Login', 'Welcome back! Please reset your password now, and then you can log in.', [
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
            Alert.alert('Login', 'Looks like something has changed. Please log in using your user ID and password to set up Touch ID.', [
              {
                text: 'OK'
              }
            ])
          } else {
            Alert.alert('Login', 'The user ID or password you have entered is incorrect. Please try again.', [
              {
                text: 'OK'
              }
            ])
          }
          console.tron.log('coming from future contract scenarios')
          RCTNetworking.clearCookies((cleared) => {
            console.tron.log('clearing local cookies for the app')
          })
        } else if (newProps.error != null && newProps.error != '401') {
          this.props.clearLogin()
          if (newProps.credentialStored) {
            this._disableTouchID()
          }
          console.tron.log('coming from future contract')
          RCTNetworking.clearCookies((cleared) => {
            console.tron.log('clearing local cookies for the app')
          })
          Alert.alert('Login', 'Oops! Looks like you’re having trouble connecting. Check your network and try again.',
            [
          { text: 'OK', onPress: () => NavigationActions.MemberLogin() }

            ],
        { cancelable: false }

          )
        }
      }
    }
  // end of IF condition
  }

  componentWillUnmount () {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`)
    })

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange)
  }

  _changeTouchCheckbox(checkboxState) {
    this.props.changeTouchEnabled(checkboxState)

    if (Platform.OS === 'ios') {
      iOSTouchManager.enableTouchID((error, iosStatus) => {
        this._handleTouchCheckbox(iosStatus[0])
      })
    } else {
      AndroidTouchManager.enableFingerprint((androidStatus) => {
        this._handleTouchCheckbox(androidStatus)
      })
    }
  }

  _authenticateUserWithTouch() {
    if (Platform.OS === 'ios') {
      iOSTouchManager.authenticateUser((error, iosStatus) => {
        this._handleAuthenticateStatus(iosStatus[0])
      })
    } else {
      AndroidTouchManager.authenticateUser((androidStatus) => {
        this._handleAuthenticateStatus(androidStatus)
      })
    }
  }

  _handleTouchStatus(touchStatus) {
      switch (touchStatus) {
        case 'AUTHENTICATED':
          this.props.changeCredentialStored(true)
          this.props.changeTouchEnabled(true)
          this.props.changeTouchAvailable(true)
          if (this.props.origin != 'logout' && this.props.origin != 'loginExpired') {
            gaTracker.trackEvent('Touch ID', 'Launch')
            this._authenticateUserWithTouch()
          }
          break
        case 'ENABLED':
          this.props.changeCredentialStored(false)
          this.props.changeTouchEnabled(true)
          this.props.changeTouchAvailable(true)
          break
        case 'DISABLED':
          this.props.changeTouchAvailable(true)
          this._disableTouchID()
          break
        case 'NOT ENROLLED':
          this.props.changeTouchAvailable(true)
          this._disableTouchID()
          break
        case 'NO PASSCODE':
          this.props.changeTouchAvailable(true)
          this._disableTouchID()
          break
        case 'LOCKED':
          this._handleLockedTouch()
          break
        case 'ROOTED':
          this.props.changeTouchAvailable(false)
          this._handleRooted()
          break
        default:
          this._disableTouchID()
          break
      }
  }

  _handleTouchCheckbox (touchStatus) {
    let errorMessage = ''
    let errorTitle = 'Error'
    var showError = false

    switch (touchStatus) {
      case 'NOT ENROLLED':
        this._disableTouchID()
        errorMessage = 'Using Touch ID is easy! Just go to your phone\'s settings and set it up now.'
        showError = true
        break
      case 'NO PASSCODE':
        this._disableTouchID()
        break
      case 'LOCKED':
        this._handleLockedTouch()
        errorMessage = 'Sorry! For security, Touch ID has been locked. Please unlock it in your phone settings. Then you can set up Touch ID in the app.'
        showError = true
      default:
        // Nada..
    }

    if (showError) {
      Alert.alert(
        errorTitle,
        errorMessage,
        [
          {text: 'Ok', onPress: () => console.log("Ok pressed"), style: 'cancel'}
        ],
        { cancelable: false }
      )
    }
  }

  _handleAuthenticateStatus (authStatus) {
    if (authStatus == 'AUTHENTICATED') {
      if (Platform.OS === 'ios') {
        iOSTouchManager.retrieveCredentials((error, iosStatus) => {
          this._handleCredentialRetrieval(iosStatus[0])
        })
      } else {
        AndroidTouchManager.retrieveCredentials((androidStatus) => {
          this._handleCredentialRetrieval(androidStatus)
        })
      }
    } else {
      let showError = true
      let errorMessage = ''
      let errorTitle = 'Oops!'

      switch (authStatus) {
        case 'AUTH FAILED':
          errorMessage = 'Oops! Something went wrong. Please make sure you\'re using the right fingerprint and try again.'
          break
        case 'USER CANCEL':
          showError = false
          break
        case 'SYSTEM CANCEL':
          showError = false
          break
        case 'NO PASSCODE':
          errorMessage = 'Using Touch ID is easy! Just go to your phone\'s settings and set it up now.'
          break
        case 'NOT ENROLLED':
          errorMessage = 'Using Touch ID is easy! Just go to your phone\'s settings and set it up now.'
          break
        case 'LOCKED':
          errorMessage = 'Sorry! For security, Touch ID has been locked. Please unlock it in your phone settings. Then you can set up Touch ID in the app.'
          this._handleLockedTouch()
          break
        default:
          errorMessage = 'Oops! Something went wrong. Please make sure you\'re using the right fingerprint and try again.'
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
  }

  _handleCredentialRetrieval(retrievalResponse) {
    let credentialObject = retrievalResponse[0]
    let status = credentialObject['status']

    if (status == 'SUCCESS') {
      let password = credentialObject['password']
      let username = credentialObject['username']
      this.isAttempting = true
      this.props.attemptLogin(username, password)
    } else {
      this._disableTouchID()
      Alert.alert(
        'Oops!',
        'Looks like something has changed. Please log in using your user ID and password to set up Touch ID.',
        [
          {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'}
        ],
        { cancelable: false }
      )
    }
  }

  _disableTouchID () {
    if (Platform.OS === 'ios') {
      iOSTouchManager.removeCredentials((error, iosStatus) => {
        this._handleDisableStatus(iosStatus[0])
      })
    } else {
      AndroidTouchManager.removeCredentials((androidStatus) => {
        this._handleDisableStatus(androidStatus)
      })
    }
  }

   _handleDisableStatus (disableStatus) {
     if (disableStatus == 'SUCCESS' || 'NO EXISTING CREDENTIALS') {
       this.props.changeTouchEnabled(false)
       this.props.changeCredentialStored(false)
     }
   }

   _handleLockedTouch () {
      this.props.changeCredentialStored(false)
      this.props.changeTouchEnabled(false)
      this.props.changeTouchAvailable(true)
    }

  _handleRooted () {
    console.tron.log("Handling rooted device..")
  }

  _handleAgentLogin () {
    gaTracker.trackEvent('Info Menu', 'Agent Login')
    NavigationActions.AgentLogin()
  }

  _handleLogin () {
    // clearing local cookies before going to PMI
    RCTNetworking.clearCookies((cleared) => {})
    Keyboard.dismiss()
    var username = this.props.username
    var password = this.props.password

    if (!username && !password) {
      var alertMessage = ''
      if (this.props.touchEnabled) {
        errorMessage = 'Please enter your User ID/Password to setup Touch ID.'
      } else {
        errorMessage = 'Please enter your User ID/Password.'
      }
      Alert.alert('Login', alertMessage, [
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

  _handleInfoLink (responseURL, eventName) {
    gaTracker.trackEvent('Info Menu', eventName)
    NavigationActions.MyView({responseURL: responseURL})
    this.setState({modalVisible: false})
    console.tron.log(this.state.modalVisible)
  }

  
   _handleSetState () {
     this.setState({modalVisible: true})
     this.setState({isPortrait: false})
  }

  _infoMenu () {
    console.tron.log(urlConfig)
    return (
      <View>
        <PopoverTouchable onPopoverDisplayed={() => console.tron.log('Popover displayed!')}>
          <TouchableOpacity onPress={this._handleSetState}>
            <Flb name='blocks-circle' size={Metrics.icons.medium * Metrics.screenHeight * 0.0015} style={styles.popoverButton} />
          </TouchableOpacity>
          <Popover
            contentStyle={styles.popoverContent}
            arrowStyle={styles.popoverArrow}
            backgroundStyle={styles.popoverBackground}
            placement={'top'}
            visible={this.state.modalVisible}>

            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.webAccessibilityURL, 'Terms of Use')}>
              <Flb name='booklet' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Terms of Use</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.webAccessibilityURL, 'Accessibility')}>
              <Flb name='accessibility' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Accessibility</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.ndnoticeURL, 'Nondiscrimination')}>
              <Flb name='groups' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Non-Discrimination</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.internetStatementURL, 'Privacy Policy')}>
              <Flb name='lock' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.browseDoctorsURL, 'Unsecured OPD')}>
              <Flb name='search-find' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Find Care</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.supportURL, 'Support')}>
              <Flb name='question' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Support</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.floridaBlueURL, 'floridablue.com')}>
              <Flb name='desktop-vector' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>floridablue.com</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity style={styles.popoverItem} onPress={() => this._handleInfoLink(urlConfig.anotherLanguageURL, 'Speak Another Language')}>
              <Flb name='wire-globe' size={Metrics.icons.medium * Metrics.screenHeight * 0.0012} style={styles.popoverLogo} />
              <Text allowFontScaling={false} style={styles.popoverText}>Speak Another Language?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.agentLoginLink} onPress={this._handleAgentLogin}>
              <Image source={Images.agentLoginLink} />
            </TouchableOpacity>
          </Popover>
        </PopoverTouchable>
      </View>
    )
  }

  _renderTouchAvailableLogin () {
    return (
      <View>
        {this.state.isPortrait ?  
        
        <View>
          <View style={styles.logoView}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>
          <View style={styles.form}>
            <View style={styles.touchLoginContainer}>
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
              <View style={styles.fingerprintContainer}>
                { this.props.credentialStored ?
                    <TouchableOpacity style={styles.fingerprintButton} onPress={() => {
                      this._authenticateUserWithTouch()
                      gaTracker.trackEvent('Touch ID', 'Relaunch')
                    }}>
                      <Flb name='fingerprint' size={Metrics.icons.medium * Metrics.screenHeight * 0.0015} style={styles.fingerprint} />
                      <Text allowFontScaling={false} style={styles.touchInstruction}>Login with your fingerprint</Text>
                    </TouchableOpacity>
                  :
                    <View style={styles.fingerprintButton}>
                      <MKCheckbox ref='touchCheckbox' style={styles.touchCheckbox} checked={this.props.touchEnabled} onCheckedChange={() => {
                        let checked = this.refs.touchCheckbox.state.checked
                        this._changeTouchCheckbox(checked)
                      }} />
                      <Text allowFontScaling={false} style={styles.touchInstruction}>Set up login using your fingerprint</Text>
                    </View>
                }
              </View>
            </View>
            <View style={styles.touchSignRow}>
              <TouchableOpacity onPress={() => {
                NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})
                gaTracker.trackEvent('Login', 'Forgot Password')
              }}>
                <Text allowFontScaling={false} style={styles.link}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                NavigationActions.screen_1()
                gaTracker.trackEvent('Login', 'Sign Up')
              }}>
                <Image style={styles.signUpButton} source={Images.signUpButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.loginButton, {marginTop: -Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0015}]}>
            {this.props.mfetching || this.props.fetching
              ? <SingleColorSpinner strokeColor={Colors.orange} style={styles.spinnerView} />
            : <TouchableOpacity onPress={() => { this._handleLogin() }}>
              <Image style={{width: Metrics.screenWidth * 0.5,
                borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
                height: Metrics.screenHeight * 0.064}}
                source={Images.loginButtonGreen} />
            </TouchableOpacity> }
          </View>
        </View> 
        
        : <View>
            <View style={styles.logoViewLandscape}>
              <Image source={Images.clearLogo} style={styles.logo} />
            </View>
          <View style={[styles.formLandscape, {paddingBottom: DeviceInfo.isTablet() ? Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0015 : Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0007}]}>
            <View style={styles.touchLoginContainerLandscape}>
              <View style={styles.textFieldContainerLandscape}>
                <MKTextField
                  ref='username'
                  style={[styles.textFieldLandscape, {left: DeviceInfo.isTablet() ? null : 22}]}
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
                    <View style={styles.fingerprintContainer}>
                      { this.props.credentialStored ?
                          <TouchableOpacity style={styles.fingerprintButton} onPress={() => {
                            this._authenticateUserWithTouch()
                            gaTracker.trackEvent('Touch ID', 'Relaunch')
                          }}>
                            <Flb name='fingerprint' size={Metrics.icons.medium * Metrics.screenHeight * 0.0015} style={styles.fingerprint} />
                            <Text allowFontScaling={false} style={styles.touchInstruction}>Login with your fingerprint</Text>
                          </TouchableOpacity>
                        :
                          <View style={styles.fingerprintButton}>
                            <MKCheckbox ref='touchCheckbox' style={[styles.touchCheckbox, {top: DeviceInfo.isTablet() ? null : 13, right: DeviceInfo.isTablet() ? null : 10}]} checked={this.props.touchEnabled} onCheckedChange={() => {
                              let checked = this.refs.touchCheckbox.state.checked
                              this._changeTouchCheckbox(checked)
                            }} />
                            <Text allowFontScaling={false} style={[styles.touchInstruction, {marginTop: DeviceInfo.isTablet() ? null : 25, top: DeviceInfo.isTablet() ? null : 1, right: DeviceInfo.isTablet() ? null : 10}]}>Set up login using your fingerprint</Text>
                          </View>
                      }
                    </View>
              </View>
              <View style={styles.textFieldContainerLandscape}>
                <MKTextField
                  ref='password'
                  style={[styles.textFieldLandscape, {left: DeviceInfo.isTablet() ? null : 22}]}
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
                <View style={[styles.loginButton, {marginTop: -Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0002, top: DeviceInfo.isTablet() ? null : 18}]}>
                    {this.props.mfetching || this.props.fetching
                      ? <SingleColorSpinner strokeColor={Colors.orange} style={styles.spinnerView} />
                    : <TouchableOpacity onPress={() => { this._handleLogin() }}>
                      <Image style={{
                        width: Metrics.screenWidth * 0.7,
                        borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
                        height: Metrics.screenHeight * 0.064}}
                        source={Images.loginButtonGreen} />
                    </TouchableOpacity> }
                </View>
              </View>
          
            </View>
            <View style={styles.touchSignRow}>
              <TouchableOpacity onPress={() => {
                NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})
                gaTracker.trackEvent('Login', 'Forgot Password')
              }}>
                <Text allowFontScaling={false} style={[styles.link, {bottom: DeviceInfo.isTablet() ? null : 160, right: DeviceInfo.isTablet() ? null : 90}]}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                NavigationActions.screen_1()
                gaTracker.trackEvent('Login', 'Sign Up')
              }}>
                <Image style={[styles.signUpButtonLandscape, {left: DeviceInfo.isTablet() ? null : 80}]} source={Images.signUpButton} />
              </TouchableOpacity>
            </View>
          </View>
          </View>}
       
      </View>
    )
  }

  _renderLogin () {
    return (
      <View>
        {this.state.isPortrait ?  
        <View>
          <View style={styles.logoView}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>
          <View style={styles.form}>
            <View style={styles.touchLoginContainer}>
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
              <View style={styles.fingerprintContainer}>
                { this.props.credentialStored ?
                    <TouchableOpacity style={styles.fingerprintButton} onPress={() => {
                      this._authenticateUserWithTouch()
                      gaTracker.trackEvent('Touch ID', 'Relaunch')
                    }}>
                      <Flb name='fingerprint' size={Metrics.icons.medium * Metrics.screenHeight * 0.0015} style={styles.fingerprint} />
                      <Text allowFontScaling={false} style={styles.touchInstruction}>Login with your fingerprint</Text>
                    </TouchableOpacity>
                  :
                    <View style={styles.fingerprintButton}>
                      <MKCheckbox ref='touchCheckbox' style={styles.touchCheckbox} checked={this.props.touchEnabled} onCheckedChange={() => {
                        let checked = this.refs.touchCheckbox.state.checked
                        this._changeTouchCheckbox(checked)
                      }} />
                      <Text allowFontScaling={false} style={styles.touchInstruction}>Set up login using your fingerprint</Text>
                    </View>
                }
              </View>
            </View>
            <View style={styles.touchSignRow}>
              <TouchableOpacity onPress={() => {
                NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})
                gaTracker.trackEvent('Login', 'Forgot Password')
              }}>
                <Text allowFontScaling={false} style={styles.link}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                NavigationActions.screen_1()
                gaTracker.trackEvent('Login', 'Sign Up')
              }}>
                <Image style={styles.signUpButton} source={Images.signUpButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.loginButton, {marginTop: -Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0015}]}>
            {this.props.mfetching || this.props.fetching
              ? <SingleColorSpinner strokeColor={Colors.orange} style={styles.spinnerView} />
            : <TouchableOpacity onPress={() => { this._handleLogin() }}>
              <Image style={{width: Metrics.screenWidth * 0.5,
                borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
                height: Metrics.screenHeight * 0.064}}
                source={Images.loginButtonGreen} />
            </TouchableOpacity> }
          </View>
        </View> 
        
       :  <View>
            <View style={styles.logoViewLandscape}>
              <Image source={Images.clearLogo} style={styles.logo} />
            </View>
            <View style={styles.formLandscape}>
              <View style={styles.touchLoginContainerLandscape}>
                <View style={[styles.textFieldContainerLandscape, {marginTop: DeviceInfo.isTablet () ? Metrics.baseMargin * Metrics.screenHeight * 0.007 : Metrics.baseMargin * Metrics.screenHeight * 0.003}]}>
                  <MKTextField
                    ref='username'
                    style={[styles.textFieldLandscape, {left: DeviceInfo.isTablet() ? 40 : null}]}
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
                      <View style={styles.fingerprintContainer}>
                        { this.props.credentialStored ?
                            <TouchableOpacity style={styles.fingerprintButton} onPress={() => {
                              this._authenticateUserWithTouch()
                              gaTracker.trackEvent('Touch ID', 'Relaunch')
                            }}>
                              <Flb name='fingerprint' size={Metrics.icons.medium * Metrics.screenHeight * 0.0015} style={styles.fingerprint} />
                              <Text allowFontScaling={false} style={styles.touchInstruction}>Login with your fingerprint</Text>
                            </TouchableOpacity>
                          :
                            <View style={styles.fingerprintButton}>
                              <MKCheckbox ref='touchCheckbox' style={[styles.touchCheckbox, {top: DeviceInfo.isTablet() ? 62 : 20, right: DeviceInfo.isTablet() ? 70 : 10}]} checked={this.props.touchEnabled} onCheckedChange={() => {
                                let checked = this.refs.touchCheckbox.state.checked
                                this._changeTouchCheckbox(checked)
                              }} />
                              <Text allowFontScaling={false} style={[styles.touchInstruction, {marginTop: DeviceInfo.isTablet() ? null : 35, top: DeviceInfo.isTablet() ? 60 : 1, right: DeviceInfo.isTablet() ? 70 : 10}]}>Set up login using your fingerprint</Text>
                            </View>
                        }
                      </View>
                </View>
                <View style={[styles.textFieldContainerLandscape, {marginTop: DeviceInfo.isTablet () ? Metrics.baseMargin * Metrics.screenHeight * 0.007 : Metrics.baseMargin * Metrics.screenHeight * 0.003}]}>
                  <MKTextField
                    ref='password'
                    style={[styles.textFieldLandscape, {left: DeviceInfo.isTablet() ? 40 : null}]}
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
                  <View style={[styles.loginButton, {marginTop: DeviceInfo.isTablet() ? 52 : -Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0002, top: DeviceInfo.isTablet() ? null : 30}]}>
                      {this.props.mfetching || this.props.fetching
                        ? <SingleColorSpinner strokeColor={Colors.orange} style={styles.spinnerView} />
                      : <TouchableOpacity onPress={() => { this._handleLogin() }}>
                          <Image style={{
                            width:  DeviceInfo.isTablet() ? Metrics.screenWidth * 0.5 : Metrics.screenWidth * 0.7,
                            borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
                            height: Metrics.screenHeight * 0.064}}
                            source={Images.loginButtonGreen} />
                      </TouchableOpacity> }
                  </View>
                </View>
            
              </View>
              <View style={styles.touchSignRow}>
                <TouchableOpacity onPress={() => {
                  NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})
                  gaTracker.trackEvent('Login', 'Forgot Password')
                }}>
                  <Text allowFontScaling={false} style={[styles.link, {bottom:  DeviceInfo.isTablet() ? 125 : 160, right:  DeviceInfo.isTablet() ? 150 : 90}]}>{I18n.t('forgotPassword')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  NavigationActions.screen_1()
                  gaTracker.trackEvent('Login', 'Sign Up')
                }}>
                  <Image style={[styles.signUpButtonLandscape, {left: DeviceInfo.isTablet() ? 185 : 80}]} source={Images.signUpButton} />
                </TouchableOpacity>
              </View>
            </View>
          </View>}
       
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
        width: this.state.isPortrait ? window.width : window.width * 1,
        height: window.height,
        opacity: transparent,
        backgroundColor: Colors.snow
      }} >

      {this.state.isPortrait ?  <View style={styles.container}>
          <Image source={Images.background} style={styles.backgroundImage} />
          <Clouds isPortrait={this.state.isPortrait} />
          <CityScape isPortrait={this.state.isPortrait} />
          <View keyboardShouldPersistTaps='always' style={styles.container}>
            { this.props.touchAvailable ?
                this._renderTouchAvailableLogin()
              :
                this._renderLogin()
            }
          </View>
          {this.state.modalVisible && this._moreInfo()}
          <View style={styles.footer}>
            <View>
              <Text allowFontScaling={false} style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
            <View>
              { this._infoMenu() }
            </View>
          </View>
        </View>:  <ScrollView style={styles.container}>
          <Image source={Images.background} style={[styles.backgroundImageLandscape, {height: DeviceInfo.isTablet() ? Metrics.screenHeight - (Metrics.screenHeight * 0.43) : Metrics.screenHeight - (Metrics.screenHeight * 0.59)}]} />
          <Clouds isPortrait={this.state.isPortrait}/>
          <CityScape isPortrait={this.state.isPortrait}/>
          <View keyboardShouldPersistTaps='always' style={styles.container}>
            { this.props.touchAvailable ?
                this._renderTouchAvailableLogin()
              :
                this._renderLogin()
            }
          </View>
          {this.state.modalVisible && this._moreInfo()}
          <View style={[styles.footerLandscape, {left: DeviceInfo.isTablet() ? 20 : 25, top: DeviceInfo.isTablet() ? 720 : 290}]}>
            <View>
              <Text allowFontScaling={false} style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
            <View style={{left: DeviceInfo.isTablet() ? 10 : 30, bottom:  DeviceInfo.isTablet() ? 15 : 10}}>
              { this._infoMenu() }
            </View>
          </View>
        </ScrollView>}

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
    touchEnabled: state.setting.touchEnabled,
    touchCheckboxVisible: state.login.touchCheckboxVisible,
    touchAvailable: state.setting.touchAvailable,
    logoutUrl: state.login.logoutUrl,
    credentialStored: state.setting.credentialStored,
    isPortrait: state.setting.isPortrait
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
    changeTouchEnabled: (touchEnabled) => dispatch(SettingActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(SettingActions.changeCredentialStored(credentialStored)),
    changeTouchAvailable: (touchAvailable) => dispatch(SettingActions.changeTouchAvailable(touchAvailable)),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
