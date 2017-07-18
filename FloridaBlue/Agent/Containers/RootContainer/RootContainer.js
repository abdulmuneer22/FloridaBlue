// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import StartupActions from '../../Redux/StartupRedux'
import ReduxPersist from '../../Config/ReduxPersist'
import LoginActions from '../../Redux/LoginRedux'
import styles from './RootContainerStyle'
import {PushController} from '../PushNotifications'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';

var RCTNetworking = require('RCTNetworking')
var inactiveTime = Date
var activeTime = Date
var timerStarted = false
var component = null
var timerStarted = false

class RootContainer extends Component {
  constructor () {
    super()
    component = this
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    AppState.addEventListener('change', this._handleAppState)
    GoogleAnalyticsSettings.setDispatchInterval(30);
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppState)
  }

  componentWillReceiveProps () {
    console.tron.log('Component received props..', this.props)
  }

  _handleAppState () {
    let appState = AppState.currentState
    if (component.props && component.props.userName) {
      if (appState.match(/inactive|background/)) {
        if (timerStarted == false) {
          var date = new Date()
          inactiveTime = date.getTime()
          timerStarted = true
        }
      } else if (appState.match(/active/)) {
        var date = new Date()
        activeTime = date.getTime()
        var diffMs = (inactiveTime - activeTime) // milliseconds between inactive and active times
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // converted to minutes
        var elapsedTime = Math.abs(diffMins)
        if (elapsedTime >= 15) {
            // Call logout logic
          timerStarted = false
          RCTNetworking.clearCookies((cleared) => {})
          component.props.attemptLogout(component.props.logoutUrl)
          NavigationActions.login()
        } else {
          inactiveTime = Date
          activeTime = Date
          timerStarted = false
        }
      }
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <PushController />
        <NavigationRouter />
      </View>
    )
  }
}

RootContainer.propTypes = {
  userName: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    userName: state.login.username,
    logoutUrl: state.login.logoutUrl,
    currentRouter: state.login.currentRouter
  }
}
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  attemptLogout: (logoutUrl) => dispatch(LoginActions.logoutRequest(logoutUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
