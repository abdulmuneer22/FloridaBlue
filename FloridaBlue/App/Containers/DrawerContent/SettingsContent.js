// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, View, StyleSheet } from 'react-native'
import styles from './DrawerContentStyle'
import { Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'

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
  handlePressFindCare = () => {
    this.toggleDrawer()
    NavigationActions.FindCare()
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

  handlePressSupport= () => {
    this.toggleDrawer()
    NavigationActions.Support()
  }



  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  handlePressComponents = () => {
    this.toggleDrawer()
    NavigationActions.componentExamples()
  }

  handlePressUsage = () => {
    this.toggleDrawer()
    NavigationActions.usageExamples()
  }

  handlePressAPI = () => {
    this.toggleDrawer()
    NavigationActions.apiTesting()
  }

  handlePressTheme = () => {
    this.toggleDrawer()
    NavigationActions.theme()
  }

  handlePressLogout = () => {
    this.toggleDrawer()
    NavigationActions.login()
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer} >
      <View style={styles.container}>
        <DrawerButton text='Dashboard' onPress={this.handlePressDashBoard} />
        <DrawerButton text='Find Care' onPress={this.handlePressFindCare} />

        <DrawerButton text='My Health Plans' onPress={this.handlePressPlans} />
        <ScrollView style={styles.container1}>
          <DrawerButton text='Benefits' onPress={this.handlePressBenefits} />
          <DrawerButton text='Claims' onPress={this.handlePressClaims} />
          </ScrollView>
        <DrawerButton text='My Dental Plan' onPress={this.handlePressFindCare} />
        <DrawerButton text='Resources' onPress={this.handlePressResources} />
        <DrawerButton text='Support' onPress={this.handlePressDevice} />
        <DrawerButton text='Messages' onPress={this.handlePressSupport} />
        </View>
        <View style={styles.container2}>
        <View style={{flexDirection:'row',marginTop:15}}>
        <Flb name="cc-card" size={40}/>
        <DrawerButton   text='My Account' style={{color: 'red'}} onPress={this.handlePressComponents} />
        </View>
        <View style={{flexDirection:'row',marginTop:15}}>
        <Flb name="cc-card" size={40}/>
        <DrawerButton text='App Settings' onPress={this.handlePressUsage} />
        </View>
        <View style={{flexDirection:'row',marginTop:15}}>
        <Flb name="cc-card" size={40}/>
        <DrawerButton text='Frequently Asked Questions' onPress={this.handlePressAPI} />
        </View>
        <View style={{flexDirection:'row',marginTop:15}}>
        <Flb name="cc-card" size={40}/>
        <DrawerButton text='Policies & Terms' onPress={this.handlePressPolicy} />
        </View>
        <View style={{flexDirection:'row',marginTop:15}}>
        <Flb name="cc-card" size={40}/>
        <DrawerButton text='Contact US' onPress={this.handlePressTheme} />
        </View>
        </View>

        <View style={{margin:10,marginTop:20}}>
        <Image source={Images.logout} resizeMode="stretch" onPress={this.handlePressLogout} />
        </View>
      </ScrollView>
    )
  }

}

SettingsContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default SettingsContent
