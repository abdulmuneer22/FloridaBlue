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
import SemiCircle from '../../../../../Components/SemiCircle'
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
      <Swiper height={(Metrics.screenHeight-(Metrics.screenHeight*0.40))} style={styles.wrapper} showsButtons>
        { this.props.data.annualDeductible.inNetwork ? myPlan.map(function (network, i) {
          return (
            <View style={styles.headerStyle} key={i}>

              <Text style={styles.headerText}>In-Network</Text>
              <Text style={styles.subHeader}> Family Annual Deductible</Text>

              <View style={styles.dataContainer}>

                <View style={{alignItems: 'center', justifyContent: 'center'}}>

                  <SemiCircle
                    pieWidth={150}
                    pieHeight={150}
                    width={250}
                    height={180}
                    barWidth={10}
                    barTopColor={Colors.flBlue.ocean}
                    barBottomColor={Colors.flBlue.grey2}
                    percent={network.used / network.value}
                  />

                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: Metrics.baseMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00270, fontFamily:Fonts.type.subHeaderFont}}>{network.type} deductible :</Text>
                  <Text style={{marginTop: Metrics.baseMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00270, fontFamily:Fonts.type.subHeaderFont}}>${network.value}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: Metrics.baseMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00270, fontFamily:Fonts.type.subHeaderFont}}>Remaining {network.type} deductible :</Text>
                  <Text style={{marginTop: Metrics.baseMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00270, fontFamily:Fonts.type.subHeaderFont}}>${network.remain}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: Metrics.baseMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00270, fontFamily:Fonts.type.subHeaderFont}}>{network.type} pharmacy deductible :</Text>
                  <Text style={{marginTop: Metrics.baseMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00270, fontFamily:Fonts.type.subHeaderFont}}>${network.used}</Text>
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
