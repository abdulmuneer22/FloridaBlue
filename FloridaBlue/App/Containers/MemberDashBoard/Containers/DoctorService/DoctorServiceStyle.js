// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

export default StyleSheet.create({

  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.3),
    resizeMode: 'stretch'
  },
  logo: {
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },

  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
   // padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.sky
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont

  },
  doctorCardStyle: {
    alignItems: 'center',
    marginTop: Metrics.baseMargin
  },

  doctorTextStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0023,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '500',
    textAlign: 'center'
  },
  cardStyle: {
    width: window.width,
    backgroundColor: Colors.flBlue.lightBlue,
   // height : 200,
   // alignSelf: 'center',
   //  padding : Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
  //  alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderTopColor: Colors.flBlue.grey3,
    borderBottomColor: Colors.flBlue.grey3

  },
  cardStyle1: {
    width: window.width,
    backgroundColor: Colors.snow,
   // height : 200,
   // alignSelf: 'center',
   //  padding : Metrics.baseMargin,
    marginTop: Metrics.smallMargin

  //  alignItems: 'center',

  },
  h1: {
    // flexWrap:'wrap',
   // margin: 5,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    // fontWeight: '600',
    color: Colors.flBlue.anvil,
   // textAlign: 'center',
    marginTop: Metrics.mediumMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'
  },
  footerText: {
    // flexWrap:'wrap',
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    // fontWeight: '600',
    color: Colors.flBlue.grey5,
  //  textAlign: 'center',
    marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'
  },
  noteText: {
    // flexWrap:'wrap',
    marginLeft: Metrics.mediumMargin,
    marginRight: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.grey5,
    marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'justify'
  },

  h2: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
  //  textAlign: 'center',
    color: Colors.flBlue.anvil,
    paddingTop: Metrics.baseMargin,
    marginLeft: Metrics.mediumMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600'

  },
  h4: {
    // textAlign: 'center',
    // paddingBottom: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    // marginTop:Metrics.smallMargin,
    color: Colors.flBlue.grey5,
    marginLeft: Metrics.mediumMargin,
    fontFamily: Fonts.type.headerFont
    //  marginRight:7
  //  marginBottom:5

  },
  h4_2: {
    // paddingBottom: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030,
    marginTop: Metrics.smallMargin,
    color: Colors.flBlue.grey5,
    // marginLeft:Metrics.baseMargin,
  //  backgroundColor:'red',
    fontFamily: Fonts.type.headerFont,
    textAlign: 'center'
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  },
  subheading: {
    color: Colors.flBlue.anvil,
   // fontSize: Fonts.size.h5,
    marginBottom: Metrics.smallMargin * Metrics.screenWidth * 0.003,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,
    fontFamily:Fonts.type.headerFont

  },

})
