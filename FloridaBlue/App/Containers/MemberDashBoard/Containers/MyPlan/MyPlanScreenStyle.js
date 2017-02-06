// @flow

import {StyleSheet} from 'react-native';
import { Metrics, ApplicationStyles, Colors } from '../../../../Themes/'

export default StyleSheet.create({
  headerContainer:{
     flexDirection:'row',
     height:78,
     justifyContent:'space-between',
     alignItems:'center',
     padding:10,
     alignSelf:'stretch',
     width:null,
     backgroundColor:Colors.flBlue.ocean
  },
  container:{
    flex:1,
    backgroundColor:'white'
  },

})
