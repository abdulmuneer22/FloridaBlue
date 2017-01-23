// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, View, StyleSheet } from 'react-native'
import styles from './DrawerContentStyle'
import { Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

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
      <ScrollView >
      <View style={[styles.container,{backgroundColor:'#00aec7'}]}>
        <DrawerButton text='Dashboard' onPress={this.handlePressDashBoard} />
        <DrawerButton text='Find Care' onPress={this.handlePressFindCare} />
        <DrawerButton text='My Health Plans' onPress={this.handlePressPlans} />
        <ScrollView style={styles.container1}>
          <DrawerButton text='Benefits' onPress={this.handlePressBenefits} />
          <DrawerButton text='Claims' onPress={this.handlePressClaims} />
          </ScrollView>
        <DrawerButton text='Resources' onPress={this.handlePressResources} />
        <DrawerButton text='Support' onPress={this.handlePressDevice} />
        <DrawerButton text='Messages' onPress={this.handlePressSupport} />
        </View>
        <View style={styles.container1}>
        <DrawerButton text='My Account' onPress={this.handlePressComponents} />
        <DrawerButton text='App Settings' onPress={this.handlePressUsage} />
        <DrawerButton text='Frequently Asked Questions' onPress={this.handlePressAPI} />
        <DrawerButton text='Policies and Terms' onPress={this.handlePressPolicy} />
        <DrawerButton text='Contactus' onPress={this.handlePressTheme} />
        </View>

        <View style={{backgroundColor:'grey'}}>
        <DrawerButton text='Logout' onPress={this.handlePressLogout} />
        </View>
      </ScrollView>
    )
  }

}

SettingsContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default SettingsContent
