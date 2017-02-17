// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.sky
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin

  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  benefitTileView:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderTopWidth: 1,
    flex:1

  },
  tileView:{
    width: window.width * 0.5,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.76),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.flBlue.lightBlue,
    borderWidth: 1,


    // borderTopWidth:1
  },
  tileText:{
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00265,
    textAlign:'center',
    fontWeight: '600',
    color: 'white',
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
