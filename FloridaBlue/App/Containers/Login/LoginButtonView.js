import React, { Component } from 'react'
import {
  Animated,
  Easing,
  Image,
  View,
} from 'react-native'

import { Images, Metrics, Colors } from '../../Themes'

import styles from './LoginStyle'

export default class LoginButtonView extends Component {
  constructor () {
    super()
    this.state = {
      fadeAnim: new Animated.Value(0), // init opacity 0
    }
  }

  componentDidMount () {
    Animated.timing(
      this.state.fadeAnim,
      {
        delay: 1000,
        toValue: 1
      }
    ).start();
  }

  render() {
    return(
      <Animated.View style={[styles.loginButton, {opacity: this.state.fadeAnim}]}>
        {this.props.children}
      </Animated.View>
    )
  }
}
