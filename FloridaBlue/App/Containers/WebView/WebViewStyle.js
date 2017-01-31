// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  headerContainer:{
  flexDirection:'row',
  height:70,
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:Colors.flBlue.ocean,
  padding:10,
  alignSelf:'stretch'
},
container:{
    flex:1,
    backgroundColor:'white'
  },

})
