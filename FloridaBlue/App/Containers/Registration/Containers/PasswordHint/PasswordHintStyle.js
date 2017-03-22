import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
   container: {
    flex: 1,
    paddingTop: 0
  },
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
  heading: {
    marginTop: Metrics.doubleBaseMargin,
    color: Colors.flBlue.anvil,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.h4 * Metrics. screenWidth * 0.0030
  },
  description: {
    color: Colors.flBlue.grey3,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium * Metrics. screenWidth * 0.0033
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
    fontSize: Fonts.size.medium * Metrics. screenWidth * 0.0027,
    flex: 0.8,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  row: {
   paddingVertical: Metrics.smallMargin * Metrics.screenHeight * 0.001,
    paddingHorizontal: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.001
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
   height: Metrics.textHeight2 * Metrics.screenHeight*0.0015,  // have to do it on iOS
    marginTop: Metrics.baseMargin
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