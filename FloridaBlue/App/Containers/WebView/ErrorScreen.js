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
  BackAndroid,
  Platform
  } from 'react-native'
import styles from './WebViewStyle'
import NavItems from '../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts, Images} from '../../Themes'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
var RCTNetworking = require('RCTNetworking')
const window = Dimensions.get('window')

class ErrorScreen extends Component {
  componentDidMount () {
    RCTNetworking.clearCookies((cleared) => {
      console.tron.log('clearing local cookies for the app')
    })
  }

  _handlePressBack () {
    NavigationActions.login()
  }
  _renderHeader () {
    return (<Image style={styles.headerContainerError} source={Images.themeHeader}>

      <Text style={{color: Colors.flBlue.ocean,
        alignSelf: 'center',
        backgroundColor: Colors.transparent,
        fontFamily: Fonts.type.headerFont,
        fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,

        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023}}>
        Florida Blue
        </Text>

    </Image>)
  }
  render () {
    return (

      <View style={{flex: 1}}>
        <Image style={styles.headerContainerError} source={Images.errorPage}>

          <TouchableOpacity onPress={() => { this._handlePressBack() }}>
            <Image style={{width: Metrics.screenWidth * 0.35,
              backgroundColor: Colors.transparent,
              marginLeft: Metrics.searchBarHeight,
              marginTop: (Platform.OS === 'ios') ? -Metrics.textHeight : null,
              borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
              height: Metrics.screenHeight * 0.055}} source={Images.errorBackButton} />

          </TouchableOpacity>

        </Image>
      </View>

    )
  }
}

export default ErrorScreen
