import { StyleSheet } from 'react-native'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'

export default StyleSheet.create({
  headerContainer: {
    width: Metrics.screenWidth,
    resizeMode: 'stretch',
  //  alignItems: 'center',
    // justifyContent: 'center',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.59)) / 2
  },
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  // backgroundColor:Colors.transparent
  },
  header: {
    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.003,
    marginTop: Metrics.doubleBaseMargin,
    marginLeft: Metrics.doubleBaseMargin
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0031,
    marginTop: 20,
    marginLeft: Metrics.mediumMargin,
    // marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '400'

  },
  subheading: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.003,
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.doubleBaseMargin
  },
  subheading1: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002,
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.smallMargin,
    color: Colors.flBlue.grey3
  },
  userStyle: {
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
   // height:90,

    marginTop: Metrics.doubleBaseMargin,
   // justifyContent:'space-between',
    alignItems: 'center',
   // height:150,
    backgroundColor: Colors.flBlue.orange

  },
  features: {
    flexDirection: 'row',
    height: 300,
    margin: 0
  },
  titleView: {
    marginTop: Metrics.baseMargin
  },
  center: {
   // alignItems:'center',
   // justifyContent:'center'
    marginLeft: Metrics.doubleBaseMargin
  },
  buttonStyle: {
    width: Metrics.screenWidth * 0.65,
    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0026,
    height: Metrics.screenHeight * 0.07,
   // height : 50,
   // alignSelf: 'flex-end',
  // justifyContent: 'flex-start',
   // borderRadius : 2,
   // borderColor : 'rgb(80, 88, 90)',
  // borderWidth : 1,
    alignSelf: 'center'

  },
  orStyle: {
    fontSize: Fonts.size.regular,
  // margin:Metrics.baseMargin,
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center'
   // color:Colors.flBlue.grey3
  },
  row: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
    // height: Metrics.screenHeight-(Metrics.screenHeight*0.79)
  },
  footerText: {
    color: Colors.flBlue.grey4,
    marginHorizontal: Metrics.section,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small * Metrics.screenWidth * 0.003,
    marginBottom: Metrics.baseMargin,
    marginTop: 50

  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10
  },
  modalbuttonStyle: {
   // width : 260,
   // height : 50,
   // alignSelf: 'flex-end',
  // justifyContent: 'flex-start',
   // borderRadius : 2,
   // borderColor : 'rgb(80, 88, 90)',
  // borderWidth : 1,
    alignSelf: 'center',
    marginTop: Metrics.doubleBaseMargin
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Metrics.doubleBaseMargin
  }

})
