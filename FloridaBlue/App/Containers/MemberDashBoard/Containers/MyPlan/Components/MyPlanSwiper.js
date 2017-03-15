import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import SemiCircle from '../../../../../Components/SemiCircle'
import styles from '../MyPlanScreenStyle'
import _ from 'lodash'

class MyPlanSwiper extends Component {
  getChildrenOptions (data) {
    const {annualDeductible, oop} = data
    let result = []
    result = annualDeductible.inNetwork ? [...result, annualDeductible.inNetwork] : result
    result = annualDeductible.outNetwork ? [...result, annualDeductible.outNetwork] : result
    result = oop.inNetwork ? [...result, oop.inNetwork] : result
    result = oop.outNetwork ? [...result, oop.outNetwork] : result
    console.log(result)
    return result
  }

  render () {
    console.log(this.props.data)

    var myPlan = []
    // const this.props.data=this.props.data
    if (this.props.data.annualDeductible.inNetwork) {
      var inNetwork = this.props.data.annualDeductible.inNetwork
      console.log(inNetwork)
      if (Object.keys(inNetwork.planBenefits) > 0) {
        inNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })}
    }

    if (this.props.data.annualDeductible.outNetwork) {
      var outNetwork = this.props.data.annualDeductible.outNetwork
      console.log(outNetwork)
      if (Object.keys(outNetwork.planBenefits) > 0) {
        outNetwork.planBenefits[0].benefit.map(function (temObj) {
          console.log(temObj)
          myPlan.push(temObj)
        })}
    }

    if (this.props.data.oop.inNetwork) {
      var inNetwork = this.props.data.oop.inNetwork
      console.log(inNetwork)
      if (Object.keys(inNetwork.planBenefits) > 0) {
        inNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })}
    }
    if (this.props.data.oop.outNetwork) {
      var outNetwork = this.props.data.oop.outNetwork
      console.log(outNetwork)
      if (Object.keys(outNetwork.planBenefits) > 0) {
        outNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })}
    }

    return (
      <Swiper height={(Metrics.screenHeight - (Metrics.screenHeight * 0.40))} style={styles.wrapper} showsButtons>
        {this.getChildrenOptions(this.props.data).map((network, i) => {
           console.log('children options are', this.getChildrenOptions(this.props.data))
           console.log('planbenefits length', Object.keys(network.planBenefits).length)
     //      const planBenefits = _.head(network.planBenefits)
    //       console.log('plan benefits', planBenefits)
           return (
             <View style={styles.headerStyle} key={i}>
               <Text style={styles.headerText}>
                 {network.title.en}
               </Text>
               <Text style={styles.subHeader}>
                 {Object.keys(network.planBenefits).length > 0 ? network.planBenefits[0].title.en : 'No Plan Benfits' }
               </Text>
               <View style={styles.dataContainer}>
                 <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.3, marginTop: 30}}>
                   <SemiCircle
                     pieWidth={150}
                     pieHeight={150}
                     width={250}
                     height={180}
                     barWidth={10}
                     barTopColor={Colors.flBlue.ocean}
                     barBottomColor={Colors.flBlue.grey2}
                     percent={Object.keys(network.planBenefits).length > 0 ? network.remain / network.value : 0} />
                 </View>
                 <View style={{flex: 0.7}}>
                   {Object.keys(network.planBenefits).length > 0 ? network.planBenefits[0].benefit.map((benefit, i) => {
                      return <View style={{flexDirection: 'row'}} key={i}>
                               <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0029, fontFamily: Fonts.type.subHeaderFont}}>
                                 {benefit ? benefit.label.en : 0}:
                               </Text>
                               <Text style={{marginTop: Metrics.smallMargin, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030, fontFamily: Fonts.type.subHeaderFont, color: Colors.flBlue.grass}}>
                                 $
                                 {benefit ? benefit.value : 0}
                               </Text>
                             </View>
                    }) : <View></View>}
                 </View>
               </View>
             </View>
           )
           i += 1
         })}
      </Swiper>
    )
  }
}

export default MyPlanSwiper
