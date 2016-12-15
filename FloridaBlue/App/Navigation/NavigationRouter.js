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
//import { Screen_1} from '../Containers/Registration'
import { Screen_1} from '../Containers/Registration/Containers/Screen_1'
import { Screen_2} from '../Containers/Registration/Containers/Screen_2'
import { Screen_3} from '../Containers/Registration/Containers/Screen_3'
import { Screen_4} from '../Containers/Registration/Containers/Screen_4'
import { TermsofUse} from '../Containers/Registration/Containers/TermsofUse'
import { FindMemberID} from '../Containers/Registration/Containers/FindMemberID'
import { Confirmation} from '../Containers/Registration/Containers/Confirmation'
//import { WelcomeDisplay} from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'

import { DashBoard} from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
import { MyPlanScreen} from '../Containers/MemberDashBoard/Containers/MyPlan'

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
            <Scene initial key='login' component={Login} title='Login' hideNavBar />
            <Scene key='screen_1' component={Screen_1} title='first page' />
            <Scene key='screen_2' component={Screen_2} title='create username page' />
            <Scene key='screen_3' component={Screen_3} title='Verify Device page' />
            <Scene key='screen_4' component={Screen_4} title='Security page' />
            <Scene key='Termsofuse' component={TermsofUse} title='Termsofuse page' />
            <Scene key='MemberId' component={FindMemberID} title='MemberId page' />
            <Scene key='Confirmation' component={Confirmation} title='Confirmation page' />
            <Scene  key='WelcomeDashBoard' component={DashBoard} title='Welcome Dash Board' hideNavBar/>
            <Scene key='Myplan' component={MyPlanScreen} title='MyPlan Page' hideNavBar/>
            <Scene key='home' component={Home} title='Welcome' renderLeftButton={NavItems.hamburgerButton} />
            <Scene  key='listviewexample' component={ListviewExample} title='ListviewExample' />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
