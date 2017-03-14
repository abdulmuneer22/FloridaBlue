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
    height: 120,
    backgroundColor: Colors.flBlue.grey2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.flBlue.grey4,
    borderTopWidth: 1,
    borderBottomWidth: 1
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
    fontSize: Fonts.size.regular
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
    marginBottom: Metrics.mediumMargin
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
    marginBottom: Metrics.baseMargin,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small
  }
})