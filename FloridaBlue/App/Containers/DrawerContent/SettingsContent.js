// @flow

import React, { Component} from 'react'
import { ScrollView,
  Image, BackAndroid,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import styles from './DrawerContentStyle'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import Icon from 'react-native-vector-icons/FontAwesome'

var {height, width} = Dimensions.get('window')
const window = Dimensions.get('window')

const Divider = () => {
  return <View style={styles.divider} />
}

const Dummy = [{
  title :"A"
},
{
  title :"B"
},
{
  title :"C"
}



]
class SettingsContent extends Component {
  constructor(){
    super();
    this.state = {
      hpActive : false
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
    this.toggleDrawer()
    NavigationActions.Myplan()
  }

  handlePressBenefits = () => {
    this.toggleDrawer()
    NavigationActions.myplanbenefits()
  }
  handlePressClaims = () => {
    this.toggleDrawer()
    NavigationActions.claims()
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
    NavigationActions.MyView()
  }
  handlePressPayment= () => {
    this.toggleDrawer()
    NavigationActions.MyView()
  }
  handlePressMyAccount= () => {
    this.toggleDrawer()
    NavigationActions.Support()
  }
  handlePressSettings= () => {
    this.toggleDrawer()
    NavigationActions.Support()
  }
  handlePressFAQ= () => {
    this.toggleDrawer()
    NavigationActions.Support()
  }
  handlePressPolicy= () => {
    this.toggleDrawer()
    NavigationActions.Support()
  }

  handlePressLogout = () => {
    this.toggleDrawer()
    this.props.attemptLogout()
    NavigationActions.login()
  }

  render () {
    return (
      <ScrollView style={[styles.wrapper]}>
        <View style={styles.options}>
          <Text style={styles.heading} onPress={this.handlePressDashBoard}>Dashboard</Text>
          <Divider />

          <View>
          <TouchableWithoutFeedback onPress={()=>{
            this.setState({hpActive : !this.state.hpActive})
          }}>
          <View style={{flexDirection:'row',marginRight:15,marginTop:10}}>
          <View style={{flex:1}}>
            <Text style={styles.heading1} >My Health Plan</Text>
            </View>


            {

              !this.state.hpActive ?

              <Icon name="caret-down" size={25} color="white" />
              :
              <Icon name="caret-up" size={25} color="white" />

            }

            </View>
            </TouchableWithoutFeedback>

            {
              this.state.hpActive ?

            <View style={{marginLeft:20}}>
              <Text style={styles.subheading} onPress={this.handlePressBenefits}>Benefits</Text>
              <Text style={styles.subheading} onPress={this.handlePressClaims}>Claims</Text>
            </View>
            :null
          }
          </View>

          <Divider />
          {
            this.props.visibilityRules ?
            this.props.visibilityRules.coreTiles.map((tile,i)=>{
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
              return (

                <TouchableOpacity onPress={onItemPress.bind(this)} key={i}>
                <View>
                  <Text style={styles.heading}>{tile.tileName['en']}</Text>

                  <Divider />
                  </View>
                </TouchableOpacity>
              )
            })
            :
            null
          }

          <Text style={styles.heading} onPress={this.handlePressFindCare}>Find Care</Text>


        </View>
        <View style={styles.settings}>
          <View style={styles.myAccountStyle}>
            <View >
              <Flb name='user' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>
            <Text style={styles.heading2} onPress={this.handlePressMyAccount}>My Account</Text>
          </View>

          <View style={styles.myAccountStyle}>
            <View >
              <Flb name='cog-gear' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>
            <Text style={styles.heading2} onPress={this.handlePressSettings}>App Settings</Text>
          </View>

          <View style={styles.myAccountStyle}>
            <View >
              <Flb name='generic-doc' size={Metrics.icons.xm  } color={Colors.flBlue.ocean} />
            </View>

            <Text style={styles.heading2} onPress={this.handlePressPolicy}>Policies & Terms </Text>
          </View>
        


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
  drawer: React.PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    responseURL: state.login.responseURL,
    smToken: state.login.smToken,
    visibilityRules: state.member.visibilityRules

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent)
