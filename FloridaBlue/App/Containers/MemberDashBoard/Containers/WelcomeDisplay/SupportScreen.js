
import React, { Component, PropTypes } from 'react'

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

import axios from 'axios'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import {connect} from 'react-redux'
import SupportActions from '../../../../Redux/SupportRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'

const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class SupportScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image source={Images.themeHeader} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.screenWidth * 0.025}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>Support</Text>

      <View style={{marginRight: Metrics.screenWidth * 0.035}}>
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
    var texts = []
    var i = 0
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>

        <ScrollView >
          {
              this.props.data
                ? <View >
                  {this.props.data && this.props.data.support
            ? this.props.data.support.map(function (support, i) {
              return (<View style={i % 2 == 0 ? styles.textBackground : styles.textBackground1} key={i} >
                <View style={{flex: 0.5}}>
                  <Text style={styles.textStyle} >
                    {support.contactType}
                  </Text>
                  <Text style={styles.textStyle} >
                    {support.contactNumber}
                  </Text>
                </View>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                  <Text style={styles.textStyle1} >
                    {support.accessibilityType}
                  </Text>
                  <Text style={styles.textStyle1} >
                    {support.accessibilitynumber}
                  </Text>
                </View>
              </View>)
              i += 1
            }) : <Text> Loading ..</Text>}
                </View>
          : <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
         }
        </ScrollView>
      </View>
    )
  }
    }

SupportScreen.propTypes = {

  data: PropTypes.object,
  attemptSupportScreen: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    data: state.support.data,
    error: state.support.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)
