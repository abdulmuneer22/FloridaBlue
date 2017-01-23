// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../../../Themes/'

export default StyleSheet.create({
  headerContainer:{
  flexDirection:'row',
  height:70,
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:'black',
  padding:10,
  //alignSelf:'stretch'
},
container:{
    flex:1,
    backgroundColor:'white',

  },
  summary:{
    flexDirection:'row',
    height:200,
    backgroundColor:'#E8E8E8'
  },
  features:{
    flexDirection:'row',
    height:150,
    margin:0
  },
  titleView:{
    height:40
  },
  center:{
    alignItems:'center',
    justifyContent:'center'
  }
})
