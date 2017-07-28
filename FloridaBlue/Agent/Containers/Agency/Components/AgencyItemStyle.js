// @flow

import {StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../Themes/'

export default StyleSheet.create({
  agentItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  agentColumnContainer: {
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    paddingHorizontal: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  itemChevron: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0025
  },
  agentIcon: {
    color: Colors.flBlue.grey3
  },
  topText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0018,
    fontWeight: '400',
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0002
  },
  bottomText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0015,
    fontWeight: '400',
    color: Colors.flBlue.grey3,
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0002
  },
  divider: {
    backgroundColor: Colors.flBlue.grey1,
    height: Metrics.screenHeight * 0.0018
  }
})
