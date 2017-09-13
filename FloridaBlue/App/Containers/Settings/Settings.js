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

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { MKSwitch, MKColor } from 'react-native-material-kit'
import styles from './SettingsStyle'
import NavItems from '../../../Navigation/NavItems.js'
import { Card as BCard} from 'native-base'
import SettingActions from '../../Redux/SettingRedux'
import { Images, Metrics, Colors, Fonts } from '../../Themes'
import Flb from '../../Themes/FlbIcon'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import DeviceInfo from 'react-native-device-info'

const Permissions = require('react-native-permissions')
let iOSTouchManager = NativeModules.TouchManager
let AndroidTouchManager = NativeModules.TouchManager
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

class Settings extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showTouchSetting: true
    }
    this._handleTouchToggle = this._handleTouchToggle.bind(this)
    this._handleGeoToggle = this._handleGeoToggle.bind(this)
  }

  componentDidMount () {
    if (this.props.credentialStored) {
      if (Platform.OS === 'ios') {
        iOSTouchManager.retrieveCredentials((error, iosStatus) => {
          this._handleCredentialRetrieval(iosStatus[0])
        })
      } else {
        AndroidTouchManager.retrieveCredentials((androidStatus) => {
          this._handleCredentialRetrieval(androidStatus)
        })
      }
    }
    gaTracker.trackScreenView('Settings')
  }

  _handleCredentialRetrieval(retrievalResponse) {
    let credentialObject = retrievalResponse[0]
    let status = credentialObject['status']

    if (status === 'SUCCESS') {
      let username = credentialObject['username']
      if (username != this.props.username) {
        this.props.changeTouchAvailable(false)
      }
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

  _handleDisableStatus(disableStatus) {
    if (disableStatus == 'SUCCESS' || 'NO EXISTING CREDENTIALS') {
      this.props.changeTouchEnabled(false)
      this.props.changeCredentialStored(false)
      this.props.changeTouchAvailable(true)
      this.forceUpdate()
      gaTracker.trackEvent('Settings', 'Disabled Touch ID')
    }
  }

  _handleLockedTouch () {
    this.props.changeCredentialStored(false)
    this.props.changeTouchEnabled(false)
    this.props.changeTouchAvailable(true)
    this.forceUpdate()
  }

  _handleTouchStatus(touchStatus) {
    let errorMessage = ''
    let errorTitle = 'Error'
    var showError = false

    switch (touchStatus) {
      case 'AUTHENTICATED':
        this._enableTouch()
        break
      case 'ENABLED':
        this._enableTouch()
        break
      case 'DISABLED':
        this._enableTouch()
        break
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
        this._disableTouchID()
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

  _enableTouch () {
    if (Platform.OS === 'ios') {
      iOSTouchManager.enableTouchID((error, iosStatus) => {
        this._handleEnableTouch(iosStatus[0])
      })
    } else {
      AndroidTouchManager.enableFingerprint((androidStatus) => {
        this._handleEnableTouch(androidStatus)
      })
    }
  }

  _handleEnableTouch(enableStatus) {
    if (enableStatus == 'ENABLED') {
      this.props.changeTouchEnabled(true)
      Alert.alert('Success', 'Next time you log in, you\'ll be prompted to set up Touch ID.', [
        {
          text: 'OK'
        }
      ])
    }
  }

  _resetTouchToggle () {
    this.props.changeTouchEnabled(true)
  }

  _showDisableAlert () {
    Alert.alert(
      'Disable Touch ID',
      'Are you sure you want to turn off Touch ID?',
      [
        {text: 'Cancel', style: 'cancel', onPress: () => this.forceUpdate()},
        {text: 'Yes', onPress: () => this._disableTouchID()}
      ],
      { cancelable: false }
    )
  }

  _renderHeader () {
    return (
      <Image style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage : Images.landscapeHeaderImage}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
          {NavItems.backButton()}
        </View>
        <Text allowFontScaling={false} style={styles.headerTextStyle}>Settings</Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  _handlePushToggle (e) {
    if (this.props.pushEnabled) {
      this.props.changePushEnabled(false)
    } else {
      this.props.changePushEnabled(true)
    }
  }

  _handleGeoToggle (e) {
    if (this.props.geolocationEnabled) {
      this.props.changeGeolocationEnabled(false)
    } else {
      this.props.changeGeolocationEnabled(true)
    }
  }

  _handleTouchToggle (e) {
    if (this.props.touchEnabled) {
      this._showDisableAlert()
    } else {
      if (Platform.OS === 'ios') {
        iOSTouchManager.checkTouchStatus((error, iosStatus) => {
          this._handleTouchStatus(iosStatus[0])
        })
      } else {
        AndroidTouchManager.checkTouchStatus((androidStatus) => {
          this._handleTouchStatus(androidStatus)
        })
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <View style={{flex: 1, backgroundColor: Colors.flBlue.bg2}}>

          { this.props.touchAvailable ?
            <View style={{ // alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1}}>
              <BCard style={{ //alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                            width: this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.78,
                            height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)}}>
                <View style={{ flex: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.transparent}}>
                  <Flb name={'fingerprint'} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} style={{right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.00025 : null): (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.005 : null)}}/>
                </View>
                <View style={{ flex: 6,
                                alignItems: 'flex-start'}}>
                  { this.props.touchEnabled ?
                    <Text allowFontScaling={false} style={[styles.cardText, {top: this.props.isPortrait ? Metrics.baseMargin * Metrics.screenHeight * 0.0028 : (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.00085 : null), right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.0006 : null): (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.0097 : null)}]}>Touch ID Enabled</Text>
                    :
                    <Text allowFontScaling={false} style={[styles.cardText, {top: this.props.isPortrait ? Metrics.baseMargin * Metrics.screenHeight * 0.0028 : (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.00085 : null), right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.0006 : null): (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.0097 : null)}]}>Enable Touch ID</Text>
                  }
                </View>
                <MKSwitch style={{
                                  marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0025,
                                  marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0025,
                                  bottom: this.props.isPortrait ?  (DeviceInfo.isTablet() ? null : Metrics.baseMargin * Metrics.screenHeight * 0.0016) : (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.0016 : Metrics.baseMargin * Metrics.screenHeight * 0.0036),
                                  right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.004 :  null) : (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.04 : Metrics.baseMargin * Metrics.screenHeight * 0.0055)
                                }}
                  checked={this.props.touchEnabled}
                  trackSize={30}
                  trackLength={52}
                  onColor={Colors.flBlue.ocean}
                  offColor={Colors.flBlue.lightBlue}
                  thumbOnColor={Colors.flBlue.ocean}
                  thumbOffColor={Colors.flBlue.ocean}
                  onPress={() => this._handleTouchToggle()}
                    />
              </BCard>
            </View>
            :
              null
          }

          <View style={{ alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1}}>
            <TouchableOpacity onPress={Permissions.openSettings} style={{ alignItems: 'center',
                                                                          justifyContent: 'center',
                                                                          flex: 1}}>
              <BCard style={{alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                            height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)}}>
                <View style={{flex: 2,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: Colors.transparent}}>
                  <Flb name={'explore'} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
                <View style={{  flex: 6,
                              alignItems: 'flex-start'}}>
                  <Text allowFontScaling={false} style={styles.cardText}>Geo-location Settings</Text>
                </View>
                <View style={{flex: 1,
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                              backgroundColor: Colors.transparent}}>
                  <Flb name='chevron-right' size={Metrics.icons.small * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
              </BCard>
            </TouchableOpacity>
          </View>

          <View style={{// alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1}}>
            <TouchableOpacity onPress={Permissions.openSettings}
                            style={{// alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1}}>
              <BCard style={{alignItems: 'center',
                              flexDirection: 'row',
                              flex: 1,
                              height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)}}>
                <View style={{flex: 2,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: Colors.transparent}}>
                  <Flb name={'exclamation-circle'} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
                <View style={{ flex: 6,
                               alignItems: 'flex-start'}}>
                  <Text allowFontScaling={false} style={styles.cardText}>Push Notification Settings</Text>
                </View>
                <View style={{ flex: 1,
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                              backgroundColor: Colors.transparent}}>
                  <Flb name='chevron-right' size={Metrics.icons.small * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
              </BCard>
            </TouchableOpacity>
          </View>

          <View style={{flex: 5}} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    touchEnabled: state.setting.touchEnabled,
    credentialStored: state.setting.credentialStored,
    touchAvailable: state.setting.touchAvailable,
    geolocationEnabled: state.setting.geolocationEnabled,
    pushEnabled: state.setting.pushEnabled,
    username: state.login.username,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTouchEnabled: (touchEnabled) => dispatch(SettingActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(SettingActions.changeCredentialStored(credentialStored)),
    changeTouchAvailable: (touchAvailable) => dispatch(SettingActions.changeTouchAvailable(touchAvailable)),
    changeGeolocationEnabled: (geolocationEnabled) => dispatch(SettingActions.changeGeolocationEnabled(geolocationEnabled)),
    changePushEnabled: (pushEnabled) => dispatch(SettingActions.changePushEnabled(pushEnabled)),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
