import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import SemiCircle from '../../../../../Components/SemiCircle'
import styles from '../MyPlanScreenStyle'
import _ from 'lodash'
import LinearGradient from 'react-native-linear-gradient'
import { Card, CardItem, Body} from 'native-base'
const card = {card: {margin: 20}}

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
    if (annualDeductible && annualDeductible.pnNetwork && annualDeductible.pnNetwork.planBenefits) {
      result = Object.keys(annualDeductible.pnNetwork.planBenefits).length > 0 ? [...result, annualDeductible.pnNetwork] : result
    }

    if (annualDeductible && annualDeductible.inNetwork && annualDeductible.inNetwork.planBenefits) {
      result = Object.keys(annualDeductible.inNetwork.planBenefits).length > 0 ? [...result, annualDeductible.inNetwork] : result
    }

    if (annualDeductible && annualDeductible.outNetwork && annualDeductible.outNetwork.planBenefits) {
      result = Object.keys(annualDeductible.outNetwork.planBenefits).length > 0 ? [...result, annualDeductible.outNetwork] : result
    }

    if (oop && oop.pnNetwork && oop.pnNetwork.planBenefits) {
      result = Object.keys(oop.pnNetwork.planBenefits).length > 0 ? [...result, oop.pnNetwork] : result
    }

    if (oop && oop.inNetwork && oop.inNetwork.planBenefits) {
      result = Object.keys(oop.inNetwork.planBenefits).length > 0 ? [...result, oop.inNetwork] : result
    }

    if (oop && oop.outNetwork && oop.outNetwork.planBenefits) {
      result = Object.keys(oop.outNetwork.planBenefits).length > 0 ? [...result, oop.outNetwork] : result
    }

    return result
  }

  render () {
    console.tron.log(this.props.data)
/*
    var myPlan = []
    // const this.props.data=this.props.data
     if (this.props.data != null && this.props.data.annualDeductible !=undefined && this.props.data.annualDeductible.pnNetwork !=undefined) {
      var pnNetwork = this.props.data.annualDeductible.pnNetwork
      console.tron.log(pnNetwork)
      if (Object.keys(pnNetwork.planBenefits) > 0) {
        pnNetwork.planBenefits[0].benefit.map(function (temObj) {
          console.tron.log(temObj)
          myPlan.push(temObj)
        })
      }
    }
    if (this.props.data != null && this.props.data.annualDeductible != undefined && this.props.data.annualDeductible.inNetwork != undefined) {
      var inNetwork = this.props.data.annualDeductible.inNetwork
      console.tron.log(inNetwork)
      if (Object.keys(inNetwork.planBenefits) > 0) {
        inNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }

    if (this.props.data != null && this.props.data.annualDeductible != undefined && this.props.data.annualDeductible.outNetwork != undefined) {
      var outNetwork = this.props.data.annualDeductible.outNetwork
      console.tron.log(outNetwork)
      if (Object.keys(outNetwork.planBenefits) > 0) {
        outNetwork.planBenefits[0].benefit.map(function (temObj) {
          console.tron.log(temObj)
          myPlan.push(temObj)
        })
      }
    }

     if (this.props.data != null && this.props.data.oop !=undefined && this.props.data.oop.pnNetwork !=undefined) {
      var pnNetwork = this.props.data.oop.pnNetwork
      console.tron.log(pnNetwork)
      if (Object.keys(pnNetwork.planBenefits) > 0) {
        pnNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }

     if (this.props.data != null && this.props.data.oop !=undefined && this.props.data.oop.inNetwork !=undefined) {
      var inNetwork = this.props.data.oop.inNetwork
      console.tron.log(inNetwork)
      if (Object.keys(inNetwork.planBenefits) > 0) {
        inNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }
    if (this.props.data != null && this.props.data.oop != undefined && this.props.data.oop.outNetwork != undefined) {
      var outNetwork = this.props.data.oop.outNetwork
      console.tron.log(outNetwork)
      if (Object.keys(outNetwork.planBenefits) > 0) {
        outNetwork.planBenefits[0].benefit.map(function (temObj) {
          myPlan.push(temObj)
        })
      }
    }
*/

    return (

      <Swiper height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.52)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.52))}
       showsButtons 
       dotStyle={{width: 10, height: 10, marginLeft: 10, borderRadius: 5, top: 50, position: 'relative'}}
        activeDotStyle={{width: 10, height: 10, borderRadius: 5, marginLeft: 10, top: 50, position: 'relative'}}
        nextButton={<Text style={{fontSize: Fonts.size.h1 * Metrics.screenWidth * 0.007,
    color: Colors.flBlue.grey1,
    fontFamily:Fonts.type.base }}>›</Text>} 
        prevButton ={<Text style={{fontSize: Fonts.size.h1 * Metrics.screenWidth * 0.007,
    color: Colors.flBlue.grey1,
    fontFamily: Fonts.type.base}}>‹</Text>}
   // autoplay={true}
         >

        { this.getChildrenOptions(this.props.data).map((network, i) => {
          console.tron.log('children options are', this.getChildrenOptions(this.props.data))
          console.tron.log('planbenefits length', Object.keys(network.planBenefits).length)
     //      const planBenefits = _.head(network.planBenefits)
    //       console.tron.log('plan benefits', planBenefits)
          return (

            <Card style={{ flex: 1, alignItems: 'center',
              margin: 15
            }} >
              <View style={{ flex: 1, alignItems: 'center'

              }}>

                <View style={{flex: 1, alignItems: 'center', paddingTop: 10 }}>

                  <Text style={styles.headerText}>
                    {network.title.en}
                  </Text>

                  <Text style={styles.subHeader}>
                    {Object.keys(network.planBenefits).length > 0 ? network.planBenefits[0].title.en : 'No Plan Benfits' }
                  </Text>
                </View>
              </View>

              <View style={{flex: 1, alignItems: 'center'}}>

                <SemiCircle
                  width={Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.60) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)}
                  height={Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.60) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)}
                  barWidth={1}
                  barTopColor={Colors.flBlue.grass}
                  barBottomColor={Colors.flBlue.night}
                  percent={Object.keys(network.planBenefits).length > 0 && network.planBenefits[0].value > 0 ? (network.planBenefits[0].used / network.planBenefits[0].value) : 0} />

              </View>
              <View style={{flex: 1}} />
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'
                }}>
                  {Object.keys(network.planBenefits).length > 0 ? network.planBenefits[0].benefit.map((benefit, i) => {
                    return (<View style={{ flex: 1, flexDirection: 'column', margin: 4
                    }} key={i}>
                      <View style={i == 0 ?{ marginRight:(Metrics.screenWidth) - (Metrics.screenWidth * 0.85), flex: 1, alignItems: 'center', justifyContent: 'flex-start'}:{flex: 1,marginLeft:(Metrics.screenWidth) - (Metrics.screenWidth * 0.85) ,alignItems: 'center', justifyContent: 'center'}} >
                        <View style={i == 0 ? {flex: 3,
                          borderBottomWidth: 3,
                          borderBottomColor: Colors.flBlue.night

                        } : {flex: 3,
                          borderBottomWidth: 3,
                          borderBottomColor: Colors.flBlue.grass

                        }}>
                          <Text style={{
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0020,
                            fontWeight: '500',
                            fontFamily: Fonts.type.subHeaderFont,
                            color: Colors.flBlue.grey6 }}>
                            {benefit ? benefit.label.en : null}
                          </Text>
                        </View>
                        <View style={{flex: 1, marginTop: 2}}>
                          <Text style={i == 0 ? {
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                            fontWeight: '500',
                            fontFamily: Fonts.type.subHeaderFont,
                            color: Colors.flBlue.grey6} :
                            {
                              fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                              fontWeight: '500',
                              fontFamily: Fonts.type.subHeaderFont,
                              color: Colors.flBlue.grey6}}>
                      ${benefit ? benefit.value : null}
                          </Text>
                        </View>

                      </View>
                    </View>)
                  }) : <View />}

                </View>
                <View style={{flex: 1}} />
              </View>
            </Card>

          )
          i += 1
        })}

      </Swiper>
    )
  }
}

export default MyPlanSwiper
