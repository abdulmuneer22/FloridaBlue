import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native'

import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../../Redux/LoginRedux'
import MemberActions from '../../Redux/MemberRedux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import SupportActions from '../../Redux/SupportRedux'
import styles from './LoginStyle'
import { Images, Metrics, Colors } from '../../Themes'
// import {FlbIcon} from'./FlbIcon'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const goToWebView = () => NavigationActions.MyView({text: 'Hello World!'})
var logo = require('./logo.png')
const window = Dimensions.get('window')

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void,
  responseURL : string,
  smToken : string,
  termsOfUse : boolean,
  attemptMyPlan :() => void,
  attemptMember :() => void,
  attemptSupportScreen :() => void,
  merror :string
}

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class Login extends Component {
  props: LoginScreenProps
  isAttempting : boolean

  constructor () {
    super()
    this.state = {
      username: '',
      password: '',
      modalVisible: false
    }

    this.isAttempting = false
  }

  _handleLogin () {
    var username = this.state.username
    var password = this.state.password

    if (!this.state.username | !this.state.password) {
      alert('Please enter User ID and Password!')
    } else {
   // const { username, password } = this.state
      this.isAttempting = true
 // attempt a login - a saga is listening to pick it up from here.
      this.props.attemptLogin(username, password)
    }
  }

  componentDidMount() {
    //after registration fire login for auto login
    if(this.props.username && this.props.password){
        this.props.attemptLogin(this.props.username,this.props.password)
    }
  }

componentWillReceiveProps(newProps) {
  this.forceUpdate()
  // Did the login attempt complete?

  console.log('I am receving new props' + newProps.responseURL)
  console.log('I am receving new smToken' + newProps.smToken)
  var responseURL = newProps.responseURL;

  if (this.isAttempting && !newProps.fetching && newProps.error === null) {
    // login path
    if (responseURL== 'login') {
      if (!newProps.mfetching) {
        if (!newProps.merror) {
          if (newProps.termsOfUse) {
            NavigationActions.WelcomeDashBoard()
          } else {
            NavigationActions.Termsofuse()
          }
        } else {
          NavigationActions.ErrorPage()
        }
      }
    // redirect path
    } else if (responseURL.includes("updateSecurityHintsAnswers")) {
                NavigationActions.screen_4();
    } else if (responseURL.includes('mob/error/accessdenied')) {
             this.props.attemptLogout()
              alert('User is not authorized')
    } else if (responseURL.includes('apsparam=usrlocked')) {
               alert('Your account is disabled. For assistance, please call our Member Help Line:1-800-FLA-BLUE (352-2583)TTY / TDD Call 711')
    }else {
      NavigationActions.MyView({
        responseURL: newProps.responseURL + '?source=mobile'
      })
    }

  }

  //end of IF condition
}






  _moreInfo () {
    return (
      <View style={styles.informationPopup}>
        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/general/web-accessibility'})}>
            <Text style={styles.popupchildText}>
              Accessibility
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/ndnotice'})}>
            <Text style={styles.popupchildText}>
              Non-Discrimination
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/terms-of-use'})}>
            <Text style={styles.popupchildText}>
              Terms of Use
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/internet-privacy-statement'})}>
            <Text style={styles.popupchildText}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://providersearch.floridablue.com/providersearch/pub/index.htm'})}>
            <Text style={styles.popupchildText}>
              Unsecured OPD
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/general/contact-us'})}>
            <Text style={styles.popupchildText}>
              Support
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/'})}>
            <Text style={styles.popupchildText}>
              Floridablue.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/languageservices?_ga=1.102498241.1713434787.1485183405#es'})}>
            <Text style={styles.popupchildText}>
              Language Services
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    var transparent
    if(this.props.mfetching){
         transparent = 0.5
    } else {
        transparent = 1
    }
    return (
     <View  style={{position:'absolute',
                    top:0,
                    left:0,
                    width:window.width,
                    height:window.height,
                    opacity:transparent,
                    backgroundColor:Colors.snow
                    }} >

      <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />

        <ScrollView style={styles.container}>

          <View style={styles.logoView}>
            <Image source={Images.clearLogo} style={styles.logo} />
          </View>


          <View style={styles.form}>
            <View style={styles.row}>
              <TextInput
                ref='username'
                style={styles.textInput}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
                underlineColorAndroid={Colors.coal}
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder={I18n.t('username')} />
            </View>

            <View style={styles.row}>
              <TextInput
                ref='password'
                style={styles.textInput}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                underlineColorAndroid={Colors.coal}
                placeholder={I18n.t('password')} />
            </View>
             {this.props.mfetching ? <SingleColorSpinner strokeColor={Colors.flBlue.ocean}  style={styles.spinnerView}/>:<View></View>}
            <View style={styles.row}>
              <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://registration-stga.bcbsfl.com/ecir/public/MemberFPSSelect.do'})}>
                <Text style={styles.link}>{I18n.t('forgotPassword')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity onPress={() => { this._handleLogin() }}>
              <Image source={Images.loginButtonGreen} />
            </TouchableOpacity>
          </View>
          <View style={[styles.row, {backgroundColor: 'transparent'}]}>
            <TouchableOpacity onPress={() => NavigationActions.screen_1()}>
              <Text style={styles.link}>{I18n.t('signUp')}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>


        {this.state.modalVisible && this._moreInfo()}

        <View style={styles.footer}>
          <View>
            <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              if (this.state.modalVisible === true) {
                this.setState({modalVisible: false})
              } else {
                this.setState({modalVisible: true})
              }
            }}>
              <Image source={Images.infoIcon} />
            </TouchableOpacity>
          </View>
        </View>


    </View>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    mfetching: state.member.fetching,
    error: state.login.error,
    responseURL: state.login.responseURL,
    smToken: state.login.smToken,
    termsOfUse: state.member.termsOfUse,
    merror : state.member.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest()),
    attemptLogout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
