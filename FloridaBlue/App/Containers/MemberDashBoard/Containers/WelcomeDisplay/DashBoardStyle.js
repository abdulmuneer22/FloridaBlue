// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.ocean
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin

  },
  hsaHeader: {
    flexDirection: 'row',

    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 2,

  // marginTop:20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    width: Metrics.screenWidth,

    overflow: 'visible',
    resizeMode: 'cover',
    marginBottom: 15

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
    alignSelf: 'stretch',
    width: Metrics.screenWidth
 // backgroundColor:Colors.flBlue.ocean
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
    backgroundColor: Colors.flBlue.grey6
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
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.73),
    justifyContent: 'space-between',
    alignItems: 'center',
    resizeMode: 'cover',
  //  padding:5,
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
  },
  titleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tileStyle:{
    width: window.width * 0.5,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.80),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.flBlue.lightBlue
  },
  tileTextStyle:{
    marginTop: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    fontWeight: '600',
    color: 'white',
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
    fontWeight: '500'
// alignSelf : 'stretch',
//  alignItems:'center',
//  justifyContent:'center',
//  height:40,
// marginLeft:5
  },
  healthPlanSubText:{
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    marginTop: 10
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
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.snow
  },
  footerImage: {
    // flexDirection: 'row',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.84),
     // height : window.height * 0.5,
    // justifyContent: 'space-between',
    // alignItems: 'center',
  //  alignSelf: 'stretch',
    resizeMode: 'cover',
    width: Metrics.screenWidth
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
    padding: Metrics.doubleBaseMargin
  },

  textBackground1: {
    flexDirection: 'row',
    backgroundColor: Colors.flBlue.grey2,
    padding: Metrics.doubleBaseMargin
  },

  textStyle1: {
    fontSize: Fonts.size.regular
    // fontWeight:'bold'
  },

  textStyle: {
    fontSize: Fonts.size.regular,
    fontWeight: 'bold'
  },
  hsaText: {
    fontSize: Fonts.size.regular,
    fontWeight: '600',
    textAlign: 'center',
    padding: 5,

    marginTop: Metrics.doubleBaseMargin

  },

  row_1: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
  },
  col_1: {
    flex: 1,
    // backgroundColor : 'yellow',
    alignItems: 'center'
  },

  row_2: {
    alignItems: 'center',
    // paddingTop : 10
    paddingBottom: 15
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  }

})
