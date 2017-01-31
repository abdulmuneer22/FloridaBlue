// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../../../Themes/'

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
  headerContainer:{
   flexDirection:'row',
   height:78,
   justifyContent:'space-between',
   alignItems:'center',
   padding:10,
   alignSelf:'stretch',
   width:null,
   backgroundColor:Colors.flBlue.ocean
 },

})
