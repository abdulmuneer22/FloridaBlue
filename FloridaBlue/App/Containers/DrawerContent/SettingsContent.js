// @flow

import React, { Component, PropTypes} from 'react'
import {
  ScrollView,
  Image,
  BackAndroid,
  View,
  StyleSheet,
  Text,
  Dimensions,
  WebView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Navigator
} from 'react-native'
import styles from './DrawerContentStyle'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import MemberActions from '../../Redux/MemberRedux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AsyncStorage } from 'react-native'
var RCTNetworking = require('RCTNetworking')
import { MKIconToggle, MKColor, MKSwitch } from 'react-native-material-kit'

var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

const Divider = () => {
  return <View style={styles.divider} />
}

class SettingsContent extends Component {
  constructor () {
    super()
    this.state = {
      hpActive: false
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', () => {
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
    this.toggleDrawer()
    NavigationActions.WelcomeDashBoard()
  }

  handlePressPlans = () => {
    console.tron.log(this.props.data)
    var action
    if (this.props.visibilityRules.myHealthPlanTile.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.visibilityRules.myHealthPlanTile.tileUrl})
      this.toggleDrawer()
    } else if (this.props.visibilityRules.myHealthPlanTile.tileType == 'native') {
      var routerName = this.props.visibilityRules.myHealthPlanTile.routerName
      action = NavigationActions[routerName]()
      this.toggleDrawer()
    }
  }

  handlePressBenefits = () => {
    this.toggleDrawer()
    NavigationActions.myplanbenefits()
  }

  handlePressResources = () => {
    this.toggleDrawer()
    NavigationActions.Resources()
  }
  handlePressId= () => {
    this.toggleDrawer()
    NavigationActions.MyView()
  }
  handlePressHSA= () => {
    this.toggleDrawer()
    NavigationActions.Hsa()
  }

  handlePressSupport= () => {
    this.toggleDrawer()
    NavigationActions.SupportScreen()
  }
  handlePressFindCare= () => {
    this.toggleDrawer()
    //NavigationActions[this.props.visibilityRules.opdTile.routerName]()
     if (this.props.visibilityRules.opdTile.tileType == 'webview') {
    NavigationActions.MyView({responseURL: this.props.visibilityRules.opdTile.tileUrl})

    } else if (this.props.visibilityRules.opdTile.tileType == 'native') {    
    NavigationActions[this.props.visibilityRules.opdTile.routerName]()

    }
  }
  handlePressPayment= () => {
    this.toggleDrawer()
    NavigationActions.MyView()
  }
  handlePressSupport= () => {
    console.tron.log(this.props.data)
    var action
    if (this.props.visibilityRules.supportTile.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.visibilityRules.supportTile.tileUrl})
      this.toggleDrawer()
    } else if (this.props.visibilityRules.supportTile.tileType == 'native') {
      var routerName = this.props.visibilityRules.supportTile.routerName
      action = NavigationActions[routerName]()
      this.toggleDrawer()
    }
  }
  handlePressPolicy= () => {
    console.tron.log(this.props.data)
    var action
    if (this.props.visibilityRules.touTile.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.visibilityRules.touTile.tileUrl})
      this.toggleDrawer()
    } else if (this.props.visibilityRules.touTile.tileType == 'native') {
      var routerName = this.props.visibilityRules.touTile.routerName
      action = NavigationActions[routerName]()
      this.toggleDrawer()
    }
  }

  handlePressLogout = () => {
    this.toggleDrawer()
    console.tron.log('clear the store before logout')
   // AsyncStorage.clear();
    this.props.clearLogin()
    RCTNetworking.clearCookies((cleared) => {
      console.tron.log('clearing local cookies for the app')
    })
    this.props.attemptLogout(this.props.logoutUrl)
    NavigationActions.login()
  }

  render () {
    console.tron.log(Metrics.screenHeight)
    console.tron.log(Metrics.screenWidth)
    return (
      <ScrollView style={[styles.wrapper]}>
        <View style={styles.options}>


          <Text style={styles.heading} onPress={this.handlePressDashBoard}>Dashboard</Text>
          <Divider />

          { this.props.visibilityRules != undefined && this.props.visibilityRules.myHealthPlanTile != undefined
            ? <View>

              <TouchableWithoutFeedback onPress={() => {
                this.setState({hpActive: !this.state.hpActive})
              }}>
                <View style={{flexDirection: 'row', marginRight: Metrics.mediumMargin, marginTop: Metrics.baseMargin}}>
                  <View style={{flex: 1}}>
                    <Text style={styles.heading1} > {this.props.visibilityRules.myHealthPlanTile.tileName['en']} </Text>
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

                      ? <View>{ this.props.visibilityRules.myHealthPlanTile.tileType != 'webview' ? <Text style={styles.subheading} onPress={this.handlePressPlans}>
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
                    action = NavigationActions[routerName]()
                    this.toggleDrawer()
                  }
                }
                renderItem = () => {
                  if (tile.tileId != null) {
                    return (
                      <View>
                        <Text style={styles.benefitHeading}>{ tile.tileName['en']}</Text>
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
                  action = NavigationActions[routerName]()
                  this.toggleDrawer()
                }
              }
              // console.tron.log("support id checking", tile);
              renderItem = () => {
                if (tile.tileId != null && tile.tileId !== 'support' && tile.tileId !== 'claims' && tile.tileId.indexOf('benefits') == -1) {
                  return (
                    <View>
                      <Text style={styles.heading}>{ tile.tileName['en']}</Text>
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

              <Text style={{
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

          { this.props.visibilityRules != undefined && this.props.visibilityRules.supportTile != undefined

            ? <View style={styles.myAccountStyle}>
              <View >
                <Flb name='cog-gear' size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
              </View>
              <Text style={styles.heading2} onPress={this.handlePressSupport}>{this.props.visibilityRules.supportTile.tileName['en']}</Text>
            </View>
          : null

         }

          { this.props.visibilityRules != undefined && this.props.visibilityRules.touTile != undefined
            ? <View style={styles.myAccountStyle}>
              <View >
                <Flb name='generic-doc' size={Metrics.icons.medium * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
              </View>

              <Text style={styles.heading2} onPress={this.handlePressPolicy}>{this.props.visibilityRules.touTile.tileName['en']} </Text>
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
    logoutUrl: state.member.logoutUrl

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
