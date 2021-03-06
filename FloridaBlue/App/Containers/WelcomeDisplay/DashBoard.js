
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
  BackHandler
} from 'react-native'
import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import styles from './DashBoardStyle'
import SettingActions from '../../Redux/SettingRedux'
import NavItems from '../../../Navigation/NavItems.js'
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
import Orientation from 'react-native-orientation'

const theme = getTheme()
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

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
  constructor (props) {
    super(props)
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }

  _renderHeader () {
    return (
      <Image style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? (DeviceInfo.isTablet() ? Images.landscapeHeaderImage: Images.newHeaderImage) : Images.landscapeHeaderImage}>
        <View style={{
          alignItems: 'center',
          marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0005,
          marginLeft: Metrics.images.xm * Metrics.screenWidth * 0.003
        }}>
          <Image source={Images.themeLogo} style={this.props.isPortrait ? styles.headerImage : styles.headerImageLandscape}
        />
        </View>

        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.003 }}>
          {NavItems.settingsButton()}
        </View>

      </Image>

    )
  }

  componentWillMount () {
    const initial = Orientation.getInitialOrientation()
    if (initial === 'PORTRAIT') {
      console.log('Hey, Im in P mode on Dashboard')
    } else {
      console.log('Hey, Im in L mode on Dashboard')
    }
  }

  componentDidMount () {
    gaTracker.trackScreenView('Dashboard')

    if (this.props.openedFromTray) {
      NavigationActions.PushNotifications()
    }


    if (this.props.visibilityRules) {
      gaTracker.trackEvent('User Segment', this.props.visibilityRules.segment)

      if (this.props.visibilityRules.groupId) {
          gaTracker.trackEvent('Group ID', this.props.visibilityRules.groupId)
      }
    }
     // NavigationActions.POSTFCM

  //  console.log('mount on dashboadr' + this.props.smToken)
    if (this.props.origin == 'registration') {
      this.props.attemptMember()
    }
    if (this.props.tou == 'nonregistration') {
      this.props.attemptMember()
    }

    this.props.attemptNetworkList()
    Orientation.addOrientationListener(this._orientationDidChange)
  }

  _orientationDidChange (orientation) {
    if (orientation === 'LANDSCAPE') {
      this.props.changeOrientation(false)
      console.log('Hey, Im in landscape mode on dashboard')
    } else {
      this.props.changeOrientation(true)
      console.log('Hey, Im in portrait mode on dashboard')
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.openedFromTray !== newProps.openedFromTray) {
      this.props.getNotification()
      NavigationActions.PushNotifications()
    }

    if (this.props.localNotification !== newProps.localNotification) {
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

  componentWillUnmount () {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`)
    })

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange)
  }

  handleOPDTileView= () => {
    gaTracker.trackEvent('Dashboard', 'Find Care')

    if (this.props.visibilityRules.opdTile.tileType == 'webview') {
      NavigationActions.MyView({responseURL: this.props.visibilityRules.opdTile.tileUrl})
    } else if (this.props.visibilityRules.opdTile.tileType == 'native') {
      NavigationActions[this.props.visibilityRules.opdTile.routerName]()
    }
  }

  _displayCondition (isPortrait) {
    console.log('tesingPor', isPortrait)
  //  var  testInPotrait = testInPotrait
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.visibilityRules != undefined) {
      return (
        <View style={styles.container}>
          <Greeting userName={this.props.userName} isPortrait={this.props.isPortrait} unreadNotification={this.props.unreadNotification} allRead={this.props.markAllRead} />
            {
            this.props.visibilityRules != undefined && this.props.visibilityRules.myHealthPlanTile != undefined ? <MyPlanCard data={this.props.visibilityRules.myHealthPlanTile} orientationStatus={this.props.isPortrait} /> : <View />}
             
            
            {this.props.isPortrait ? 
            
             <View style={{flexDirection: this.props.isPortrait ? null : 'row'}}>
              <View style={this.props.isPortrait ? styles.spacerView : styles.spacerViewLandscape}>
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
                        ? isPortrait ? styles.tileStyle : styles.tileStyleLandscape
                        : styles.tileStyle1
                    }
                      onPress={onItemPress.bind(this)} key={i}>
                      <LinearGradient colors={tile.gradientColor} style={isPortrait ? styles.linearGradientStyle : styles.linearGradientStyleLandscape}>

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
                style={this.props.isPortrait ? styles.opdStyle : styles.opdStyleLandscape} >

                <Image source={Images[this.props.visibilityRules.opdTile.backgroundImage]} style={this.props.isPortrait ? styles.footerImage : styles.tileStyleLandscape}>
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
          }</View>
          
          : <ScrollView horizontal='true' showsHorizontalScrollIndicator='false' style={{flexDirection: this.props.isPortrait ? null : 'row', marginTop: DeviceInfo.isTablet() ? null : -5, top: DeviceInfo.isTablet() ? 10 : null}}>
          <View style={this.props.isPortrait ? styles.spacerView : styles.spacerViewLandscape}>
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
                      ? isPortrait ? styles.tileStyle : styles.tileStyleLandscape
                      : styles.tileStyle1
                  }
                    onPress={onItemPress.bind(this)} key={i}>
                    <LinearGradient colors={tile.gradientColor} style={isPortrait ? styles.linearGradientStyle : styles.linearGradientStyleLandscape}>

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
         
          { this.props.visibilityRules != undefined && this.props.visibilityRules.opdTile != undefined && !DeviceInfo.isTablet()

            ? <TouchableOpacity onPress={this.handleOPDTileView}
              style={this.props.isPortrait ? styles.opdStyle : (DeviceInfo.isTablet() ? styles.opdStyle : styles.opdStyleLandscape)} >

              <Image source={Images.careFinderLS} style={this.props.isPortrait ? styles.footerImage : DeviceInfo.isTablet() ? styles.footerImage : styles.footerImageLandscape}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                  // marginTop:27.5
                }}>

                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Flb name={this.props.visibilityRules.opdTile.tileIcon}
                      style={{
                        backgroundColor: Colors.transparent,
                        marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.003
                      }}
                      size={this.props.isPortrait ? Metrics.icons.xml * Metrics.screenWidth * 0.0025:  Metrics.icons.xml * Metrics.screenWidth * 0.0015}
                      color={Colors.flBlue.grey5} />
                  </View>
                  <View style={{flex: 0.7, alignItems: 'flex-start'}}>
                    <Text allowFontScaling={false} style={{
                      fontSize: this.props.isPortrait ? Fonts.size.h3 * Metrics.screenWidth * 0.003 : Fonts.size.h3 * Metrics.screenWidth * 0.0025,
                      color: Colors.flBlue.grey5,
                      fontFamily: Fonts.type.headerFont,
                      backgroundColor: Colors.transparent,
                      width: this.props.isPortrait ? null : 150
                    }}>
                      {this.props.visibilityRules.opdTile.tileName['en']}
                    </Text>
                  </View>
                </View>
              </Image>

            </TouchableOpacity> : null
          }
          </ScrollView>
          }
          {DeviceInfo.isTablet() ? <View>{ this.props.visibilityRules != undefined && this.props.visibilityRules.opdTile != undefined && !this.props.isPortrait

            ? <TouchableOpacity onPress={this.handleOPDTileView}
              style={this.props.isPortrait ? styles.opdStyle : (DeviceInfo.isTablet() ? styles.opdStyleLandscapeTablet : styles.opdStyleLandscape)} >

              <Image source={Images[this.props.visibilityRules.opdTile.backgroundImage]} style={this.props.isPortrait ? (styles.footerImage ): (DeviceInfo.isTablet() ? styles.footerImageLandscapeTablet : styles.footerImageLandscape)}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                  // marginTop:27.5
                }}>

                  <View style={{flex: 0.35, alignItems: 'flex-end'}}>
                    <Flb name={this.props.visibilityRules.opdTile.tileIcon}
                      style={{
                        backgroundColor: Colors.transparent,
                        marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.003
                      }}
                      size={this.props.isPortrait ? Metrics.icons.xml * Metrics.screenWidth * 0.0025:  Metrics.icons.xml * Metrics.screenWidth * 0.0015}
                      color={Colors.flBlue.grey5} />
                  </View>
                  <View style={{flex: 0.5, alignItems: 'flex-start'}}>
                    <Text allowFontScaling={false} style={{
                      fontSize: this.props.isPortrait ? Fonts.size.h3 * Metrics.screenWidth * 0.003 : Fonts.size.h3 * Metrics.screenWidth * 0.0025,
                      color: Colors.flBlue.grey5,
                      fontFamily: Fonts.type.headerFont,
                      backgroundColor: Colors.transparent,
                      width: this.props.isPortrait ? null : (DeviceInfo.isTablet() ? 300 : 150)
                    }}>
                      {this.props.visibilityRules.opdTile.tileName['en']}
                    </Text>
                  </View>
                </View>
              </Image>

            </TouchableOpacity> : null
          }</View>: null}
          
          
        </View>

      )
    }
  }

  _sendFCMToken()
  {
    if(!this.props.fetching && this.props.visibilityRules != undefined && this.props.defaultContract &&  this.props.tokenFlag){
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
        this.props.localTokenFlag(false)
      }
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

      <ScrollView style={styles.container}>
        {this._renderHeader()}
        {this._displayCondition(this.props.isPortrait)}
	 {this._sendFCMToken()}

      </ScrollView>
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
    localNotification: state.Notification.localNotification,
    isPortrait: state.setting.isPortrait,
     tokenFlag :state.Notification.fcmTokenFlag
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest()),
    postFCMToken: (data) => dispatch(NotificationActions.postFCMToken(data)),
    getNotification: () => dispatch(NotificationActions.getNotification()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait)),
    localTokenFlag:(fcmTokenFlag) => dispatch(NotificationActions.updateTokenFlag(fcmTokenFlag))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
