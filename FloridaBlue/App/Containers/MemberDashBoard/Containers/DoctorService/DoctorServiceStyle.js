// @flow

import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors } from '../../../../Themes/'

export default StyleSheet.create({

  backgroundImage: {
    position: 'absolute',
    top: 0,
    height: Metrics.screenHeight - (Metrics.screenHeight * 0.3),
    resizeMode: 'stretch'
  },
  logo: {
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    flexDirection: 'row',
    height: 78,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'stretch',
    width: null,
    backgroundColor: Colors.flBlue.ocean
  },
  cardStyle: {
    width: window.width,
    backgroundColor: 'rgba(167, 187, 193,0.7)',
   // height : 200,
   // alignSelf: 'center',
   //  padding : 10,
    marginTop: 10,
    alignItems: 'center'

  },
  cardStyle1: {
    width: window.width,
    backgroundColor: Colors.snow,
   // height : 200,
   // alignSelf: 'center',
   //  padding : 10,
    marginTop: 10,
    alignItems: 'center'

  },
  h1: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },

  h2: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10
  },
  h4: {
    textAlign: 'center',
    paddingTop: 15

  }

})
