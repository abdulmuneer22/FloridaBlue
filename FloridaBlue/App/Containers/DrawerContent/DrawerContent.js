// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
import styles from './DrawerContentStyle'
import { Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'

class DrawerContent extends Component {
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

  handlePressComponents = () => {
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

  handlePressDevice = () => {
    this.toggleDrawer()
    NavigationActions.deviceInfo()
  }

  render () {
    return (
      <ScrollView style={styles.container}>

        <DrawerButton text='Dashboard' onPress={this.handlePressComponents} />
        <DrawerButton text='My Health Plans' onPress={this.handlePressPlans} />
        <ScrollView style={styles.container1}>
          <DrawerButton text='Benefits' onPress={this.handlePressBenefits} />
          <DrawerButton text='Claims' onPress={this.handlePressClaims} />
        </ScrollView>
        <DrawerButton text='My Dental Plan' onPress={this.handlePressUsage} />
        <DrawerButton text='Find Care' onPress={this.handlePressAPI} />
        <DrawerButton text='Payment' onPress={this.handlePressTheme} />
        <DrawerButton text='ID Care' onPress={this.handlePressDevice} />
        <DrawerButton text='Messages' onPress={this.handlePressDevice} />
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default DrawerContent
