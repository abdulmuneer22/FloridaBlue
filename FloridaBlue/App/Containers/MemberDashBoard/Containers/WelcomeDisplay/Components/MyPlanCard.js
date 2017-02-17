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
import styles from '../DashBoardStyle'

const window = Dimensions.get('window')
var {height, width} = Dimensions.get('window')

class MyPlanCard extends Component {
  render () {
    return (
      <TouchableOpacity onPress={() => NavigationActions.Myplan()}>
        <Image source={Images.myPlanbg} style={styles.summary} >

          <View style={styles.center}>
            <Image source={Images.healthPlan} style={styles.healthPlanImage} />
          </View>

          <View style={styles.healthPlanView}>
            <Text style={styles.healthPlanText}>
      My Health Plan
      </Text>
            <Text style={{fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025, marginTop: 15}}>
              Find information about deductibles, claims, your savings, and more.
              </Text>

          </View>

          <View style={styles.healthPlanIcon}>
            <Flb name='chevron-right' size={Metrics.icons.xml} />
          </View>

        </Image>

      </TouchableOpacity>
    )
  }
}

export default MyPlanCard
