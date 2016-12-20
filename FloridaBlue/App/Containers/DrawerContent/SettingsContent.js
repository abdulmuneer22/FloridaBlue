// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid } from 'react-native'
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
      <ScrollView style={[styles.container,{backgroundColor:'black'}]}>
        <DrawerButton text='Profile' onPress={this.handlePressComponents} />
        <DrawerButton text='App Settings' onPress={this.handlePressUsage} />
        <DrawerButton text='Frequently Asked Questions' onPress={this.handlePressAPI} />
        <DrawerButton text='Contactus' onPress={this.handlePressTheme} />
        <DrawerButton text='Logout' onPress={this.handlePressLogout} />
      </ScrollView>
    )
  }

}

SettingsContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default SettingsContent
