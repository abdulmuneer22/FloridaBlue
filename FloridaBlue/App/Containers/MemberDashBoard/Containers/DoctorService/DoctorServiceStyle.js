// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

export default StyleSheet.create({

  backgroundImage: {
    flex: 0.4,
    alignSelf: 'flex-end'
   // marginBottom:-100
  },
  logo: {
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },

  container: {
    flex: 1,
    backgroundColor: Colors.bg2
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
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  doctorCardStyle: {
  //  alignItems: 'center',
   // marginTop: Metrics.baseMargin,
    backgroundColor: '#fff',
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

    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.bg2,
  // padding: Metrics.mediumMargin,
    justifyContent: 'space-between',
  //  alignItems: 'center',

    borderRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }

  },

  textBackground3: {

    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.bg2,
    padding: Metrics.mediumMargin,
    justifyContent: 'space-between',
  //  alignItems: 'center',

    borderRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }

  },

  doctorTextStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.ocean,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '500',
    textAlign: 'center'
  },

  cardStyle: {
    // width: window.width,
    backgroundColor: Colors.snow,
    flex: 1,
    margin:15,
   // height : 200,
   // alignSelf: 'center',
   //  padding : Metrics.baseMargin,
  //  marginTop: Metrics.baseMargin,
  //  alignItems: 'center',
   // borderTopWidth: 1,
  //  borderBottomWidth: 1,

   // borderTopColor: Colors.flBlue.grey3,
   // borderBottomColor: Colors.flBlue.grey3
  },
  cardStyle1: {
    // width: window.width,
    backgroundColor: Colors.snow,
   // height : 200,
   // alignSelf: 'center',
   //  padding : Metrics.baseMargin,
    // marginTop: Metrics.smallMargin,

  //  alignItems: 'center',
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
  h1: {
    // flexWrap:'wrap',
   // margin: 5,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    // fontWeight: '600',
    color: Colors.flBlue.ocean,
   // textAlign: 'center',
   // marginTop: Metrics.mediumMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600',
    padding: 8
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
    fontFamily: Fonts.type.headerFont

  }

})