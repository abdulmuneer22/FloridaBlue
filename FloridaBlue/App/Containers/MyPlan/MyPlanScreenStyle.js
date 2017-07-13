// @flow

import {StyleSheet, Dimensions, Platform} from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  //  padding: Metrics.mediumMargin,
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
  //  padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth * 1.78
    // backgroundColor: Colors.flBlue.sky
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    flexDirection: 'column'
  },
  planNameView: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -0
   },
  planNameViewLandscape: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -0,
    padding: 10
  },
  planNameText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.grey6,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '500',
    textAlign: 'center'
  },

  chartWrapper: {
     // backgroundColor : 'yellow',
    flex: 0.6
   // marginBottom: 15
  },
  chartWrapperLandscape: {
     // backgroundColor : 'yellow',
    flex: 0.6,
    marginLeft: 150
   // marginBottom: 15
  },
  cardStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  spinnerText: {
    color: Colors.flBlue.anvil,
    marginTop: Metrics.doubleBaseMargin
  },
  wrapper: {
    backgroundColor: Colors.bg2,
    marginTop: 10,
    marginBottom: 20,
   // borderRadius: 2,
    shadowColor: '#000000',
    // shadowOpacity: 0.3,
    // shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    }
    // marginBottom:20,

    // marginLeft:20,
    // marginRight:20,
     // width:Metrics.screenWidth,
    // backgroundColor:'red',
   // margin:20,

  },
  myplanTilesStyle: {
    flexDirection: 'row',
    // backgroundColor : 'red',
    flexWrap: 'wrap',
    flex: (Platform.OS === 'ios') ? 0.3 : 0.25,
    marginLeft: window.width * 0.04,
    marginRight: window.width * 0.03,
    marginTop: (Platform.OS === 'ios') ? window.width * 0.05 : 0,
    marginBottom: window.width * 0.01

  },

  headerStyle: {
    flex: 1,
    alignItems: 'center'

   // marginLeft:20,
  // backgroundColor: 'white',

  },
  headerText: {
    color: Colors.flBlue.grey6,
    fontWeight: '600',
  // paddingBottom:Metrics.baseMargin,
    marginTop: Metrics.baseMargin,

  // width:window.width,
  // alignSelf:'center',
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
    fontFamily: Fonts.type.subHeaderFont
  },

  tileText: {
    marginTop: Metrics.baseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00265,
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
    fontFamily: Fonts.type.subHeaderFont
  },
  subHeader: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0018,
    color: Colors.flBlue.grey6,
    fontFamily: Fonts.type.subHeaderFont,
    marginBottom: Metrics.baseMargin

  },
  listViewBg: {
    flexDirection: 'row',
    marginLeft: Metrics.mediumMargin,
    marginRight: Metrics.mediumMargin
  },
  dataContainer: {
    flex: -1,
 // flexDirection:'row',
    alignItems: 'center'
  // marginLeft: Metrics.doubleBaseMargin,
   // marginRight: Metrics.doubleBaseMargin,
    // flex: 1,
// margin: Metrics.baseMargin,
  //  flexWrap: 'wrap'
  },
  listViewStyle: {
    alignItems: 'flex-start',
    marginLeft: Metrics.doubleBaseMargin

  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  },
  myplanImageStyle1: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  // resizeMode:'contain',
   // backgroundColor:'red',
    width: Platform.OS == 'ios' ? (Metrics.screenWidth) : (Metrics.screenWidth)
  },
  myplanImageStyle2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'yellow',
    width: Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.55) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.56)
  }
})
