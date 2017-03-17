import React, { Component } from 'react'
import {
  Alert,
  Text,
  View,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  passhandleChangePasswordword :() => any
}

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200'
  })
  .build()

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
    Keyboard.dismiss()
    var username = this.props.username
    var password = this.props.password

    if (!username && !password) {
      Alert.alert(
             ' ' ,
            'Please enter your user ID/Password.',
            [
              {text: 'OK' },
            ]
          )
     // alert('Please enter your user ID/Password.')
    } else
    if (!username && password) {
      alert('Please enter your user ID.')
    } else
    if (username && !password) {
      alert('Please enter your password.')
    } else {
        // const { username, password } = this.state
      this.isAttempting = true
        // attempt a login - a saga is listening to pick it up from here.
      this.props.attemptLogin(username, password)
    }
  }

  componentDidMount () {
    // after registration fire login for auto login
    /*
    if (this.props.username && this.props.password) {
      this.props.attemptLogin(this.props.username, this.props.password)
    }
    */
  }

  componentWillReceiveProps (newProps) {
  // this.forceUpdate()   makes to rerender the stuff     Got the issue of redering
  // Did the login attempt complete?

    console.log('I am receving new props' + newProps.responseURL)
    console.log('I am receving new smToken' + newProps.smToken)
    var responseURL = newProps.responseURL

    if (this.isAttempting && !newProps.fetching && newProps.error === null && responseURL) {
    // login path
      if (responseURL == 'login') {
        if (!newProps.mfetching) {
          if (!newProps.merror) {
            if (newProps.termsOfUse) {
              NavigationActions.WelcomeDashBoard()
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
        this.props.attemptLogout()
        alert('Please use your user ID and password to log in. You must be a Florida Blue member.')
      // Disabled Account
      } else if (responseURL.includes('apsparam=usrlocked')) {
        this.props.attemptLogout()
        alert('Your account is disabled.  Click Support for help')
      // Password About to Expire
      } else {
        NavigationActions.MyView({
          responseURL: newProps.responseURL + '?channel=mobile'
        })
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

          <KeyboardAwareScrollView keyboardShouldPersistTaps style={styles.container}>

            <LogoView>
              <Image source={Images.clearLogo} style={styles.logo} />
            </LogoView>

            <LoginView>
              <View style={styles.row}>
                <TextfieldWithFloatingLabel
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
                <TextfieldWithFloatingLabel
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
              <View style={styles.row}>
                <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://registration-stga.bcbsfl.com/ecir/public/MemberFPSSelect.do'})}>
                  <Text style={styles.link}>{I18n.t('forgotPassword')}</Text>
                </TouchableOpacity>
              </View>
            </LoginView>

            <LoginButtonView>
              <TouchableOpacity onPress={() => { this._handleLogin() }}>
                <Image source={Images.loginButtonGreen} />
              </TouchableOpacity>
            </LoginButtonView>
            <SignUpView>
              <TouchableOpacity onPress={() => NavigationActions.screen_1()}>
                <Text style={styles.link}>{I18n.t('signUp')}</Text>
              </TouchableOpacity>
            </SignUpView>

          </KeyboardAwareScrollView>

          {this.state.modalVisible && this._moreInfo()}

          <View style={styles.footer}>
            <View>
              <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => {
                if (this.state.modalVisible === true) {
                  this.setState({modalVisible: false})
                } else {
                  this.setState({modalVisible: true})
                }
              }}>
                <Image source={Images.infoIcon} />
              </TouchableOpacity>
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
    password: state.login.password
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
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
