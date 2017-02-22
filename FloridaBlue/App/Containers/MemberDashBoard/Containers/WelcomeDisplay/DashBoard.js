
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
  ScrollView
} from 'react-native'
import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Flb from '../../../../Themes/FlbIcon'
import Loader from '../../../../Components/Loader'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const window = Dimensions.get('window')

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string,
  visibilityRules : object,
  attemptMember: () => void
}
const theme=getTheme();

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()
class LandingScreen extends Component {
  props: LoginScreenProps
  isAttempting : boolean

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.0015,
                  marginLeft:Metrics.images.xm * Metrics.screenWidth *0.003}}>
      <Image source={Images.themeLogo}
        style={{
        height: Metrics.images.average * Metrics.screenHeight *0.0017,
        width:Metrics.screenWidth*0.65}} />
        </View>

        <View style={{marginRight:Metrics.screenWidth*0.020}}>
      {NavItems.settingsButton()}
      </View>

    </Image>)
  }
  componentDidMount () {
    console.log('mount on dashboadr' + this.props.smToken)
  //  this.props.attemptMember()
  }
  render () {
    var color = new Array('#005b80', '#00aec7', '#0091cc', '#005b80')
    var i = 0
    return (

      <View style={styles.container}>
        {this._renderHeader()}

        {
        this.props.visibilityRules ?

          <View style={styles.container}>
            <Greeting userName={this.props.userName} />
            <MyPlanCard />
            <View style={{
              flexWrap: 'wrap',
              flexDirection: 'row'}}>
              {this.props.visibilityRules ? this.props.visibilityRules.coreTiles.map(function (tile, i) {
                onItemPress = function () {
                  var action
                  if (tile.tileType == 'webview') {
                    var webview = 'MyView'
                    action = NavigationActions[webview]({responseURL: tile.tileUrl})
                  } else if (tile.tileType == 'native') {
                    var routerName = tile.routerName
                    action = NavigationActions[routerName]()
                  }
                }
                return (

                  <TouchableOpacity  style={[styles.tileStyle,{backgroundColor: color[i]}]} onPress={onItemPress.bind(this)} key={i}>
                    <View style={{alignItems: 'center',marginTop:5}}>
                      <Flb name={tile.tileIcon} size={Metrics.icons.regular * Metrics.screenWidth * 0.0027} color={Colors.snow} />
                      <Text style={styles.tileTextStyle}>
                        {tile.tileName['en']}
                      </Text>
                    </View>
                  </TouchableOpacity>

                )
                i += 1
              }) : <Text />
            }
            </View>
            <View style={styles.footerView} >
            <TouchableOpacity>
              <Image source={Images.findCare} style={styles.footerImage} />
              </TouchableOpacity>
            </View>

          </View>

       :
          <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
      }

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    userName: state.member.username,
    visibilityRules: state.member.visibilityRules
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember: () => dispatch(MemberActions.memberRequest())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
