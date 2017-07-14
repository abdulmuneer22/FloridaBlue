// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
  StyleSheet,
  Button,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { MKTextField, MKColor, MKCheckbox, MKSpinner, setTheme } from 'react-native-material-kit'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './Screen_2Style'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RegistrationActions from '../../../../Redux/RegistrationRedux'
import HTMLView from 'react-native-htmlview'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withPlaceholderTextColor(Colors.steel)
  .withAllowFontScaling(false)
  .withFloatingLabelFont({
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025,
   // fontStyle: 'italic',
    fontWeight: '200',
    width: window.width
  })
  .build()

setTheme({checkboxStyle: {
  fillColor: Colors.flBlue.ocean,
  borderOnColor: Colors.flBlue.ocean,
  borderOffColor: Colors.flBlue.ocean
}})

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.build()
const HtMLstyles = StyleSheet.create({
  p: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025

  },
  a: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025,
    fontWeight: '300',
    textDecorationLine: 'underline'
  }
})
class Screen_2 extends React.Component {
  _handleBack () {
    Keyboard.dismiss()
    NavigationActions.pop()
  }

  _handleNext () {
    Keyboard.dismiss()

    let email = this.props.email
    let confirmEmail = this.props.confirmEmail
    let createUserId = this.props.createUserId
    let password = this.props.password
    let confirmPassword = this.props.confirmPassword

    if (!(createUserId && password && confirmPassword)) {
      this.props.handleChangePersonalInformationStatus('999')
      this.props.handleChangePersonalInformationStatusMessage('Please enter all information.')
    } else if (confirmPassword != password) {
      this.props.handleChangePersonalInformationStatus('999')
      this.props.handleChangePersonalInformationStatusMessage('Your passwords do not match. Please enter matching passwords.')
    } else if (!this.props.emailVerified && confirmEmail != email) {
      this.props.handleChangePersonalInformationStatus('999')
      this.props.handleChangePersonalInformationStatusMessage('Your emails do not match. Please enter the correct email.')
    } else {
      this.props.verifyPersonalInformation(this.props)
    }
  }

  _handleReadMore () {
    NavigationActions.ReadMore()
  }

  componentDidMount () {
    // Set to null initially
    this.props.handleChangePersonalInformationStatus(null)
    this.props.handleChangePersonalInformationStatusMessage(null)
    // Set for true by default
    this.props.handleChangeEmailUpdated(true)
    gaTracker.trackScreenView('Registration Screen Two')
  }

  componentDidUpdate () {
    if (this.props.personalInformationStatus) {
      var status = this.props.personalInformationStatus

      if (status === '000') {
        // Reset to null
        this.props.handleChangePersonalInformationStatus(null)
        this.props.handleChangePersonalInformationStatusMessage(null)
        NavigationActions.screen_3()
      }
    }
  }

  _handleUserIdHint () {
    Keyboard.dismiss()
    NavigationActions.useridhint()
  }

  _handlePasswordHint () {
    Keyboard.dismiss()
    NavigationActions.passwordHint()
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentInset={null}>
          <Image source={Images.registrationStep2Hdr} style={styles.headerImage} >
            <Text allowFontScaling={false} style={styles.headerTextStyle}>Set Up Your Account</Text>
          </Image>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.heading}>{I18n.t('createUserIdAndPassword')}</Text>
            <Text allowFontScaling={false} style={styles.subHeaderTextStyle}>{I18n.t('createUserIdAndPasswordInstruction')}</Text>
          </View>

          {this.props.personalInformationStatus && (this.props.personalInformationStatus != null && this.props.personalInformationStatus != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View>
                <HTMLView value={'<p>' + this.props.personalInformationStatusMessage + '</P>'} stylesheet={HtMLstyles} />
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => { this.props.handleChangePersonalInformationStatus(null) }}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : <Text />}
          {false ? <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='phoneNumber'
              value={this.props.phoneNumber}
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.ocean,
                    // marginLeft:100,
                    // marginRight:-100,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
              }}
              keyboardType='numbers-and-punctuation'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangePhoneNumber}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                if (this.props.emailVerified) {
                  this.refs.createUserId.focus()
                } else {
                  this.refs.email.focus()
                }
              }}
              placeholder={I18n.t('phoneNumber')}
            />
          </View> : null}
          { !this.props.emailVerified
            ? <View>
              <View style={styles.row}>
                <TextfieldWithFloatingLabel
                  ref='email'
                  style={styles.textfieldWithFloatingLabel}
                  keyboardType='email-address'
                  textInputStyle={{
                    flex: 1,
                    color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
                  editable={!this.props.emailVerified}
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.props.handleChangeEmail}
                  underlineColorAndroid={Colors.coal}
                  onSubmitEditing={(event) => {
                    this.refs.confirmEmail.focus()
                  }}
                  placeholder={I18n.t('email')} />
              </View>
              <View style={styles.row}>
                <TextfieldWithFloatingLabel
                  ref='confirmEmail'
                  value={this.props.confirmEmail}
                  textInputStyle={{
                    flex: 1,
                    color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
                  style={styles.textfieldWithFloatingLabel}
                  keyboardType='email-address'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.props.handleChangeConfirmEmail}
                  underlineColorAndroid={Colors.coal}
                  onSubmitEditing={(event) => {
                    this.refs.createUserId.focus()
                  }}
                  placeholder={I18n.t('confirmEmail')} />
              </View>
            </View>
            : <View style={styles.row}>
              <TextfieldWithFloatingLabel
                ref='email'
                value={this.props.email}
                style={styles.textfieldWithFloatingLabel}
                keyboardType='email-address'
                editable={!this.props.emailVerified}
                textInputStyle={{
                  flex: 1,
                  color: Colors.flBlue.anvil,
                  fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                }}
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                editable={false}
                underlineColorAndroid={Colors.coal}
                onSubmitEditing={(event) => {
                  this.refs.confirmEmail.focus()
                }}
                placeholder={I18n.t('email')} />
            </View> }
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='createUserId'
              value={this.props.createUserId}
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              autoCorrect={false}
              onChangeText={this.props.handleChangeCreateUserId}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.password.focus()
              }}
              placeholder={I18n.t('createUserId')} />
            <Text allowFontScaling={false} style={styles.hintLink} onPress={() => { this._handleUserIdHint() }}>Hints</Text>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='password'
              value={this.props.password}
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              password
              onChangeText={this.props.handleChangePassword}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.confirmPassword.focus()
              }}
              placeholder={I18n.t('password')}
            />
            <Text allowFontScaling={false} style={styles.hintLink} onPress={() => { this._handlePasswordHint() }}>Hints</Text>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='confirmPassword'
              value={this.props.confirmPassword}
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              autoCorrect={false}
              password
              onChangeText={this.props.handleChangeConfirmPassword}
              underlineColorAndroid={Colors.coal}
              placeholder={I18n.t('confirmPassword')}
            />
          </View>
          {this.props.showCommElect ? <View style={styles.checkboxRow}>
            <View style={styles.checkbox}>
              <MKCheckbox
                ref='commElect'
                checked={this.props.commElect}
                onCheckedChange={() => {
                    // Set to the opposite value using !
                  this.props.handleChangeCommElect(!this.props.commElect)
                }
                }
              />
            </View>
            <View style={styles.checkboxMessageView}>
              <Text allowFontScaling={false} style={styles.checkboxMessageText}>{I18n.t('commElect')}</Text>
              <Text allowFontScaling={false} style={styles.checkboxMessageHyperlink} onPress={() => { this._handleReadMore() }}>Read More</Text>

            </View>
          </View> : null}
          <View style={styles.buttonRow}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => { this._handleBack() }}>
                <Image source={Images.backButton}
                  style={{width: Metrics.screenWidth * 0.35,
                    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                    height: Metrics.screenHeight * 0.055}} />
              </TouchableOpacity>
            </View>
            {this.props.fetching ? <SingleColorSpinner strokeColor={Colors.flBlue.ocean} style={styles.spinnerView} />
            : <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleNext() }}>
                <Image source={Images.nextButtonGreen}
                  style={{width: Metrics.screenWidth * 0.35,
                    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                    height: Metrics.screenHeight * 0.058}} />
              </TouchableOpacity>
            </View>}
          </View>
          <View style={styles.row}>
            <View>
              <Text allowFontScaling={false} style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

Screen_2.propTypes = {
  verifyPersonalInformation: PropTypes.func,
  handleChangePhoneNumber: PropTypes.func,
  handleChangeEmail: PropTypes.func,
  handleChangeConfirmEmail: PropTypes.func,
  handleChangeEmailUpdated: PropTypes.func,
  handleChangeCreateUserId: PropTypes.func,
  handleChangePassword: PropTypes.func,
  handleChangeConfirmPassword: PropTypes.func,
  handleChangeCommElect: PropTypes.func,
  handleChangePersonalInformationStatus: PropTypes.func,
  handleChangePersonalInformationStatusMessage: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    contractNumber: state.registration.contractNumber,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    dateOfBirth: state.registration.dateOfBirth,
    zipCode: state.registration.zipCode,
    phoneNumber: state.registration.phoneNumber,
    emailVerified: state.registration.emailVerified,
    email: state.registration.email,
    confirmEmail: state.registration.confirmEmail,
    emailUpdated: state.registration.emailUpdated,
    createUserId: state.registration.createUserId,
    password: state.registration.password,
    confirmPassword: state.registration.confirmPassword,
    commElect: state.registration.commElect,
    token: state.registration.token,
    showCommElect: state.registration.showCommElect,
    fetching: state.registration.fetching,
    personalInformationStatus: state.registration.personalInformationStatus,
    personalInformationStatusMessage: state.registration.personalInformationStatusMessage,
    error: state.registration.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyPersonalInformation: (data) => dispatch(RegistrationActions.sendPersonalInformationRequest(data)),
    handleChangePhoneNumber: (phoneNumber) => dispatch(RegistrationActions.changePhoneNumber(phoneNumber)),
    handleChangeEmail: (email) => dispatch(RegistrationActions.changeEmail(email)),
    handleChangeConfirmEmail: (confirmEmail) => dispatch(RegistrationActions.changeConfirmEmail(confirmEmail)),
    handleChangeEmailUpdated: (emailUpdated) => dispatch(RegistrationActions.changeEmailUpdated(emailUpdated)),
    handleChangeCreateUserId: (createUserId) => dispatch(RegistrationActions.changeCreateUserId(createUserId)),
    handleChangePassword: (password) => dispatch(RegistrationActions.changePassword(password)),
    handleChangeConfirmPassword: (confirmPassword) => dispatch(RegistrationActions.changeConfirmPassword(confirmPassword)),
    handleChangeCommElect: (commElect) => dispatch(RegistrationActions.changeCommElect(commElect)),
    handleChangePersonalInformationStatus: (data) => dispatch(RegistrationActions.changePersonalInformationStatus(data)),
    handleChangePersonalInformationStatusMessage: (data) => dispatch(RegistrationActions.changePersonalInformationStatusMessage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_2)
