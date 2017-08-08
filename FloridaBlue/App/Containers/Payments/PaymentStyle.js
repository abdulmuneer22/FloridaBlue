// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../Themes/'
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
  headerContainerLandscape: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.79)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth * 1.78
    // backgroundColor: Colors.flBlue.ocean
  },
  headerImage: {
    width: Metrics.screenWidth * 0.65,
    resizeMode: 'contain',
    height: Metrics.images.xm1
  },
  headerImageLandscape: {
    width: Metrics.screenWidth * 0.65,
    resizeMode: 'contain',
    height: Metrics.images.xm1,
    marginLeft: 160
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
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

  hsaTextStyle1: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0032,
    fontFamily: Fonts.type.subHeaderFont,
    color: Colors.flBlue.anvil

    // fontWeight:'bold'
  },
  
  textStyle: {
    fontSize: Fonts.size.xr * Metrics.screenWidth * 0.0030,
    fontWeight: '600',
    marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.subHeaderFont,
    color: Colors.flBlue.grey3,
    backgroundColor: Colors.transparent
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
  paybymailView:{
    flexDirection: 'row',
    //backgroundColor:'green', 
    flex:2,
    alignItems:'center', 
    justifyContent: 'center',
    marginTop:Metrics.baseMargin*Metrics.screenHeight*0.001
  },
  content: {
   flex:2,
   //backgroundColor:'red', 
   marginLeft:Metrics.mediumMargin*Metrics.screenWidth*0.002,
   marginRight:Metrics.mediumMargin*Metrics.screenWidth*0.002,
   //justifyContent:'center',
  // alignItems:'center'
  },
  linkView: {
    flex:4,
   // backgroundColor:'yellow',
    alignItems:'center',
    justifyContent:'center'
  },

  linkText:{
    fontSize:Fonts.size.h6*Metrics.screenWidth*0.0028,
    color:Colors.flBlue.ocean,
    textDecorationLine:'underline',
    textDecorationColor:Colors.flBlue.ocean
  },

  container: {
    flex: 1,
    backgroundColor: Colors.bg2

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
  tileStyleLandscape: {
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 7),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginRight: 4
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
  linearGradientStyle: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.7),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.76)
  },
  linearGradientStyleLandscape: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 4),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.76)
  },
  tileTextStyle: {
  //  marginTop: Metrics.baseMargin,
  //  marginBottom:-15,
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
  
  textBackground: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)
  },
  textBackground3: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: Colors.snow,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.88)
  },

  textBackground1: {
    flex: 1,
    flexDirection: 'column',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)

   // alignItems: 'center',

  },

  textBackground2: {

    flex: 1,
   // flexDirection: 'column',
    backgroundColor: Colors.bg2
   // padding: Metrics.mediumMargin,
  //  justifyContent: 'space-between',
  //  alignItems: 'center',

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

  },
  payByPhoneContainer: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenWidth * 0.8,
    flex: 1,
   // zIndex: -1,
    backgroundColor: Colors.snow,
    // borderWidth: 1,
    borderRadius: Metrics.screenWidth * 1,
    // borderColor: '#708090',
    position: 'absolute',
    bottom: -Metrics.textHeight1 * Metrics.screenWidth * 0.005,
    right: -Metrics.textHeight2 * Metrics.screenWidth * 0.0035,
    borderWidth: 1,
    borderRadius: Metrics.screenWidth * 1,
    borderColor: Colors.flBlue.grey1
  },
  dismissPayByPhone: {
    marginLeft: Metrics.searchBarHeight * Metrics.screenWidth * 0.016,
    marginTop: 30,
    backgroundColor: Colors.snow
  },
  payByPhoneText: {
    textAlign: 'left',
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0032,
    marginTop: Metrics.mediumMargin*Metrics.screenHeight*0.001,
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.snow,
    marginLeft: Metrics.textHeight * Metrics.screenWidth * 0.003,
    //top: 10
  },
  payByPhoneMessage: {
    textAlign: 'left',
    marginTop: Metrics.mediumMargin*Metrics.screenHeight*0.001,
    color: Colors.flBlue.anvil,
    fontSize: Fonts.size.xr * Metrics.screenWidth * 0.0030,
    marginLeft: Metrics.textHeight * Metrics.screenWidth * 0.0028,
    marginRight: Metrics.textHeight * Metrics.screenWidth * 0.0055
  },
  urgentCareCircle: {
    flex: 1,
    position: 'absolute',
    bottom: 5,
    right: 10
  },
  CallButton: {
    width: Metrics.baseMargin * Metrics.screenWidth * 0.03,
    backgroundColor: Colors.transparent,
    resizeMode: 'contain',
    borderRadius: Metrics.mediumMargin * Metrics.screenWidth * 0.0015,
    height: Metrics.mediumMargin * Metrics.screenHeight * 0.0036,
    marginTop: Metrics.mediumMargin*Metrics.screenHeight*0.001,
  },

}

)
