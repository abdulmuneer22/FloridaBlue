// @flow

import {StyleSheet, Dimensions} from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
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
    //marginLeft:,
    fontFamily:Fonts.type.headerFont,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023

  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  planNameView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 3

  },
  planNameText:{
    fontSize: Fonts.size.h5 ,
    color:Colors.flBlue.anvil,
    fontFamily:Fonts.type.subHeaderFont,
    fontWeight:'500'
  },

  chartWrapper: {
    //   backgroundColor : 'yellow',
    flex: 2,
    marginBottom: Metrics.doubleBaseMargin
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

  headerStyle: {
    flex: 1,
    alignItems: 'center',
  // justifyContent:'center',
    flexWrap: 'nowrap',
//  borderWidth:2,
    marginTop: Metrics.smallMargin,
    marginLeft:10,
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
    fontSize: Fonts.size.h5,
    fontFamily:Fonts.type.subHeaderFont,
  // backgroundColor:Colors.flBlue.ocean
  },
  subHeader: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025,
    color:Colors.flBlue.anvil,
    fontFamily:Fonts.type.subHeaderFont,
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
    flex: 1,
    margin: Metrics.baseMargin,
    flexWrap: 'wrap'
  },
  listViewStyle: {
    alignItems: 'flex-start',

    marginLeft: Metrics.doubleBaseMargin

  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height * 0.5
  }
})
