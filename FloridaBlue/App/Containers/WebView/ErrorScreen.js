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
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      {NavItems.backButton()}
      <Text style={{color: Colors.flBlue.ocean,
        backgroundColor: Colors.transparent,
        fontFamily:Fonts.type.headerFont,
        fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
        marginRight: 80,
        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023}}>
        Florida Blue
        </Text>

    </Image>)
  }
  render () {
    return (

      <View style={styles.container}>
        {this._renderHeader()}
        
     <View style={{margin:10}}>

        <Text style={{fontSize:Fonts.size.h3,color:Colors.flBlue.anvil,fontFamily:Fonts.type.headerFont}}> We are Sorry, Please login after some time!!!</Text>
    
          </View>
       

      </View>
    )
  }
}



export default ErrorScreen
