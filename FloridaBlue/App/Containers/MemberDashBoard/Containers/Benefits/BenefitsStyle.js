// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  //  padding: Metrics.baseMargin,
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
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  benefitTileView: {
    flexDirection: 'row',
          // backgroundColor : 'red',
    flexWrap: 'wrap',
    flex: 1

  },
  tileView: {
    width: window.width * 0.5,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.76),
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: Colors.flBlue.green,
    // shadowOpacity: 2,
    // shadowOffset: {width: 5, height: 5},
    // shadowRadius: 15,
    borderWidth: 6,
    marginTop: 3,
    borderColor: Colors.snow

    // borderTopWidth:1
  },
  tileText: {
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00265,
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    fontFamily: Fonts.type.subHeaderFont
  },
  spinnerText: {

    marginTop: 20
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  }

})
