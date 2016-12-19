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
  TouchableWithoutFeedback
} from 'react-native';


import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import {Colors,Metrics,Fonts} from '../../../../Themes'
import SeeDetailsCard from './Components/SeeDetailsCard'
import TransButton from './Components/transButton'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'

import {Actions as NavigationActions} from 'react-native-router-flux'


class LandingScreen extends Component {

  _renderHeader(){
  return <View style={styles.headerContainer}>
    {NavItems.hamburgerButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Florida Blue</Text>
    {NavItems.settingsButton()}

  </View>
}


  render(){
    return(
      <View style={styles.container}>
      {this._renderHeader()}

      <Greeting/>

      <MyPlanCard/>
      {
        <View style={{

          flexWrap : 'wrap',
          flexDirection : 'row'
        }}>

        <Card
        title = "Payment"
        bg="rgb(204, 211, 214)"
        icon = "usd"
        />

      <Card
        title = "ID Card"
        bg="rgb(220, 230, 234 )"
        icon = "credit-card"
        />

        <SeeDetailsCard
        title = "Promotions"
        bg="rgb(220, 230, 234 )"
        icon = "paperclip"
        />

        <SeeDetailsCard
        title = "Session"
        bg="rgb(234, 234, 220)"
        icon = "apple"
        />

        </View>
      }

      <TransButton/>

      </View>
    );
  }
}


export default LandingScreen
