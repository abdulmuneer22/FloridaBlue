// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
    fontSize: 14,
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
  }
})
