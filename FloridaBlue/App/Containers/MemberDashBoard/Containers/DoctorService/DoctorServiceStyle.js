// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

export default StyleSheet.create({

  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.3),
    resizeMode: 'stretch'
  },
  logo: {
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },

  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.sky
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0027,
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin

  },
  doctorCardStyle: {
    alignItems: 'center',
    marginTop: Metrics.baseMargin
  },

  doctorTextStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0023,
    color: Colors.flBlue.anvil
  },
  cardStyle: {
    width: window.width,
    backgroundColor: Colors.flBlue.lightBlue,
   // height : 200,
   // alignSelf: 'center',
   //  padding : Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
  //  alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderTopColor: Colors.flBlue.grey3,
    borderBottomColor: Colors.flBlue.grey3

  },
  cardStyle1: {
    width: window.width,
    backgroundColor: Colors.snow,
   // height : 200,
   // alignSelf: 'center',
   //  padding : Metrics.baseMargin,
    marginTop: Metrics.baseMargin

  //  alignItems: 'center',

  },
  h1: {
    // flexWrap:'wrap',
    margin: 5,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    // fontWeight: '600',
    color: Colors.flBlue.anvil,
    textAlign: 'center',
    marginTop: Metrics.mediumMargin
  },

  h2: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0029,
  //  textAlign: 'center',
    color: Colors.flBlue.anvil,
    paddingTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin

  },
  h4: {
    // textAlign: 'center',
    // paddingBottom: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030,
    marginTop: Metrics.smallMargin,
    color: Colors.flBlue.grey5,
    marginLeft: Metrics.baseMargin
  //  marginBottom:5

  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  }

})
