// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../Themes/'

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
    backgroundColor: Colors.flBlue.ocean
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  }

})
