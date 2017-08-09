import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native'

import {Colors, Metrics, Fonts, Images} from '../../../Themes'
import styles from '../PaymentStyle.js'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Flb from '../../../Themes/FlbIcon'
import { Card as BCard} from 'native-base'
import PaymentActions from '../../../Redux/PaymentRedux'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let urlConfig = require('../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

let image = [
  Images.dashboardGradient,
  Images.dashboardGradient2,
  Images.dashboardGradient3,
  Images.dashboardGradient4,
  Images.dashboardGradient,
  Images.dashboardGradient2,
  Images.dashboardGradient3,
  Images.dashboardGradient4,
  Images.dashboardGradient,
  Images.dashboardGradient2,
  Images.dashboardGradient3,
  Images.dashboardGradient4
]

class PaymentCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      CardWidth: (window.width * 0.88) / 2
    }
  }

  componentWillMount () {
    const index = this.props.i + 1
    const count = this.props.CardCount
    if (count % 2 !== 0) {
      if (index === count) {
       this.setState({
          CardWidth: (window.width * 0.92)
        })
      }
    }
  }

  customNavigation () {
    let action
    if (this.props.tileType == 'webview') {
      gaTracker.trackEvent('Payments Page', 'Link Out')
      action = NavigationActions.MyView({responseURL: this.props.webURL})
    } else if (this.props.tileType == 'native') {
      let routerName = this.props.routerName
      gaTracker.trackEvent('Payments Page', routerName)
      if(routerName ==='PaymentBarcode'){
        action = NavigationActions[routerName]()
      }else {
      action = NavigationActions.paymentScreen({keyName :routerName})
      }
      if(routerName === 'PaymentBarcode'){
        this.props.attemptPaymentBarcode()
      }
      if(routerName === 'PaymentContent'){
        this.props.attemptPayment()
      }
    }
  }

  render () {
    return (

      <TouchableOpacity
        onPress={() => {
          this.customNavigation()
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}>
        <BCard style={{alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
          height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)
        }}>

          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.transparent}}>
            <Flb name={this.props.icon} size={Metrics.icons.regular * Metrics.screenWidth * 0.002} color={Colors.flBlue.teal} />
          </View>
          <View style={{flex: 6, alignItems: 'flex-start'}}>
            <Text allowFontScaling={false} style={{
             // marginTop: Metrics.mediumMargin,
              fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030,
              fontWeight: '600',
            //  textAlign: 'center',
              color: Colors.flBlue.grey3,
              fontFamily: Fonts.type.subHeaderFont,
              backgroundColor: Colors.transparent
            }}>
              {this.props.title}
            </Text>

          </View>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: Colors.transparent}}>
            <Flb name='chevron-right' size={Metrics.icons.small * Metrics.screenWidth * 0.002} color={Colors.flBlue.grey3} />
          </View>
        </BCard>
      </TouchableOpacity>

    )
  }
}

PaymentCard.propTypes = {
  data: PropTypes.object,
  attemptPayment: PropTypes.func,
  attemptPaymentBarcode: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    paymentdata: state.payment.data,
    paymentbarcodedata: state.payment.data,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPayment: () => dispatch(PaymentActions.paymentsRequest()),
    attemptPaymentBarcode: () => dispatch(PaymentActions.paymentBarcodeRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard)
