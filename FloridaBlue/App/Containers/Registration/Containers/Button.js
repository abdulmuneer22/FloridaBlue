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
import {Actions as NavigationActions} from 'react-native-router-flux'

class Button extends Component {
  render () {
    return (
      <TouchableOpacity style={[Styles.button, {backgroundColor: this.props.color}]}
        onPress={() => {
          var routeName = this.props.target
          switch (routeName) {
            case 'memberid':
              NavigationActions.memberid()
              break

            case 'screen_2':
              NavigationActions.screen_2()
              break

            case 'screen_3':
              NavigationActions.screen_3()
              break

            case 'screen_4':
              NavigationActions.screen_4()
              break

            case 'Termsofuse':
              NavigationActions.Termsofuse()
              break
            case 'confirmation':
              NavigationActions.confirmation()
              break

            case 'Back':
              NavigationActions.pop()
              break
            default:
              return null
          }
        }}
      >
        <Text style={Styles.buttonText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

const Styles = StyleSheet.create({
  button: {

    padding: 10,
    borderColor: 'rgba(17, 147, 203,0.9)',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'rgba(242, 246, 247   ,0.9)',
    fontWeight: 'bold',
    fontSize: 12
  }
})
export default Button
