// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingTop: 0
  },
  headerImage: {
    width: Metrics.screenWidth,
    resizeMode: 'stretch',
   // alignItems:'center',
    // justifyContent:'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.59)) / 2
  },
  heading: {
    marginTop: Metrics.doubleBaseMargin,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025
  },
  topText: {
    color: Colors.flBlue.anvil,
   // marginHorizontal: Metrics.section,
    // marginBottom: Metrics.baseMargin,
    fontWeight: '400',
    fontSize: Fonts.size.xm * Metrics.screenWidth * 0.0027
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0033,
    marginTop: 20,
    marginLeft: Metrics.mediumMargin,
    // marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '400'

  },
  messageView: {
    padding: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.flBlue.red,
    borderRadius: 12,
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagePadding: {
    flex: 0.1
  },
  message: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025,
    flex: 0.8,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  row: {
    paddingVertical: Metrics.smallMargin * Metrics.screenHeight * 0.001,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.003
  },
  hintRow: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  hintImage: {
    marginTop: Metrics.doubleBaseMargin,
    marginHorizontal: 10,
    backgroundColor: Colors.transparent
   // color:Colors.snow
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    width: Metrics.screenWidth,
    marginTop: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'stretch',
    justifyContent: 'space-between'
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
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,  // have to do it on iOS
    marginTop: Metrics.baseMargin
  },
  spinnerView: {
    alignSelf: 'center'
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
    marginBottom: Metrics.baseMargin,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small * Metrics.screenWidth * 0.0025
  }
})
