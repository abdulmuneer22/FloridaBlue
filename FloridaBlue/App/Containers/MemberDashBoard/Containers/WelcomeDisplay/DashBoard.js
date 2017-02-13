
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
// import SeeDetailsCard from './Components/SeeDetailsCard'
// import TransButton from './Components/transButton'
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
      <Image source={Images.themeLogo} style={{marginTop: 15, height: 23}} />
      {NavItems.settingsButton()}
    </Image>)
  }
  componentDidMount () {
    console.log('mount on dashboadr' + this.props.smToken)
    this.props.attemptMember()
  }
  render () {
    var color = new Array('#005b80', '#00aec7', '#0091cc', '#005b80')
    var i = 0
    return (

      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>
          {
        this.props.visibilityRules ?

          <View style={{flex: 1}}>
            <Greeting userName={this.props.userName} />
            <MyPlanCard />
            <View style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
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
                  <TouchableOpacity style={{
                    width: window.width * 0.5,
                    backgroundColor: color[i],
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: Colors.flBlue.lightBlue
                  }} onPress={onItemPress.bind(this)} key={i}>
                    <View style={{alignItems: 'center'}}>
                      <Flb name={tile.tileIcon} size={40} color='white' />
                      <Text style={{
                        marginTop: Metrics.doubleBaseMargin,
                        fontSize: Fonts.size.regular,
                        fontWeight: '600',
                        color: 'white'
                      }}>
                        {tile.tileName['en']}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
                i += 1
              }) : <Text />}
            </View>
            <View />
            <Image source={Images.findCare} style={styles.footerImage} />

          </View>

       :
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
      }

        </ScrollView>
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
