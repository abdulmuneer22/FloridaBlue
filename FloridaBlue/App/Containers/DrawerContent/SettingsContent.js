// @flow

import React, { Component } from 'react'
import { ScrollView, Image, BackAndroid, View, StyleSheet,Text, TouchableWithoutFeedback } from 'react-native'
import styles from './DrawerContentStyle'
import { Colors, Metrics,Fonts, Images } from '../../Themes'
import DrawerButton from '../../Components/DrawerButton'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'



const Divider=()=>{
  return <View style={styles.divider}/>
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

  handlePressDentalPlan = () => {
    this.toggleDrawer()
    NavigationActions.Resources()
  }

  handlePressSupport= () => {
    this.toggleDrawer()
    NavigationActions.SupportScreen()
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
   NavigationActions.login()
 }


  render () {
    return (
      <ScrollView style={[styles.wrapper]}>
        <View style={styles.options}>
          <Text style={styles.heading} onPress={this.handlePressDashBoard}>Dash Board</Text>
          <Divider/>
          <View>
            <Text style={styles.heading} onPress={this.handlePressPlans}>My Health Plan</Text>
            <View style={{paddingLeft:30}}>
              <Text style={[styles.subheading,{fontSize:Fonts.size.h5}]} onPress={this.handlePressBenefits}>Benefits</Text>
              <Text style={[styles.subheading,{fontSize:Fonts.size.h5}]} onPress={this.handlePressClaims}>Claims</Text>
            </View>
          </View>
          <Divider/>
          <Text style={styles.heading} onPress={this.handlePressDentalPlan}>My Dental Plan</Text>
          <Divider/>
          <Text style={styles.heading} onPress={this.handlePressPayment}>Payment</Text>
        </View>
        <View style={styles.settings}>
           <View style={{marginBottom:10,marginTop:10, flexDirection:'row'}}>
           <View >
           <Flb name="user" size={23} color={Colors.flBlue.ocean}/>
           </View>
             <Text style={styles.heading2} onPress={this.handlePressMyAccount}>My Account</Text>
             </View>

           <View style={{marginBottom:10,marginTop:10, flexDirection:'row'}}>
           <View >
           <Flb name="cog-gear" size={23} color={Colors.flBlue.ocean}/>
           </View>
             <Text style={styles.heading2} onPress={this.handlePressSettings}>App Settings</Text>
           </View>
           <View style={{marginBottom:10,marginTop:10, flexDirection:'row'}}>
           <View >
           <Flb name="question" size={23} color={Colors.flBlue.ocean}/>
           </View>
             <Text style={styles.heading2} onPress={this.handlePressFAQ}>Frequently Asked Questions</Text>
           </View>

           <View style={{marginBottom:10,marginTop:10, flexDirection:'row'}}>
           <View >
           <Flb name="generic-doc" size={23} color={Colors.flBlue.ocean}/>
           </View>

            <Text style={styles.heading2} onPress={this.handlePressPolicy}>Policies & Terms </Text>
          </View>
          <View style={{marginBottom:10,marginTop:10, flexDirection:'row'}}>
          <View >
          <Flb name="brand-phone" size={23} color={Colors.flBlue.ocean}/>
          </View>
            <Text style={styles.heading2} onPress={this.handlePressSupport}>Contact Us </Text>
          </View>
        </View>
        <View style={{margin:10,marginTop:20}}>
        <TouchableWithoutFeedback onPress={this.handlePressLogout}>
        <Image source={Images.logout} resizeMode="stretch"  />
        </TouchableWithoutFeedback>
        </View>

      </ScrollView>
    )
  }

}

SettingsContent.contextTypes = {
  drawer: React.PropTypes.object
}

export default SettingsContent
