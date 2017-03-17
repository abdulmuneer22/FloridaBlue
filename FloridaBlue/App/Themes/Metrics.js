// @flow

import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  footerBaseMargin: 25,
  smallMargin: 5,
  mediumMargin: 15,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  textHeight: 40,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  // standardHeight: (Platform.OS === 'ios') ?
  buttonRadius: 4,
  icons: {
    tiny: 12,
    small: 20,
    xm: 25,
    medium: 30,
    regular: 35,
    xml: 40,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    average: 25,
    average1: 28,
    xa: 30,
    medium: 40,
    xm: 50,
    xm1:55,
    large: 60,
    xl: 65,
    xll:70,
    logo: 300
  }
}

export default metrics
