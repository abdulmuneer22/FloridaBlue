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
  PlanName : {
    alignItems  : 'center',
    justifyContent : 'center',
    height:40
  },

  chartWrapper : {
    //   backgroundColor : 'yellow',
      flex : 2,
      marginBottom : 20
  },
  cardStyle:{
    flexWrap : 'wrap',
    flexDirection : 'row'
  },
  spinner:{
  //  color:Colors.flBlue.red,
  //alignItems:'center',
  //justifyContent:'center',
  //height:window.height
},
spinnerText:{

marginTop:20,
}


})
