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

class Nursing extends Component {
  render () {
    return (
      <View style={Style.wrapper}>
        <View style={Style.textWrapper}>
          <Text style={{
            fontSize: Fonts.size.h6,
            textAlign: 'center',
            marginBottom: Metrics.baseMargin,
            fontWeight: 'bold'
          }}>Skilled Nursing Facility</Text>

          <Text style={{fontSize: Fonts.size.medium}}>
                        You can also use this component to make more specific components like MyAppHeaderText for other kinds of text.
                    </Text>

        </View>
      </View>
    )
  }
}

const Style = StyleSheet.create({
  wrapper: {
        // padding: 30,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: Colors.flBlue.grey2,
    width: window.width

  },
  textWrapper: {
    margin: 15
  }

})
export default Nursing
