// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoView: {
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * 0.05,
    paddingBottom: Metrics.screenHeight * 0.025
  },
  logo: {
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
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginTop: -Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0015
  },
  form: {
    backgroundColor: Colors.snow,
    borderRadius: 24,
    marginHorizontal: Metrics.section,
    paddingTop: Metrics.smallMargin * Metrics.screenHeight * 0.002,
    paddingBottom: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002
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
    paddingBottom: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0048,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025
  },
  forgotRow: {
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002
  },
  newSignRow: {
    paddingVertical: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.012,
    paddingHorizontal: Metrics.textHeight2 * Metrics.screenWidth * 0.004
  },
  signUpButton: {
    width: Metrics.baseMargin * Metrics.screenWidth * 0.055,
    height: Metrics.baseMargin * Metrics.screenHeight * 0.0062,
    alignSelf: 'center',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.004
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002,
    paddingBottom: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.009
  },
  touchLoginContainer: {
    flex: 1,
    paddingTop: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002,
    paddingBottom: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.006
  },
  fieldContainer: {
    flex: 0.7
  },
  enableTouchContainer: {
    flex: 0.3,
    alignItems: 'center'
  },
  touchViews: {
    alignItems: 'center',
    paddingBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0007
  },
  triggerTouchButton: {
    width: Metrics.baseMargin * Metrics.screenWidth * 0.0179,
    height: Metrics.baseMargin * Metrics.screenHeight * 0.0101
  },
  touchInstruction: {
    textAlign: 'center',
    color: Colors.flBlue.grey3,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0027,
    height: Metrics.baseMargin * Metrics.screenHeight * 0.004
  },
  link: {
    color: Colors.flBlue.ocean,
    textAlign: 'center',
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025
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
    fontSize: Fonts.size.small * Metrics.screenWidth * 0.0022
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
    paddingHorizontal: Metrics.baseMargin * Metrics.screenHeight * 0.002,
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
    alignSelf: 'center'
  },
  textField: {
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
  },
  touchTextField: {
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015,
    width: Metrics.screenWidth * 0.58
  },
  radio: {
    backgroundColor: Colors.snow,
    height: Metrics.section * Metrics.screenWidth * 0.0020,
    width: Metrics.section * Metrics.screenWidth * 0.0020
  }
})
