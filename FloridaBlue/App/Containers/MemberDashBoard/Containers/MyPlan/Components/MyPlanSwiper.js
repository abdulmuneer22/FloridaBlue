import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import SemiCircle from '../../../../../Components/SemiCircle'
import styles from '../MyPlanScreenStyle'
import _ from 'lodash'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

const card  = {card: {margin : 20}};

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
      
      <Swiper height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.46)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.48))}
       showsButtons   dotStyle={{width: 10, height: 10, marginLeft:10, borderRadius:5,top:25, position:'relative'}} 
       activeDotStyle={{width: 10, height: 10, borderRadius:5, marginLeft:10, top:25, position:'relative'}} >
       
        { this.getChildrenOptions(this.props.data).map((network, i) => {
          console.tron.log('children options are', this.getChildrenOptions(this.props.data))
          console.tron.log('planbenefits length', Object.keys(network.planBenefits).length)
     //      const planBenefits = _.head(network.planBenefits)
    //       console.tron.log('plan benefits', planBenefits)
          return (
            <View style={{
              flex:1,
              margin:30,
              borderRadius: 2,
              backgroundColor: "#fff",
              shadowColor: "#000000",
              shadowOpacity: 0.3,
              shadowRadius: 1,
              flexDirection:'column',
              shadowOffset: {
                height: 1,
                width: 0.3,
              }}} key={i}>
              
              <View style={{ flex: 1 ,alignItems:'center',
                       
              } }>
              <Text style={styles.headerText}>
                {network.title.en}
              </Text>
              <View style={{borderBottomWidth:0.2}}>
              <Text style={styles.subHeader}>
                {Object.keys(network.planBenefits).length > 0 ? network.planBenefits[0].title.en : 'No Plan Benfits' }
              </Text>
              </View>
              </View>
              
              <View style={{flex:1 , alignItems:'center'}}>
                <View style={{margin:0}}>
                  <SemiCircle
                    pieWidth={150}
                    pieHeight={150}
                    width={250}
                    height={185}
                    barWidth={10}
                    
                    barTopColor={Colors.flBlue.grass}
                    barBottomColor={Colors.flBlue.grey2}
                    percent={Object.keys(network.planBenefits).length > 0 && network.planBenefits[0].value > 0 ? (network.planBenefits[0].used / network.planBenefits[0].value) : 0} />
                    </View>
               </View> 
               <View style={{flex:1,alignItems:'center'}}>
                
                  <View style={{flex:1, alignItems:'center',flexDirection:'row-reverse'
                  }}>
                  {Object.keys(network.planBenefits).length > 0 ? network.planBenefits[0].benefit.map((benefit, i) => {
                    return (<View style={{ flex :1 ,flexDirection: 'column',alignItems:'center',margin:4,
                     backgroundColor: Colors.flBlue.lightBlue,
                     
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    }
                    
                    }} key={i}>
                      <View style={{flex: 0.2, alignItems:'center', justifyContent:'center'}} >
                        
                        <Text style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                          fontWeight:'500',
                          fontFamily: Fonts.type.subHeaderFont,
                          color: Colors.flBlue.grass}}>
                      ${benefit ? benefit.value : null}
                        </Text>
                                                <Text style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0020,
                           fontWeight:'500',
                          fontFamily: Fonts.type.subHeaderFont,
                          color: Colors.flBlue.grey6
                        }}>
                          {benefit ? benefit.label.en : null}
                        </Text>
                        
                      </View>
                    </View>)
                  }) : <View />}
                  </View>
                 <View style={{flex:0.1}}></View>
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