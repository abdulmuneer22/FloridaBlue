// @flow

import {StyleSheet, Dimensions} from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height,width}=Dimensions.get('window')
const window=Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight-(Metrics.screenHeight*0.81))/2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.mediumMargin,
    //resizeMode:'cover',
    //alignSelf: 'stretch',
    width: Metrics.screenWidth,
    //backgroundColor: Colors.flBlue.sky
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  PlanName: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (Metrics.screenHeight-(Metrics.screenHeight*0.81))/3

  },

  chartWrapper: {
    //   backgroundColor : 'yellow',
    flex: 2,
    marginBottom: 20
  },
  cardStyle: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  spinner: {
  //  color:Colors.flBlue.red,
  // alignItems:'center',
  // justifyContent:'center',
  // height:window.height
  },
  spinnerText: {

    marginTop: 20
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
    marginTop: 5
//  borderColor:Colors.flBlue.grey4,
//  backgroundColor:Colors.flBlue.grey2
  },
  headerText: {
    color: Colors.flBlue.night,
    fontWeight: 'bold',
  // paddingBottom:10,
    marginTop: 10,

  // width:window.width,
  // alignSelf:'center',
    fontSize: Fonts.size.h6
  // backgroundColor:Colors.flBlue.ocean
  },
  subHeader: {
    fontSize: Fonts.size.regular,
    marginBottom: 10,
    marginTop: 10
  },
  listViewBg: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15
  },
  dataContainer: {
//  flexDirection:'row',
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    margin: 10,
    flexWrap: 'wrap'
  },
  listViewStyle: {
    alignItems: 'flex-start',

    marginLeft: 20

  },
  spinnerView:{
  alignItems: 'center',
  justifyContent: 'center',
  width:window.width,
  height:window.height*0.5
}
})
