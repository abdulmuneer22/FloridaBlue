import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'

import {Colors, Metrics, Fonts} from '../../../../../../Themes'

const window = Dimensions.get('window')

import {connect} from 'react-redux'
import styles from '../DoctorListStyle'



class Switch extends Component{
    constructor(){
        super();
        this.state = {
            leftActive : true
        }
    }

    // handleClickLeft(){
    //   this.setState({
    //       leftActive : true
    //   })
    // }

    // handleClickRight(){
    //   this.setState({
    //       leftActive : false
    //   })

    // }

handleClickLeft () {
    this.props.attemptHandleLeft()
  }
  handleClickRight () {
    this.props.attemptHandleRight()
  }

   render () {
    var _this = this


 var twoTabLeftActiveStyle = {
      borderBottomLeftRadius: 15,
      borderColor: Colors.flBlue.night,
      borderRightWidth : 1,
      borderTopLeftRadius: 15,
      padding: 8,
      backgroundColor : Colors.flBlue.night,
      width:Metrics.screenWidth*0.45,
    }
    var twoTabRightActiveStyle = {
      borderBottomRightRadius: 15,
      borderColor: Colors.flBlue.night,
      borderLeftWidth : 1,
      borderTopRightRadius: 15,
      padding: 8,
      backgroundColor : Colors.flBlue.night,
      width:Metrics.screenWidth*0.45,
    }
    var twoTextActiveStyle = {
      color : 'white',
      alignSelf:'center'
    }
    var twoTabInactiveStyle = {
      backgroundColor : Colors.flBlue.night,
      padding:8,
      backgroundColor : 'white',
      borderTopLeftRadius : 30,
      borderBottomLeftRadius : 25,
      width:Metrics.screenWidth*0.45
    }
     var twoTabRightInactiveStyle = {
      backgroundColor : Colors.flBlue.night,
      padding:8,
      backgroundColor : 'white',
      borderTopRightRadius : 25,
      borderBottomRightRadius : 25,
      width:Metrics.screenWidth*0.45
    }
    var twoTextInactiveStyle = {
        color : 'darkgrey',
          alignSelf:'center'
    }



    var twoTabHeaderStyle = {
        flexDirection: 'row',
        marginLeft:15,
        width:Metrics.screenWidth*0.91,
        marginTop: 15,
        borderRadius : 25,
         borderWidth : 2,
        borderColor: Colors.flBlue.night
      }


    let isLeftActive = _this.props.leftActive
    let rightActive = _this.props.rightActive


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
        : inactiveTextStyle}>Full List
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={_this.props.rightActive ? injectedStyle
        : inactiveStyle} onPress={() => { _this.handleClickRight() }}>
          <Text style={_this.props.rightActive ? injectedTextStyle
            : inactiveTextStyle
          }> Saved Providers
          </Text>
        </TouchableOpacity>

      </View>
      )
    }


    var _tabView = function () {

     var temp=_this.props.data
     var providerList= temp.providerList
        if (temp !=null && temp.providerList !=null ) {
           console.log('left', temp.providerList)
          return (_this.props.leftActive
              ? _twoTabView(
              twoTabLeftActiveStyle,
              twoTabRightInactiveStyle,
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
          )
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
