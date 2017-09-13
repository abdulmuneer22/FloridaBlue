import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Image,
  View
} from 'react-native'

import { Images, Metrics, Colors } from '../../Themes'

import styles from './CityScapeStyle'
import DeviceInfo from 'react-native-device-info'

export default class CityScape extends Component {
  constructor (props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
      isPortrait: this.props.isPortrait
    }
  }

  componentDidMount () {
    this.animate()
  }
  animate () {
    this.state.animatedValue.setValue(0)
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 15000,
        easing: Easing.linear
      }
    ).start()
  }

  render () {
    const marginLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.screenWidth * 6, Metrics.screenWidth * 4.66]
    })

    return (
      <Animated.View style={{marginLeft}} >
        <Image source={Images.cityscape} style={[styles.cityscape, {top: this.state.isPortrait ? Metrics.screenHeight * 0.44 : (DeviceInfo.isTablet() ? Metrics.screenHeight * 0.26 : Metrics.screenHeight * 0.1), width: this.state.isPortrait ? Metrics.screenWidth * 6 : Metrics.screenWidth * 6}]} />
      </Animated.View>
    )
  }
}
