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

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { MKSwitch, MKColor } from 'react-native-material-kit'
import styles from './SettingsStyle'
import NavItems from '../../Navigation/NavItems.js'
import { Card as BCard} from 'native-base'
import SettingActions from '../../Redux/SettingRedux'
import { Images, Metrics, Colors, Fonts } from '../../Themes'
import Flb from '../../Themes/FlbIcon'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const Permissions = require('react-native-permissions')
let TouchManager = NativeModules.TouchManager
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

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
      TouchManager.retrieveCredentials((error, credentials) => {
        let credentialObject = credentials[0]
        let status = credentialObject['status']
        if (status === 'SUCCESS') {
          let username = credentialObject['username']
          if (username != this.props.username) {
            this.setState({ showTouchSetting: false })
          }
        }
      })
    }
    gaTracker.trackScreenView('Settings')
  }

  _disableTouchID () {
    TouchManager.removeCredentials((error, credentials) => {
      var status = credentials[0]
      if (status == 'SUCCESS') {
        this.props.changeTouchEnabled(false)
        this.props.changeCredentialStored(false)
        gaTracker.trackEvent('Settings', 'Disabled Touch ID')
      }
    })
  }

  _enableTouch () {
    TouchManager.enableTouchID((error, status) => {
      var status = status[0]
      if (status == 'ENABLED') {
        this.props.changeTouchEnabled(true)
        Alert.alert('Success', 'Next time you log in, you\'ll be prompted to set up Touch ID.', [
          {
            text: 'OK'
          }
        ])
      }
    })
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
      <Image style={styles.headerContainer} source={Images.newHeaderImage}>
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
      this._enableTouch()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <View style={{flex: 1, backgroundColor: Colors.flBlue.bg2}}>

          { Platform.OS === 'ios' ?
            <View style={styles.cardContainer}>
              <BCard style={styles.card}>
                <View style={styles.cardIcon}>
                  <Flb name={'fingerprint'} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
                <View style={styles.cardTextContainer}>
                  { this.props.touchEnabled ?
                    <Text allowFontScaling={false} style={styles.cardText}>Touch ID Enabled</Text>
                    :
                    <Text allowFontScaling={false} style={styles.cardText}>Enable Touch ID</Text>
                  }
                </View>
                <MKSwitch style={styles.settingStatusSwitch}
                  checked={this.props.touchEnabled}
                  trackSize={30}
                  trackLength={52}
                  onColor={Colors.flBlue.lightsky}
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

          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={Permissions.openSettings} style={styles.cardContainer}>
              <BCard style={styles.card}>
                <View style={styles.cardIcon}>
                  <Flb name={'explore'} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text allowFontScaling={false} style={styles.cardText}>Geo-location Settings</Text>
                </View>
                <View style={styles.cardIndicator}>
                  <Flb name='chevron-right' size={Metrics.icons.small * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
              </BCard>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={Permissions.openSettings} style={styles.cardContainer}>
              <BCard style={styles.card}>
                <View style={styles.cardIcon}>
                  <Flb name={'exclamation-circle'} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text allowFontScaling={false} style={styles.cardText}>Push Notification Settings</Text>
                </View>
                <View style={styles.cardIndicator}>
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
    geolocationEnabled: state.setting.geolocationEnabled,
    pushEnabled: state.setting.pushEnabled,
    username: state.login.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTouchEnabled: (touchEnabled) => dispatch(SettingActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(SettingActions.changeCredentialStored(credentialStored)),
    changeGeolocationEnabled: (geolocationEnabled) => dispatch(SettingActions.changeGeolocationEnabled(geolocationEnabled)),
    changePushEnabled: (pushEnabled) => dispatch(SettingActions.changePushEnabled(pushEnabled))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
