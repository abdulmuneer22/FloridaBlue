// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.79)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.ocean
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  hsaHeader: {
    flexDirection: 'row',

    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.78)) / 2,
  // marginTop:20,
    justifyContent: 'space-between',
    alignItems: 'center',
  //  padding: Metrics.baseMargin,
    width: Metrics.screenWidth,

    overflow: 'visible',
    resizeMode: 'cover'
    // marginBottom: Metrics.smallMargin * Metrics.screenHeight*0.0015

  //  alignSelf: 'stretch'
  // width:Metrics.screenWidth,
  // backgroundColor:Colors.flBlue.ocean
  },
  hsaheaderTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  hsaBg: {
 // flexDirection:'row',
    height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.37) : Metrics.screenHeight - (Metrics.screenHeight * 0.415),
 // marginTop:20,
 // justifyContent:'space-between',
 // alignItems:'center',
 // padding:10,
    // alignSelf: 'stretch',
    resizeMode: 'stretch',
    marginBottom: 0,
    width: Metrics.screenWidth
  },
  hsaTextStyle1: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0032,
    fontFamily: Fonts.type.subHeaderFont,
    color: Colors.flBlue.anvil

    // fontWeight:'bold'
  },
  hsaTextStyle2: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0034,
    color: Colors.flBlue.grass,
    fontWeight: '600',
    fontFamily: Fonts.type.subHeaderFont
    // fontWeight:'bold'
  },

  textStyle: {
    fontSize: Fonts.size.xr * Metrics.screenWidth * 0.0027,
    fontWeight: '300',
    marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.headerFont,
    color: Colors.flBlue.grey6
  },
  textStyle2: {
    fontSize: Fonts.size.xr * Metrics.screenWidth * 0.0027,
    fontWeight: '300',
    marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.headerFont,
    color: Colors.snow
  },
  hsaText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0033,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Fonts.type.subHeaderFont,
  //  padding: Metrics.smallMargin,

    marginTop: Metrics.smallMargin * Metrics.screenHeight * 0.0005

  },
  row_1: {
    flexDirection: 'row',
    justifyContent: 'center',
  //  paddingTop: Metrics.baseMargin,
  //  paddingBottom: Metrics.baseMargin
    marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.003,
    marginBottom: Metrics.mediumMargin * Metrics.screenHeight * 0.001
  },
  col_1: {
    flex: 1,
    // backgroundColor : 'yellow',
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: Colors.bg2

  },
  greetingView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 3,
    // padding:5,
  //  backgroundColor: Colors.flBlue.grey6,
    margin: 2
  },
  greetingText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
    fontFamily: Fonts.type.subHeaderFont,
    color: Colors.flBlue.anvil
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
    height: Metrics.screenHeight * 0.125,
  //  justifyContent: 'space-between',
    // margin:2,
    alignItems: 'center',
    resizeMode: 'cover',
    marginTop: 4,
    marginBottom: 4,
  //  padding:5,
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
  },
  titleView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tileStyle: {
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.5),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
    alignItems: 'center',
    justifyContent: 'center',
    // margin:4,
    marginTop: 4,
    marginBottom: 4,
    marginRight: (Metrics.baseMargin) / 2,
    marginLeft: Metrics.baseMargin

  },
  tileStyle1: {
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.5),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
    alignItems: 'center',
    justifyContent: 'center',
    // margin:4,
    marginTop: 4,
    marginBottom: 4,
    marginRight: (Metrics.baseMargin),
    marginLeft: (Metrics.baseMargin) / 2

  },
  tileTextStyle: {
    marginTop: Metrics.baseMargin,
    fontSize: (Platform.OS === 'ios') ? Fonts.size.h6 * Metrics.screenWidth * 0.0029 : Fonts.size.h6 * Metrics.screenWidth * 0.0029,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: (Platform.OS === 'ios') ? '600' : '400',
    backgroundColor: Colors.transparent,
    color: Colors.snow,
    textAlign: 'center'
  },
  center: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  healthPlanView: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  //  flex: 1,
  //  alignItems: 'center',
    // padding: 20,

    // marginLeft:20
  },
  healthPlanText: {
    fontSize: Fonts.size.h2 * Metrics.screenWidth * 0.0025,
    color: Colors.snow,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400',
    backgroundColor: Colors.transparent,
    fontFamily: Fonts.type.subHeaderFont,
    marginLeft: Metrics.images.large * Metrics.screenWidth * 0.0035
// alignSelf : 'stretch',
//  alignItems:'center',
//  justifyContent:'center',
//  height:40,
// marginLeft:5
  },
  healthPlanSubText: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    marginTop: 10,
    fontFamily: Fonts.type.subHeaderFont
  },
  healthPlanImage: {
    marginTop: Metrics.mediumMargin,
    marginLeft: Metrics.doubleBaseMargin,
    width: Metrics.images.xl,
    height: Metrics.images.xl
  },
  myPlanArrowIcon: {
    backgroundColor: Colors.transparent,
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0035,
    marginTop: Metrics.smallMargin
  },
  healthPlanIcon: {
  //  marginTop: Metrics.baseMargin,
  // flex:0.2,
    marginRight: Metrics.doubleBaseMargin,
    backgroundColor: Colors.transparent,
    // alignSelf:'center',
    marginLeft: -20
  },
  footerView: {
    // borderTopWidth: 0.5,
    // borderBottomWidth: 0.5,
    // width:Metrics.screenWidth,
  //  borderColor: Colors.snow
    alignItems: 'center'
  //  justifyContent:'center'
    // smargin:4

  },
  footerImage: {
    // flexDirection: 'row',
    height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.82) : Metrics.screenHeight - (Metrics.screenHeight * 0.87),
     // height : window.height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  //  alignSelf: 'stretch',
    resizeMode: 'stretch',
    width: Metrics.screenWidth,
    marginTop: 4

    // marginBottom:0
  },
  textBackground: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    padding: Metrics.mediumMargin,
    justifyContent: 'space-between',
  //  alignItems: 'center',
//    margin: 3,
//    borderRadius: 2,
//    shadowColor: '#000000',
 //   shadowOpacity: 0.3,
 //   shadowRadius: 1,
 //   shadowOffset: {
 //     height: 1,
 //     width: 0.3
 //   }

  },

  textBackground1: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.flBlue.lightBlue,
    justifyContent: 'space-between',
    padding: Metrics.mediumMargin,
   // alignItems: 'center',
    margin: 10,
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }

  },

    textBackground2: {
  
    flex : 1,
    flexDirection: 'column',
   backgroundColor: Colors.bg2,
   padding: Metrics.mediumMargin,
    justifyContent: 'space-between',
  //  alignItems: 'center',
    
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    } 
         
  },


  textStyle1: {
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.subHeaderFont,
    color: Colors.flBlue.ocean,
    fontWeight: '300'
  },

  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  },
  spinnerText: {
    color: Colors.flBlue.anvil,
    marginTop: Metrics.doubleBaseMargin

  }

}

)


