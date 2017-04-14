import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native'

class RegistrationToolBar extends Component {
  render () {
    return (
      <View>
        <View style={{
          height: 40,
          backgroundColor: 'rgb(184, 207, 214)',
          marginTop: 25,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 16,
            color: 'rgb(112, 121, 124)'
          }}>
      Welcome New User
      </Text>
        </View>

      </View>

    )
  }
}

const Styles = StyleSheet.create({
  wrapper: {

    backgroundColor: 'rgb(15, 13, 13   )',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 20
  },
  headerText: {
    color: 'white',
    fontSize: 40
  }
})
export default RegistrationToolBar
