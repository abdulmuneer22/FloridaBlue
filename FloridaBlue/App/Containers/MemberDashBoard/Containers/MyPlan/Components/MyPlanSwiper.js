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
   /* 
    result = annualDeductible !=undefined && annualDeductible.pnNetwork !=undefined && annualDeductible.pnNetwork.planBenefits != undefined ?
    (Object.keys(annualDeductible.pnNetwork.planBenefits).length > 0 ? [...result, annualDeductible.pnNetwork] : result ) : result;
    result = Object.keys(annualDeductible !=undefined && annualDeductible.inNetwork !=undefined && annualDeductible.inNetwork.planBenefits).length > 0 ? [...result, annualDeductible.inNetwork] : result
    //result = Object.keys(annualDeductible !=undefined && annualDeductible.outNetwork !=undefined && annualDeductible.outNetwork.planBenefits).length > 0 ? [...result, annualDeductible.outNetwork] : result
    //result = Object.keys(oop !=undefined && oop.pnNetwork !=undefined && oop.pnNetwork.planBenefits).length >0 ? [...result, oop.pnNetwork] : result
    //result = Object.keys(oop !=undefined && oop.inNetwork !=undefined && oop.inNetwork.planBenefits).length > 0 ? [...result, oop.inNetwork] : result
    //result = Object.keys(oop !=undefined && oop.outNetwork !=undefined && oop.outNetwork.planBenefits).length >0 ? [...result, oop.outNetwork] : result
   */
   if(annualDeductible && annualDeductible.pnNetwork && annualDeductible.pnNetwork.planBenefits ){
    result = Object.keys(annualDeductible.pnNetwork.planBenefits).length > 0 ? [...result, annualDeductible.pnNetwork] : result
   }

   if(annualDeductible && annualDeductible.inNetwork && annualDeductible.inNetwork.planBenefits ){
    result = Object.keys(annualDeductible.inNetwork.planBenefits).length > 0 ? [...result, annualDeductible.inNetwork] : result
  }

    if(annualDeductible && annualDeductible.outNetwork && annualDeductible.outNetwork.planBenefits ){
    result = Object.keys(annualDeductible.outNetwork.planBenefits).length > 0 ? [...result, annualDeductible.outNetwork] : result
   }

    if(oop && oop.pnNetwork && oop.pnNetwork.planBenefits ){
    result = Object.keys(oop.pnNetwork.planBenefits).length >0 ? [...result, oop.pnNetwork] : result
  }

    if(oop && oop.inNetwork && oop.inNetwork.planBenefits ){
    result = Object.keys(oop.inNetwork.planBenefits).length > 0 ? [...result, oop.inNetwork] : result
  }

    if(oop && oop.outNetwork && oop.outNetwork.planBenefits ){
    result = Object.keys(oop.outNetwork.planBenefits).length >0 ? [...result, oop.outNetwork] : result
  }
     
    return result
  }

  render () {
    console.log(this.props.data)
/*
    var myPlan = []
    // const this.props.data=this.props.data
     if (this.props.data != null && this.props.data.annualDeductible !=undefined && this.props.data.annualDeductible.pnNetwork !=undefined) {
      var pnNetwork = this.props.data.annualDeductible.pnNetwork
      console.log(pnNetwork)
      if (Object.keys(pnNetwork.planBenefits) > 0) {
        pnNetwork.planBenefits[0].benefit.map(function (temObj) {
          console.log(temObj)
          myPlan.push(temObj)
        })
      }
    }
    if (this.props.data != null && this.props.data.annualDeductible != undefined && this.props.data.annualDeductible.inNetwork != undefined) {
      var inNetwork = this.props.data.annualDeductible.inNetwork
      console.log(inNetwork)
      if (Object.keys(inNetwork.planBenefits) > 0) {
        inNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }

    if (this.props.data != null && this.props.data.annualDeductible != undefined && this.props.data.annualDeductible.outNetwork != undefined) {
      var outNetwork = this.props.data.annualDeductible.outNetwork
      console.log(outNetwork)
      if (Object.keys(outNetwork.planBenefits) > 0) {
        outNetwork.planBenefits[0].benefit.map(function (temObj) {
          console.log(temObj)
          myPlan.push(temObj)
        })
      }
    }



     if (this.props.data != null && this.props.data.oop !=undefined && this.props.data.oop.pnNetwork !=undefined) {
      var pnNetwork = this.props.data.oop.pnNetwork
      console.log(pnNetwork)
      if (Object.keys(pnNetwork.planBenefits) > 0) {
        pnNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }

     if (this.props.data != null && this.props.data.oop !=undefined && this.props.data.oop.inNetwork !=undefined) {
      var inNetwork = this.props.data.oop.inNetwork
      console.log(inNetwork)
      if (Object.keys(inNetwork.planBenefits) > 0) {
        inNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }
    if (this.props.data != null && this.props.data.oop != undefined && this.props.data.oop.outNetwork != undefined) {
      var outNetwork = this.props.data.oop.outNetwork
      console.log(outNetwork)
      if (Object.keys(outNetwork.planBenefits) > 0) {
        outNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }
*/

    return (
      <Swiper height={(Metrics.screenHeight - (Metrics.screenHeight * 0.44))} style={styles.wrapper} showsButtons>
        { this.getChildrenOptions(this.props.data).map((network, i) => {
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
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 0.4, marginTop: 30}}>
                  <SemiCircle
                    pieWidth={150}
                    pieHeight={150}
                    width={250}
                    height={180}
                    barWidth={10}
                    barTopColor={Colors.flBlue.ocean}
                    barBottomColor={Colors.flBlue.grey2}
                    percent={Object.keys(network.planBenefits).length > 0 && network.planBenefits[0].value > 0 ? (network.planBenefits[0].used / network.planBenefits[0].value) : 0} />
                </View>
                <View style={{flex: 0.6}}>
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
                  }) : <View />}
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
