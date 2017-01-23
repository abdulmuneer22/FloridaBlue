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
var WEBVIEW_REF = 'webview';



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
    var setcookie = this.props.setcookie
    var headers = {
      'set-cookie' : setcookie
    }


    var redirect ={
      uri: dynamic,
      headers : headers
    }
    console.log("redirect"+JSON.stringify(redirect));

    return (
      <View style={{
          flex : 1 ,
          backgroundColor : 'white'
      }}>
      {this._renderHeader()}
      <WebView
        ref={WEBVIEW_REF}
        source={redirect}
              />
      </View>
    );
  }
}



goBack = () => {
  this.refs[WEBVIEW_REF].goBack();
};

goForward = () => {
  this.refs[WEBVIEW_REF].goForward();
};



Webview.propTypes = {
  fetching: PropTypes.bool,
  responseURL : PropTypes.string,
  setcookie : PropTypes.string
}
const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    responseURL: state.login.responseURL,
    setcookie : state.login.setcookie
  }
}
export default connect(mapStateToProps)(Webview)
