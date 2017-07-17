// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../Themes/'
var {height, width} = Dimensions.get('window')
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
  container1: {
    flex: 1,
    backgroundColor: Colors.snow
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

  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },

  h1: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    marginTop: Metrics.baseMargin,
    marginLeft: 10,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
    color: Colors.flBlue.ocean
  },

  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  },

  spinnerText: {
    color: Colors.flBlue.anvil,
    marginTop: 20
  },
 	backTextWhite: {
   color: '#FFF'
 },
  rowFront: {
    backgroundColor: '#FFF',
		// height: 180,
    borderRadius: 10,
  //  marginTop: 5,
   // margin: 5,
    flex: 1
  },
  rowBack: {
    alignItems: 'center',
		// backgroundColor: 'red',
    flex: 1,
   // marginRight:10,
    flexDirection: 'row',
	//	justifyContent: 'space-between',
	//	paddingLeft: 15,
    borderRadius: 20
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 100,
    borderRadius: 20
  },

  backRightBtnRight: {
    backgroundColor: 'green',
    right: 0,
    borderRadius: 20
  }

})
