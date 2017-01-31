// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles,Colors, Images, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
  headerContainer:{
   flexDirection:'row',
   height:70,
   justifyContent:'space-between',
   alignItems:'center',
   padding:10,
   alignSelf:'stretch',
   width:null,
   backgroundColor:Colors.flBlue.ocean
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
  footerImage:{

     flexDirection:'row',
     height:100,
     justifyContent:'space-between',
     alignItems:'center',
     padding:10,
     alignSelf:'stretch',
     width:null,
       },
  titleView:{
    marginTop:10
  },
  center:{
    alignItems:'center',
    justifyContent:'center'
  },
  textBackground:{
    flexDirection:'row',
    backgroundColor:Colors.snow,
    padding:20
  },

  textBackground1:{
    flexDirection:'row',
    backgroundColor:Colors.flBlue.grey2,
    padding:20
  },

  textStyle1:{
    fontSize:Fonts.size.regular,
    //fontWeight:'bold'
  },

textStyle:{
  fontSize:Fonts.size.regular,
  fontWeight:'bold'
}
})
