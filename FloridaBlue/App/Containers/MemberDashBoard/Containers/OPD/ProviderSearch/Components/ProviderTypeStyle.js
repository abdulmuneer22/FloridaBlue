// @flow

import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../../../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 0
  },
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'
  },
  heading: {
    marginTop: Metrics.doubleBaseMargin,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025
  },
  row: {
    flexDirection: 'row',
    paddingVertical: Metrics.smallMargin * Metrics.screenHeight * 0.003,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.003
  },
  text: {
    color: Colors.flBlue.anvil,
    fontWeight: '400',
    fontSize: Fonts.size.xm * Metrics.screenWidth * 0.0027
  },
  linkText: {
    color: Colors.flBlue.sky,
    fontWeight: '400',
    fontSize: Fonts.size.xm * Metrics.screenWidth * 0.0027,
    textDecorationLine: 'underline'
  },
  paragraph: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0026,
    textAlign: 'justify',
    color: Colors.flBlue.anvil
  },
})
