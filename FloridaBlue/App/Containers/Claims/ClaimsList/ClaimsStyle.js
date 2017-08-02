// @flow
import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../Themes/'
var { height, width } = Dimensions.get('window')
const window = Dimensions.get('window')
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const theme = getTheme()
const BUTTON_ACTIVE_COLOR = Colors.flBlue.night
const ACTIVE_BUTTON_TEXT_COLOR = Colors.snow
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2
  },
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.sky
  },
  headerContainerLandscape: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth * 1.78
    // backgroundColor: Colors.flBlue.sky
  },
  claimsListCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    // padding: 9,
    // height: 37,
    flex: 1,
    margin: 10,
    marginBottom: 1,
    alignItems: 'center'
  },
  claimsListHeader1: {
    flex: 1
  },
  claimsListHeader2: {
    flex: 0.2,
    marginBottom: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: 'grey'
  },
  claimsListHeader3: {
    flex: 0.2,
    backgroundColor: Colors.snow
  },
  claimsListHeader4: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    margin: 10
  },
  claimsListHeaderText: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.night,
    paddingLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002,
    opacity: 0.9
  },
  claimsCategories1: {
    flex: 1
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow,
    marginTop: 10
    // flex:1
    // height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    // marginBottom:-3
  },
  cardButtonView: {
    backgroundColor: Colors.flBlue.ocean,
    width: Metrics.screenWidth * 0.47,
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight : 1,
    borderRightWidth: 1,
    borderColor: Colors.snow,
    //  flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection: 'row'
  },
  cardButtonView1: {
    backgroundColor: Colors.flBlue.ocean,
    width: Metrics.screenWidth * 0.47,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: Colors.snow,
    // flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection: 'row'
  },
  claimsCardRow1: {
    flex: 0.33,
    alignItems: 'center',
    flexDirection: 'column'
  },
  claimsCardRow2: {
    flex: 0.33,
    alignItems: 'center'
  },
  claimsCardRow3: {
    flex: 0.34,
    alignItems: 'center'
  },
  claimsCategoryText: {
    fontWeight: 'bold',
    marginTop: Metrics.smallMargin * Metrics.screenHeight * 0.001,
    color: Colors.flBlue.anvil,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025

  },
  claimsCardText: {
    color: Colors.flBlue.anvil
  },
  claimsCardContainer: {
    flex: 10

  },
  claimsViewMore: {
    textAlign: 'center',
    color: Colors.flBlue.teal,
    fontSize: 20,
    paddingLeft: 116
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
    // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'
  },
  doctorTextStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.ocean,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '500',
    textAlign: 'center'
  },
  h1: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.baseMargin,
    marginLeft: 10,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
    color: Colors.flBlue.ocean
  },
  h2: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.baseMargin,
    color: Colors.flBlue.anvil,
    marginLeft: 10,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'
  },
  h4: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.smallMargin,
    color: Colors.flBlue.grey5,
    marginLeft: 10,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'auto'
  },
  h4_2: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.grey5,
    marginLeft: 10,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },
  h4_3: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.grey5,
    marginLeft: 10,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: 'bold'
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height,
    flex: 1
  },
  subheading: {
    color: Colors.flBlue.anvil,
    marginBottom: Metrics.smallMargin * Metrics.screenWidth * 0.003,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029
  },
  spinnerText: {
    color: Colors.flBlue.anvil,
    marginTop: 20
  },
  footerView: {
    flex: 1,
    // backgroundColor: Colors.flBlue.grass,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: Colors.snow,
    flexDirection: 'row'
  },
  footerText: {
    color: Colors.snow,
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
    fontWeight: '500'
  },
  refinesearch: {
    flex: 1,
    backgroundColor: Colors.flBlue.grass,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 0.5,
    borderColor: Colors.snow
  },
  call: {
    flex: 1,
    backgroundColor: Colors.flBlue.ocean,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderColor: Colors.snow
  },
  directions: {
    flex: 1,
    backgroundColor: Colors.flBlue.ocean,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderColor: Colors.snow
  },
  callText: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
    marginLeft: Metrics.baseMargin,
    fontWeight: '400',
    color: Colors.snow
  },
  directionText: {
    color: 'white',
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
    marginLeft: Metrics.baseMargin,
    fontWeight: '400'
  },
  searchContainer: {
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    position: 'absolute',
    paddingTop: Metrics.doubleBaseMargin,
    backgroundColor: 'transparent'
  },
  searchTitle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    paddingTop: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    color: Colors.flBlue.anvil
  },
  error: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    paddingTop: Metrics.doubleBaseMargin,
    paddingLeft: Metrics.doubleBaseMargin,
    color: Colors.flBlue.red
  },
  searchButton: {
    backgroundColor: '#00003f',
    marginTop: Metrics.doubleBaseMargin * 2,
    marginBottom: Metrics.doubleBaseMargin * 2,
    width: Metrics.screenWidth * 0.9,
    alignSelf: 'center',
    flex: 1
  },
  closeSearchButton: {
    alignSelf: 'flex-end',
    marginRight: Metrics.baseMargin,
    flex: 1
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  startDateButton: {
    marginTop: Metrics.doubleBaseMargin * 2,
    marginLeft: Metrics.doubleBaseMargin,
    flex: 1,
    flexDirection: 'row'
  },
  addEndDateIcon: {
    paddingTop: Metrics.smallMargin * 0.5,
    paddingRight: Metrics.smallMargin
  },
  calendarIcon: {
    paddingLeft: Metrics.smallMargin
  },
  endDateButton: {
    marginTop: Metrics.doubleBaseMargin * 2,
    marginRight: Metrics.doubleBaseMargin,
    flex: 1,
    flexDirection: 'row'
  },
  dateText: {
    fontSize: Fonts.size.xr,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: Colors.flBlue.grey3,
    textDecorationLine: 'underline'
  },
  addEndDateText: {
    fontSize: Fonts.size.xr,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: Colors.flBlue.ocean,
    textDecorationLine: 'underline'
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
    paddingBottom: Metrics.smallMargin,
    color: Colors.flBlue.night
  },
  textField: {
    marginTop: Metrics.doubleBaseMargin * 2,
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
  }
})
