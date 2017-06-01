import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './ClaimsStyle'
import ClaimsCard from './Components/ClaimsCard'
import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import { connect } from 'react-redux'

import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class Claims extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Claims
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.tron.log('I am Support screen')
    console.tron.log(this.props)
  //  this.props.attemptSupportScreen()
  }

  

  render () {
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
      
         <View style={{flex:1}}>
         <ClaimsCard />
        </View>   
      </View>
    )
  }
}


export default Claims
