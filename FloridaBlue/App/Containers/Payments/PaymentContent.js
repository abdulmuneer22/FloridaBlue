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
import styles from './PaymentStyle'
import NavItems from '../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class PaymentContent extends Component {
    
  _renderHeader () {
    return (<Image style={styles.hsaHeader} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.hsaheaderTextStyle}>
         Payment Content
        </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.log('keyName',this.props.keyName)
      console.tron.log("coming from payment content")
    gaTracker.trackScreenView('Payment Content')
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props && this.props.paymentdata) {
     
        return (<View style={{flex: 1}}>
        { this.props && this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent[this.props.keyName]
          ? <View style={styles.paybymailView}>
            <View style={{flex:0.7, alignItems:'center',justifyContent:'center'}}>
              <Text allowFontScaling={false} style={styles.hsaTextStyle1}>{this.props.paymentdata.paymentContent[this.props.keyName].headerText_en}</Text>
            </View>
            <View style={{flex:0.3}}>
              <Flb name='stamp-mail' color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth*0.002} />
            </View>
          </View>
        : null
        }

        {this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent[this.props.keyName] && this.props.paymentdata.paymentContent[this.props.keyName].content && this.props.paymentdata.paymentContent[this.props.keyName].content.length > 0
            ? this.props.paymentdata.paymentContent[this.props.keyName].content.map((tile, i) => {
            return(
            <View key= {i} style={styles.content}>
            <Text allowFontScaling={false} style={styles.hsaTextStyle1}>
            {tile.descrption_en}
            </Text>
            </View>)})
            : null
         }
         { this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent[this.props.keyName] && this.props.paymentdata.paymentContent[this.props.keyName].link
            ? <View style={styles.linkView}>
              <Text allowFontScaling={false} 
              style={styles.linkText} onPress={() => { NavigationActions.MyView({responseURL: this.props.paymentdata.paymentContent[this.props.keyName].link.url}) }}>
                  {this.props.paymentdata.paymentContent[this.props.keyName].link.name}
                  </Text>
             
            </View>
           : null
        }
          </View>
        )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Payment Content',
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

        <View style={{flex:1}}>
        {this._displayCondition()}
        </View>
      </View>
    )
  }
    }

PaymentContent.propTypes = {

  data: PropTypes.object,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    paymentdata: state.payment.paymentslist,
    error: state.payment.error,
    fetching: state.payment.fetching,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPayment: () => dispatch(PaymentActions.paymentsRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContent)
