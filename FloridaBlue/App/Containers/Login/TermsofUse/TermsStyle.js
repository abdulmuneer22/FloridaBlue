// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  checkViewStyle: {
    height:  (Metrics.screenHeight - (Metrics.screenHeight * 0.75)) / 2,
    backgroundColor: Colors.flBlue.grey2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.flBlue.grey4,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
   headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  //  padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.sky
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
    // marginLeft:,
   // textAlign:'center',
    fontFamily: Fonts.type.headerFont,
  //  marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023

  },
  checkStyle: {
    flex: 0.2,
    // backgroundColor : 'yellow',
    alignItems: 'center'

  },
  checkTextView: {
    flex: 0.8
    // backgroundColor : 'purple'
  },
  checkText: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025
  },
  agreeButton: {
    alignSelf: 'center',
    backgroundColor: Colors.flBlue.ocean,
    paddingLeft: 30,
    paddingRight: 30,
    padding: 10,
    marginBottom: 13,
    borderRadius: 6
  },
  iAgree: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: Metrics.mediumMargin,
    width: Metrics.screenWidth * 0.35,
    borderRadius:Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0015,
    height:Metrics.screenHeight * 0.055
  },

  backButton: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  },
  nextButton: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  findItButton: {
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    color: Colors.charcoal
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: Metrics.baseMargin,
    marginHorizontal: Metrics.section
  },
  footerText: {
    color: Colors.flBlue.grey4,
    marginHorizontal: Metrics.section,
    marginBottom: Metrics.mediumMargin,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0024
  },
   spinnerText: {

    marginTop: 20
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height,
    marginTop:Metrics.screenHeight*0.5
  }
})
