// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 0
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.79)) / 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  form: {
    backgroundColor: 'white',
    flex: 1,
    margin: 20
  },
  errormessage: {
    color: 'red',
    flex: 1,
    marginLeft: 10
  },
  progressBoxStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0026,
    textAlign: 'justify',
    color: Colors.flBlue.anvil
  },
  readMoreHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40
  },
  readMoreSubHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  },
  headerImage: {
    width: Metrics.screenWidth,
    resizeMode: 'stretch',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.59)) / 2
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Metrics.doubleBaseMargin
  },
  buttonView: {
    flex: 1,
    height: Metrics.baseMargin * Metrics.screenHeight * 0.006
  },
  buttonTextView: {
    flex: 1,
    backgroundColor: Colors.flBlue.ocean,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 0.5,
    borderColor: Colors.snow
  },
  footerText: {
    color: Colors.snow,
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
    fontWeight: '500'
  },
  spinnerView: {
    alignSelf: 'center'
  }
})
