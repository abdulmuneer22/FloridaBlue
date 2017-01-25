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
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
const window = Dimensions.get('window');

import {Colors,Metrics,Fonts} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux';
import Flb from './FlbIcon'


type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  visibilityRules : object,
  attemptMember: () => void
}

class Hsa extends Component {


  _renderHeader(){
  return( <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,alignSelf:'center'}]}>My Plan Overview</Text>
    {NavItems.settingsButton()}

    </View>)
    }
  render(){
    console.log("root testing"+this.props.userName);
    return(
      <View style={styles.mainContainer}>
      {this._renderHeader()}
      <View style={styles.titleView}>
      <Text style={[{fontSize:Fonts.size.h5,fontWeight:'bold', alignSelf:'center'}]}>Health Savings Account</Text>





      </View>
      </View>

    );
  }
}

export default Hsa
