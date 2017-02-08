import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  Text
} from 'react-native'

const window = Dimensions.get('window')

class RightCard extends Component {

  render () {
    return (
      <View
        style={Style.cardStyle}

      >
        <View>
          <Text style={Style.h1}>Physical Services</Text>
          <View >
            <Text style={Style.h4}>
          Family Physician
          </Text>

            <Text style={Style.h2}>
          Pay 40%
          </Text>
          </View>

          <View >
            <Text style={Style.h4}>
          Specialist
          </Text>

            <Text style={Style.h2}>
          Pay 40%
          </Text>
          </View>

        </View>

      </View>
    )
  }

}

const Style = StyleSheet.create({
  cardStyle: {
    width: window.width,
    backgroundColor: 'rgb(102, 107, 108)',
    height: 200,
    alignSelf: 'center',
    padding: 10,
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

export default RightCard
