import React, { Component} from 'react';
import { Text,
View,
StyleSheet,
} from 'react-native';

import {Colors, Metrics, Fonts} from '../../../../../Themes'


var styles=StyleSheet.create({
  wrapper:{
    flex:1,
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:'#ddd'
  },
  text:{
    fontSize:Fonts.size.regular,

  },
  smallText:{
    fontSize:Fonts.size.regular
  },
  content:{
    flexDirection:'row'
  },
  items:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})

export const Content=({header,text})=>{

  return(
    <View style={styles.item}>
    <Text style={styles.smallText}>
    {header}
    </Text>
    <Text style={styles.smallText}>
    {text}
    </Text>
    </View>
)

}

export default function({hsa}){
  return(
    <View style={styles.wrapper}>
    <Text style={styles.text}>
    {'Health Savings Account'}
    </Text>
    <View style={styles.content}>
    <Content header={'current balance'} text={hsa.currentBalanace}/>
    <Content header={'ytd contribution'} text={hsa.ytdcontribution}/>
    <Content header={'ytd contribution'} text={hsa.ytdcontribution}/>
    </View>
    </View>
)
}
