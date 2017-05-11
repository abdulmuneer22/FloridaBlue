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
    textAlign: 'justify'
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
  closeButton: {
    backgroundColor: 'grey',
    alignSelf: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 40,
    paddingRight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderRadius: 6,
    margin: 20
  },
  headerImage: {
    width: Metrics.screenWidth,
    resizeMode: 'stretch',
    height: (Metrics.screenHeight - (Metrics.screenHeight * 0.59)) / 2
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    width: Metrics.screenWidth,
    marginTop: Metrics.smallMargin,
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
