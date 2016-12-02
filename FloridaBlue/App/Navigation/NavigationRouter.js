// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'

// screens identified by the router
import { Login } from '../Containers/Login'
import { Home } from '../Containers/Home'
import { ListviewExample } from '../Containers/ListviewExample'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='login' component={Login} title='Login' />
            <Scene key='home' component={Home} title='Welcome' renderLeftButton={NavItems.hamburgerButton} />
            <Scene key='listviewexample' component={ListviewExample} title='ListviewExample' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
