
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
  attemptMember: () => void,
  error :string
}
const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()
class LandingScreen extends Component {
  props: LoginScreenProps
  isAttempting : boolean

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.0015,
        marginLeft: Metrics.images.xm * Metrics.screenWidth * 0.003}}>
        <Image source={Images.themeLogo}
          style={{
            height: Metrics.images.average * Metrics.screenHeight * 0.0017,
            width: Metrics.screenWidth * 0.65}} />
      </View>

      <View style={{marginRight: Metrics.screenWidth * 0.020}}>
        {NavItems.settingsButton()}
      </View>

    </Image>)
  }
  componentDidMount () {
    console.log('mount on dashboadr' + this.props.smToken)
  //  this.props.attemptMember()
  }

  componentWillReceiveProps (newProps) {
    console.log('dash board failure' + newProps.error)
     /*
    if (!newProps.error) {
        NavigationActions.ErrorPage()
    }
    */
  }

  render () {

    return (

      <View style={styles.container}>
        {this._renderHeader()}

        {
        this.props.visibilityRules

          ? <View style={styles.container}>
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

                  <TouchableOpacity

                    style={
                  i % 2 == 0
                  ? styles.tileStyle
                  : styles.tileStyle1
                }
                    onPress={onItemPress.bind(this)} key={i}>
                <Image  source={Images[tile.backgroundImage]}
                  style={{
                  alignItems:'center',
                  justifyContent:'center',
                  width: (Metrics.screenWidth/2) - (Metrics.baseMargin *1.7),
                  height: Metrics.screenHeight - (Metrics.screenHeight * 0.75)}}>

                      <Flb name={tile.tileIcon} size={Metrics.icons.large * Metrics.screenWidth * 0.0027} color={Colors.snow} style={{backgroundColor: Colors.transparent, marginTop: 10}} />
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

             <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: this.props.visibilityRules.opdTile.tileUrl})}>
              <Image source={Images[this.props.visibilityRules.opdTile.backgroundImage]} style={styles.footerImage}>
              <View style={{flexDirection:'row',
              alignItems:'center',
              justifyContent:'center', marginTop:Metrics.doubleBaseMargin}}>

              <Flb name={this.props.visibilityRules.opdTile.tileIcon}
                style={{backgroundColor:Colors.transparent,
                marginRight:Metrics.baseMargin * Metrics.screenWidth*0.003}}
                size={Metrics.icons.large * Metrics.screenWidth*0.003}
                color={Colors.snow}/>
              <Text style={{fontSize:Fonts.size.h3 * Metrics.screenWidth*0.003,
                color:Colors.snow,
                fontFamily:Fonts.type.headerFont,
                backgroundColor:Colors.transparent}}>
                {this.props.visibilityRules.opdTile.tileName['en']}

                </Text>

                </View>
              </Image>
            </TouchableOpacity>

          </View>

       : <View style={styles.spinnerView}>
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
