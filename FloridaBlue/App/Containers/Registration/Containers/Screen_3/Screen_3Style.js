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
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.59)) / 2
  },
  heading: {
    marginTop: Metrics.doubleBaseMargin,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h4 * Metrics. screenWidth * 0.0033
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
    fontSize: Fonts.size.medium * Metrics. screenWidth * 0.0025,
    flex: 0.8,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
 row: {
    paddingVertical: Metrics.smallMargin * Metrics.screenHeight * 0.003,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.004
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
    height: Metrics.textHeight,
    color: Colors.charcoal
  },
  textfieldWithFloatingLabel: {
    height: Metrics.textHeight2 * Metrics.screenHeight*0.0015,  // have to do it on iOS
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
     fontSize: Fonts.size.small * Metrics. screenWidth * 0.0033
  },
  registrationCodeHeader: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    textAlign: 'center'
  },
  registrationCodeParagraph: {
    fontSize: Fonts.size.description,
    fontFamily: Fonts.type.base,
    textAlign: 'justify'
  }
})
