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
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.25),
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
    paddingTop: Metrics.smallMargin * Metrics.screenHeight * 0.0002,
    paddingBottom: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0015
  },
  informationPopup: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: Colors.flBlue.grey2,
    height: Metrics.screenHeight * 0.31,
    width: Metrics.screenWidth,
    bottom: (Platform.OS === 'ios') ? Metrics.doubleBaseMargin * Metrics.screenWidth * 0.011 : Metrics.doubleBaseMargin * Metrics.screenWidth * 0.012
  },
  forgotRow: {
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002
  },
  newSignRow: {
    position: 'absolute',
    top: Metrics.baseMargin * Metrics.screenHeight * 0.0768,
    alignSelf: 'center'
    // paddingHorizontal: Metrics.textHeight2 * Metrics.screenWidth * 0.004
  },
  signUpButton: {
    width: (Platform.OS === 'ios') ? Metrics.baseMargin * Metrics.screenWidth * 0.056 : Metrics.baseMargin * Metrics.screenWidth * 0.060,
    height: (Platform.OS === 'ios') ? Metrics.baseMargin * Metrics.screenHeight * 0.0063 : Metrics.baseMargin * Metrics.screenHeight * 0.008,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.003
  },
  loginContainer: {
    flexDirection: 'column',
    paddingTop: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0013,
    paddingBottom: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0018,
    alignItems: 'center'
  },
  touchLoginContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textFieldContainer: {
    height: Metrics.baseMargin * Metrics.screenWidth * 0.012,
    width:  Metrics.baseMargin * Metrics.screenWidth * 0.08,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.003
  },
  fingerprintContainer: {
    height: Metrics.baseMargin * Metrics.screenWidth * 0.005,
    width: Metrics.baseMargin * Metrics.screenWidth * 0.088,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.003
  },
  fingerprintButton: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom: Metrics.baseMargin * Metrics.screenHeight * 0.004
  },
  fingerprint: {
    height: Metrics.baseMargin * Metrics.screenHeight * 0.0046,
    width: Metrics.baseMargin * Metrics.screenWidth * 0.008,
    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002,
    color: Colors.flBlue.ocean
  },
  touchInstruction: {
    textAlign: 'center',
    color: Colors.flBlue.grey3,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0027,
    height: Metrics.baseMargin * Metrics.screenHeight * 0.0033
  },
  touchCheckbox: {
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0005
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
  infoMenu: {
    paddingRight: Metrics.baseMargin * Metrics.screenWidth * 0.002
  },
  spinnerView: {
    alignSelf: 'center',
     justifyContent: 'center',
    // width: window.width *0.5,
    // height: window.height*0.5
  },
  textField: {
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
  },
  radio: {
    backgroundColor: Colors.snow,
    height: Metrics.section * Metrics.screenWidth * 0.0020,
    width: Metrics.section * Metrics.screenWidth * 0.0020
  },
  popoverContent: {
    backgroundColor: Colors.flBlue.snow,
    borderRadius: 8,
  },
  popoverArrow: {
    borderTopColor: Colors.flBlue.snow,
  },
  popoverButton: {
    color: Colors.flBlue.grey4
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0012,
    paddingHorizontal: Metrics.baseMargin * Metrics.screenWidth * 0.003,
  },
  popoverLogo: {
    paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002,
    color: Colors.flBlue.grey3
  },
  popoverText: {
    paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002
  },
  agentLoginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Metrics.baseMargin * Metrics.screenHeight * 0.003,
    paddingBottom: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  divider: {
    backgroundColor: Colors.flBlue.grey2,
    height: Metrics.screenHeight * 0.0012,
    width: Metrics.baseMargin * Metrics.screenHeight * 0.03,
    marginVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0008,
    alignSelf: 'center'
  }
})
