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

import ToolBar from './Components/toolBar'
import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import SeeDetailsCard from './Components/SeeDetailsCard'
import TransButton from './Components/transButton'

class LandingScreen extends Component {
  render(){
    return(
      <View>
      <ToolBar/>
      <Greeting/>

      <MyPlanCard/>
      {
        <View style={{

          flexWrap : 'wrap',
          flexDirection : 'row'
        }}>
        <Card
        image={"imagelink"}
        title = "Payment"
        bg="rgb(204, 211, 214)"
        icon = "usd"
        />
        <Card
        image={"imagelink"}
        title = "ID Card"
        bg="rgb(220, 230, 234 )"
        icon = "credit-card"

        />

        <SeeDetailsCard
        image={"imagelink"}
        title = "Promotions"
        bg="rgb(220, 230, 234 )"
        icon = "paperclip"

        />

        <SeeDetailsCard
        image={"imagelink"}
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
