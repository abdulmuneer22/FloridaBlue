import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  WebView
} from 'react-native'

import {Actions as NavigationActions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import {Colors, Metrics, Fonts, Images} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import styles from '../DashBoardStyle'
import MemberActions from '../../../../../Redux/MemberRedux'
import { connect } from 'react-redux'

const theme = getTheme()
const window = Dimensions.get('window')
var {height, width} = Dimensions.get('window')

class MyPlanCard extends Component {
  customNavigation (data) {
    console.log(this.props)
    var action
    if (data.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: data.webURL})
    } else if (data.tileType == 'native') {
      var routerName = data.routerName
      action = NavigationActions[routerName]()
    }
  }

  render () {
    console.log(this.props.visibilityRules)
    const data = this.props.visibilityRules
    return (
      <TouchableOpacity onPress={() => {
        this.customNavigation(data)
      }}>
        <Image source={Images[data.backgroundImage]} style={styles.summary} >

          <View style={styles.healthPlanView}>
            <Text style={styles.healthPlanText}>
              {data.tileName['en']}
            </Text>

            <Flb name={data.tileIcon} style={styles.myPlanArrowIcon} size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.snow} />
          </View>
        </Image>

      </TouchableOpacity>
    )
  }
}

export default MyPlanCard
