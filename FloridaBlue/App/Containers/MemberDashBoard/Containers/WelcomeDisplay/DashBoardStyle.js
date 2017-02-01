// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles,Colors, Images, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
  headerContainer:{
   flexDirection:'row',
   height:70,
   justifyContent:'space-between',
   alignItems:'center',
   padding:15,
   alignSelf:'stretch',
   width:null,
   backgroundColor:Colors.flBlue.ocean
 },
 hsaHeader:{
  flexDirection:'row',
  height:140,
  //marginTop:20,
  justifyContent:'space-between',
  alignItems:'center',
  padding:10,
  alignSelf:'stretch',
  width:null,
  //backgroundColor:Colors.flBlue.ocean
},
hsaBg:{
 //flexDirection:'row',
 height:380,
 //marginTop:20,
 //justifyContent:'space-between',
 //alignItems:'center',
 //padding:10,
 alignSelf:'stretch',
 width:null,
 //backgroundColor:Colors.flBlue.ocean
},
container:{
    flex:1,
    backgroundColor:Colors.flBlue.lightBlue,

  },
  summary:{
    flexDirection:'row',
    height:200,
    backgroundColor:'#E8E8E8'
  },
  footerImage:{

     flexDirection:'row',
     height:120,
     justifyContent:'space-between',
     alignItems:'center',
     alignSelf:'stretch',
     width:null,
       },
  titleView:{
    marginTop:Metrics.baseMargin
  },
  center:{
    alignItems:'center',
    justifyContent:'center'
  },
  textBackground:{
    flexDirection:'row',
    backgroundColor:Colors.snow,
    padding:Metrics.doubleBaseMargin
  },

  textBackground1:{
    flexDirection:'row',
    backgroundColor:Colors.flBlue.grey2,
    padding:Metrics.doubleBaseMargin
  },

  textStyle1:{
    fontSize:Fonts.size.regular,
    //fontWeight:'bold'
  },

textStyle:{
  fontSize:Fonts.size.regular,
  fontWeight:'bold'
},
hsaText : {
    fontSize : Fonts.size.regular,
    fontWeight : '600',
    textAlign : 'center',
    padding : 15
},

row_1 : {
    flexDirection : 'row',
    justifyContent : 'center',
    paddingTop : Metrics.baseMargin,
    paddingBottom : Metrics.baseMargin
},
col_1 : {
    flex : 1,
    // backgroundColor : 'yellow',
    alignItems : 'center'
},

row_2 : {
    alignItems : 'center',
    //paddingTop : 10
    paddingBottom:15
},

})
