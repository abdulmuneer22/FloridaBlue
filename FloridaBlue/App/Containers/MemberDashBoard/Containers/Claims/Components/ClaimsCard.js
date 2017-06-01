import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
    Alert
} from 'react-native'

import { Card } from 'native-base'

import { Colors, Metrics, Fonts } from '../../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../ClaimsStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../../Themes/FlbIcon'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

const window = Dimensions.get('window')

class ClaimsCard extends Component {


  
  render () {
  
    return (
      <View style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'green'}}>
          <Text>from claims</Text>
        </View>
      </View>
    )
  }
}



export default ClaimsCard