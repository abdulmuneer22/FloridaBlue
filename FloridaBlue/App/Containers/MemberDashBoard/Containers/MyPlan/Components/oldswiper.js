
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper'

class MyPlanSwiper extends Component {
  render () {
    return (

      <Swiper height={300} style={styles.wrapper} showsButtons>
        <View style={styles.slide}>
          <View style={styles.outofBox}>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}>Annual Deductable (In-Network)</Text>
          </View>

          <Text>Spent Year-to-Date: ${this.props.data.annualDeductible.inNetwork[1].value}</Text>
          <Text style={{justifyContent: 'center', marginTop: 10}}> You are ${this.props.data.annualDeductible.remainingValue} away reaching
                your In-Network Family Deductables of $ {this.props.data.annualDeductible.benefitValue}
          </Text>
        </View>

        <View style={styles.slide}>
          <View style={styles.outofBox}>
            <Text style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}>Annual Out-of-Pocket Maximum (In-Network)</Text>
          </View>
          <Text>Spent Year-to-Date: ${this.props.data.oop.usedOOP}</Text>
          <Text style={{alignItems: 'center', marginTop: 10}}> You are ${this.props.data.oop.remainingValue} away reaching
                your In-Network Family Deductables of $ {this.props.data.oop.benefitValue}
          </Text>
        </View>
      </Swiper>

    )
  }
}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eee'

  },
  slide: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: '#ccc'
  },
  outofBox: {
    backgroundColor: 'rgb(221, 227, 228)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
    marginBottom: 10

  }
})
export default MyPlanSwiper
