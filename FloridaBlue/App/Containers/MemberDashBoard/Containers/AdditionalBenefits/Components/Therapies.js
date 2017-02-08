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

class Therapies extends Component {
  render () {
    return (
      <View style={Style.wrapper}>
        <View style={Style.textWrapper}>
          <Text style={{
            fontSize: Fonts.size.h6,
            textAlign: 'center',
            marginBottom: Metrics.baseMargin,
            fontWeight: 'bold'
          }}>Therapies</Text>

          <Text style={{fontSize: Fonts.size.medium}}>
                        You have used 0 Visits of your 35 Visit Benefit Period Maximum
                    </Text>

          <Text style={{marginTop: 15, fontSize: Fonts.size.medium}}>
                        Note: Therapies may include: Outpatient Cardiac, Occupational, Physical, Speech and Massage Therapies and Spinal Manipulations.
                    </Text>
        </View>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  wrapper: {
      // padding: 30,
    backgroundColor: Colors.flBlue.grey2,
    width: window.width

  },
  textWrapper: {
    margin: 15
  }

})
export default Therapies
