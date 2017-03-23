import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerImage: {
    width: Metrics.screenWidth,
    resizeMode: 'stretch',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.59)) / 2
  },
  close: {
    marginTop: Metrics.smallMargin,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0030,
    marginTop: 20,
    marginLeft: Metrics.mediumMargin,
    // marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0023,
    fontFamily: Fonts.type.headerFont,
    fontWeight: '400'

  },
  heading: {
    marginTop: Metrics.doubleBaseMargin,
   // alignSelf: 'center',
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0028
  },
  description: {
    color: Colors.flBlue.grey5,
    textAlign: 'left',
    fontWeight: '400',
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0032
  },
  row1: {
    paddingVertical: Metrics.smallMargin * Metrics.screenHeight * 0.003,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0035
  },
  messageView: {
    padding: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    backgroundColor: Colors.flBlue.red,
    borderRadius: 12,
    flexDirection: 'row',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagePadding: {
    flex: 0.1
  },
  message: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    flex: 0.8,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  row: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    width: Metrics.screenWidth,
    marginTop: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  },
  nextButton: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  findItButton: {
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    color: Colors.charcoal
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10
  },
  wrapper1: {
    backgroundColor: Colors.snow,
    marginTop: Metrics.baseMargin
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: Colors.snow
  },
  outofBox: {
    // backgroundColor : 'grey',
    // padding : 20,
    alignItems: 'center',
    justifyContent: 'center'
    // width : window.width,
    // marginBottom : 30

  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: Metrics.baseMargin,
    marginHorizontal: Metrics.section
  },
  footerText: {
    color: Colors.flBlue.grey4,
    marginHorizontal: Metrics.section,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.small
  }
})
