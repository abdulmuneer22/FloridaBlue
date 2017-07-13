
import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'
// screens identified by the router
import { Login } from '../Containers/Login'
import { MemberLogin } from '../Containers/Agent/App/Containers/Login'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='drawer' component={NavigationDrawer} open={false}>
      <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
        <Scene key='login' component={Login} title='Login' hideNavBar panHandlers={null} type={ActionConst.RESET} />
        <Scene key='memberLogin' component={MemberLogin} title='MemberLogin' hideNavBar panHandlers={null} type={ActionConst.RESET} />
      </Scene>
    </Scene>
  </Scene>
  )

class NavigationRouter extends Component {

  render () {
    return (
      <Router scenes={scenes} />
    )
  }
}

export default NavigationRouter
