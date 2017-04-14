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

const window = Dimensions.get('window')

class Input extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      errorMemberID: ''
    }
  }

  _handleFocus () {
    switch (this.props.placeholder) {
      case 'Member ID':
        this.setState({errorMemberID: 'Your MemberID is not valid, Please check your card'})

        break

      default:
    }
  }

  render () {
    return (
      <View>
        <View style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: 10,
          marginRight: 20,
          marginTop: 20
        }}>
          <TextInput
            style={Styles.textInput}
            onChangeText={(text) => this.setState({text: text})}
            value={this.state.text}
            placeholder={this.props.placeholder}
            underlineColorAndroid='white'
            placeholderTextColor='rgba(213, 211, 200 , 0.7)'
            keyboardType={this.props.keyboardType}
            onFocus={() => this._handleFocus()

      }
      />
        </View>
        <Text style={Styles.memberErrormessage}>{this.state.errorMemberID}</Text>

      </View>
    )
  }
}

const Styles = StyleSheet.create({
  memberErrormessage: {
    color: 'red'

  },
  textInput: {
    height: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1

  }
})
export default Input
