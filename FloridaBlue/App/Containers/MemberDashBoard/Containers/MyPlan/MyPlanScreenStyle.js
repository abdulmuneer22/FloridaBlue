// @flow

import {StyleSheet, Dimensions, Platform} from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
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
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  planNameView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.smallMargin,
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 3

  },
  planNameText: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '500',
    textAlign: 'center'
  },

  chartWrapper: {
    //   backgroundColor : 'yellow',
    flex: 2,
    marginBottom: 25
  },
  cardStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

  spinnerText: {

    marginTop: Metrics.doubleBaseMargin
  },
  wrapper: {
    backgroundColor: Colors.snow

  },
  myplanTilesStyle: {
    flexDirection: 'row',
          // backgroundColor : 'red',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: window.width * 0.04,
    marginRight: window.width * 0.03,
    marginTop: window.width * 0.04,
    marginBottom: window.width * 0.01

  },

  headerStyle: {
    flex: 1,
    alignItems: 'center',
  // justifyContent:'center',
    flexWrap: 'nowrap',
//  borderWidth:2,
    marginTop: Metrics.smallMargin,
    marginLeft: 10,
    marginRight: 15
//  borderColor:Colors.flBlue.grey4,
//  backgroundColor:Colors.flBlue.grey2
  },
  headerText: {
    color: Colors.flBlue.anvil,
    fontWeight: '500',
  // paddingBottom:Metrics.baseMargin,
    marginTop: Metrics.baseMargin,

  // width:window.width,
  // alignSelf:'center',
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    fontFamily: Fonts.type.subHeaderFont
  // backgroundColor:Colors.flBlue.ocean
  },
  tileView: {
    width: window.width * 0.5,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.76),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: Colors.snow

    // borderTopWidth:1
  },
  tileStyle: {
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.5),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
    alignItems: 'center',
    justifyContent: 'center',
    // margin:4,
    marginTop: 4,
    marginBottom: 4,
    marginRight: (Metrics.baseMargin) / 2,
    marginLeft: Metrics.baseMargin

  },
  tileStyle1: {
    width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.5),
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
    alignItems: 'center',
    justifyContent: 'center',
    // margin:4,
    marginTop: 4,
    marginBottom: 4,
    marginRight: (Metrics.baseMargin),
    marginLeft: (Metrics.baseMargin) / 2

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
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.subHeaderFont,
    marginBottom: Metrics.baseMargin,
    marginTop: Metrics.baseMargin
  },
  listViewBg: {
    flexDirection: 'row',
    marginLeft: Metrics.mediumMargin,
    marginRight: Metrics.mediumMargin
  },
  dataContainer: {
//  flexDirection:'row',
    marginLeft: Metrics.doubleBaseMargin,
    marginRight: Metrics.doubleBaseMargin,
    // flex: 1,
    margin: Metrics.baseMargin,
    flexWrap: 'wrap'
  },
  listViewStyle: {
    alignItems: 'flex-start',

    marginLeft: Metrics.doubleBaseMargin

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
