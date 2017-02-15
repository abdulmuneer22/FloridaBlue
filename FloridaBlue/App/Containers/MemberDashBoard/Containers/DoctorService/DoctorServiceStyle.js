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
    height: (Metrics.screenHeight-(Metrics.screenHeight*0.81))/2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.mediumMargin,
    //resizeMode:'cover',
    //alignSelf: 'stretch',
    width: Metrics.screenWidth,
    //backgroundColor: Colors.flBlue.sky
  },
  cardStyle: {
    width: window.width,
    backgroundColor: Colors.flBlue.grey2,
   // height : 200,
   // alignSelf: 'center',
   //  padding : 10,
    marginTop: Metrics.mediumMargin,
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
    //flexWrap:'wrap',
    margin:5,
    fontSize: Fonts.size.regular,
    fontWeight: '600',
    textAlign: 'center',
    marginTop:Metrics.smallMargin
  },

  h2: {
    fontSize: Fonts.size.regular,
    textAlign: 'center',
    paddingTop: Metrics.baseMargin,

  },
  h4: {
    textAlign: 'center',
    //paddingBottom: Metrics.mediumMargin,
    fontSize:Fonts.size.medium,
    marginTop:Metrics.smallMargin,
  //  marginBottom:5

  },
  spinnerView:{
    alignItems: 'center',
    justifyContent: 'center',
    width:window.width,
    height:window.height
  }

})
