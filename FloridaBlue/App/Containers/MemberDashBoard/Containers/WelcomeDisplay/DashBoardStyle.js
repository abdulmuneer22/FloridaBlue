// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../../../Themes/'

export default StyleSheet.create({
  headerContainer:{
   flexDirection:'row',
   height:78,
   justifyContent:'space-between',
   alignItems:'center',
   padding:10,
   alignSelf:'stretch',
   width:null
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
    marginTop:10
  },
  center:{
    alignItems:'center',
    justifyContent:'center'
  },

})
