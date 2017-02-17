
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
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
const window = Dimensions.get('window')

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string,
  visibilityRules : object,
  attemptMember: () => void
}

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()
class LandingScreen extends Component {
  props: LoginScreenProps
  isAttempting : boolean

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View />
      <Image source={Images.themeLogo} style={{marginTop: Metrics.mediumMargin, height: Metrics.images.small}} />
      {NavItems.settingsButton()}
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
                  <TouchableOpacity style={[styles.tileStyle,{backgroundColor: color[i]}]} onPress={onItemPress.bind(this)} key={i}>
                    <View style={{alignItems: 'center'}}>
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
              <Image source={Images.findCare} style={styles.footerImage} />
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
