// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const BUTTON_ACTIVE_COLOR = Colors.flBlue.night
const ACTIVE_BUTTON_TEXT_COLOR = Colors.snow


export default StyleSheet.create({
 

  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.80)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
   // padding: Metrics.mediumMargin,
    // resizeMode:'cover',
    // alignSelf: 'stretch',
    width: Metrics.screenWidth
    // backgroundColor: Colors.flBlue.sky
  },
  cardview:{
     backgroundColor: "#fff",
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }

  },
  cardButton:{
    flexDirection : 'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.snow,
    marginTop:10,
   // height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
   // marginBottom:-3
  },
  cardButtonView: {
    backgroundColor : Colors.flBlue.ocean,
    width:Metrics.screenWidth*0.5,
    justifyContent : 'center',
    alignItems : 'center',
   // marginRight : 1,
    borderRightWidth:1 ,
    borderColor:Colors.snow,
  //  flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection : 'row'
  },
  cardButtonView1: {
   backgroundColor : Colors.flBlue.ocean,
    width:Metrics.screenWidth*0.5,
    justifyContent : 'center',
    alignItems : 'center',
    borderLeftWidth:1 ,
    borderColor:Colors.snow,
   // flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection : 'row'
  },

  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
   // marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'

  },
  doctorTextStyle: {
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.ocean,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '500',
    textAlign: 'center'
  },
  
  h1: {
    
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027,
    //textAlign: 'center',
   // marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
     color: Colors.flBlue.ocean,
  },
 
 
  h2: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0027,
  //  textAlign: 'center',
    marginTop:Metrics.baseMargin,
    color: Colors.flBlue.anvil,
   // paddingTop: Metrics.smallMargin,
    //marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'

  },
  h4: {
   fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
  //  textAlign: 'center',
    marginTop:Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    //marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },

   h4_2: {
   fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
  //  textAlign: 'center',
    //marginTop:Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    //marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },
  h4_3: {
   fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
  //  textAlign: 'center',
    //marginTop:Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: 'bold'
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  },
  subheading: {
    color: Colors.flBlue.anvil,
   // fontSize: Fonts.size.h5,
    marginBottom: Metrics.smallMargin * Metrics.screenWidth * 0.003,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,
    fontFamily: Fonts.type.headerFont

  },
  leftButton : {
        borderTopLeftRadius : 25,
        borderBottomLeftRadius : 25,
        alignItems : 'center',
        justifyContent : 'center',
        //flex : 1,
        // backgroundColor : 
        
    },

    activeButtonStyle : {
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 15,
        paddingRight : 15,
        width : (window.width * 0.95) / 2,
        backgroundColor : BUTTON_ACTIVE_COLOR
        
    },
    rightButton : {
        borderTopRightRadius : 25,
        borderBottomRightRadius : 25,
        alignItems : 'center',
        justifyContent : 'center',
        //flex : 1
    },
    inActiveButtonStyle : {
        backgroundColor : 'rgb(255,255,255)',
        borderWidth : 3,
        paddingTop : 10,
        paddingBottom : 10,
        borderColor : BUTTON_ACTIVE_COLOR,
        width : (window.width * 0.95) / 2,
        // marginLeft : window.width * 0.05
        
    },
     spinnerText: {
      color:Colors.flBlue.anvil,
    marginTop: 20
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  }
})