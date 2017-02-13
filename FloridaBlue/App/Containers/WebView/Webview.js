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
import {Colors, Metrics, Fonts} from '../../Themes'
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
    return <View style={styles.headerContainer}>
      {NavItems.backButton()}
      <Text style={[{color: Colors.snow, fontSize: Fonts.size.h4}]}>Web View</Text>
      {NavItems.settingsButton()}
    </View>
  }
  render () {
    var dynamic = this.props.responseURL
    var smToken = this.props.smToken
    var redirect = null
    if (this.props.smToken) {
      redirect = {
        uri: dynamic,
        method: 'GET',
        headers: {
          'Cookie': smToken
        }
      }
    } else {
      redirect = {
        uri: dynamic,
        method: 'GET'
      }
    }

    console.log("redirect"+JSON.stringify(redirect));



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
          injectedJavaScript={jsForInjection}
          allowUrlRedirect
          startInLoadingState
          contentInset={{top: -45, left: 0, bottom: 0, right: 0}}
              />
      </View>
    )
  }
}
onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!

    return true;
  };
goBack = () => {
  this.refs[WEBVIEW_REF].goBack();
};
goForward = () => {
  this.refs[WEBVIEW_REF].goForward();
};
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
