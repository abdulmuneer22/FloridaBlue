import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native'

class ToolBar extends Component {
  _renderText () {
    switch (this.props.target) {
      case 'screen_1':
        let style = [Styles.wrapper, {backgroundColor: 'black'}]
        return (
          <View style={style}>
            <Text style={Styles.headerText}>
        Welcome New User
        </Text>
          </View>
        )

      case 'termsofuse':

        return (
          <View style={[Styles.wrapper, {backgroundColor: 'black', alignItems: 'flex-start'}]}>
            <Text style={{
              fontSize: 18,
              color: 'white',
              textAlign: 'left',
              paddingLeft: 20
            }}>
        New User Registration
        </Text>
            <Text style={{
              color: 'white',
              textAlign: 'left',
              paddingLeft: 20,
              marginTop: 5

            }}>
        Terms of Use
        </Text>
          </View>
        )

      case 'Screen_3':
        return (
          <View style={{
            backgroundColor: 'rgb(15, 13, 13   )',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingTop: 10,
            marginTop: 20,
            paddingBottom: 5

          }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'left',
              fontSize: 16,
              paddingTop: 3

            }}>
          New User Registration
          </Text>

            <Text style={{
              color: 'white',
              paddingTop: 3

            }}>
          Setup your security Question/Hints and
          </Text>

            <Text style={{
              color: 'white',
              paddingTop: 3

            }}>
          Answers
          </Text>

          </View>
        )
        break

      case 'CreateUserID':
        return (
          <View style={[Styles.wrapper, {backgroundColor: 'black', alignItems: 'flex-start'}]}>
            <Text style={{
              fontSize: 18,
              color: 'white',
              textAlign: 'left',
              paddingLeft: 20
            }}>
        New User Registration
        </Text>
            <Text style={{
              color: 'white',
              textAlign: 'left',
              paddingLeft: 20,
              marginTop: 5

            }}>
        Create User ID and Password
        </Text>
          </View>
        )
      case 'Screen_4':
        return (
          <View style={{
            backgroundColor: 'rgb(72, 76, 78  )',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 20
          }}>
            <Text style={{
              color: 'white',
              fontSize: 25

            }}>Confirmation</Text>
          </View>
        )

      case 'FindMemberID':
        return (
          <View>
            <Text style={Styles.headerText}>
        Welcome New User
        </Text>
          </View>
        )

      default:
        return (
          <View>
            <Text style={Styles.headerText}>
        Welcome New User
        </Text>
          </View>
        )
    }
  }

  render () {
    return (
      <View>
        {this._renderText()}
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
export default ToolBar
