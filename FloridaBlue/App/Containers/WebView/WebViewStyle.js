// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'
const window = Dimensions.get('window')

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: Metrics.mediumMargin,

    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth,
    backgroundColor: Colors.flBlue.ocean
  },
  headerContainerError: {
   width: Metrics.screenWidth,
   height: (Platform.OS === 'ios') ? Metrics.screenHeight : Metrics.screenHeight - Metrics.section,
   resizeMode: 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  }

})
