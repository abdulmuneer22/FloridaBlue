import React, { Component } from 'react';
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
  } from 'react-native';

import styles from './WebViewStyle'
import NavItems from '../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../Themes'
import {Actions as NavigationActions} from 'react-native-router-flux'

const window=Dimensions.get('window');

class Webview extends Component {


  _renderHeader(){
  return <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Web View</Text>
    {NavItems.settingsButton()}
    </View>
  }

  render() {
    return (
      <View style={{
          flex : 1 ,
          backgroundColor : 'white'
      }}>
      {this._renderHeader()}

      <WebView

        source={{uri: 'https://registration-stga.bcbsfl.com/ecir/public/apsaction.do?apsparam=usrlocked&TARGET=https%3A%2F%2Fmobapi-stga%2Ebcbsfl%2Ecom%2Fmob%2Fapi%2Fv1%2Flogin'}}
              />
      </View>
    );

  }
}

export default Webview
