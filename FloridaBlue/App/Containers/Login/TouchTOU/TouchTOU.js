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
      var status = credentials[0]
      if (status == 'SUCCESS') {
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
        TouchManager.removeCredentials((error, credentials) => {
          var status = credentials[0]
          if (status == 'SUCCESS') {
            this.props.changeTouchEnabled(false)
            this.props.changeCredentialStored(false)
            this.props.handleChangeUserName("")
            this.props.handleChangePassword("")
            NavigationActions.WelcomeDashBoard()
          }
        })
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

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>
          <View>
            <Text style={styles.paragraph}>{I18n.t('touchNoticeOne')}</Text>
            <Text style={styles.paragraph}>{I18n.t('touchNoticeTwo')}</Text>
            <Text style={styles.paragraph}>{I18n.t('touchNoticeThree')}</Text>
            <Text style={styles.paragraph}>{I18n.t('touchNoticeFour')}</Text>
            <Text style={styles.paragraph}>{I18n.t('touchNoticeFive')}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonView} onPress={() => this._handleClose() }>
                <View style={styles.buttonTextView}>
                  <Text style={styles.footerText}>Close</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonView} onPress={() => this._handleAccept() }>
                <View style={styles.buttonTextView}>
                  <Text style={styles.footerText}>Accept</Text>
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
    touchEnabled: state.login.touchEnabled,
    credentialStored: state.login.credentialStored,
    username: state.login.username,
    password: state.login.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    changeTouchEnabled: (touchEnabled) => dispatch(LoginActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(LoginActions.changeCredentialStored(credentialStored)),
    handleChangeUserName: (username) => dispatch(LoginActions.changeUserName(username)),
    handleChangePassword: (password) => dispatch(LoginActions.changePassword(password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouchTOU)
