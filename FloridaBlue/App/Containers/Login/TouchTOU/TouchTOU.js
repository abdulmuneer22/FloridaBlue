import React, { Component } from 'react'
import {
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
import { connect } from 'react-redux'

// Styles
import styles from './TouchTOUStyle'

// I18n
import I18n from 'react-native-i18n'

var TouchManager = NativeModules.TouchManager

class TouchTOU extends Component {
  _handleClose () {
    TouchManager.removeCredentials((error, credentials) => {
      if (error) {
        // handle error..
      } else {
        var status = credentials[0]
        if (status == 'SUCCESS') {
          this.props.changeTouchEnabled(false)
          NavigationActions.pop()
        }
      }
    })
  }
  _handleAccept () {
    TouchManager.retrieveCredentials((error, credentials) => {
      if (error) {
        // handle error..
      } else {
        var password = credentials[0]
        var username = credentials[1]
        this.isAttempting = true
        this.props.attemptLogin(username, password)
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeOne')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeTwo')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeThree')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeFour')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeFive')}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => { this._handleAccept() }}>
              <Image style={{width: Metrics.screenWidth * 0.35,
                borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                height: Metrics.screenHeight * 0.055}} source={Images.iAgree} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this._handleClose() }}>
              <Image style={{width: Metrics.screenWidth * 0.35,
                borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                height: Metrics.screenHeight * 0.055}} source={Images.closeButtonGray} />
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    touchEnabled: state.login.touchEnabled
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    changeTouchEnabled: (touchEnabled) => dispatch(LoginActions.changeTouchEnabled(touchEnabled))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouchTOU)
