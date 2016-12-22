import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet

} from 'react-native';

import {Colors, Metrics, Fonts} from '../../../../../Themes'

var styles=StyleSheet.create({
  wrapper:{
    backgroundColor:'grey',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    height:40
  },
  text:{
    fontSize:Fonts.size.h6
  }
})

export default function({text}){
  return(
    <View style={styles.wrapper}>
    <Text style={styles.text}>
    {text}
    </Text>
    </View>
})
