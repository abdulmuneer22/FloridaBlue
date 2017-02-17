// @flow

import {StyleSheet, Dimensions} from 'react-native'
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
  planNameView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 3

  },
  planNameText:{
    fontSize: Fonts.size.h6 ,
    color:Colors.flBlue.anvil
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
    marginTop: Metrics.smallMargin
//  borderColor:Colors.flBlue.grey4,
//  backgroundColor:Colors.flBlue.grey2
  },
  headerText: {
    color: Colors.flBlue.anvil,
    fontWeight: 'bold',
  // paddingBottom:Metrics.baseMargin,
    marginTop: Metrics.baseMargin,

  // width:window.width,
  // alignSelf:'center',
    fontSize: Fonts.size.h5
  // backgroundColor:Colors.flBlue.ocean
  },
  subHeader: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025,
    color:Colors.flBlue.anvil,
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
