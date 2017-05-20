
import React, { Component, PropTypes } from 'react'
import { Alert, BackAndroid } from 'react-native'
import { Scene, Router, ActionConst, Reducer } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'
import NavItems from './NavItems'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import CustomNavBar from '../Navigation/CustomNavBar'
var RCTNetworking = require('RCTNetworking')

// screens identified by the router
import { Login } from '../Containers/Login'
import { TouchTOU } from '../Containers/Login/TouchTOU'
import { Webview } from '../Containers/WebView'
import { ErrorScreen } from '../Containers/WebView'
import { Home } from '../Containers/Home'
import { Resources } from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
import { HSA } from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
import { SupportScreen } from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
import { MyIdCard } from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
// import { Screen_1} from '../Containers/Registration'
import { Screen_1} from '../Containers/Registration/Containers/Screen_1'
import { Screen_2} from '../Containers/Registration/Containers/Screen_2'
import { Screen_3} from '../Containers/Registration/Containers/Screen_3'
import { Screen_4} from '../Containers/Registration/Containers/Screen_4'
import { ReadMore} from '../Containers/Registration/Containers/Screen_2'
import { TermsofUse} from '../Containers/Login'
import { FindMemberID} from '../Containers/Registration/Containers/FindMemberID'
import { UserIdHint } from '../Containers/Registration/Containers/UserIdHint'
import { PasswordHint } from '../Containers/Registration/Containers/PasswordHint'
import { SecurityHint } from '../Containers/Registration/Containers/SecurityHint'
import { Confirmation} from '../Containers/Registration/Containers/Confirmation'
// import { WelcomeDisplay} from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
import { DashBoard} from '../Containers/MemberDashBoard/Containers/WelcomeDisplay'
import { MyPlanScreen} from '../Containers/MemberDashBoard/Containers/MyPlan'
import { BenefitsScreen} from '../Containers/MemberDashBoard/Containers/Benefits'
import { DoctorServices } from '../Containers/MemberDashBoard/Containers/DoctorService'
import { AdditionalBenefits } from '../Containers/MemberDashBoard/Containers/AdditionalBenefits'
import { ProviderSearch} from '../Containers/MemberDashBoard/Containers/OPD/ProviderSearch'
import { ProviderTypeInfo } from '../Containers/MemberDashBoard/Containers/OPD/ProviderSearch'
import { DoctorList} from '../Containers/MemberDashBoard/Containers/OPD/DoctorList'
import { AdvancedSearch} from '../Containers/MemberDashBoard/Containers/OPD/AdvancedSearch'
import { ProviderMap} from '../Containers/MemberDashBoard/Containers/OPD/ProviderMap'
import { ListviewExample } from '../Containers/ListviewExample'
import { DoctorDetail} from '../Containers/MemberDashBoard/Containers/OPD/DoctorDetail'
import { ProgramDetail} from '../Containers/MemberDashBoard/Containers/OPD/ProgramDetail'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const onExitApp = () => {
  Alert.alert(
    'Exit',
    'Are you sure you want to exit this app ?',
    [
      { text: 'Cancel', onPress: () => {} },
      { text: 'YES', onPress: () => BackAndroid.exitApp() }
    ]
  )
  return true
}
class NavigationRouter extends Component {
  constructor () {
    super()
    component = this
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', function () {
      console.log('inside back handler', component.props.currentSceneValue)

      if (component.props.currentSceneValue &&component.props.currentSceneValue === 'drawer') {
        console.log('currentscence', component.props.currentSceneValue)
        Alert.alert(
              'Exit',
              'Are you sure you want to exit this app?',
          [
                { text: 'No', onPress: () => {} },
                { text: 'Yes', onPress: () => BackAndroid.exitApp() }
          ]
            )
      }else if(component.props.currentSceneValue &&component.props.currentSceneValue === 'login'){
          console.log('currentscence', component.props.currentSceneValue)
        Alert.alert(
              'Exit',
              'Are you sure you want to exit this app?',
          [
                { text: 'No', onPress: () => {} },
                { text: 'Yes', onPress: () => BackAndroid.exitApp() }
          ]
            )
      } else if (component.props.currentSceneValue === 'WelcomeDashBoard') {
        console.log('currentscence', component.props.currentSceneValue)
        Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
          [
                { text: 'No', onPress: () => {} },
            { text: 'Yes', onPress: () => {
              component.props.clearLogin()
              RCTNetworking.clearCookies((cleared) => {
                console.tron.log('clearing local cookies for the app')
              })
              component.props.attemptLogout(component.props.logoutUrl)
              NavigationActions.login()
            }}
          ]
            )
      } else {
        return false
      }

      return true
    })
  }

  render () {
    this.reducerCreate = params => {
      const defaultReducer = Reducer(params); return (state, action) => {
        console.log('ACTION:', action)
        if (action.type == ActionConst.FOCUS) {
          let scene = action.scene; this.currentScene = scene.sceneKey
          console.log('current', this.currentScene)
          this.props.currentScene(this.currentScene)
        }
        return defaultReducer(state, action)
      }
    }
/*
    backAndroidHandler = (currentSceneValue) =>{
     {

       BackAndroid.addEventListener('hardwareBackPress', function (currentSceneValue) {
           console.log('currentSceneValue',currentSceneValue)
         console.log('inside back handler',this.props.currentSceneValue)

          if((this.props.currentSceneValue !='login') && this.props.currentSceneValue!='WelcomeDashBoard'){
            console.log('currentscence',this.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackAndroid.exitApp() },
              ]
            );
          }
      return true
     })

    }
    }

*/

    return (
      <Router createReducer={this.reducerCreate}>

        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
            <Scene initial key='login' component={Login} title='Login' hideNavBar panHandlers={null} />
            <Scene key='TouchTOU' component={TouchTOU} title='Touch TOU' hideNavBar />
            <Scene key='Termsofuse' component={TermsofUse} title='Termsofuse page' hideNavBar />
            <Scene key='MyView' component={Webview} title='WebView page' hideNavBar />
            <Scene key='ErrorPage' component={ErrorScreen} title='Error page' hideNavBar />
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
            <Scene key='WelcomeDashBoard' component={DashBoard} title='Florida Blue' hideNavBar panHandlers={null} />
            <Scene key='Resources' component={Resources} title='Resource WebView' hideNavBar />
            <Scene key='Hsa' component={HSA} title='Health Savings Account Page' hideNavBar />
            <Scene key='SupportScreen' component={SupportScreen} title='Support Page' hideNavBar />
            <Scene key='MyIdCard' component={MyIdCard} title='MyIdCard Page' hideNavBar />
            <Scene key='Myplan' component={MyPlanScreen} title='MyPlan Page' hideNavBar />
            <Scene key='myplanbenefits' component={BenefitsScreen} title='MyPlanBenefits Page' hideNavBar />
            <Scene key='DoctorServices' component={DoctorServices} title='DoctorServices Page' hideNavBar />
            <Scene key='AdditionalServices' component={AdditionalBenefits} title='AdditionalBenefits Page' hideNavBar />
            <Scene key='DoctorList' component={DoctorList} title='OPD Doctor List Page' hideNavBar />
            <Scene key='AdvancedSearch' component={AdvancedSearch} title='OPD AdvancedSearch Page' hideNavBar />
            <Scene key='ProviderSearch' component={ProviderSearch} title='OPD ProviderSearch Page' hideNavBar />
            <Scene key='ProviderTypeInfo' component={ProviderTypeInfo} title='OPD ProviderTypeInfo Page' hideNavBar />
            <Scene key='ProviderMap' component={ProviderMap} title='Provider Map View Page' hideNavBar />
            <Scene key='DoctorDetail' component={DoctorDetail} title='Doctor Detail Page' hideNavBar />
            <Scene key='ProgramDetail' component={ProgramDetail} title='Program Detail Page' hideNavBar />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

NavigationRouter.propTypes = {
  currentScene: PropTypes.func,
  currentSceneValue: PropTypes.string,
  logoutUrl:PropTypes.string,
  attemptLogout:PropTypes.func,
  clearLogin:PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    currentSceneValue: state.login.currentSceneValue,
     logoutUrl: state.member.logoutUrl
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    currentScene: (currentSceneValue) => dispatch(LoginActions.currentScene(currentSceneValue)),
     clearLogin: () => dispatch(LoginActions.logout()),
      attemptLogout: (logoutUrl) => dispatch(LoginActions.logoutRequest(logoutUrl)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
