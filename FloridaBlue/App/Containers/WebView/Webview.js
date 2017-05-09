import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  WebView,
  Platform,
  requireNativeComponent
  } from 'react-native'
import styles from './WebViewStyle'
import NavItems from '../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts, Images} from '../../Themes'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
const window = Dimensions.get('window')
var WEBVIEW_REF = 'webview'
var btoa = require('btoa')
module.exports = requireNativeComponent('WebViewManager', null);

class Webview extends Component {
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.backButton()}
      </View>
      <Text style={{color: Colors.flBlue.ocean,
        backgroundColor: Colors.transparent,
        fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
                  // marginLeft: Metrics.baseMargin,
        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
        fontFamily: Fonts.type.headerFont,
        fontWeight: (Platform.OS === 'ios') ? '500' : '400',
        marginRight: Metrics.screenWidth * 0.30
      }}>
                      Florida Blue
        </Text>

    </Image>)
  }

  render () {
    var dynamic = this.props.responseURL
    var smToken = this.props.smToken
    var redirect = null
    onNavigationStateChange = (navState) => {
      console.tron.log(navState.url)
      console.tron.log(navState)
    }
    onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!
      console.tron.log(event, 'request')
      return true
    }

    if (this.props.smToken) {
      redirect = {
        uri: dynamic,
        method: 'GET'
      }
    } else {
      redirect = {
        uri: dynamic,
        method: 'GET'
      }
    }
    console.tron.log('redirect' + JSON.stringify(redirect))
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        {this._renderHeader()}
        <WebView
          source={redirect}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
       // Below functions for debugging
       //   onNavigationStateChange={onNavigationStateChange}
       //   onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            />
      </View>
    )
  }
}

Webview.propTypes = {
/*  fetching: PropTypes.bool,
  responseURL : PropTypes.string, */
  smToken: PropTypes.string
}
const mapStateToProps = (state) => {
  return {
  /*  fetching: state.login.fetching,
    responseURL: state.login.responseURL, */
    smToken: state.login.smToken
  }
}
export default connect(mapStateToProps)(Webview)
