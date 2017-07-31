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
  groupHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.003
  },
  groupTitle: {
    color: Colors.flBlue.anvil,
    backgroundColor: Colors.transparent,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    fontWeight: '200',
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.003
  },
  groupBar: {
    alignSelf: 'center',
    width: Metrics.baseMargin * Metrics.screenWidth * 0.094,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0015,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  groupName: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    color: Colors.flBlue.grey3,
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0007
  },
  searchInput: {
    height: Metrics.baseMargin * Metrics.screenHeight * 0.006,
    marginHorizontal: Metrics.baseMargin * Metrics.screenWidth * 0.004,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    borderColor: Colors.flBlue.grey1,
    borderWidth: 1,
    borderRadius: 5,
    shadowOpacity: 0.1,
  },
  searchIcon: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0008,
    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.003,
    alignSelf: 'flex-end',
    color: Colors.flBlue.grey2
  },
  filterContainer: {
    paddingHorizontal: Metrics.baseMargin * Metrics.screenWidth * 0.005
  },
  filterDropdownContainer: {
    backgroundColor: Colors.flBlue.lightsky
  },
  addFilterContainer: {
  },
  addFilterIcon: {
    color: Colors.flBlue.grey2
  },
  groupListHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.flBlue.lightBlue
  },
  groupNameTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.005,
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  groupTypeContainer: {
    flexDirection: 'row',
    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.012,
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.002
  },
  groupDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0005
  },
  groupTypeTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: '500',
    paddingRight: Metrics.baseMargin * Metrics.screenWidth * 0.005
  },
  groupDropdownTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.tiny,
    fontWeight: '500'
  },
  groupDropdown : {
    width: Metrics.baseMargin * Metrics.screenWidth * 0.03,
    marginVertical: Metrics.baseMargin * Metrics.screenHeight * 0.0012,
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002,
    backgroundColor: Colors.flBlue.lightsky,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: Colors.flBlue.grey2
  },
  groupDropdownItem: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0008,
    width: Metrics.baseMargin * Metrics.screenWidth * 0.03,
    height: Metrics.baseMargin * Metrics.screenHeight * 0.0085,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: Colors.flBlue.grey1,
    shadowOpacity: 0.1
  },
  groupDropdownText: {
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
