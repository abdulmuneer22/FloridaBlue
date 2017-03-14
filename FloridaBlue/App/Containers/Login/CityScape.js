import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Image,
  View
} from 'react-native'

import { Images, Metrics, Colors } from '../../Themes'

import styles from './CityScapeStyle'

export default class CityScape extends Component {
  constructor () {
    super()
    this.state = {
      animatedValue: new Animated.Value(0)
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
        duration: 4000,
        easing: Easing.linear
      }
    ).start()
  }

  render () {
    const marginLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0]
    })

    return (
      <Animated.View style={{marginLeft}} >
        <Image source={Images.cityscape} style={styles.cityscape} />
      </Animated.View>
    )
  }
}
