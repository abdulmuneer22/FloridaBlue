import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Image,
  View
} from 'react-native'

import { Images, Metrics, Colors } from '../../Themes'

import styles from './CloudsStyle'
import DeviceInfo from 'react-native-device-info'

export default class Clouds extends Component {
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
        duration: 640000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  render () {
    const marginLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Metrics.screenWidth * 14]
    })

    return (
      <Animated.View style={{marginLeft}} >
        <Image source={Images.clouds} style={styles.clouds} />
      </Animated.View>
    )
  }
}
