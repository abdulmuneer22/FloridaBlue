import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {Actions as NavigationActions} from 'react-native-router-flux'

import Icon from 'react-native-vector-icons/FontAwesome'

class ToolBar extends Component {

  _renderLeftLogo (target) {
    switch (target) {

      case 'myplan':
        return (
          <TouchableOpacity
            onPress={() => NavigationActions.pop()}
        >
            <Icon name='reply' size={20} color='black' />
          </TouchableOpacity>
        )
    }
  }

  _renderRightLogo () {

  }

  _renderHeader () {
    return (
      <Text>{this.props.title}</Text>
    )
  }

  render () {
    return (
      <View style={{
        marginTop: 20,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 40
      }}>
        <View style={Styles.left}>
          {this._renderLeftLogo(this.props.target)}
        </View>

        <View style={Styles.middle}>
          {this._renderHeader()}
        </View>

        <View style={Styles.right}>
          <Icon name='ellipsis-h' size={12} color='black' />

        </View>

      </View>
    )
  }
}

const Styles = StyleSheet.create({
  left: {
    // backgroundColor : 'red',
    flex: 1,
    padding: 10
  },
  right: {
    // backgroundColor : 'green',
    flex: 1,
    padding: 10,
    alignItems: 'flex-end'
  },
  middle: {
    // backgroundColor : 'purple',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
export default ToolBar
