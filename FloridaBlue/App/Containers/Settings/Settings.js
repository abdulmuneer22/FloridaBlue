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
import LoginActions from '../../Redux/LoginRedux'
import { Images, Metrics, Colors, Fonts } from '../../Themes'

var TouchManager = NativeModules.TouchManager

class Settings extends Component {

  constructor (props) {
    super(props)
    this._handleSwitchToggle = this._handleSwitchToggle.bind(this)
  }

  componentDidMount () {

  }

  _disableTouchID () {
    TouchManager.removeCredentials((error, credentials) => {
      var status = credentials[0]
      if (status == 'SUCCESS') {
        this.props.changeTouchEnabled(false)
        Alert.alert('Success', 'Touch ID has been disabled on this device.', [
          {
            text: 'OK'
          }
        ])
      }
    })
  }

  _enableTouch () {
    TouchManager.enableTouchID((error, status) => {
      var status = status[0]
      if (status == 'ENABLED') {
        this.props.changeTouchEnabled(true)
        Alert.alert('Success', 'Touch ID has been enabled on this device. Log in again to complete setup.', [
          {
            text: 'OK'
          }
        ])
      }
    })
  }

  _renderHeader () {
    return (
      <Image style={styles.headerContainer} source={Images.newHeaderImage}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
          {NavItems.backButton()}
        </View>
        <Text style={styles.headerTextStyle}>Settings</Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  _handleSwitchToggle (e) {
    if (e.checked) {
      this._enableTouch()
    } else {
      this._disableTouchID()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={styles.touchContainer}>
          {this.props.touchEnabled ?
            <Text style={styles.touchIdText}>Touch ID Enabled</Text>
          :
            <Text style={styles.touchIdText}>Touch ID Disabled</Text>
          }
          <MKSwitch style={styles.touchStatusSwitch}
            checked={this.props.touchEnabled}
            trackSize={30}
            trackLength={52}
            onColor='rgba(255,152,0,.3)'
            thumbOnColor={MKColor.Orange}
            rippleColor='rgba(255,152,0,.2)'
            onCheckedChange={(e) => this._handleSwitchToggle(e)}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    touchEnabled: state.login.touchEnabled,
    credentialStored: state.login.credentialStored
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTouchEnabled: (touchEnabled) => dispatch(LoginActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(LoginActions.changeCredentialStored(credentialStored))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
