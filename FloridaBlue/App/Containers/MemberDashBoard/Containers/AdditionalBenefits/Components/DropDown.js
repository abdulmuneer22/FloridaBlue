import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    StyleSheet
} from 'react-native'

import {Colors, Metrics, Fonts} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'

const window = Dimensions.get('window')

class DropDown extends Component {
  render () {
    return (
      <View style={{
        margin: 20
      }}>
        <Text style={{
          textAlign: 'justify',
          fontSize: 14
        }}>
            Set to false to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically Both iOS and Android allow you to display formatted text by annotating ranges of a string
            </Text>
      </View>
    )
  }
}

export default DropDown
