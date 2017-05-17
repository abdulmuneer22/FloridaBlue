// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()
const ITEM_SPACING = 10
const ITEM_PREVIEW = 10
const ITEM_PREVIEW_HEIGHT = 150
const ITEM_WIDTH = window.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW)

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
    position: 'absolute',
    // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    paddingTop: window.height - ITEM_PREVIEW_HEIGHT - 64
    // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
  map: {
    flex:8,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight -(Metrics.screenHeight *0.56)
  },
  item: {
    width: ITEM_WIDTH,
    height: window.height + (2 * ITEM_PREVIEW_HEIGHT),
    backgroundColor: 'red',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000'
  },
  locationDetailContainer: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? Metrics.textHeight2 * Metrics.screenHeight * 0.009 : Metrics.textHeight2 * Metrics.screenHeight * 0.008
   // height: Metrics.textHeight2 * Metrics.screenHeight * 0.009,
   // width: Metrics.textHeight2 * Metrics.screenWidth * 0.0185
    // bottom:100

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FF'
  },
  locationText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold'
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
  }
})
