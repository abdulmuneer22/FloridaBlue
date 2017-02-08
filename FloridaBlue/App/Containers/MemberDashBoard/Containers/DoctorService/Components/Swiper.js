import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import * as actions from '../../Redux/Actions'
import {connect} from 'react-redux'
const window = Dimensions.get('window')

import Swiper from 'react-native-swiper'

class BenefitsSwiper extends Component {

  renderSingleSlide (title, pay) {
    return (
      <View style={styles.slide}>
        <View style={styles.outofBox}>
          <Text style={styles.slideTitle}>Allergy Services - Injections</Text>
        </View>
        <View style={styles.slideBox}>
          <Text style={styles.allergyTitle}>{title}</Text>
          <Text style={styles.allergyPay}>{pay}</Text>
        </View>
      </View>)
  }

  render () {
    console.log(this.props)
    return (
      <Swiper height={200} style={styles.wrapper} showsButtons>

        {this.renderSingleSlide('Blue Phycisian Recognision', 'Pay 20%')}
        {this.renderSingleSlide('Blue Phycisian Recognision', 'Pay 30%')}
        {this.renderSingleSlide('Blue Phycisian Recognision', 'Pay 40%')}
      </Swiper>

    )
  }

}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgb(117, 125, 126)'

  },
  slide: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: 'rgb(117, 125, 126)'
    // borderColor : 'green',
    // borderWidth : 1
  },
  outofBox: {
    backgroundColor: 'rgb(117, 125, 126)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width
    // marginBottom : 10,
    // borderColor : 'red',
    // borderWidth : 1

  },
  allergyTitle: {
    fontWeight: '500',
    marginBottom: 5
  },
  allergyPay: {
    fontWeight: '400',
    fontSize: 18
  },
  slideBox: {
    backgroundColor: 'white',
    margin: 20,
    height: 80,
    width: window.width * 0.75,
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  slideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  }
})

export default BenefitsSwiper
