// @flow

import {StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors} from '../../../Themes/'

export default StyleSheet.create({
  agencyDetailContainer: {
    height: Metrics.baseMargin * Metrics.screenHeight * 0.02,
    backgroundColor: Colors.flBlue.deepBlue
  },
  agencyStatusContainer: {
    height: Metrics.baseMargin * Metrics.screenHeight * 0.011,
    backgroundColor: Colors.bg1
  },
  agencyTitle: {
    color: Colors.flBlue.snow,
    fontSize: Metrics.baseMargin * Metrics.screenHeight * 0.0025,
    fontWeight: '500',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0035,
    paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.006
  },
  agencyAddress: {
    color: Colors.flBlue.snow,
    fontSize: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    fontWeight: '200',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.005,
    paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.006
  },
  agencyAddress2: {
    color: Colors.flBlue.snow,
    fontSize: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    fontWeight: '200',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0002,
    paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.006
  },
  agencyType: {
    color: Colors.flBlue.snow,
    fontSize: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    fontWeight: '200',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.005,
    paddingRight: Metrics.baseMargin * Metrics.screenWidth * 0.006
  },
  statusType: {
    color: Colors.flBlue.snow,
    fontSize: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    fontWeight: '500',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  statusNumber: {
    color: Colors.flBlue.snow,
    fontSize: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    fontWeight: '500',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
