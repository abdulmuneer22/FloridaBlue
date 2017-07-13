
import React, { Component } from 'react'
import { BackAndroid } from 'react-native'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import CustomNavBar from '../Navigation/CustomNavBar'
// screens identified by the router
import { Login } from '../Containers/Login'
import { TouchTOU } from '../Containers/Login/TouchTOU'
import { Webview } from '../Containers/WebView'
import { ErrorScreen } from '../Containers/WebView'
import { Home } from '../Containers/Home'
import { Settings} from '../Containers/Settings'
import {Resources} from '../Containers/WelcomeDisplay'
import {HSA} from '../Containers/WelcomeDisplay'
import {SupportScreen } from '../Containers/WelcomeDisplay'
import {MyIdCard } from '../Containers/WelcomeDisplay'
import {Screen_1} from '../Containers/Registration/Containers/Screen_1'
import {Screen_2} from '../Containers/Registration/Containers/Screen_2'
import {Screen_3} from '../Containers/Registration/Containers/Screen_3'
import {Screen_4} from '../Containers/Registration/Containers/Screen_4'
import {ReadMore} from '../Containers/Registration/Containers/Screen_2'
import {TermsofUse} from '../Containers/Login'
import {FindMemberID} from '../Containers/Registration/Containers/FindMemberID'
import {UserIdHint } from '../Containers/Registration/Containers/UserIdHint'
import {PasswordHint } from '../Containers/Registration/Containers/PasswordHint'
import {SecurityHint } from '../Containers/Registration/Containers/SecurityHint'
import {Confirmation} from '../Containers/Registration/Containers/Confirmation'
import {DashBoard} from '../Containers/WelcomeDisplay'
import {AgentLogin} from '../../Agent/Containers/Login'
import {MyPlanScreen} from '../Containers/MyPlan'
import {BenefitsScreen} from '../Containers/Benefits'
import {DoctorServices } from '../Containers/DoctorService'
import {ProviderSearch} from '../Containers/OPD/ProviderSearch'
import {ProviderTypeInfo } from '../Containers/OPD/ProviderSearch'
import {DoctorList } from '../Containers/OPD/DoctorList'
import {ProviderList } from '../Containers/OPD/ProviderList'
import {AdvancedSearch} from '../Containers/OPD/AdvancedSearch'
import {ProviderMap} from '../Containers/OPD/ProviderMap'
import {DoctorDetail} from '../Containers/OPD/DoctorDetail'
import {ProgramDetail} from '../Containers/OPD/ProgramDetail'
import {NotificationsView } from '../Containers/PushNotifications'
import {ClaimsList} from '../Containers/Claims/ClaimsList'
import {ClaimDetail} from '../Containers/Claims/ClaimDetail'
import {ClaimsSummary} from '../Containers/Claims/ClaimsSummary'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const scenes = Actions.create(
  <Scene key='root'>
    <Scene key='drawer' component={NavigationDrawer} open={false}>
      <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
        <Scene initial key='login' component={Login} title='Login' hideNavBar panHandlers={null} type={ActionConst.RESET} />
        <Scene key='TouchTOU' component={TouchTOU} title='Touch TOU' hideNavBar />
        <Scene key='Termsofuse' component={TermsofUse} title='Termsofuse page' hideNavBar type={ActionConst.RESET} />
        <Scene key='MyView' component={Webview} title='WebView page' hideNavBar />
        <Scene key='ErrorPage' component={ErrorScreen} title='Error page' hideNavBar type={ActionConst.RESET} />
        <Scene key='Settings' component={Settings} title='Settings page' hideNavBar />
        <Scene key='screen_1' component={Screen_1} title='first page' hideNavBar />
        <Scene key='screen_2' component={Screen_2} title='create username page' hideNavBar />
        <Scene key='ReadMore' component={ReadMore} title='readmore page' hideNavBar />
        <Scene key='screen_3' component={Screen_3} title='Verify Device page' hideNavBar />
        <Scene key='screen_4' component={Screen_4} title='Security page' hideNavBar />
        <Scene key='memberid' component={FindMemberID} title='MemberId page' hideNavBar />
        <Scene key='confirmation' component={Confirmation} title='Confirmation page'hideNavBar />
        <Scene key='useridhint' component={UserIdHint} title='UserIdHint page' hideNavBar />
        <Scene key='passwordHint' component={PasswordHint} title='PasswordHint page' hideNavBar />
        <Scene key='securityHint' component={SecurityHint} title='SecurityHint page' hideNavBar />
        <Scene key='WelcomeDashBoard' component={DashBoard} title='Florida Blue' hideNavBar type={ActionConst.RESET} />
        <Scene key='Resources' component={Resources} title='Resource WebView' hideNavBar />
        <Scene key='Hsa' component={HSA} title='Health Savings Account Page' hideNavBar />
        <Scene key='SupportScreen' component={SupportScreen} title='Support Page' hideNavBar />
        <Scene key='MyIdCard' component={MyIdCard} title='MyIdCard Page' hideNavBar />
        <Scene key='Myplan' component={MyPlanScreen} title='MyPlan Page' hideNavBar />
        <Scene key='myplanbenefits' component={BenefitsScreen} title='MyPlanBenefits Page' hideNavBar />
        <Scene key='DoctorServices' component={DoctorServices} title='DoctorServices Page' hideNavBar />
        <Scene key='DoctorList' component={DoctorList} title='OPD Doctor List Page' hideNavBar />
        <Scene key='ProviderList' component={ProviderList} title='Provider List Page' hideNavBar />
        <Scene key='AdvancedSearch' component={AdvancedSearch} title='OPD AdvancedSearch Page' hideNavBar />
        <Scene key='ProviderSearch' component={ProviderSearch} title='OPD ProviderSearch Page' hideNavBar />
        <Scene key='ProviderTypeInfo' component={ProviderTypeInfo} title='OPD ProviderTypeInfo Page' hideNavBar />
        <Scene key='ProviderMap' component={ProviderMap} title='Provider Map View Page' hideNavBar />
        <Scene key='DoctorDetail' component={DoctorDetail} title='Doctor Detail Page' hideNavBar />
        <Scene key='ProgramDetail' component={ProgramDetail} title='Program Detail Page' hideNavBar />
        <Scene key='PushNotifications' component={NotificationsView} title='Push Notifications Page' hideNavBar />
        <Scene key='ClaimsList' component={ClaimsList} title='Claims Page' hideNavBar />
        <Scene key='ClaimDetail' component={ClaimDetail} title='Claims Page' hideNavBar />
        <Scene key='ClaimsSummary' component={ClaimsSummary} title='Claims Summary Page' hideNavBar />
        <Scene key='AgentLogin' component={AgentLogin} title='Agent Login' hideNavBar />
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
