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
import NavItems from '../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../../Themes'
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
        source={{uri: 'https://www.floridablue.com/general/web-accessibility'}}
        style={{margin:10}}
      />
      </View>
    );

  }
}

export default Webview
