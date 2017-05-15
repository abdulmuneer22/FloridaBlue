
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
import ProviderActions from '../../../../Redux/ProviderRedux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Flb from '../../../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const window = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName: string,
  visibilityRules: object,
  attemptMember: () => void,
  attemptNetworkList: () => void,
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
    console.log(this.props.navigatingFrom)
   //  BackAndroid.addEventListener('hardwareBackPress', function () {
    //   console.tron.log('android back')
    //   // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
    //   // Typically you would use the navigator here to go to the last state.

     //  return true
     //})

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
                      if (tile.tileId == 'idCard') {
                          var idCardRouter = 'MyIdCard'
                          action = NavigationActions[idCardRouter]()
                      }                      
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
                     
                          <View style={{flex:1}}>
                          <Image source={Images[tile.gradientImage]}  
                           style={{flex:1, justifyContent:'center',
                           width:Platform.OS== 'ios' ? (Metrics.screenWidth)- (Metrics.screenWidth * 0.54) : (Metrics.screenWidth)- (Metrics.screenWidth * 0.51) }} resizeMode='contain' >

                            <View style={{alignItems: 'center'}} >
                          <Text style={styles.tileTextStyle}>
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
              
            ? <TouchableOpacity onPress={() => NavigationActions[this.props.visibilityRules.opdTile.routerName]()} 
              style={{flex:1,
             // backgroundColor:'red',
               // flexDirection: 'row',
    height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.85) : Metrics.screenHeight - (Metrics.screenHeight * 0.9),
     // height : window.height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.screenWidth,
    marginTop: (Platform.OS === 'ios') ?  4 : 0,
    // marginBottom:0}}
              }}
    >
          
               <Image source={Images[this.props.visibilityRules.opdTile.backgroundImage]} style={styles.footerImage}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex:1
                  // marginTop:27.5
                }}>
                <View style={{flex:0.45, alignItems:'flex-end'}}>
                  <Flb name={this.props.visibilityRules.opdTile.tileIcon}
                    style={{
                      backgroundColor: Colors.transparent,
                      marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.003
                    }}
                    size={Metrics.icons.xml * Metrics.screenWidth * 0.0025}
                    color={Colors.flBlue.grey5} />
                    </View>
                    <View style={{flex:0.55, alignItems:'flex-start'}}>
                  <Text style={{
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
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
