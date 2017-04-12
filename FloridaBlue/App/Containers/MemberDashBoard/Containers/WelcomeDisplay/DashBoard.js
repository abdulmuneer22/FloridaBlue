
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
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Flb from '../../../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const window = Dimensions.get('window')

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName: string,
  visibilityRules: object,
  attemptMember: () => void,
  error: string
}
const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()
class LandingScreen extends Component {
  props: LoginScreenProps
  isAttempting: boolean

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{
        alignItems: 'center',
        marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002,
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

    </Image>)
  }
  componentDidMount () {
    // BackAndroid.addEventListener('hardwareBackPress', function () {
    //   console.tron.log('android back')
    //   // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
    //   // Typically you would use the navigator here to go to the last state.

    //   return true
    // })

    console.tron.log('mount on dashboadr' + this.props.smToken)
    if (this.props.origin == 'registration') {
      this.props.attemptMember()
    }
    if (this.props.tou == 'nonregistration') {
      this.props.attemptMember()
    }
  }

  componentWillReceiveProps (newProps) {
    console.tron.log('dash board failure' + newProps.error)
    /*
   if (!newProps.error) {
       NavigationActions.ErrorPage()
   }
   */
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
          <Greeting userName={this.props.userName} />
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

                  <Image source={Images[tile.backgroundImage]}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: (Metrics.screenWidth / 2) - (Metrics.baseMargin * 1.7),
                      height: Metrics.screenHeight - (Metrics.screenHeight * 0.76)
                    }}>

                    <Flb name={tile.tileIcon} size={Metrics.icons.large * Metrics.screenWidth * 0.0027} color={Colors.snow}
                    style={{ backgroundColor: Colors.transparent}} />
                    <Text style={styles.tileTextStyle}>
                      {tile.tileName['en']}
                    </Text>
                  </Image>
                </TouchableOpacity>

              )
              i += 1
            }) : <Text />
            }
          </View>
          { this.props.visibilityRules != undefined && this.props.visibilityRules.opdTile != undefined

            ? <TouchableOpacity onPress={() => NavigationActions.MyView({ responseURL: this.props.visibilityRules.opdTile.tileUrl })}>
              <Image source={Images[this.props.visibilityRules.opdTile.backgroundImage]} style={styles.footerImage}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                  // marginTop:27.5
                }}>

                  <Flb name={this.props.visibilityRules.opdTile.tileIcon}
                    style={{
                      backgroundColor: Colors.transparent,
                      marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.003
                    }}
                    size={Metrics.icons.xml * Metrics.screenWidth * 0.0025}
                    color={Colors.snow} />
                  <Text style={{
                    fontSize: Fonts.size.h3 * Metrics.screenWidth * 0.003,
                    color: Colors.snow,
                    fontFamily: Fonts.type.headerFont,
                    backgroundColor: Colors.transparent
                  }}>
                    {this.props.visibilityRules.opdTile.tileName['en']}
                  </Text>

                </View>
              </Image>
            </TouchableOpacity> : null
          }
        </View>

      )
    } 
  }

  render () {
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
    error: state.member.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember: () => dispatch(MemberActions.memberRequest())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
