
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {Colors, Metrics, Fonts} from '../../../../../Themes'

class Switch extends Component {
  handleClickLeft () {
    this.props.attemptHandleLeft()
  }
  handleClickRight () {
    this.props.attemptHandleRight()
  }
  handleClickPreferred () {
    this.props.attemptHandlePreferred()
  }

  render () {
    var _this = this

    var twoTabLeftActiveStyle = {
      borderBottomLeftRadius: 15,
      borderColor: Colors.flBlue.ocean,
      borderRightWidth: 1,
      borderTopLeftRadius: 15,
      padding: 4,
      backgroundColor: Colors.flBlue.ocean,
      width: Metrics.screenWidth * 0.40
    }

    var twoTabRightActiveStyle = {
      borderBottomRightRadius: 15,
      borderColor: Colors.flBlue.ocean,
      borderLeftWidth: 1,
      borderTopRightRadius: 15,
      padding: 4,
      backgroundColor: Colors.flBlue.ocean,
      width: Metrics.screenWidth * 0.40
    }
    var twoTextActiveStyle = {
      color: 'white',
      alignSelf: 'center'
    }
    var twoTabInactiveStyle = {
      backgroundColor: Colors.flBlue.ocean,
      padding: 4,
      backgroundColor: 'white',
      borderRadius: 25,
      width: Metrics.screenWidth * 0.40
    }

    var twoTextInactiveStyle = {
      color: 'darkgrey',
      alignSelf: 'center'
    }

    var threeTabActiveStyle = {
      borderBottomWidth: 2,
      backgroundColor: Colors.snow,
      borderBottomColor: Colors.flBlue.ocean,
      padding: 7
    }

    var threeTextActiveStyle = {
      color: 'blue',
      marginRight: 5
    }

    var threeTabInactiveStyle = {
      borderBottomWidth: 2,
      backgroundColor: 'white',
      borderBottomColor: 'grey',
      padding: 7
    }

    var threeTextInactiveStyle = {
      color: 'darkgrey',
      marginRight: 5
    }
    var twoTabHeaderStyle = {
      flexDirection: 'row',
      marginTop: 15,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: Colors.flBlue.ocean
    }

    var threeTabHeaderStyle = {
      flexDirection: 'row',
      marginTop: 15
    }
        /*
    var injectedStyle     = twoTableftActiveStyle
    var inactiveStyle     = twoTabInactiveStyle
    var injectedTextStyle = twoTextActiveStyle
    var inactiveTextStyle = twoTextInactiveStyle
    var injectHeaderStyle = twoTabHeaderStyle
    */
    var _threeTabView = function (
      injectedStyle,
      inactiveStyle,
      injectedTextStyle,
      inactiveTextStyle,
      injectHeaderStyle
    ) {
      return (
        <View style={injectHeaderStyle}>

          <TouchableOpacity style={_this.props.preferredActive ? injectedStyle
              : inactiveStyle} onPress={() => { _this.handleClickPreferred() }}>
            <Text style={{
              color: _this.props.preferredActive ? 'blue' : 'darkgrey',
              marginRight: 5
            }}>Preferred Network
              </Text>
          </TouchableOpacity>

          <TouchableOpacity style={_this.props.leftActive ? injectedStyle
              : inactiveStyle} onPress={() => { _this.handleClickLeft() }}>
            <Text style={_this.props.leftActive ? injectedTextStyle
              : inactiveTextStyle}>In Network
              </Text>
          </TouchableOpacity>

          <TouchableOpacity style={_this.props.rightActive ? injectedStyle
              : inactiveStyle} onPress={() => { _this.handleClickRight() }}>
            <Text style={_this.props.rightActive ? injectedTextStyle
                  : inactiveTextStyle
                }>Out Of Network
                </Text>
          </TouchableOpacity>

        </View>

      )
    }

    var _twoTabView = function (
        injectedStyle,
        inactiveStyle,
        injectedTextStyle,
        inactiveTextStyle,
        injectHeaderStyle
    ) {
      return (<View style={injectHeaderStyle}>

        <TouchableOpacity style={_this.props.leftActive ? injectedStyle
        : inactiveStyle} onPress={() => { _this.handleClickLeft() }}>
          <Text style={_this.props.leftActive ? injectedTextStyle
        : inactiveTextStyle}>In Network
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={_this.props.rightActive ? injectedStyle
        : inactiveStyle} onPress={() => { _this.handleClickRight() }}>
          <Text style={_this.props.rightActive ? injectedTextStyle
            : inactiveTextStyle
          }>Out Of Network
          </Text>
        </TouchableOpacity>

      </View>
      )
    }

    return (
      <View style={{flex: 1}}>

        <View style={{flex: 1}}>
          {this.props.leftActive
          ? _twoTabView(
          twoTabLeftActiveStyle,
          twoTabInactiveStyle,
          twoTextActiveStyle,
          twoTextInactiveStyle,
          twoTabHeaderStyle
        )
        : _twoTabView(
        twoTabRightActiveStyle,
        twoTabInactiveStyle,
        twoTextActiveStyle,
        twoTextInactiveStyle,
        twoTabHeaderStyle
        )
      }
        </View>
      </View>
    )
  }
}

export default Switch
