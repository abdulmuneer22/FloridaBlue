// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
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
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.79)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  chart_title : {
      paddingTop: 10,
      textAlign: 'center',
      paddingBottom: 5,
      paddingLeft: 5,
      fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0015,
      backgroundColor:'white',
      color: 'grey',
      fontWeight:'bold',
    },
  recentClaimsView: {
    flex:3.7,
    backgroundColor:Colors.flBlue.grey1,
  },
  recentClaimsText: {
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0015,
    color: Colors.flBlue.grey5,
    fontWeight:'bold'
  },
  totalClaimsText : {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.grey5,
    fontWeight:'normal'
  },
  totalClaimsTextCount : {
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0022,
    color: Colors.flBlue.grey5,
    fontWeight:'bold'
  },
  getResults: {
    marginTop: 10,
    alignItems: 'center',
        flex:0.8
  },
  getResultsButton: {
    width: Metrics.screenWidth * 0.55,
    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025,
    height: Metrics.screenHeight * 0.05,
    alignItems: 'center',
  },
  textStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0022,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.headerFont,
  },    

})

