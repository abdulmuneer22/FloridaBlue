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
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)
  },
  cardIcon: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent
  },
  cardTextContainer: {
    flex: 6,
    alignItems: 'flex-start'
  },
  cardText: {
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030,
    fontWeight: '600',
    color: Colors.flBlue.grey3,
    fontFamily: Fonts.type.subHeaderFont,
    backgroundColor: Colors.transparent
  },
  cardIndicator: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.transparent
  },
  settingStatusSwitch: {
    marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0025,
    marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0025
  }
})
