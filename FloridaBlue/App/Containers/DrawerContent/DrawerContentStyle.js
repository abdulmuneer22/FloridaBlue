// @flow
import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'
import { getTheme,
  setTheme } from 'react-native-material-kit'
export default {
  container: {
    flex: 1,
    padding: Metrics.doubleBaseMargin,
    // margin:15,
    backgroundColor: Colors.flBlue.ocean
  },
  container1: {
    flex: 1,
    // padding: 20,
    marginLeft: Metrics.mediumMargin,
    backgroundColor: Colors.flBlue.ocean
  },
  logo: {
    alignSelf: 'center'
  },
  container2: {
    flex: 1,
    padding: Metrics.baseMargin,
    // margin:10,
    // marginTop:15,
    backgroundColor: Colors.flBlue.grey1
  //  backgroundColor:'red'

  },

  wrapper: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  options: {
    backgroundColor: Colors.bg1,
    // paddingLeft: Metrics.mediumMargin,
    paddingTop: Metrics.searchBarHeight
  },
  settings: {
    backgroundColor: Colors.bg2,
    paddingLeft: Metrics.mediumMargin,
    paddingTop: Metrics.baseMargin
  },

  divider: {
    backgroundColor: Colors.snow,
    height: Metrics.screenHeight * 0.0013
    // marginLeft: -Metrics.section
   // marginBottom: Metrics.smallMargin
  },
  heading: {
    color: Colors.snow,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    fontFamily: Fonts.type.subHeaderFont
  },
  benefitHeading: {
    color: Colors.snow,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    // marginTop: Metrics.smallMargin,
    fontFamily: Fonts.type.subHeaderFont
  },
  heading1: {
    color: Colors.snow,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,
    marginBottom: Metrics.baseMargin,
    marginLeft: Metrics.smallMargin,
    fontFamily: Fonts.type.subHeaderFont
  //  marginTop: Metrics.baseMargin
  },
  subheading: {
    color: Colors.snow,
   // fontSize: Fonts.size.h5,
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0029

  },
  myAccountStyle: {
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
    flexDirection: 'row'
  },

  heading2: {
    color: Colors.flBlue.ocean,
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0030,
    marginLeft: Metrics.baseMargin,
    fontFamily: Fonts.type.subHeaderFont
  },
  heading3: {
    color: Colors.flBlue.ocean,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    marginLeft: 4,
    fontFamily: Fonts.type.subHeaderFont
  },
  logoutView: {
    marginTop: Metrics.doubleBaseMargin,
    margin: Metrics.baseMargin
  },
  logoutStyle: {
    width: Metrics.screenWidth * 0.55,
    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
    height: Metrics.screenHeight * 0.055,
    // width:160,
    alignSelf: 'center'
  },
  toggleText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#616161'
  },
  toggleOnText: {
    color: getTheme().primaryColor
  }
}
