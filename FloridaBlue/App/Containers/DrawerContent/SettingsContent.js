// @flow

import React, { Component, PropTypes} from 'react'
import {
  ScrollView,
  Image,
  BackHandler,
  View,
  StyleSheet,
  Text,
  Dimensions,
  WebView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Navigator,
  Platform
} from 'react-native'
import styles from './DrawerContentStyle'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import MemberActions from '../../Redux/MemberRedux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'
import { MKIconToggle, MKColor, MKSwitch } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
const Divider = () => { return <View style={styles.divider} /> }

let RCTNetworking = require('RCTNetworking')
let {height, width} = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

class SettingsContent extends Component {
  constructor () {
    super()
    this.state = {
      hpActive: false
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer()
        return true
      }
      return false
    })
  }

  toggleDrawer () {
    this.context.drawer.toggle()
  }

  handlePressDashBoard = () => {
    gaTracker.trackEvent('Side Menu', 'Dashboard')
    this.toggleDrawer()
    NavigationActions.WelcomeDashBoard()
  }

  handlePressPlans = () => {
    gaTracker.trackEvent('Side Menu', 'My Plan')
    let action
    if (this.props.visibilityRules.myHealthPlanTile.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.visibilityRules.myHealthPlanTile.tileUrl})
      this.toggleDrawer()
    } else if (this.props.visibilityRules.myHealthPlanTile.tileType == 'native') {
      let routerName = this.props.visibilityRules.myHealthPlanTile.routerName
      action = NavigationActions[routerName]()
      this.toggleDrawer()
    }
  }

  handlePressBenefits = () => {
    gaTracker.trackEvent('Side Menu', 'Benefits')
    this.toggleDrawer()
    NavigationActions.myplanbenefits()
  }

  handlePressResources = () => {
    gaTracker.trackEvent('Side Menu', 'Resources')
    this.toggleDrawer()
    NavigationActions.Resources()
  }

  handlePressId = () => {
    gaTracker.trackEvent('Side Menu', 'ID Card')
    this.toggleDrawer()
    NavigationActions.MyView()
  }

  handlePressHSA = () => {
    gaTracker.trackEvent('Side Menu', 'HSA')
    this.toggleDrawer()
    NavigationActions.Hsa()
  }

  handlePressSupport = () => {
    gaTracker.trackEvent('Side Menu', 'Support')
    this.toggleDrawer()
    NavigationActions.SupportScreen()
  }

  handlePressFindCare = () => {
    gaTracker.trackEvent('Side Menu', 'Find Care')
    this.toggleDrawer()
    if (this.props.visibilityRules.opdTile.tileType == 'webview') {
      NavigationActions.MyView({responseURL: this.props.visibilityRules.opdTile.tileUrl})
    } else if (this.props.visibilityRules.opdTile.tileType == 'native') {
      NavigationActions[this.props.visibilityRules.opdTile.routerName]()
    }
  }

  handlePressPayment = () => {
    gaTracker.trackEvent('Side Menu', 'Payment')
    this.toggleDrawer()
    NavigationActions.MyView()
  }

  handlePressSettings = () => {
    gaTracker.trackEvent('Side Menu', 'Settings')
    this.toggleDrawer()
    NavigationActions['WelcomeDashBoard']({type: ActionConst.REPLACE})
    NavigationActions.Settings()
  }

  handlePressSupport = () => {
    gaTracker.trackEvent('Side Menu', 'Support')
    let action
    if (this.props.visibilityRules.supportTile.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.visibilityRules.supportTile.tileUrl})
      this.toggleDrawer()
    } else if (this.props.visibilityRules.supportTile.tileType == 'native') {
      let routerName = this.props.visibilityRules.supportTile.routerName
      action = NavigationActions[routerName]()
      this.toggleDrawer()
    }
  }

  handlePressPolicy = () => {
    gaTracker.trackEvent('Side Menu', 'Terms of Use')
    let action
    if (this.props.visibilityRules.touTile.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.visibilityRules.touTile.tileUrl})
      this.toggleDrawer()
    } else if (this.props.visibilityRules.touTile.tileType == 'native') {
      let routerName = this.props.visibilityRules.touTile.routerName
      action = NavigationActions[routerName]()
      this.toggleDrawer()
    }
  }

  handlePressLogout = () => {
    gaTracker.trackEvent('Side Menu', 'Logout')
    this.toggleDrawer()
    this.props.clearLogin()
    RCTNetworking.clearCookies((cleared) => {})
    this.props.attemptLogout(this.props.logoutUrl)
    NavigationActions.MemberLogin({'origin': 'logout'})
  }

  render () {
    return (
      <ScrollView style={[styles.wrapper]}>
        <View style={styles.options}>

          <Text allowFontScaling={false} style={styles.heading} onPress={this.handlePressDashBoard}>Dashboard</Text>
          <Divider />

          { this.props.visibilityRules != undefined && this.props.visibilityRules.myHealthPlanTile != undefined
            ? <View>

              <TouchableWithoutFeedback onPress={() => {
                this.setState({hpActive: !this.state.hpActive})
              }}>
                <View style={{flexDirection: 'row', marginRight: Metrics.mediumMargin, marginTop: Metrics.baseMargin}}>
                  <View style={{flex: 1}}>
                    <Text allowFontScaling={false} style={styles.heading1} > {this.props.visibilityRules.myHealthPlanTile.tileName['en']} </Text>
                  </View>

                  {
              !this.state.hpActive

                ? <Icon name='caret-down' size={Metrics.icons.xm * Metrics.screenWidth * 0.0035} color={Colors.snow} />
              : <Icon name='caret-up' size={Metrics.icons.xm * Metrics.screenWidth * 0.0035} color={Colors.snow} />

            }

                </View>
              </TouchableWithoutFeedback>

              {
              this.state.hpActive
                ? <View style={{marginLeft: Metrics.doubleBaseMargin}}>

                  {
                    this.props.visibilityRules != undefined && this.props.visibilityRules.myHealthPlanTile != undefined

                      ? <View>{ this.props.visibilityRules.myHealthPlanTile.tileType != 'webview' ? <Text allowFontScaling={false} style={styles.subheading} onPress={this.handlePressPlans}>
                        { this.props.visibilityRules.myHealthPlanTile.tileSubTitle['en']}
                      </Text> : <View />}</View>
                      : null

                  }

                  <View>
                    { this.props.visibilityRules != undefined && this.props.visibilityRules.planOverViewTiles != undefined
              ? this.props.visibilityRules.planOverViewTiles.map((tile, i) => {
                console.tron.log('checking plan overview', tile)
                onItemPress = function () {
                  var action
                  if (tile.tileType == 'webview') {
                    var webview = 'MyView'
                    action = NavigationActions[webview]({responseURL: tile.tileUrl})
                    this.toggleDrawer()
                  } else if (tile.tileType == 'native') {
                    var routerName = tile.routerName
                    action = NavigationActions['WelcomeDashBoard']({type: ActionConst.REPLACE})
                    action = NavigationActions[routerName]()
                    this.toggleDrawer()
                  }
                }
                renderItem = () => {
                  if (tile.tileId != null) {
                    return (
                      <View>
                        <Text allowFontScaling={false} style={styles.benefitHeading}>{ tile.tileName['en']}</Text>
                      </View>
                    )
                  }
                }
                return (
                  <View key={i}>

                    <TouchableOpacity onPress={onItemPress.bind(this)} key={i}>
                      {renderItem()}
                    </TouchableOpacity>

                  </View>
                )
              })
            : null
          }

                  </View>

                </View>
            : null
          }

            </View>

           : null

             }
          <Divider />
          {
            this.props.visibilityRules
            ? this.props.visibilityRules.coreTiles.map((tile, i) => {
              onItemPress = function () {
                var action
                if (tile.tileType == 'webview') {
                  var webview = 'MyView'
                  action = NavigationActions[webview]({responseURL: tile.tileUrl})
                  this.toggleDrawer()
                } else if (tile.tileType == 'native') {
                  var routerName = tile.routerName
                  action = NavigationActions.WelcomeDashBoard({type: ActionConst.REPLACE})
                  action = NavigationActions[routerName]()
                  this.toggleDrawer()
                }
              }
              // console.tron.log("support id checking", tile);
              renderItem = () => {
                if (tile.tileId != null && tile.tileId !== 'support' && tile.tileId !== 'claims' && tile.tileId.indexOf('benefits') == -1) {
                  return (
                    <View>
                      <Text allowFontScaling={false} style={styles.heading}>{ tile.tileName['en']}</Text>
                      <Divider />
                    </View>
                  )
                }
              }
              return (
                <View key={i}>

                  <TouchableOpacity onPress={onItemPress.bind(this)} key={i}>
                    {renderItem()}
                  </TouchableOpacity>

                </View>
              )
            })
            : null
          }

          { this.props.visibilityRules != undefined && this.props.visibilityRules.opdTile != undefined

            ? <TouchableOpacity onPress={this.handlePressFindCare} >

              <Text allowFontScaling={false} style={{
                color: Colors.snow,
                fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0029,
                marginBottom: Metrics.baseMargin,
                marginTop: Metrics.smallMargin,
                marginLeft: Metrics.baseMargin,
                fontFamily: Fonts.type.subHeaderFont
              }} >
                {this.props.visibilityRules.opdTile.tileName['en']}
              </Text>
            </TouchableOpacity> : null
          }

        </View>
        <View style={styles.settings}>

          <View style={styles.myAccountStyle}>
            <View >
              <Flb name='cog-gear' size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
            </View>
            <Text allowFontScaling={false} style={styles.heading2} onPress={this.handlePressSettings}>Settings</Text>
          </View>

          { this.props.visibilityRules != undefined && this.props.visibilityRules.supportTile != undefined

            ? <View style={styles.myAccountStyle}>
              <View >
                <Flb name='support' size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
              </View>
              <Text allowFontScaling={false} style={styles.heading2} onPress={this.handlePressSupport}>{this.props.visibilityRules.supportTile.tileName['en']}</Text>
            </View>
          : null

         }

          { this.props.visibilityRules != undefined && this.props.visibilityRules.touTile != undefined
            ? <View style={styles.myAccountStyle}>
              <View >
                <Flb name='generic-doc' size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
              </View>

              <Text allowFontScaling={false} style={styles.heading2} onPress={this.handlePressPolicy}>{this.props.visibilityRules.touTile.tileName['en']} </Text>
            </View>
          : null

         }

        </View>
        <View style={styles.logoutView}>
          <TouchableWithoutFeedback onPress={this.handlePressLogout}>
            <Image source={Images.logout} style={styles.logoutStyle} />
          </TouchableWithoutFeedback>
        </View>

      </ScrollView>
    )
  }
}

SettingsContent.contextTypes = {
  drawer: React.PropTypes.object,
  clearLogin: React.PropTypes.func,
  data: PropTypes.object,
  attemptMyPlan: PropTypes.func,
  error: PropTypes.string
}
const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    data: state.myplan.data,
    responseURL: state.login.responseURL,
    smToken: state.login.smToken,
    visibilityRules: state.member.visibilityRules,
    logoutUrl: state.member.logoutUrl,
    touchAvailable: state.login.touchAvailable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: (logoutUrl) => dispatch(LoginActions.logoutRequest(logoutUrl)),
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    clearLogin: () => dispatch(LoginActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent)
