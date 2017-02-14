import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper'
import {Colors, Metrics, Fonts, Images} from '../../../../../Themes'
import PercentageCircle from 'react-native-percentage-circle'
import styles from '../MyPlanScreenStyle'
class MyPlanSwiper extends Component {

  render () {
    var myPlan = []

    if (this.props.data.annualDeductible.inNetwork) {
      var inNetwork = this.props.data.annualDeductible.inNetwork
      inNetwork.map(function (temObj) {
        myPlan.push(temObj)
      })
    }

    if (this.props.data.annualDeductible.outNetwork) {
      var outNetwork = this.props.data.annualDeductible.outNetwork
      outNetwork.map(function (temObj) {
        myPlan.push(temObj)
      })
    }

    if (this.props.data.oop.inNetwork) {
      var outNetwork = this.props.data.oop.inNetwork
      outNetwork.map(function (temObj) {
        myPlan.push(temObj)
      })
    }

    return (
      <Swiper height={380} style={styles.wrapper} showsButtons>
        { this.props.data.annualDeductible.inNetwork ? myPlan.map(function (network, i) {
          return (
            <View style={styles.headerStyle} key={i}>

              <Text style={styles.headerText}>In-Network</Text>
              <Text style={styles.subHeader}> Family Annual Deductible</Text>

              <View style={styles.dataContainer}>

                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <PercentageCircle radius={50} percent={50} color={Colors.flBlue.ocean} />
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>{network.type} deductible :</Text>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>${network.value}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>Remaining {network.type} deductible :</Text>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>${network.remain}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>{network.type} Pharmacy deductible :</Text>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>${network.used}</Text>
                </View>
                <View>
                  <Text style={{marginTop: 10, fontSize: Fonts.size.regular}}>{network.text.en}</Text>

                </View>

              </View>

            </View>
          )
          i += 1
        })
     : <Text />}

      </Swiper>

    )
  }

}

export default MyPlanSwiper
