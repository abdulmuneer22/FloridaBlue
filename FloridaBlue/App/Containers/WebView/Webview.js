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
  WebView
  } from 'react-native'
import styles from './WebViewStyle'
import NavItems from '../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts, Images} from '../../Themes'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
const window = Dimensions.get('window')
var WEBVIEW_REF = 'webview'
var btoa = require('btoa')
const jsForInjection = `
  var el = document.getElementsByTagName('body')[0];
  el.style.height = '${Dimensions.get('window').height}px';
`
class Webview extends Component {
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginLeft:Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
      {NavItems.backButton()}
      </View>
      <Text style={{color: Colors.flBlue.ocean,
        backgroundColor: Colors.transparent,
        fontFamily: Fonts.type.headerFont,
        fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
        marginRight: Metrics.screenWidth * 0.25,
        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023}}>
        Florida Blue
        </Text>

    </Image>)
  }
  render () {
    var dynamic = this.props.responseURL
    var smToken = this.props.smToken
    var redirect = null
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
    console.log('redirect' + JSON.stringify(redirect))
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        {this._renderHeader()}
        <WebView
          source={redirect}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScript={jsForInjection}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
          contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
              />
      </View>
    )
  }
}
onNavigationStateChange = (navState) => {
  console.log("Nav state changed..")
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
}
goBack = () => {
  this.refs[WEBVIEW_REF].goBack()
}
goForward = () => {
  this.refs[WEBVIEW_REF].goForward()
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
