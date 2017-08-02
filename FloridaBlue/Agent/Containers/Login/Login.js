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
  BackHandler,
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
import HideableView from 'react-native-hideable-view'
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
  responseURL : string
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
    this._handleMemberLogin = this._handleMemberLogin.bind(this)
  }

  componentDidMount () {

  }

  componentWillReceiveProps (newProps) {

  }

  _handleLogin () {
    NavigationActions.Agency()
  }

  _handleMemberLogin () {
    NavigationActions.MemberLogin()
  }

  _renderAgentLogin () {
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
              source={Images.agentLogin} />
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
          <CityScape />

          <View keyboardShouldPersistTaps='always' style={styles.container}>

            <LogoView>
              <Image source={Images.clearLogo} style={styles.logo} />
            </LogoView>

            { this._renderAgentLogin() }

            <SignUpView>
              <TouchableOpacity style={styles.agentLinkContainer} onPress={() => {
                NavigationActions.MyView({responseURL: urlConfig.forgotPwdURL})
                gaTracker.trackEvent('Login', 'Forgot Password')
              }}>
                <Text allowFontScaling={false} style={styles.agentLink}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.agentLinkContainer} onPress={this._handleMemberLogin}>
                <Text allowFontScaling={false} style={styles.agentLink}>{'Back to Member Login'}</Text>
              </TouchableOpacity>
            </SignUpView>
          </View>

          <View style={styles.footer}>
            <View>
              <Text allowFontScaling={false} style={styles.footerText}>{I18n.t('footerText')}</Text>
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
    responseURL: state.login.responseURL
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
