import { StyleSheet } from 'react-native'
import {Colors,Metrics,Fonts,Images} from '../../../../Themes'

export default StyleSheet.create({
  headerContainer:{
   //flexDirection:'row',
   height:150,
   //justifyContent:'space-between',
   //alignItems:'center',
   //padding:15,
   alignSelf:'stretch',
   width:null,
   //backgroundColor:Colors.flBlue.ocean
 },
 container:{
   flex:1,
   backgroundColor:Colors.flBlue.lightBlue
 },
 header:{
   fontSize:Fonts.size.h6,
   margin:Metrics.baseMargin

 },
 subheading:{
   fontSize:Fonts.size.regular,
   margin:Metrics.baseMargin
 },
 userStyle:{
   flexDirection:'row',
   paddingTop:20,
   paddingBottom:20,
   marginTop:Metrics.doubleBaseMargin,
   //justifyContent:'space-between',
   alignItems:'center',
   //height:150,
   backgroundColor:Colors.flBlue.grass

 },
 features:{
   flexDirection:'row',
   height:300,
   margin:0
 },
 titleView:{
   marginTop:10
 },
 center:{
   //alignItems:'center',
   //justifyContent:'center'
   marginLeft:Metrics.doubleBaseMargin
 }

 })
