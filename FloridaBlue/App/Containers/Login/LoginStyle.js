// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoView: {
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * 0.05,
    paddingBottom: Metrics.screenHeight * 0.05
  },
  logo: {
   // width: Metrics.images.logo,
   // resizeMode: 'contain'
    width: Metrics.screenWidth * 0.85,
    resizeMode: 'contain',
    height: Metrics.images.xll2 * Metrics.screenHeight * 0.0015
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.3),
    resizeMode: 'stretch'
  },
  centered: {
    alignItems: 'center'
  },
  loginButton: {
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * 0.16,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  touchCoin: {
    width: 70,
    height: 70
  },
  touchRow: {
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.001,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.001
  },
  form: {
    backgroundColor: Colors.snow,
  //  margin: Metrics.smallMargin,
    borderRadius: 24,
    marginHorizontal: Metrics.section
  },
  informationPopup: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: Colors.flBlue.grey2,
    height: Metrics.screenHeight * 0.31,
    width: Metrics.screenWidth,
    bottom: (Platform.OS === 'ios') ? Metrics.doubleBaseMargin * Metrics.screenWidth * 0.011 : Metrics.doubleBaseMargin * Metrics.screenWidth * 0.012
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0016,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  forgotRow: {
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002
  },
  touchRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0013,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.009
  },
  spaceRow: {
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0024,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.009
  },
  newSignRow: {
    paddingVertical: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0014,
    paddingHorizontal: Metrics.textHeight2 * Metrics.screenWidth * 0.006

  },
  link: {
    color: Colors.flBlue.ocean,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0027
  },
  textInput: {
    height: 40,
    color: Colors.flBlue.grey6,
    fontWeight: 'bold'
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: (Platform.OS === 'ios') ? Metrics.searchBarHeight1 : Metrics.searchBarHeight,
    marginHorizontal: Metrics.textHeight1
  },
  footerText: {
    color: Colors.flBlue.grey4,
    marginHorizontal: Metrics.section,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small * Metrics.screenWidth * 0.0030
  },
  footerLinks: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: Metrics.baseMargin,
    marginHorizontal: Metrics.section
  },
  popupchild: {
    width: Metrics.screenWidth * 0.5,
    // backgroundColor : 'yellow',
    paddingHorizontal: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    // marginTop: 5,
    height: Metrics.screenHeight * 0.07,
    flexDirection: 'row',
    alignItems: 'center'

  },
  popupchildText: {
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0027,
    marginLeft: Metrics.smallMargin,
    color: Colors.flBlue.anvil,
    alignSelf: 'center'

  },
  spinnerView: {
  //  alignItems: 'center',
  //  justifyContent: 'center',
    alignSelf: 'center'
   // height:Metrics.screenHeight

  },

  textField: {
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
    // width: Metrics.searchBarHeight * Metrics.screenWidth * 0.024
  },
  radio: {
    backgroundColor: Colors.snow,
    height: Metrics.section * Metrics.screenWidth * 0.0020,
    width: Metrics.section * Metrics.screenWidth * 0.0020
  }

})
