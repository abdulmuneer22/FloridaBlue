// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Images, Fonts } from '../../../../Themes/'

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
  headerTextStyle:{
    color: Colors.flBlue.ocean,
      backgroundColor:Colors.transparent,
      fontSize: Fonts.size.h3,
      marginLeft: Metrics.baseMargin,
      marginTop:Metrics.smallMargin

  },
  container:{
    flex:1,
    backgroundColor:Colors.snow
  }
})
