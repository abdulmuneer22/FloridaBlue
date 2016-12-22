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

import {Colors, Metrics, Fonts} from '../../../../../Themes'
import Header from './Header'

var styles=StyleSheet.create({
  wrapper:{
    backgroundColor:'#eee'
  },
  slide:{
    flex:1,
    alignItems:'center',
    flexWrap:'nowrap',
    backgroundColor:'#ccc'
  }
})

export default function(){
  return(
    <Swiper height={300} style={styles.wrapper} showButtons={true}>
    <View style={styles.slide}>
    <Header text="Annual Deductable"/>
    </View>
    </Swiper>
  )
}
