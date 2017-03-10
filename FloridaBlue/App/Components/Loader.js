import React, { Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native'

import {Colors, Metrics, Fonts, Images} from '../Themes'
const window = Dimensions.get('window')

class Loader extends Component {
  render () {
    return (

      <View style={{alignItems: 'center',
        backgroundColor: Colors.snow,
    // backgroundColor : 'red',
        marginTop: 150,
     // height : 300,
        justifyContent: 'center',
        bottom: 50
      }}>

        <Image style={{
          width: window.width * 0.5,
          height: window.height * 0.5
        }}
          resizeMode='contain'

          source={Images.loader} />
        <Text> Loading please wait </Text>

      </View>
    )
  }
 }

export default Loader
