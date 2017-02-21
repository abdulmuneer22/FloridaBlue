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
  attemptSupportScreen :() => void
}

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
      alert('Please enter user name and password!')
    } else {
   // const { username, password } = this.state
      this.isAttempting = true
 // attempt a login - a saga is listening to pick it up from here.
      this.props.attemptLogin(username, password)
    }
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
      // Did the login attempt complete?
    console.log('I am receving new props' + newProps.responseURL)
    console.log('I am receving new smToken' + newProps.smToken)
    

    if (this.isAttempting && !newProps.fetching && newProps.error === null) {
      if (newProps.responseURL == 'login') {
        // we are displacing these action by this time we knew that member loged in success fully
        this.props.attemptMember()
        this.props.attemptSupportScreen()
        if(newProps.termsOfUse){
             NavigationActions.WelcomeDashBoard()
          }else{
            NavigationActions.Termsofuse()
          }
      } else {
        console.log('new props' + newProps.responseURL)
        NavigationActions.MyView({responseURL: newProps.responseURL})
      }
    }
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
              Non-Discrimination Notice
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
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://www.floridablue.com/general/contact-us'})}>
            <Text style={styles.popupchildText}>
              Need Help?
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
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://providersearch.floridablue.com/providersearch/pub/index.htm'})}>
            <Text style={styles.popupchildText}>
              Online Provider Directory
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
          <Icon name='chevron-right' size={12} color='black' />
          <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: 'https://consumer.websales.floridablue.com/?_ga=1.233631006.1688060624.1484756637'})}>
            <Text style={styles.popupchildText}>
              Shop
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  render () {
    return (
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error,
    responseURL: state.login.responseURL,
    smToken: state.login.smToken,
    termsOfUse : state.member.termsOfUse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
