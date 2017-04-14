import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'

class PasswordMeter extends Component {
  render () {
    return (
      <View style={{
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Text style={{
          fontSize: 13,
          textAlign: 'left',
          flex: 1
        }}>
      Strong
      </Text>

        <View style={{
          flex: 1,
          marginRight: 10
        }}>
          <Image
            style={{
              width: 40,
              height: 5
            }}
            source={require('./password.png')}
      />
        </View>

      </View>
    )
  }
}

export default PasswordMeter
