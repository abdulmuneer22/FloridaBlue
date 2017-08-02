import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  Platform
} from 'react-native'

// import SafariView from  'react-native-safari-view'

const window = Dimensions.get('window')
import {Colors, Metrics, Fonts, Images} from '../../../Themes'
import styles from '../MyPlanScreenStyle.js'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MyPlanActions from '../../../Redux/MyPlanRedux'
import { connect } from 'react-redux'
import Flb from '../../../Themes/FlbIcon'
import ClaimsActions from '../../../Redux/ClaimsRedux'
import LinearGradient from 'react-native-linear-gradient'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import SettingActions from '../../../Redux/SettingRedux'

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

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      CardWidth: (window.width * 0.88) / 2
    }
  }

  componentWillMount () {
    // console.tron.log(this.props.i)
    // console.tron.log(this.props.CardCount)
    const index = this.props.i + 1
    const count = this.props.CardCount
    if (count % 2 !== 0) {
      // console.tron.log("odd number cards !!")

      if (index === count) {
      // console.tron.log("index" ,index)
      // console.tron.log("count" , count)
        this.setState({
          CardWidth: (window.width * 0.92)
        })
      }
    }
  }

  customNavigation () {
    let action
    if (this.props.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.webURL})
    } else if (this.props.tileType == 'native') {
      let routerName = this.props.routerName
      gaTracker.trackEvent('My Plan', routerName)
      action = NavigationActions[routerName]()
      if (routerName === 'ClaimsList') {
        this.props.attemptClaimsList()
      }
    }
  }

  render () {
    console.tron.log(this.props.gradientImage)
    return (

      <TouchableOpacity
        onPress={() => {
          this.customNavigation()
        }}
        style={{
          flex: 1,
      //   backgroundColor : "red",
        // width : this.props.i === this.props.CardCount ? (window.width * 0.85) : null,
          width: this.state.CardWidth,
          height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: this.props.i % 2 !== 0 ? window.width * 0.04 : null,
        // marginRight :
        // marginTop : 10,
          marginBottom: window.width * 0.03

        }}>
        <View style={{flex: 1}} >
          <LinearGradient colors={this.props.gradientColor}
            style={{
              flex: 1,
              width: this.props.isPortrait ? this.state.CardWidth : this.state.CardWidth * 1.78,
              height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.76) : Metrics.screenHeight - (Metrics.screenHeight * 0.78),
        //    alignItems: 'center',
        //    justifyContent: 'center'
              marginBottom: (Platform.OS === 'ios') ? 0 : 30
            }}
           >

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: this.props.isPortrait ? -2 : -5,
              marginLeft: this.props.isPortrait ? 0 : 125}}>
              <Image source={Images[this.props.gradientImage]}
                style={this.props.CardCount % 2 ? styles.myplanImageStyle1 : styles.myplanImageStyle2} >

                <View style={{alignItems: 'center', width: Metrics.screenWidth, flex: 1, justifyContent: 'center', marginRight: this.props.isPortrait ? 0 : 98}} >
                  <Text allowFontScaling={false} style={{
                  // marginTop: Metrics.mediumMargin,
                   // marginBottom: -15,
                    fontSize: this.props.CardCount % 2 ? Fonts.size.h4 * Metrics.screenWidth * 0.0030 : Fonts.size.regular * Metrics.screenWidth * 0.0030,
                    fontWeight: (Platform.OS === 'ios') ? '600' : '400',
                    color: Colors.snow,
                    backgroundColor: Colors.transparent,
                    left: 0
                  }}>
                    {this.props.title}
                  </Text>
                </View>

              </Image>
            </View>

          </LinearGradient>
        </View>

      </TouchableOpacity>

    )
  }
}

Card.propTypes = {
  data: PropTypes.object,
  attemptClaimsList: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    claimsdata: state.claims.claimslist,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: () => dispatch(ClaimsActions.claimsListRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
