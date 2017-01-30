// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../../../Themes/'

export default StyleSheet.create({

    backgroundImage: {
      position: 'absolute',
      top: 0,
      height: Metrics.screenHeight - (Metrics.screenHeight * .3),
      resizeMode: 'stretch'
    },
    logo: {
      width: Metrics.images.logo,
      resizeMode: 'contain'
    },

container:{
    flex:1,
    backgroundColor:'white'
  },

})
