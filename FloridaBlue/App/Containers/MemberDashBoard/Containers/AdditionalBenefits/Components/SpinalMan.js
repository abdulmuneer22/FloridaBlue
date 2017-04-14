import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'

import {Colors, Metrics, Fonts} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
const window = Dimensions.get('window')

class Spinal extends Component {
  render () {
    return (
      <View style={Style.wrapper}>
        <Text style={{
          fontSize: Fonts.size.h6,
          textAlign: 'center',
          marginBottom: Metrics.baseMargin,
          fontWeight: 'bold',
          marginTop: Metrics.baseMargin
        }}>Spinal Manipulations</Text>

        <Text style={{fontSize: Fonts.size.regular}}>
              You have used 0 Visits of your 20 Visit Benefit Period Maximum
                </Text>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  wrapper: {
      //  padding : 20
    margin: Metrics.baseMargin
      // marginTop:Metrics.doubleBaseMarginbaseMargin
  }

})
export default Spinal
