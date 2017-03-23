
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
    console.log('checking data from switch', this.props.data)
    console.log(this.props)
    var _this = this

    var oneTabLeftActiveStyle = {
    //  borderBottomLeftRadius: 15,
      borderColor: Colors.flBlue.ocean,
    //  borderTopLeftRadius: 15,
      padding: 5,
      backgroundColor: Colors.flBlue.ocean,
      width: Metrics.screenWidth * 0.50
    }

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
    var oneTextActiveStyle = {
      color: 'white',
      alignSelf: 'center'
    }
    var twoTextActiveStyle = {
      color: 'white',
      alignSelf: 'center'
    }
    var oneTabInactiveStyle = {
      backgroundColor: Colors.flBlue.ocean,
      padding: 4,
      backgroundColor: 'white',
      borderRadius: 25,
      width: Metrics.screenWidth * 0.40
    }
    var twoTabInactiveStyle = {
      backgroundColor: Colors.flBlue.ocean,
      padding: 4,
      backgroundColor: 'white',
      borderRadius: 25,
      width: Metrics.screenWidth * 0.40
    }

    var oneTextInactiveStyle = {
      color: 'darkgrey',
      alignSelf: 'center'
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

    var oneTabHeaderStyle = {
      marginTop: 15,
      borderRadius: 25,
      borderWidth: 6,
      borderColor: Colors.flBlue.ocean
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

    let isLeftActive = _this.props.leftActive
    let rightActive = _this.props.rightActive
    let preferredActive = _this.props.preferredActive
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
      injectHeaderStyle,
      inNetwork,
      outNetwork,
      preferredNetwork
    ) {
      return (
        <View style={injectHeaderStyle}>

          <TouchableOpacity style={_this.props.leftActive ? injectedStyle
              : inactiveStyle} onPress={() => { _this.handleClickLeft() }}>
            <Text style={_this.props.leftActive ? injectedTextStyle
              : inactiveTextStyle}>{inNetwork}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={_this.props.rightActive ? injectedStyle
              : inactiveStyle} onPress={() => { _this.handleClickRight() }}>
            <Text style={_this.props.rightActive ? injectedTextStyle
                  : inactiveTextStyle
                }>{outNetwork}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={_this.props.preferredActive ? injectedStyle
              : inactiveStyle} onPress={() => { _this.handleClickPreferred() }}>
            <Text style={{
              color: _this.props.preferredActive ? 'blue' : 'darkgrey',
              marginRight: 5
            }}>{preferredNetwork}
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
        injectHeaderStyle,
        inNetwork,
        outNetwork
    ) {
      var inNetwork = inNetwork
      var outNetwork = outNetwork

      return (<View style={injectHeaderStyle}>

        <TouchableOpacity style={_this.props.leftActive ? injectedStyle
        : inactiveStyle} onPress={() => { _this.handleClickLeft() }}>
          <Text style={_this.props.leftActive ? injectedTextStyle
        : inactiveTextStyle}>{inNetwork}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={_this.props.rightActive ? injectedStyle
        : inactiveStyle} onPress={() => { _this.handleClickRight() }}>
          <Text style={_this.props.rightActive ? injectedTextStyle
            : inactiveTextStyle
          }>{outNetwork}
          </Text>
        </TouchableOpacity>

      </View>
      )
    }
    var _oneTabView = function (
          injectedStyle,
          inactiveStyle,
          injectedTextStyle,
          inactiveTextStyle,
          injectHeaderStyle,
          Network
      ) {
      return (<View style={injectHeaderStyle}>

        <TouchableOpacity style={_this.props.leftActive ? injectedStyle
          : inactiveStyle} onPress={() => { _this.handleClickLeft() }}>
          <Text style={_this.props.leftActive ? injectedTextStyle
          : inactiveTextStyle}> {Network}
          </Text>
        </TouchableOpacity>

      </View>
      )
    }

    var _tabView = function () {
      var temp = _this.props.data
      var objectName = _this.props.objectName
      var temp1 = temp[objectName]
      var inNetwork = temp1.inNetwork
      var outNetwork = temp1.outNetwork
      var preferredNetwork = temp1.preferredNetwork

      if (temp1 != null && temp1.inNetwork != null && temp1.outNetwork != null && temp1.preferredNetwork != null) {
        console.log('preferrr', temp1.preferredNetwork)
        var inNetwork = inNetwork.title['en']
        var outNetwork = outNetwork.title['en']
        var preferredNetwork = preferredNetwork.title['en']
        return (_this.props.leftActive
              ? _threeTabView(
              threeTabActiveStyle,
              threeTabInactiveStyle,
              threeTextActiveStyle,
              threeTextInactiveStyle,
              threeTabHeaderStyle,
              inNetwork,
              outNetwork,
              preferredNetwork
            )
            : _threeTabView(
            threeTabActiveStyle,
            threeTabInactiveStyle,
            threeTextActiveStyle,
            threeTextInactiveStyle,
            threeTabHeaderStyle,
            inNetwork,
            outNetwork,
            preferredNetwork
            )
        )
      } else {
        if (temp1 != null && temp1.inNetwork != null && temp1.outNetwork != null) {
          var inNetwork = inNetwork.title['en']
          var outNetwork = outNetwork.title['en']
          return (_this.props.leftActive
              ? _twoTabView(
              twoTabLeftActiveStyle,
              twoTabInactiveStyle,
              twoTextActiveStyle,
              twoTextInactiveStyle,
              twoTabHeaderStyle,
              inNetwork,
              outNetwork
            )
            : _twoTabView(
            twoTabRightActiveStyle,
            twoTabInactiveStyle,
            twoTextActiveStyle,
            twoTextInactiveStyle,
            twoTabHeaderStyle,
            inNetwork,
            outNetwork
            )
          )
        } else if (temp1 != null && temp1.inNetwork != null) {
          var inNetwork = inNetwork.title['en']
          console.log('one tab', inNetwork)

          return (_oneTabView(
              oneTabLeftActiveStyle,
              oneTabInactiveStyle,
              oneTextActiveStyle,
              oneTextInactiveStyle,
              oneTabHeaderStyle,
              inNetwork
          )
          )
        } else if (temp1 != null && temp1.outNetwork != null) {
          var outNetwork = outNetwork.title['en']
          return (_oneTabView(
            oneTabLeftActiveStyle,
            oneTabInactiveStyle,
            oneTextActiveStyle,
            oneTextInactiveStyle,
            oneTabHeaderStyle,
            outNetwork
        )
          )
        }
      }
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {_tabView()}

        </View>

      </View>
    )
  }
}

export default Switch
