// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../../../Themes/'
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
    //backgroundColor: Colors.flBlue.ocean
  },
  hsaHeader: {
    flexDirection: 'row',
    height: (Metrics.screenHeight-(Metrics.screenHeight*0.795)),
  // marginTop:20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    width: Metrics.screenWidth,
  // overflow: 'visible',
   resizeMode: 'cover',
  //  alignSelf: 'stretch'
  // width:Metrics.screenWidth,
  // backgroundColor:Colors.flBlue.ocean
  },
  hsaBg: {
 // flexDirection:'row',
    height:Metrics.screenHeight-(Metrics.screenHeight*0.45),
 // marginTop:20,
 // justifyContent:'space-between',
 // alignItems:'center',
 // padding:10,
    alignSelf: 'stretch',
    width: Metrics.screenWidth
 // backgroundColor:Colors.flBlue.ocean
  },
  container: {
    flex: 1,
    backgroundColor: Colors.snow

  },
  summary: {
    flexDirection: 'row',
    height: 200,
    backgroundColor: '#E8E8E8'
  },
  footerImage: {
    flexDirection: 'row',
    height:Metrics.screenHeight-(Metrics.screenHeight*0.81),
     // height : window.height * 0.5,
    //justifyContent: 'space-between',
    //alignItems: 'center',
  //  alignSelf: 'stretch',
  resizeMode:'cover',
    width: Metrics.screenWidth
  },
  titleView: {
    marginTop: Metrics.baseMargin
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBackground: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    padding: Metrics.doubleBaseMargin
  },

  textBackground1: {
    flexDirection: 'row',
    backgroundColor: Colors.flBlue.grey2,
    padding: Metrics.doubleBaseMargin
  },

  textStyle1: {
    fontSize: Fonts.size.regular
    // fontWeight:'bold'
  },

  textStyle: {
    fontSize: Fonts.size.regular,
    fontWeight: 'bold'
  },
  hsaText: {
    fontSize: Fonts.size.regular,
    fontWeight: '600',
    textAlign: 'center',
    padding: 5,
    marginTop:Metrics.smallMargin
  },

  row_1: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
  },
  col_1: {
    flex: 1,
    // backgroundColor : 'yellow',
    alignItems: 'center'
  },

  row_2: {
    alignItems: 'center',
    // paddingTop : 10
    paddingBottom: 15
  },
  spinnerView:{
    alignItems: 'center',
    justifyContent: 'center',
    width:window.width,
    height:window.height
  }

})
