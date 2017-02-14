import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'

import {Actions as NavigationActions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors, Metrics, Fonts, Images} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'

const window = Dimensions.get('window')
var {height,width}=Dimensions.get('window')

class MyPlanCard extends Component {
  render () {
    return (
      <TouchableOpacity onPress={() => NavigationActions.Myplan()}>
        <Image source={Images.myPlanbg} style={Styles.summary} >

          <View style={[Styles.center, {flex: 0.3}]}>
            <View style={{
              backgroundColor: Colors.flBlue.ocean,
              width: 70,
              height: 70,
              borderRadius:70/2 ,

              //borderBottomWidth:10,
              //borderLeftWidth:10,
              //borderRightWidth:-20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              marginLeft: Metrics.baseMargin
            }}>
              <Flb name='criticalillness' size={Metrics.icons.large} color='white' />

            </View>
          </View>

          <View style={{flex: 0.7, alignItems: 'center', padding: 20, backgroundColor: Colors.transparent}}>
            <Text style={{
              fontSize: Fonts.size.h4,
              fontWeight: '500'
        // alignSelf : 'stretch',
      //  alignItems:'center',
      //  justifyContent:'center',
      //  height:40,
        // marginLeft:5
            }}>
      My Health Plan
      </Text>
            <Text style={{fontSize: Fonts.size.regular, marginTop: 15}}>
              Find information about deductibles, claims, your savings, and more.
              </Text>

          </View>

          <View style={{marginTop: 30, marginRight: 15, backgroundColor: Colors.transparent}}>
            <Flb name='chevron-right' size={Metrics.icons.large} />
          </View>

        </Image>

      </TouchableOpacity>
    )
  }
}

const Styles = StyleSheet.create({
  summary: {
    flexDirection: 'row',
    height: Metrics.screenHeight-(Metrics.screenHeight*0.73),
    justifyContent: 'space-between',
    alignItems: 'center',
    resizeMode:'cover',
  //  padding:5,
    //alignSelf: 'stretch',
    width: Metrics.screenWidth
  },
  titleView: {
    marginTop: 10
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default MyPlanCard
