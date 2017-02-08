
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'

import styles from './DashBoardStyle'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
const window = Dimensions.get('window')

class SupportScreen extends Component {

  _renderHeader () {
    return (<View style={styles.headerContainer}>
      {NavItems.backButton()}
      <Text style={[{color: Colors.snow, fontSize: Fonts.size.h4, marginLeft: 10}]}>Support</Text>
      {NavItems.settingsButton()}

    </View>)
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>
          <View style={styles.textBackground}>
            <View >
              <Text style={styles.textStyle}>Members</Text>
              <Text> 1-800-FLA-BLUE (352-2583)</Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.textStyle1}>TTY/TDD</Text>
              <Text> 1-800-955-8771</Text>
            </View>
          </View>

          <View style={styles.textBackground1}>
            <View >
              <Text style={styles.textStyle}>Florida Blue Centers</Text>
              <Text> 1-800-FLA-BLUE (352-2583)</Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={styles.textStyle1}>TTY/TDD</Text>
              <Text> 1-800-955-8771</Text>
            </View>
          </View>

          <View style={styles.textBackground}>
            <View >
              <Text style={styles.textStyle}>Medicare Members</Text>
              <Text> 1-800-926-6565</Text>
            </View>
            <View style={{marginLeft: 60}}>
              <Text style={styles.textStyle1}>TTY/TDD</Text>
              <Text> 1-800-955-8771</Text>
            </View>
          </View>

          <View style={styles.textBackground1}>
            <View >
              <Text style={styles.textStyle}>Physicians & Providers</Text>
              <Text> 1-800-727-2227</Text>
            </View>

          </View>

          <View style={styles.textBackground}>
            <View >
              <Text style={styles.textStyle}>Agent Contact Center</Text>
              <Text> 1-800-267-3156</Text>
            </View>

          </View>

          <View style={styles.textBackground1}>
            <View>
              <Text style={styles.textStyle}>Employers & Benefit Administrators</Text>
              <Text> 1-866-946-2583</Text>
            </View>

          </View>

          <View style={styles.textBackground}>
            <View >
              <Text style={styles.textStyle}>Media Inquires</Text>
              <Text> 1-904-905-7864</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    )
  }
    }

export default SupportScreen
