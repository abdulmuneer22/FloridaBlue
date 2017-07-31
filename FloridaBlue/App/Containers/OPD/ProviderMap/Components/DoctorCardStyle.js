// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const BUTTON_ACTIVE_COLOR = Colors.flBlue.night
const ACTIVE_BUTTON_TEXT_COLOR = Colors.snow

export default StyleSheet.create({

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
  cardview: {
    flex: 1,
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
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow,
    marginTop: 10
   // height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
   // marginBottom:-3
  },
  cardButtonView: {
    backgroundColor: Colors.flBlue.ocean,
    width: Metrics.screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
   // marginRight : 1,
    borderRightWidth: 1,
    borderColor: Colors.snow,
  //  flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection: 'row'
  },
  cardButtonView1: {
    backgroundColor: Colors.flBlue.ocean,
    width: Metrics.screenWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: Colors.snow,
   // flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection: 'row'
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
  doctorTextStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.ocean,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '500',
    textAlign: 'center'
  },
  h1: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.baseMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
    color: Colors.flBlue.ocean
  },

  h2: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.baseMargin,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'

  },
  mapHeaderText: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.mediumMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
    color: Colors.flBlue.ocean
  },
   mapHeaderText1: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.mediumMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
    color: Colors.flBlue.anvil
  },

  mapSubText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.smallMargin,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'

  },
  mapAdressText: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.grey5,
    marginTop: 5,
   // marginBottom:10,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },
  h4: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.smallMargin,
    color: Colors.flBlue.grey5,
    // marginRight:10,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'auto'
  },

  h4_2: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },
  h4_3: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: 'bold'
  },
  plannameText: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
  //  textAlign: 'center',
    marginTop: Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    // marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '500'
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
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029

  },
  spinnerText: {
    color: Colors.flBlue.anvil,
    marginTop: 20
  },

  refinesearch: {
    flex: 1,
    backgroundColor: Colors.flBlue.grass,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 0.5,
    borderColor: Colors.snow
  },
  call: {
    flex: 1,
    backgroundColor: Colors.flBlue.ocean,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: Colors.snow
  },
  directions: {
    flex: 1,
    backgroundColor: Colors.flBlue.ocean,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderColor: Colors.snow
  },
  callText: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
    marginLeft: Metrics.baseMargin,
    fontWeight: '400',
    color: Colors.snow
  },
  directionText: {
    color: 'white',
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
    marginLeft: Metrics.baseMargin,
    fontWeight: '400'
  },
  plusView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.bg2,
    height: 60
  },
  plusView1: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.flBlue.grey3,
    height: 60
  },
  plusText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.ocean,
    marginLeft: 20,
    fontWeight: '500'
  },
  plusText1: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
    color: Colors.snow,
    marginLeft: 20,
    fontWeight: '500'
  }

})
