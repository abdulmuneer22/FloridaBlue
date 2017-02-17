import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

const window = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome'
import {FlbIcon} from '../../../../../Themes'

import {Actions as NavigationActions} from 'react-native-router-flux'

class Card extends Component {
  render () {
    return (
      <View style={{
        width: window.width * 0.5,
        backgroundColor: this.props.bg,
        height: (Metrics.screenHeight - (Metrics.screenHeight * 0.81)) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'red',
        borderWidth: 1
      }}>
        <Icon name={this.props.icon} size={40} color='black' />
        <Text style={{
          marginTop: 20,
          fontSize: 14,
          fontWeight: '600'
        }}>
          {this.props.title}
        </Text>
      </View>

    )
  }
}

export default Card
