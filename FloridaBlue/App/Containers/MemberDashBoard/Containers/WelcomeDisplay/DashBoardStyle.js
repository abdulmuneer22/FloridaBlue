// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    //padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth,
    // backgroundColor: Colors.flBlue.ocean
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
  //  marginLeft: Metrics.smallMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily:Fonts.type.headerFont

  },
  hsaHeader: {
    flexDirection: 'row',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.79),
  // marginTop:20,
    justifyContent: 'space-between',
    alignItems: 'center',
  //  padding: Metrics.baseMargin,
    width: Metrics.screenWidth,

    overflow: 'visible',
    resizeMode: 'cover',
    marginBottom: Metrics.smallMargin * Metrics.screenHeight*0.0015

  //  alignSelf: 'stretch'
  // width:Metrics.screenWidth,
  // backgroundColor:Colors.flBlue.ocean
  },
  hsaBg: {
 // flexDirection:'row',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.45),
 // marginTop:20,
 // justifyContent:'space-between',
 // alignItems:'center',
 // padding:10,
    //alignSelf: 'stretch',
    resizeMode:'contain',
    width: Metrics.screenWidth,
  },
  hsaTextStyle1: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030,
    fontFamily:Fonts.type.subHeaderFont,

    // fontWeight:'bold'
  },
  hsaTextStyle2: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0032,
    color:Colors.flBlue.grass,
    fontWeight:'600',
    fontFamily:Fonts.type.subHeaderFont,
    // fontWeight:'bold'
  },

  textStyle: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    fontWeight: '500',
    marginTop:Metrics.smallMargin,
    fontFamily:Fonts.type.headerFont,
  },
  hsaText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0033,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily:Fonts.type.subHeaderFont,
  //  padding: Metrics.smallMargin,

    marginTop: Metrics.smallMargin * Metrics.screenHeight * 0.0005

  },
  row_1: {
    flexDirection: 'row',
    justifyContent: 'center',
  //  paddingTop: Metrics.baseMargin,
  //  paddingBottom: Metrics.baseMargin
    marginTop:Metrics.smallMargin * Metrics.screenHeight * 0.003,
    marginBottom:Metrics.smallMargin * Metrics.screenHeight * 0.001
  },
  col_1: {
    flex: 1,
    // backgroundColor : 'yellow',
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: Colors.snow

  },
  greetingView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.78)) / 3,
    // padding:5,
    backgroundColor: Colors.flBlue.grey6,
    margin:2
  },
  messageCountStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 3,
    backgroundColor: Colors.flBlue.grey1,
    flexDirection: 'row'
  },
  messageTextStyle: {
    color: Colors.flBlue.night,
    fontSize: Fonts.size.h6,
    marginLeft: Metrics.baseMargin
  },
  summary: {
    flexDirection: 'row',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
    justifyContent: 'space-between',
    //margin:2,
    alignItems: 'center',
    resizeMode: 'cover',
  //  padding:5,
    // alignSelf: 'stretch',
    width: Metrics.screenWidth * 0.98
  },
  titleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tileStyle:{
    width: (window.width * 0.5)-5,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.80),
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  //  marginTop:2,
  //  marginBottom:2,
  //  marginRight:2,
  // marginLeft:2,
    //shadowColor:Colors.flBlue.grey4,
  //  shadowOpacity:0.8,
  //  elevation:8,
  //  outlineProvider:'bounds',
//    shadowOffset: {width: 5, height: 5},
  //  shadowRadius:25,
  //  borderWidth: 7,
  //  borderRadius:6,
//    borderColor: Colors.flBlue.lightBlue
  },
  tileTextStyle:{
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0029,
      fontFamily:Fonts.type.subHeaderFont,
    fontWeight: '600',
    color: Colors.snow,
    textAlign:'center',
  },
  center: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  healthPlanView: {
    flex: 0.7,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.transparent
  },
  healthPlanText: {
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.anvil,
    fontWeight: '500',
    fontFamily:Fonts.type.subHeaderFont,
    marginLeft:-10,
// alignSelf : 'stretch',
//  alignItems:'center',
//  justifyContent:'center',
//  height:40,
// marginLeft:5
  },
  healthPlanSubText:{
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    marginTop: 10,
    fontFamily:Fonts.type.subHeaderFont,
  },
  healthPlanImage: {
    marginTop: Metrics.mediumMargin,
    marginLeft: Metrics.doubleBaseMargin,
    width: Metrics.images.xl,
    height: Metrics.images.xl
  },
  healthPlanIcon: {
    marginTop: Metrics.searchBarHeight,
    marginRight: Metrics.mediumMargin,
    backgroundColor: Colors.transparent
  },
  footerView: {
    //borderTopWidth: 0.5,
    //borderBottomWidth: 0.5,
    //width:Metrics.screenWidth,
  //  borderColor: Colors.snow
  alignItems:'center'

  },
  footerImage: {
    // flexDirection: 'row',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.825),
     // height : window.height * 0.5,
    // justifyContent: 'space-between',
    // alignItems: 'center',
  //  alignSelf: 'stretch',
    resizeMode: 'cover',
    width: Metrics.screenWidth * 0.985,
    marginLeft:2
    //marginBottom:0
  },
  titleView: {
    marginTop: Metrics.baseMargin
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBackground: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    padding: Metrics.mediumMargin
  },

  textBackground1: {
    flexDirection: 'row',
    backgroundColor: Colors.flBlue.lightBlue,
    padding: Metrics.mediumMargin,

  },

  textStyle1: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    marginTop:Metrics.smallMargin,
      fontFamily:Fonts.type.headerFont
    // fontWeight:'bold'
  },

  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  }

})
