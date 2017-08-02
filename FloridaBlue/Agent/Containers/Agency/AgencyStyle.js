// @flow

import {StyleSheet, Platform} from 'react-native'
import {Fonts, Metrics, Colors} from '../../Themes/'

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  headerContainerLandscape: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth * 1.78
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'
  },
  agencyTitle: {
    color: Colors.flBlue.anvil,
    backgroundColor: Colors.transparent,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    fontWeight: '200',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.003,
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.003
  },
  agencyBar: {
    alignSelf: 'center',
    width: Metrics.baseMargin * Metrics.screenWidth * 0.093,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.bg2
  },
  filterNameTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.005,
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  filterTypeContainer: {
    flexDirection: 'row',
    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.012,
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  filterTypeTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    paddingRight: Metrics.baseMargin * Metrics.screenWidth * 0.005
  },
  filterDropdown: {
    width: Metrics.screenWidth * 0.7
  },
  filterDropdownItem: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    fontWeight: '200',
    paddingLeft: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
    color: Colors.flBlue.night
  },
  divider: {
    backgroundColor: Colors.flBlue.grey1,
    height: Metrics.screenHeight * 0.0018
  }
})
