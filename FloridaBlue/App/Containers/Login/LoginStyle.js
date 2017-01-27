// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics  } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoView: {
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * .05,
    paddingBottom: Metrics.screenHeight * .05,
  },
  logo: {
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: Metrics.screenHeight - (Metrics.screenHeight * .3),
    resizeMode: 'stretch'
  },
  centered: {
    alignItems: 'center'
  },
  loginButton: {
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * .1
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 24,
    marginHorizontal: Metrics.section
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  link: {
    color: Colors.flBlue.ocean,
    alignItems: 'center',
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    color: Colors.charcoal
  }
})
