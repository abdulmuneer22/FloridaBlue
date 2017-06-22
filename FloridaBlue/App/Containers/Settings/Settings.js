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

  _disableTouchID() {
    TouchManager.removeCredentials((error, credentials) => {
      var status = credentials[0]
      if (status == 'SUCCESS') {
        this.props.changeTouchEnabled(false)
        this.props.changeCredentialStored(false)
      }
    })
  }

  _enableTouch() {
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

  _showDisableAlert() {
    Alert.alert(
      'Disable Touch ID',
      'Are you sure you want to turn off Touch ID?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: () => this._disableTouchID()},
      ],
      { cancelable: false }
    )
  }

  _resetToggle() {
    if (this.props.touchEnabled) {
      this.props.changeTouchEnabled(true)
    } else {
      this.props.changeTouchEnabled(false)
    }
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

  _handleSwitchToggle(e) {
    if (this.props.credentialStored) {
      TouchManager.retrieveCredentials((error, credentials) => {
        let credentialObject = credentials[0]
        let status = credentialObject['status']
        if (status === 'SUCCESS') {
          let username = credentialObject['username']
          if (username === this.props.username) {
            this._showDisableAlert()
          } else {
            Alert.alert(
              'Sorry',
              'Only the default user of this device can modify this setting.',
              [
                {text: 'Ok', onPress: () => this.forceUpdate(), style: 'cancel'}
              ],
              { cancelable: false }
            )
          }
        } else {
          this._disableTouchID()
          Alert.alert(
            'Oops!',
            'Oops! Looks like there\'s a problem. Please log in using your user ID and password to reset Touch ID.',
            [
              {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'}
            ],
            { cancelable: false }
          )
        }
      })
    } else {
      this._enableTouch()
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
            <Text style={styles.touchIdText}>Enable Touch ID</Text>
          }
          <MKSwitch style={styles.touchStatusSwitch}
            checked={this.props.touchEnabled}
            trackSize={30}
            trackLength={52}
            onColor="rgba(255,152,0,.3)"
            thumbOnColor={MKColor.Orange}
            rippleColor="rgba(255,152,0,.2)"
            onPress={() => this._handleSwitchToggle()}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    touchEnabled: state.login.touchEnabled,
    credentialStored: state.login.credentialStored,
    username: state.login.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTouchEnabled: (touchEnabled) => dispatch(LoginActions.changeTouchEnabled(touchEnabled)),
    changeCredentialStored: (credentialStored) => dispatch(LoginActions.changeCredentialStored(credentialStored))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
