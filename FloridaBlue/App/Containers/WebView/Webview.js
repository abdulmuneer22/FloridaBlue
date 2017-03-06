import React, { Component, PropTypes } from 'react'
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, Button, Modal,WebView } from 'react-native'
import styles from './WebViewStyle'
import NavItems from '../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import WKWebView from 'react-native-wkwebview-reborn'
import  SafariView  from 'react-native-safari-view'
import RCTSFSafariViewController from 'react-native-sfsafariviewcontroller'
import axios from 'axios'

const window = Dimensions.get('window')
var WEBVIEW_REF = 'webview'
var btoa = require('btoa')
const jsForInjection = `
  var el = document.getElementsByTagName('body')[0]
  el.style.height = '${Dimensions.get('window').height}px'
`
class Webview extends Component {
  constructor (props) {
    super(props)
     this.state = {
       responsedata : null
     }
  }
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>

      {NavItems.backButton()}
      <Text style={{color: Colors.flBlue.ocean,
        backgroundColor: Colors.transparent,
        fontFamily:Fonts.type.headerFont,
        fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
        marginRight: 100,
        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023}}>
        Florida Blue
        </Text>

    </Image>)
  }
  _pressHandler() {
    RCTSFSafariViewController.open('https://google.com/');
  }

    
    componentDidMount() {
     
      axios.get('https://mobapi-stga.bcbsfl.com/mob/api/v1/webview')
      .then(res => {
        var linkto = res.data.responseUrl
        var headerCookies = res.data.serviceHeaders.Cookie
        var responsedata = {
          linkto :linkto,
          headerCookies :headerCookies
        }
        
        this.setState({responsedata});
       
      });

    }


  render () {
    var dynamic = this.props.responseURL
    var smToken = this.props.smToken
    var redirect = null
    if (this.state.responsedata != null) {
      redirect = {
        uri: 'https://mobapi-stga.bcbsfl.com/mob/api/v1/webview' ,
        method: 'GET',
        headers: {
          'Cookie': this.state.responsedata.headerCookies,
          'User-Agent':"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
        
      }
    } else {
      redirect = {
        uri: dynamic,
        method: 'GET'
      }
    }

    console.log("redirect"+JSON.stringify(redirect));
    console.log("state of the component"+JSON.stringify(this.state));
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this._renderHeader()}
        {this._pressHandler()}  
 
      </View>
    )
  }
}
onShouldStartLoadWithRequest = (event) => {
  // Implement any custom loading logic here, don't forget to return!

  return true
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
