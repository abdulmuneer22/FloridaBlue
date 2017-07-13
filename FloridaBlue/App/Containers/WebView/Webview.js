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
import WKWebView from 'react-native-wkwebview-reborn'
import SettingActions from '../../Redux/SettingRedux'
const window = Dimensions.get('window')
var WEBVIEW_REF = 'webview'
var btoa = require('btoa')

class Webview extends Component {
  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.backButton()}
      </View>
      <View style={this.props.isPortrait ? styles.headerView : styles.headerViewLandscape}>
        <Image source={Images.themeLogo} style={{
          width: Metrics.screenWidth * 0.65,
          resizeMode: 'contain',
          height: Metrics.images.xm1
        }}
      />
      </View>

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
      let jsCode = `
        var d = document.getElementsByTagName('a');
        for (var i = 0; i < d.length; i++) {
            if (d[i].getAttribute('target') == '_blank') {
               d[i].className += ' class_two'
                d[i].removeAttribute('target');
            }

             if (d[i].getAttribute('onclick') != undefined && (
              d[i].getAttribute('onclick').indexOf('window.close') > -1 ||
              d[i].getAttribute('onclick').indexOf('window.print') > -1 )
            ) {
              
                d[i].parentNode.style.display='none';
            }
        }
    `;

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
       //   customUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239eSafari/602.1"
       //   sendCookies={true}
       // Below functions for debugging
       //   onNavigationStateChange={onNavigationStateChange}
       //   onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
         injectedJavaScript={jsCode}
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
    smToken: state.login.smToken,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}
export default connect(mapStateToProps)(Webview)
