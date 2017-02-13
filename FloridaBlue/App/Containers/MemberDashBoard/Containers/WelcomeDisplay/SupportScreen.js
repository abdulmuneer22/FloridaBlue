
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
    return (<View style={styles.headerContainer}>
      {NavItems.backButton()}
      <Text style={[{color: Colors.snow, fontSize: Fonts.size.h4, marginLeft: 10}]}>Support</Text>
      {NavItems.settingsButton()}

    </View>)
  }

  componentDidMount () {
    console.log('I am Support screen')
    this.props.attemptSupportScreen()
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
              this.props.data ?
                <View >
                  {this.props.data && this.props.data.support ?
            this.props.data.support.map(function (support, i) {
              return (<View style={i % 2 == 0 ? styles.textBackground : styles.textBackground1} >
                <View>
                  <Text style={styles.textStyle} >
                    {support.contactType}
                  </Text>
                  <Text style={styles.textStyle} >
                    {support.contactNumber}
                  </Text>
                </View>
                <View>
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
