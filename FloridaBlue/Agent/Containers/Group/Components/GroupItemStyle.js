// @flow

import {StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../Themes/'

export default StyleSheet.create({
  groupItemContainer: {
    flexDirection: 'row'
  },
  groupColumnContainer: {
    flexDirection: 'column',
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    paddingHorizontal: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  itemChevron: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0025
  },
  groupIcon: {
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
  effectiveDateText: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0016,
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0002,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0018,
    fontWeight: '400'
  },
  divider: {
    backgroundColor: Colors.flBlue.grey1,
    height: Metrics.screenHeight * 0.0018
  },
  status: {
    backgroundColor: Colors.flBlue.ocean,
    width: Metrics.screenWidth * 0.012,
    height: Metrics.screenHeight * 0.095,
    alignSelf: 'center',
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0008,
    borderRadius: 4
  }
})
