import React, {Component} from 'react';
import{
AppRegistry,
Text,
View,
StyleSheet
} from 'react-native';

import {Colors, Metrics, Fonts} from '../../../../../Themes'

var styles=StyleSheet.create({
  wrapper:{
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:Fonts.size.regular
  }
})

export default function({text}){
  return(
    <View style={styles.wrapper}>
    <Text style={styles.text}>
    {text}
    </Text>
    </View>
  )
}
