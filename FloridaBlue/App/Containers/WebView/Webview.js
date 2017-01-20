import React, { Component,PropTypes } from 'react';
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
import {connect} from 'react-redux'
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
    var dynamic = this.props.responseURL
    var redirect ={
      uri: dynamic
    }

    return (
      <View style={{
          flex : 1 ,
          backgroundColor : 'white'
      }}>
      {this._renderHeader()}

      <WebView

        source={redirect}
              />
      </View>
    );

  }
}

Webview.propTypes = {
  fetching: PropTypes.bool,
  responseURL : PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    responseURL: state.login.responseURL
  }
}

export default connect(mapStateToProps)(Webview)
