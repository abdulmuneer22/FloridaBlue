// @flow
import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default {
  container: {
    flex: 1,
    padding: Metrics.doubleBaseMargin,
    // margin:15,
    backgroundColor: Colors.flBlue.ocean
  },
  container1: {
    flex: 1,
    // padding: 20,
    marginLeft: Metrics.mediumMargin,
    backgroundColor: Colors.flBlue.ocean
  },
  logo: {
    alignSelf: 'center'
  },
  container2: {
    flex: 1,
    padding: Metrics.baseMargin,
    // margin:10,
    // marginTop:15,
    backgroundColor: Colors.flBlue.grey1
  //  backgroundColor:'red'

  },
  logo: {
    alignSelf: 'center'
  },
  wrapper: {
    flex:1,
    backgroundColor:Colors.snow
  },
  options: {
    backgroundColor: Colors.bg1,
    paddingLeft: Metrics.mediumMargin,
    paddingTop: Metrics.searchBarHeight
  },
  settings: {
    backgroundColor: Colors.bg2,
    paddingLeft: Metrics.mediumMargin,
    paddingTop: Metrics.doubleBaseMargin
  },

  divider: {
    backgroundColor: Colors.snow,
    height: 1,
    marginLeft: -15,
    marginBottom: Metrics.smallMargin
  },
  heading: {
    color: Colors.snow,
    fontSize: Fonts.size.h5,
    marginBottom: Metrics.mediumMargin,
    marginTop: Metrics.baseMargin
  },
  subheading: {
    color: Colors.snow,
    fontSize: Fonts.size.h5,
    marginBottom: Metrics.mediumMargin

  },

  heading2: {
    color: Colors.flBlue.ocean,
    fontSize: Fonts.size.h6,
    marginLeft: Metrics.baseMargin
  }
}
