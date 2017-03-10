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

          <View style={styles.healthPlanView}>
            <Text style={styles.healthPlanText}>
            My Health Plan
          </Text>

            <Flb name='chevron-right' style={styles.myPlanArrowIcon} size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.snow} />
          </View>
        </Image>

      </TouchableOpacity>
    )
  }
}

export default MyPlanCard
