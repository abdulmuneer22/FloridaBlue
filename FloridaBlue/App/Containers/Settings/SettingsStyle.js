import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'
import { MKTextField, MKColor, MKSpinner, MKRadioButton, getTheme, setTheme } from 'react-native-material-kit'
var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')
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
    width: Metrics.screenWidth
  },
  headerTextStyle: {
    color: Colors.flBlue.ocean,
    backgroundColor: Colors.transparent,
    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400'
  },
  settingContainer: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between'
  },
  settingContainer1: {
    flex: 1,
   // flexDirection: 'row',
    //backgroundColor:'yellow',
    justifyContent: 'space-between'
  },
  settingContainer2: {
    flex: 1,
    //flexDirection: 'row',
   // backgroundColor:'green',
    justifyContent: 'space-between'
  },
  settingText: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0040,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0040,
    marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0025,
    fontFamily: Fonts.type.headerFont,
    fontWeight: (Platform.OS === 'ios') ? '500' : '400',
    alignItems: 'center',
    color: Colors.flBlue.anvil
  },
  settingStatusSwitch: {
    //backgroundColor:'red',
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0025,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0025,
    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.0030
  }
})
