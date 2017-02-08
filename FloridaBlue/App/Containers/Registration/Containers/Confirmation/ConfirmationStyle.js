import { StyleSheet } from 'react-native'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'

export default StyleSheet.create({
  headerContainer: {
   // flexDirection:'row',
    height: 150,
   // justifyContent:'space-between',
   // alignItems:'center',
   // padding:15,overflow: 'visible',
   // resizeMode: 'cover',
   // overflow:'visible',
    alignSelf: 'stretch',
    width: Metrics.screenWidth
   // backgroundColor:Colors.flBlue.ocean
  },
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  // backgroundColor:Colors.transparent
  },
  header: {
    fontSize: Fonts.size.h6,
    marginTop: Metrics.doubleBaseMargin,
    marginLeft: Metrics.doubleBaseMargin

  },
  subheading: {
    fontSize: Fonts.size.regular,
    marginLeft: Metrics.doubleBaseMargin,
    marginTop: Metrics.doubleBaseMargin
  },
  subheading1: {
    fontSize: Fonts.size.regular,
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
    backgroundColor: Colors.flBlue.grass

  },
  features: {
    flexDirection: 'row',
    height: 300,
    margin: 0
  },
  titleView: {
    marginTop: 10
  },
  center: {
   // alignItems:'center',
   // justifyContent:'center'
    marginLeft: Metrics.doubleBaseMargin
  },
  buttonStyle: {
   // width : 260,
   // height : 50,
   // alignSelf: 'flex-end',
  // justifyContent: 'flex-start',
   // borderRadius : 2,
   // borderColor : 'rgb(80, 88, 90)',
  // borderWidth : 1,
    alignSelf: 'center',
    marginTop: 15
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
  },

  footerText: {
    color: Colors.flBlue.grey4,
    marginHorizontal: Metrics.section,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small,
    marginTop: 150
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
    marginTop: 50
  }

})
