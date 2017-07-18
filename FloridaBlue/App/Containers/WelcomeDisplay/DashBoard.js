
import React, { Component } from 'react'
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
  ScrollView,
  Alert,
  Platform,
  BackAndroid
} from 'react-native'
import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import MemberActions from '../../Redux/MemberRedux'
import ProviderActions from '../../Redux/ProviderRedux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const window = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'
import DeviceInfo from 'react-native-device-info'
import NotificationActions from '../../Redux/NotificationRedux'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const theme = getTheme()
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName: string,
  visibilityRules: object,
  attemptMember: () => void,
  attemptNetworkList: () => void,
  error: string
}

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()
class LandingScreen extends Component {
  props: LoginScreenProps
  isAttempting: boolean

  _renderHeader () {
    return (
      <Image style={styles.headerContainer} source={Images.newHeaderImage}>
        <View style={{
          alignItems: 'center',
          marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
          marginLeft: Metrics.images.xm * Metrics.screenWidth * 0.003
        }}>
          <Image source={Images.themeLogo} style={{
            width: Metrics.screenWidth * 0.65,
            resizeMode: 'contain',
            height: Metrics.images.xm1
          }}
        />
        </View>

        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.003 }}>
          {NavItems.settingsButton()}
        </View>

      </Image>

    )
  }
  componentDidMount () {
    gaTracker.trackScreenView('Dashboard')

    if (this.props.openedFromTray) {
      NavigationActions.PushNotifications()
    }
    if (this.props.visibilityRules) {
      var data = {
        'hccId': this.props.defaultContract.hccId,
        'pushOptIn': true,
        'memberId': this.props.memberObject.memberId,
        'manufacturer': DeviceInfo.getManufacturer(),
        'deviceName': DeviceInfo.getDeviceName(),
        'model': DeviceInfo.getModel(),
        'deviceId': DeviceInfo.getUniqueID(),
        'locale': 'en',
        'os': DeviceInfo.getSystemName(),
        'osId': DeviceInfo.getDeviceId(),
        'osVersion': DeviceInfo.getSystemVersion(),
        'token': this.props.FCMToken
      }
      if (this.props.FCMToken) {
        this.props.postFCMToken(data)
      }
    }

    console.log('data objec to post ', data)
     // NavigationActions.POSTFCM

    console.tron.log('mount on dashboadr' + this.props.smToken)
    if (this.props.origin == 'registration') {
      this.props.attemptMember()
    }
    if (this.props.tou == 'nonregistration') {
      this.props.attemptMember()
    }

    this.props.attemptNetworkList()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.openedFromTray) {
      this.props.getNotification()
      NavigationActions.PushNotifications()
    }

    if (newProps.localNotification) {
      this.props.getNotification()
      NavigationActions.PushNotifications()
    }
    console.tron.log('dash board failure' + newProps.error)
    /*
   if (!newProps.error) {
       NavigationActions.ErrorPage()
   }
   */
  }

  handleOPDTileView= () => {
    gaTracker.trackEvent('Dashboard', 'Find Care')

    if (this.props.visibilityRules.opdTile.tileType == 'webview') {
      NavigationActions.MyView({responseURL: this.props.visibilityRules.opdTile.tileUrl})
    } else if (this.props.visibilityRules.opdTile.tileType == 'native') {
      NavigationActions[this.props.visibilityRules.opdTile.routerName]()
    }
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.visibilityRules != undefined) {
      return (
        <View style={styles.container}>
          <Greeting userName={this.props.userName} unreadNotification={this.props.unreadNotification} allRead={this.props.markAllRead} />
          {
            this.props.visibilityRules != undefined && this.props.visibilityRules.myHealthPlanTile != undefined ? <MyPlanCard data={this.props.visibilityRules.myHealthPlanTile} /> : <View />}
          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row'
          }}>
            {
              this.props.visibilityRules != undefined && this.props.visibilityRules.coreTiles != undefined && this.props.visibilityRules.coreTiles.length > 0 ? this.props.visibilityRules.coreTiles.map(function (tile, i) {
                onItemPress = function () {
                  var action
                  if (tile.tileType == 'webview') {
                    var webview = 'MyView'
                    action = NavigationActions[webview]({ responseURL: tile.tileUrl })
                  } else if (tile.tileType == 'native') {
                    var routerName = tile.routerName
                    action = NavigationActions[routerName]()
                  }
                }
                return (
                  <TouchableOpacity
                    style={
                    i % 2 == 0
                      ? styles.tileStyle
                      : styles.tileStyle1
                  }
                    onPress={onItemPress.bind(this)} key={i}>
                    <LinearGradient colors={tile.gradientColor} style={{
                     //   alignItems: 'center',
                     //   justifyContent: 'center',
                      width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.7),
                      height: Metrics.screenHeight - (Metrics.screenHeight * 0.76)
                    }}>

                      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={Images[tile.gradientImage]}
                          style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                         // resizeMode:Platform.OS == 'ios' ?'' :'cover',
                            width: Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.52) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.51)
                          }} >

                          <View style={{alignItems: 'center'}} >
                            <Text allowFontScaling={false} style={styles.tileTextStyle}>
                              {tile.tileName['en']}
                            </Text>
                          </View>

                        </Image>
                      </View>

                    </LinearGradient>
                  </TouchableOpacity>

                )
                i += 1
              }) : <Text />
            }
          </View>
          { this.props.visibilityRules != undefined && this.props.visibilityRules.opdTile != undefined

            ? <TouchableOpacity onPress={this.handleOPDTileView}
              style={{flex: 1,
             // backgroundColor:'red',
               // flexDirection: 'row',
                height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.85) : Metrics.screenHeight - (Metrics.screenHeight * 0.9),
                justifyContent: 'center',
                alignItems: 'center',
                width: Metrics.screenWidth,
                marginTop: 4

              }} >

              <Image source={Images[this.props.visibilityRules.opdTile.backgroundImage]} style={styles.footerImage}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                  // marginTop:27.5
                }}>
                  <View style={{flex: 0.4, alignItems: 'flex-end'}}>
                    <Flb name={this.props.visibilityRules.opdTile.tileIcon}
                      style={{
                        backgroundColor: Colors.transparent,
                        marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.003
                      }}
                      size={Metrics.icons.xml * Metrics.screenWidth * 0.0025}
                      color={Colors.flBlue.grey5} />
                  </View>
                  <View style={{flex: 0.6, alignItems: 'flex-start'}}>
                    <Text allowFontScaling={false} style={{
                      fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.003,
                      color: Colors.flBlue.grey5,
                      fontFamily: Fonts.type.headerFont,
                      backgroundColor: Colors.transparent
                    }}>
                      {this.props.visibilityRules.opdTile.tileName['en']}
                    </Text>
                  </View>
                </View>
              </Image>

            </TouchableOpacity> : null
          }
        </View>

      )
    }
  }

  render () {
    console.tron.log('ipad Height' + Metrics.screenHeight)
    console.tron.log('ipad Width' + Metrics.screenWidth)
    var image = [
      Images.dashboardGradient,
      Images.dashboardGradient2,
      Images.dashboardGradient3,
      Images.dashboardGradient4
    ]
    var i = 0
    return (

      <View style={styles.container}>
        {this._renderHeader()}
        {this._displayCondition()}

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    fetching: state.member.fetching,
    userName: state.member.username,
    visibilityRules: state.member.visibilityRules,
    error: state.member.error,
    openedFromTray: state.Notification.openedFromTray,
    FCMToken: state.Notification.FCMToken,
    defaultContract: state.member.defaultContract,
    memberObject: state.member.memberObject,
    unreadNotification: state.Notification.unreadNotification,
    markAllRead: state.Notification.allRead,
    localNotification: state.Notification.localNotification
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest()),
    postFCMToken: (data) => dispatch(NotificationActions.postFCMToken(data)),
    getNotification: () => dispatch(NotificationActions.getNotification())

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
