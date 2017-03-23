// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState } from 'react-native'
import NavigationRouter from '../../Navigation/NavigationRouter'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import StartupActions from '../../Redux/StartupRedux'
import ReduxPersist from '../../Config/ReduxPersist'
import LoginActions from '../../Redux/LoginRedux'
import styles from './RootContainerStyle'
var RCTNetworking =require('RCTNetworking');
var inactiveTime = Date
var activeTime = Date

class RootContainer extends Component {

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    AppState.addEventListener('change', this._handleAppState);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppState);
  }

  _handleAppState() {
    var appState = AppState.currentState;
    if (appState.match(/inactive|background/)) {
      console.log("Went inactive..");
      var date = new Date();
      inactiveTime = date.getTime();
    } else if (appState.match(/active/)) {
      console.log("Went active..");
      var date = new Date();
      activeTime = date.getTime();
      var diffMs = (inactiveTime - activeTime); // milliseconds between inactive and active times
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // converted to minutes
      var elapsedTime = Math.abs(diffMins);
      if (elapsedTime >= 1) {
        console.log("Logout the user..");
        // Call logout logic
        RCTNetworking.clearCookies((cleared)=>{})
        LoginActions.logoutRequest()
        NavigationActions.login()
      } else {
        console.log("Keep the session..");
        inactiveTime = null;
        activeTime = null;
      }
    }
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
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
    userName: state.login.username
  }
}
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  attemptLogout: () => dispatch(LoginActions.logoutRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
