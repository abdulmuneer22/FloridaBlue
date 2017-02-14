// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../Themes/'
var {height,width}=Dimensions.get('window')
const window=Dimensions.get('window')

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
    backgroundColor: 'white'
  },
  headerContainer: {
    flexDirection: 'row',
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.89),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'stretch',
    width: window.width,
    backgroundColor: Colors.flBlue.ocean
  },
  cardStyle: {
    width: window.width,
    backgroundColor: Colors.flBlue.grey2,
   // height : 200,
   // alignSelf: 'center',
   //  padding : 10,
    marginTop: 15,
    alignItems: 'center',
    borderTopWidth:1,
    borderBottomWidth:1,
    borderTopColor: Colors.flBlue.grey3,
    borderBottomColor: Colors.flBlue.grey3,

  },
  cardStyle1: {
    width: window.width,
    backgroundColor: Colors.snow,
   // height : 200,
   // alignSelf: 'center',
   //  padding : 10,
    marginTop: Metrics.baseMargin,
    alignItems: 'center',


  },
  h1: {
    fontSize: Fonts.size.regular,
    fontWeight: '600',
    textAlign: 'center',
    marginTop:Metrics.baseMargin
  },

  h2: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    paddingTop: 15,

  },
  h4: {
    textAlign: 'center',
    paddingBottom: 15,
    fontSize:Fonts.size.medium,
    marginTop:Metrics.smallMargin

  },
  spinnerView:{
    alignItems: 'center',
    justifyContent: 'center',
    width:window.width,
    height:window.height
  }

})
