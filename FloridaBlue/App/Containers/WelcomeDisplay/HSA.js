import React, { Component, PropTypes } from 'react'
import {
  Alert,
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

import {Colors, Metrics, Fonts, Images} from '../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../Redux/MemberRedux'
import { connect } from 'react-redux'
import HsaActions from '../../Redux/HsaRedux'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class Hsa extends Component {
  _renderHeader () {
    return (<Image style={styles.hsaHeader} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.hsaheaderTextStyle}>
          Health Savings Account
        </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  componentDidMount () {
    gaTracker.trackScreenView('HSA')
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.data && this.props.data.currentBalance) {
      if (this.props.data.currentBalance.value || this.props.data.contribution.value || this.props.data.distribution.value) {
        return (<View style={{flex: 1}}>

          {this.props.data != undefined}
          {this.props.data.currentBalance != undefined
          ? <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: Metrics.textHeight}}>
            <View style={{marginTop: 3}}>
              <Text allowFontScaling={false} style={styles.hsaTextStyle1}>{this.props.data.currentBalance.text['en']} :</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text allowFontScaling={false} style={styles.hsaTextStyle2}>${this.props.data.currentBalance.value}</Text>
            </View>
          </View>
        : null
        }

          <View style={styles.row_1}>
            {this.props.data.contribution != undefined
            ? <View style={styles.col_1}>
              <Text allowFontScaling={false} style={styles.hsaTextStyle1}>{this.props.data.contribution.text['en']}</Text>
              <Text allowFontScaling={false} style={styles.hsaTextStyle2}>${this.props.data.contribution.value}</Text>
            </View>
           : null
        }
            {this.props.data.distribution != undefined
            ? <View style={styles.col_1}>
              <Text allowFontScaling={false} style={styles.hsaTextStyle1}>{this.props.data.distribution.text['en']}</Text>
              <Text allowFontScaling={false} style={styles.hsaTextStyle2}>${this.props.data.distribution.value}</Text>
            </View>
           : null
        }
          </View>

          <Image style={styles.hsaBg} source={Images.hsaBg} />

        </View>)
      } else {
        Alert.alert(
                  'HSA',
                  'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
          [
                    { text: 'OK'}

          ]
                )
      }
    } else if (this.props.error != null) {
      Alert.alert(
                  'HSA',
                  'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK' }

        ]
                )
    }
  }

  render () {
    // console.tron.log(this.props.error)
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        {this._displayCondition()}

      </View>
    )
  }
    }

Hsa.propTypes = {

  data: PropTypes.object,
  attemptHsa: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  console.tron.log(state)
  return {
    fetching: state.hsa.fetching,
    data: state.hsa.data,
    error: state.hsa.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptHsa: () => dispatch(HsaActions.memberRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hsa)
