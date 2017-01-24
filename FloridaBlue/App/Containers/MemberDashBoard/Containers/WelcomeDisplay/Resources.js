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


import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import {Colors,Metrics,Fonts} from '../../../../Themes'
import SeeDetailsCard from './Components/SeeDetailsCard'
import TransButton from './Components/transButton'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux';


class Resources extends Component {


  _renderHeader(){
  return( <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,alignSelf:'center'}]}>Resources</Text>
    {NavItems.settingsButton()}

  </View>)
}

  render(){
    console.log("root testing"+this.props.userName);
    return(
      <View style={styles.container}>
      {this._renderHeader()}
      <ScrollView>

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

        <Card
        title = "Promotions"
        bg="rgb(220, 230, 234 )"
        icon = "paperclip"
        />

        <Card
        title = "Session"
        bg="rgb(234, 234, 220)"
        icon = "apple"
        />
        <Card
        title = "Session"
        bg="rgb(234, 270, 220)"
        icon = "apple"
        />
        <Card
        title = "Session"
        bg="rgb(234, 230, 220)"
        icon = "apple"
        />
        <Card
        title = "Session"
        bg="rgb(234, 205, 220)"
        icon = "apple"
        />
        <Card
        title = "Session"
        bg="rgb(234, 260, 220)"
        icon = "apple"
        />
        <Card
        title = "Session"
        bg="rgb(234, 211, 220)"
        icon = "apple"
        />
        <Card
        title = "Session"
        bg="rgb(234, 234, 220)"
        icon = "apple"
        />

        </View>
      }


      </ScrollView>

      </View>
    );
  }
}




export default Resources
