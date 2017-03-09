// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    //padding: Metrics.mediumMargin,

    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth,
    backgroundColor: Colors.flBlue.ocean
  },
  headerContainerError: {
  //  flexDirection: 'row',
    flex:1,
    height: Metrics.screenHeight,
    //justifyContent: 'space-between',
    //alignItems: 'center',
    alignItems:'center',
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth,
    //backgroundColor: Colors.flBlue.ocean
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  }

})
