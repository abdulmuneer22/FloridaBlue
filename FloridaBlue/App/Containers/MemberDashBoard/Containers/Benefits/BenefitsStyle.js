// @flow

import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../../../Themes/'
 var {height,width}=Dimensions.get('window')
 const window=Dimensions.get('window')
 
export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: Metrics.screenHeight-(Metrics.screenHeight*0.89),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.flBlue.ocean,
    padding: 10,
  //  alignSelf: 'stretch',
    //resizeMode:'cover'
    width:Metrics.screenWidth
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  spinnerText: {

    marginTop: 20
  },
  spinnerView:{
    alignItems: 'center',
    justifyContent: 'center',
    width:window.width,
    height:window.height
  }

})
