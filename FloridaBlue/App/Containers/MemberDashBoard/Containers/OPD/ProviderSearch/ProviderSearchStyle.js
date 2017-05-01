// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../../Themes/'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')
const theme = getTheme()


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
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
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'
  },
  h1: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.anvil,
    textAlign: 'center',
    marginTop: Metrics.doubleBaseMargin ,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'
  },
  h2: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.anvil,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontWeight: '600',
    paddingLeft: Metrics.doubleBaseMargin
  },
  subheading: {
    color: Colors.flBlue.grey5,
    marginTop: Metrics.doubleBaseMargin * 1,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    textAlign: 'center'
  },
  radio: {
    backgroundColor: Colors.snow
  },
  radioText: {
    marginTop: Metrics.smallMargin,
    marginRight: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'justify'
  },
  radioView: {
    marginTop: Metrics.mediumMargin,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  savedProviderLink: {
    marginTop: Metrics.mediumMargin,
    alignItems: 'center'
  },
  savedProviderLinkText: {
    color: Colors.flBlue.sky,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    textDecorationLine: "underline"
  },
  textField: {
    marginTop: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
  },
  getResults: {
    marginTop: Metrics.doubleBaseMargin ,
    alignItems: 'center',
  },
   getResultsButton: {
    width: Metrics.screenWidth * 0.5,
    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
    height: Metrics.screenHeight * 0.064
  },
  viewListResults: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002,
    backgroundColor:Colors.transparent,
    marginLeft:Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0035,
    marginBottom:0,
    justifyContent: 'center',
  },
  viewListButton: {
    width: Metrics.mediumMargin * Metrics.screenWidth * 0.03,
    backgroundColor:Colors.transparent,
    resizeMode:'contain',
    borderRadius: Metrics.mediumMargin * Metrics.screenWidth * 0.0015,
    height: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0036
  },
  advancedSearchLink: {
    marginTop: Metrics.doubleBaseMargin * 2,
    paddingBottom: Metrics.doubleBaseMargin * 2,
    alignItems: 'center'
  },
  advancedSearchLinkText: {
    color: Colors.black,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    paddingLeft: Metrics.smallMargin,
    textDecorationLine: 'underline'
  },
  locationView: {
    backgroundColor: Colors.flBlue.grey1,
    marginTop: Metrics.doubleBaseMargin,
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  currentLocationText: {
    color: Colors.flBlue.sky,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0024,
    fontFamily: Fonts.type.base,
    fontWeight: '800',
    paddingLeft: Metrics.doubleBaseMargin,
    paddingTop: Metrics.smallMargin
  },
  differentLocationView: {
    backgroundColor: Colors.flBlue.grey1,
    paddingBottom: Metrics.doubleBaseMargin
  },
  editLocationView: {
    backgroundColor: Colors.flBlue.grey1,
    paddingTop: Metrics.doubleBaseMargin
  },
  editLocation: {
    alignItems: 'center',
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin
  },
  editLocationText: {
    color: Colors.black,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    textDecorationLine: 'underline',
    paddingRight: Metrics.doubleBaseMargin
  },
  editLocationIcon: {
    paddingRight: Metrics.doubleBaseMargin
  },
  dropdownExampleText: {
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    color: Colors.steel,
    fontFamily: Fonts.type.emphasis
  },
  dropdown: {
    width: Metrics.screenWidth * 0.9,
    marginLeft: Metrics.doubleBaseMargin
  },
  dropdownItem: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    paddingLeft: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin
  },
  locationTextContainer: {
    flexDirection: 'column',
    flex: 0.7
  },
  locationButtonContainer: {
    flexDirection: 'column',
    flex: 0.3
  },
  advancedSearchContainer: {
    flexDirection: 'row'
  },
  changeLocationHeader: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.anvil,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontWeight: '600',
    paddingLeft: Metrics.mediumMargin,
    paddingTop: Metrics.smallMargin
  },
  mapIcon: {
    paddingLeft: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  locationRadio: {
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin * 2
  },
  locationText: {
    color: Colors.flBlue.grey4,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025,
    fontFamily: Fonts.type.emphasis,
    fontWeight: '400',
    paddingLeft: Metrics.doubleBaseMargin * 2.8,
  },
  newLocationField: {
    paddingLeft: Metrics.doubleBaseMargin * 2,
    paddingRight: Metrics.doubleBaseMargin * 2,
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
  },
  newLocationHeader: {
    color: Colors.flBlue.grey5,
    marginTop: Metrics.doubleBaseMargin * 2,
    paddingLeft: Metrics.doubleBaseMargin * 2,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
  },
  saveLocation: {
    marginTop: Metrics.doubleBaseMargin * 2,
    paddingRight: Metrics.doubleBaseMargin * 2,
    alignItems: 'flex-end',
  },
  saveLocationButton: {
    width: Metrics.screenWidth * 0.5,
    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
    height: Metrics.screenHeight * 0.066
  },
  fabView: {
    marginTop: Metrics.doubleBaseMargin
  }
})
