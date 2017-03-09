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




class ErrorScreen extends Component {

 _renderHeader () {
    return (<Image style={styles.headerContainerError} source={Images.themeHeader}>

      <Text style={{color: Colors.flBlue.ocean,
        alignSelf:'center',
        backgroundColor: Colors.transparent,
        fontFamily:Fonts.type.headerFont,
        fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,

        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023}}>
        Florida Blue
        </Text>

    </Image>)
  }
  render () {
    return (

      <Image style={styles.headerContainerError} source={Images.errorPage}>
      <View style={{marginTop:Metrics.screenHeight*0.15}}>
        <Text style={{fontSize:Fonts.size.h4,
          color:Colors.snow,
          textAlign:'center',
          fontFamily:Fonts.type.headerFont,
          backgroundColor:Colors.transparent}}>
          We are Sorry, Please login after some time!!!
          </Text>
          </View>
          </Image>

    )
  }
}



export default ErrorScreen
