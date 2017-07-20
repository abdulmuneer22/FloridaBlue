// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cityscape: {
    position: 'absolute',
    top: Metrics.screenHeight * 0.44,
    left: ((Metrics.screenWidth * 6) * -1),
    width: Metrics.screenWidth * 6,
    height: Metrics.screenHeight * 0.31,
    resizeMode: 'stretch'
  },
  centered: {
    alignItems: 'center'
  },
  loginButton: {
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * 0.1,
    paddingHorizontal: Metrics.doubleBaseMargin

  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 24,
    marginHorizontal: Metrics.section
  },
  informationPopup: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: Colors.flBlue.grey2,
    height: Metrics.doubleBaseMargin * 10,
    width: Metrics.screenWidth,

    bottom: Metrics.doubleBaseMargin * 2
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  link: {
    color: Colors.flBlue.ocean,
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
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
    bottom: Metrics.baseMargin,
    marginHorizontal: Metrics.section
  },
  footerText: {
    color: Colors.flBlue.grey4,
    marginHorizontal: Metrics.section,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small
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
    padding: 10,
    marginTop: 10,
    height: 40,
  //  flexWrap:'wrap',
    flexDirection: 'row',
    alignItems: 'center'
  },
  popupchildText: {
    fontSize: 14,
    marginLeft: 5,
    alignSelf: 'center'

  },
  spinnerView: {
  //  alignItems: 'center',
  //  justifyContent: 'center',
    alignSelf: 'center'

  }

})