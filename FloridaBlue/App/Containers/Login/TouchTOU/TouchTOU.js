import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  NativeModules
} from 'react-native'

import {Actions as NavigationActions} from 'react-native-router-flux'
import LoginActions from '../../../Redux/LoginRedux'
import SettingActions from '../../../Redux/SettingRedux'
import { Colors, Fonts, Images, Metrics } from '../../../Themes'
import { MKSpinner } from 'react-native-material-kit'
import { connect } from 'react-redux'
import styles from './TouchTOUStyle'
import I18n from 'react-native-i18n'

var TouchManager = NativeModules.TouchManager
const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class TouchTOU extends Component {

  _handleClose () {
    TouchManager.removeCredentials((error, credentials) => {
      let status = credentials[0]
      if (status == 'SUCCESS' || 'NO EXISTING CREDENTIALS') {
        this.props.changeTouchEnabled(false)
        this.props.changeCredentialStored(false)
        this.props.handleChangeUserName("")
        this.props.handleChangePassword("")
        NavigationActions.WelcomeDashBoard()
      }
    })
  }

  _disableTouchID () {
    TouchManager.removeCredentials((error, credentials) => {
      let status = credentials[0]
      if (status == 'SUCCESS' || 'NO EXISTING CREDENTIALS') {
        this.props.changeTouchEnabled(false)
        this.props.changeCredentialStored(false)
        this.props.handleChangeUserName("")
        this.props.handleChangePassword("")
        NavigationActions.WelcomeDashBoard()
      }
    })
  }

  _handleAccept () {
    TouchManager.authenticateUser((error, authInfo) => {
      var authObject = authInfo[0]
      var authStatus = authObject['authStatus']
      if (authStatus == 'YES') {
        TouchManager.storeCredentials(this.props.username, this.props.password)
        this.props.changeCredentialStored(true)
        this.props.handleChangePassword("")
        NavigationActions.WelcomeDashBoard()
      } else {
        var showError = true
        var errorMessage = ''
        var errorTitle = 'Oops!'
        var errorCode = authObject['authErrorCode']

        switch (errorCode) {
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
            this._disableTouchID()
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
    })
  }

  _renderHeader () {
    return (
      <Image style={styles.headerContainer} source={Images.newHeaderImage}>
        <View style={{
          alignItems: 'center',
          marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
          marginLeft: Metrics.images.xm * Metrics.screenWidth * 0.004
        }}>
          <Image source={Images.themeLogo} style={{
            width: Metrics.screenWidth * 0.65,
            resizeMode: 'contain',
            height: Metrics.images.xm1
          }}
        />
        </View>
      </Image>
    )
  }

  _renderNoticeText() {
    return this.props.touchDisclaimer.map(function(notice, i) {
      return (
        <Text allowFontScaling={false} style={styles.paragraph}>{notice}</Text>
      )
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>
          <View>
            {this._renderNoticeText()}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonView} onPress={() => this._handleClose() }>
                <View style={styles.buttonTextView}>
                  <Text allowFontScaling={false} style={styles.footerText}>Decline</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonView} onPress={() => this._handleAccept() }>
                <View style={styles.buttonTextView}>
                  <Text allowFontScaling={false} style={styles.footerText}>Accept</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    touchEnabled: state.setting.touchEnabled,
    credentialStored: state.setting.credentialStored,
    touchAvailable: state.login.touchAvailable,
    username: state.login.username,
    password: state.login.password,
    touchDisclaimer: state.login.touchDisclaimer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    changeTouchEnabled: (touchEnabled) => dispatch(SettingActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(SettingActions.changeCredentialStored(credentialStored)),
    handleChangeUserName: (username) => dispatch(LoginActions.changeUserName(username)),
    handleChangePassword: (password) => dispatch(LoginActions.changePassword(password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouchTOU)
