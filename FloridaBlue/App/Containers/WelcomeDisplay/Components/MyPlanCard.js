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
import {Colors, Metrics, Fonts, Images} from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import styles from '../DashBoardStyle'
import MemberActions from '../../../Redux/MemberRedux'
import { connect } from 'react-redux'

const theme = getTheme()
const window = Dimensions.get('window')
var {height, width} = Dimensions.get('window')

class MyPlanCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPortrait: this.props.orientationStatus
    }
  }
  customNavigation () {
    console.tron.log(this.props.data)
    var action
    if (this.props.data.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.data.tileUrl})
    } else if (this.props.data.tileType == 'native') {
      var routerName = this.props.data.routerName
      action = NavigationActions[routerName]()
    }
  }

  render () {
    return (
      <TouchableOpacity onPress={() => {
        this.customNavigation()
      }}>
        <Image source={Images[this.props.data.backgroundImage]} style={this.props.orientationStatus ? styles.summary : styles.summaryLandscape} >
          <View style={styles.healthPlanView}>
            <Text allowFontScaling={false} numberOfLines={2} style={this.props.orientationStatus ? styles.healthPlanText : styles.healthPlanTextLandscape}>
              {this.props.data.tileName['en']}
            </Text>
            <Flb name={this.props.data.tileIcon} style={styles.myPlanArrowIcon} size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.snow} />
          </View>
        </Image>

      </TouchableOpacity>
    )
  }
}

export default MyPlanCard
