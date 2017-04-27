// @flow

import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../../../../Themes/'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()



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
  cardButton:{
    flexDirection : 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  cardButtonView: {
    backgroundColor : Colors.flBlue.ocean,
    width:Metrics.screenWidth*0.46,
    justifyContent : 'center',
    alignItems : 'center',
   // marginRight : 1,
    borderRightWidth:1 ,
    borderColor:Colors.snow,
    flex:1,
    height: Metrics.textHeight2 * Metrics.screenHeight * 0.0015,
    flexDirection : 'row'
  },
  cardButtonView1: {
    backgroundColor : Colors.flBlue.ocean,
    width:Metrics.screenWidth*0.46,
    justifyContent : 'center',
    alignItems : 'center',
    borderLeftWidth:1 ,
    borderColor:Colors.snow,
    flex:1,
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
   genderRadioView: {
    //marginTop: Metrics.mediumMargin,
   // justifyContent: 'center',
    flexDirection: 'row',
    marginLeft:Metrics.doubleBaseMargin
  },

    languageView:{
    borderTopWidth:1,
  //  borderBottomWidth:1,
    borderColor:Colors.flBlue.grey1,
   // marginTop:Metrics.baseMargin,
  //  marginBottom:Metrics.baseMargin
},
 languageText: {
    marginTop: 15,
    marginLeft: Metrics.mediumMargin,
    marginBottom:10,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    //textAlign: 'center'
  },
  genderView:{
    borderTopWidth:1,
  //  borderBottomWidth:1,
    borderColor:Colors.flBlue.grey1,
   // marginTop:Metrics.baseMargin,
  //  marginBottom:Metrics.baseMargin
  },
   genderText: {
    marginTop: 5,
   // marginLeft: Metrics.baseMargin,
   // marginRight: Metrics.mediumMargin,
     marginBottom:Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0027,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'center'
  },
  doctorTextStyle: {
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
   // textAlign: 'center',
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
    marginBottom:Metrics.baseMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
     color: Colors.flBlue.grey6,
  },

  h1: {

    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
   // textAlign: 'center',
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.baseMargin,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '600',
     color: Colors.flBlue.grey6,
  },


  h2: {
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
  //  textAlign: 'center',
    marginTop:Metrics.baseMargin,
    color: Colors.flBlue.anvil,
   // paddingTop: Metrics.smallMargin,
    marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '600'

  },
  h4: {
   fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
  //  textAlign: 'center',
    marginTop:Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },

   h4_2: {
   fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
  //  textAlign: 'center',
    //marginTop:Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400'
  },
  h4_3: {
   fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
  //  textAlign: 'center',
    //marginTop:Metrics.baseMargin,
    color: Colors.flBlue.grey5,
   // paddingTop: Metrics.smallMargin,
    marginLeft: Metrics.doubleBaseMargin,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: 'bold'
  },
  spinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    height: window.height
  },
  spinnerText: {
   color:Colors.flBlue.anvil,
   marginTop: 20
  },
  subheading: {
    color: Colors.flBlue.anvil,
   // fontSize: Fonts.size.h5,
    marginBottom: Metrics.smallMargin * Metrics.screenWidth * 0.003,
    fontFamily: Fonts.type.subHeaderFont,
    fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,


  },
   radioText: {
    marginTop: 5,
    marginLeft: Metrics.baseMargin,
   // marginRight: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'justify'
  },
  radioBottomText: {
   // marginTop: 2,
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
   // textAlign: 'center'
  },
  radioView: {
    marginTop: Metrics.mediumMargin,
   // justifyContent: 'center',
    flexDirection: 'row',
    marginLeft:15
  },

  searchText: {
    marginTop: 5,
    marginLeft: Metrics.baseMargin,
    marginBottom:Metrics.baseMargin,
   // marginRight: Metrics.mediumMargin,
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'justify'
  },

  dropDownText: {
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.doubleBaseMargin,
    marginBottom:Metrics.baseMargin,
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    textAlign: 'center'
  },

  dropDownView: {
   // marginTop: Metrics.mediumMargin,
   // justifyContent: 'center',
   alignItems:'center',
    flexDirection: 'row',
    marginLeft:15,
    flex:1,
   //  borderTopWidth:1,
//borderBottomWidth:1,
    borderColor:Colors.flBlue.grey1,
  },
    programView: {
  //   marginTop: Metrics.mediumMargin,
   // justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    flex:1,
   // marginLeft:10,
     borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:Colors.flBlue.grey1,
  },
   programText: {
    marginTop: 15,
    marginLeft: Metrics.mediumMargin,
    marginBottom:10,
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
    color: Colors.flBlue.grey5,
    fontFamily: Fonts.type.subHeaderFont,
    fontWeight: '400',
    //textAlign: 'center'
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 20,
    marginLeft:15,
    marginRight:25
  },
  dropdown_1: {
    flex: 1,
    top: 10,
    borderColor: 'lightgray',
   // borderWidth: 1,
    borderRadius: 1,
  },
   dropdown_2: {
    alignSelf: 'flex-end',
    width: 150,
    top: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'cornflowerblue',
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_2_dropdown: {
    width: 150,
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },

    dropdown_4: {
    margin: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
  },
  dropdown_4_dropdown: {
    width: 100,
  },
   nextButton: {
     marginTop:Metrics.mediumMargin,
    alignSelf: 'center',
    justifyContent: 'center',
     marginBottom:20
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 3,
    fontSize: 18,
    color: Colors.flBlue.anvil,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  programDrop: {
    //marginVertical: ,
   // marginHorizontal: 8,
    fontSize: 16,
    //marginRight:20,
    color: Colors.flBlue.anvil,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
   dropdown: {
    width: Metrics.screenWidth * 0.57,
   // marginLeft: Metrics.doubleBaseMargin
  },
  dropdownItem: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    paddingLeft: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin
  },
    textField: {
    //marginTop: Metrics.doubleBaseMargin,
    width:Metrics.screenWidth * 0.6,

    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
  },

})