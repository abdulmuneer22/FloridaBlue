// @flow

import React, { Component} from 'react'
import { ScrollView, Image, BackAndroid, View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import styles from './DrawerContentStyle'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'

var {height, width}=Dimensions.get('window')
const window=Dimensions.get('window')

const Divider = () => {
  return <View style={styles.divider} />
}

class SettingsContent extends Component {

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
          <Text style={styles.heading} onPress={this.handlePressDashBoard}>Dash Board</Text>
          <Divider />
          <View>
            <Text style={styles.heading} onPress={this.handlePressPlans}>My Health Plan</Text>
            <View style={{paddingLeft: 30}}>
              <Text style={[styles.subheading, {fontSize: Fonts.size.h5}]} onPress={this.handlePressBenefits}>Benefits</Text>
              <Text style={[styles.subheading, {fontSize: Fonts.size.h5}]} onPress={this.handlePressClaims}>Claims</Text>
            </View>
          </View>
          <Divider />
          <Text style={styles.heading} onPress={this.handlePressResources}>Resources</Text>
          <Divider />
          <Text style={styles.heading} onPress={this.handlePressId}>Id Card</Text>
          <Divider />
          <Text style={styles.heading} onPress={this.handlePressHSA}>Health Savings Account</Text>
          <Divider />
          <Text style={styles.heading} onPress={this.handlePressSupport}>Support</Text>
          <Divider />
          <Text style={styles.heading} onPress={this.handlePressFindCare}>Find Care</Text>
          <Divider />
          <Text style={styles.heading} onPress={this.handlePressPayment}>Payment</Text>
        </View>
        <View style={styles.settings}>
          <View style={{marginBottom: Metrics.baseMargin, marginTop: Metrics.baseMargin, flexDirection: 'row'}}>
            <View >
              <Flb name='user' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>
            <Text style={styles.heading2} onPress={this.handlePressMyAccount}>My Account</Text>
          </View>

          <View style={{marginBottom: Metrics.baseMargin, marginTop: Metrics.baseMargin, flexDirection: 'row'}}>
            <View >
              <Flb name='cog-gear' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>
            <Text style={styles.heading2} onPress={this.handlePressSettings}>App Settings</Text>
          </View>
          <View style={{marginBottom: Metrics.baseMargin, marginTop: Metrics.baseMargin, flexDirection: 'row'}}>
            <View >
              <Flb name='question' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>
            <Text style={styles.heading2} onPress={this.handlePressFAQ}>Frequently Asked Questions</Text>
          </View>

          <View style={{marginBottom: Metrics.baseMargin, marginTop: Metrics.baseMargin, flexDirection: 'row'}}>
            <View >
              <Flb name='generic-doc' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>

            <Text style={styles.heading2} onPress={this.handlePressPolicy}>Policies & Terms </Text>
          </View>
          <View style={{marginBottom: Metrics.baseMargin, marginTop: Metrics.baseMargin, flexDirection: 'row'}}>
            <View >
              <Flb name='brand-phone' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
            </View>
            <Text style={styles.heading2} onPress={this.handlePressSupport}>Contact Us </Text>
          </View>
        </View>
        <View style={{marginTop: Metrics.doubleBaseMargin, margin:Metrics.baseMargin}}>
          <TouchableWithoutFeedback onPress={this.handlePressLogout}>
            <Image source={Images.logout}  style={{width:Metrics.screenWidth-(Metrics.screenWidth*0.25)}}/>
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
    smToken: state.login.smToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContent)
