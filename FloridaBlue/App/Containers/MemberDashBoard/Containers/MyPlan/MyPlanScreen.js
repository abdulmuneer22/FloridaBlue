import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet

} from 'react-native';

import {Colors, Metrics, Fonts} from '../../../../Themes'
import Title from './Components/Title'

class MyPlanScreen extends Component{
  render(){
    return(
      <View
       style={{flex:1, alignItems:'center'}}>
       <Title text='Blue Options Bronze' />

       </View>
    )
  }
}

export default MyPlanScreen
