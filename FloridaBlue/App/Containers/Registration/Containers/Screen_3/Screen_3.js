// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Screen_3Style'

import Flb from '../../../../Themes/FlbIcon'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
import LoginActions from '../../../../Redux/LoginRedux'
import { connect } from 'react-redux'
import RegistrationActions from '../../../../Redux/RegistrationRedux'

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200'
  })
  .build()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.build()

class Screen_3 extends React.Component {
  _handleBack () {
    Keyboard.dismiss()
    NavigationActions.pop()
  }

  _handleNext () {
    Keyboard.dismiss()
    var enterCode = this.props.enterCode

    if (!enterCode) {
      alert('Please enter a registration code')
    } else {
      this.props.verifyRegistrationCode(this.props)
    }
  }

  componentDidMount () {
    this.props.handleChangeRegistrationCodeStatus(null)
    this.props.handleChangeRegisterUserStatus(null)
  }

  componentDidUpdate () {
    // Step 1 - Verify registration code
    if (this.props.registrationCodeStatus && this.props.registerUserStatus === null) {
      var registrationCodeStatus = this.props.registrationCodeStatus

      if (registrationCodeStatus === '000') {
      //  this.props.verifyRegisterUser(this.props)
      }
    }

    // Step 2 - Register user
    if (this.props.registrationCodeStatus && this.props.registerUserStatus) {
      var registrationCodeStatus = this.props.registrationCodeStatus
      var registerUserStatus = this.props.registerUserStatus

      if (registrationCodeStatus === '000' && registerUserStatus === '000') {
        this.props.handleChangeRegistrationCodeStatus(null)
        this.props.handleChangeRegisterUserStatus(null)
        console.tron.log('Auto login the user for secured services')
        this.props.attemptLogin(this.props.createUserId, this.props.password)
        console.tron.log('Navigating to Screen 4')
        if (this.props.loginError === null) {
            this.props.requestClear();
            NavigationActions.screen_4()
        }
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps>
          <Image source={Images.registrationStep3Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('verifyYourDevice')}</Text>
          </View>
          {this.props.registrationCodeStatus && (this.props.registrationCodeStatus != null && this.props.registrationCodeStatus != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.registrationCodeStatusMessage}</Text></View>
            </View>
            <View>
              <TouchableOpacity onPress={() => { this.props.handleChangeRegistrationCodeStatus(null) }}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : <Text />}
          {this.props.registerUserStatus && (this.props.registerUserStatus != null && this.props.registerUserStatus != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.registerUserStatusMessage}</Text></View>
            </View>
            <View>
              <TouchableOpacity onPress={() => { this.props.handleChangeRegisterUserStatus(null) }}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : <Text />}
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='enterCode'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='numbers-and-punctuation'
              returnKeyType='done'
              value={this.props.enterCode}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeEnterCode}
              underlineColorAndroid={Colors.coal}
              placeholder={I18n.t('enterCode')}
            />
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => { this._handleBack() }}>
                <Image source={Images.backButton} />
              </TouchableOpacity>
            </View>
            {this.props.fetching ? <SingleColorSpinner strokeColor={Colors.flBlue.ocean} style={styles.spinnerView} />
            : <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleNext() }}>
                <Image source={Images.nextButtonGreen} />
              </TouchableOpacity>
            </View>}
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.footerText}>{this.props.tempRegCode}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

Screen_3.propTypes = {
  verifyRegistrationCode: PropTypes.func,
  verifyRegisterUser: PropTypes.func,
  handleChangeEnterCode: PropTypes.func,
  handleChangeRegistrationCodeStatus: PropTypes.func,
  handleChangeRegistrationCodeStatusMessage: PropTypes.func,
  handleChangeRegisterUserStatus: PropTypes.func,
  handleChangeRegisterUserStatusMessage: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string,
  loginError: PropTypes.string,
  attemptLogin: PropTypes.func,
  requestClear :PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    enterCode: state.registration.enterCode,
    tempRegCode: state.registration.tempRegCode,
    contractNumber: state.registration.contractNumber,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    dateOfBirth: state.registration.dateOfBirth,
    zipCode: state.registration.zipCode,
    emailVerified: state.registration.emailVerified,
    email: state.registration.email,
    confirmEmail: state.registration.confirmEmail,
    createUserId: state.registration.createUserId,
    password: state.registration.password,
    confirmPassword: state.registration.confirmPassword,
    commElect: state.registration.commElect,
    token: state.registration.token,
    registrationCodeStatus: state.registration.registrationCodeStatus,
    registrationCodeStatusMessage: state.registration.registrationCodeStatusMessage,
    registerUserStatus: state.registration.registerUserStatus,
    registerUserStatusMessage: state.registration.registerUserStatusMessage,
    fetching: state.registration.fetching,
    error: state.registration.error,
    loginError: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyRegistrationCode: (data) => dispatch(RegistrationActions.sendRegistrationCodeRequest(data)),
    verifyRegisterUser: (data) => dispatch(RegistrationActions.registerUserRequest(data)),
    handleChangeEnterCode: (enterCode) => dispatch(RegistrationActions.changeEnterCode(enterCode)),
    handleChangeRegistrationCodeStatus: (data) => dispatch(RegistrationActions.changeRegistrationCodeStatus(data)),
    handleChangeRegisterUserStatus: (data) => dispatch(RegistrationActions.changeRegisterUserStatus(data)),
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    requestClear:()=>dispatch(RegistrationActions.clearRegistration())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_3)
