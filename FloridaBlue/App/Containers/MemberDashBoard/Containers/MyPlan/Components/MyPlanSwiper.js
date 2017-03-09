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
      var inNetwork = this.props.data.oop.inNetwork
      inNetwork.map(function (temObj) {
        myPlan.push(temObj)
      })
    }
    if (this.props.data.oop.outNetwork) {
      var outNetwork = this.props.data.oop.outNetwork
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

                <View style={{alignItems: 'center', justifyContent: 'center',flex:0.3,marginTop:50}}>

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

                  <View style={{flex:0.7}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0029, fontFamily:Fonts.type.subHeaderFont}}>{network.type}:</Text>
                  <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030, fontFamily:Fonts.type.subHeaderFont, color:Colors.flBlue.grass}}> ${network.value}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0029, fontFamily:Fonts.type.subHeaderFont}}>{network.type}:</Text>
                  <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030, fontFamily:Fonts.type.subHeaderFont, color:Colors.flBlue.grass}}> ${network.remain}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0029, fontFamily:Fonts.type.subHeaderFont}}>{network.type}:</Text>
                  <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030, fontFamily:Fonts.type.subHeaderFont, color:Colors.flBlue.grass}}> ${network.used}</Text>
                </View>
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
