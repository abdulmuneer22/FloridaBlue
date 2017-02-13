// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
  Image,
  KeyboardAvoidingView,
  ScrollView,
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
import { MKTextField, MKColor, MKCheckbox, setTheme } from 'react-native-material-kit'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Screen_2Style'

import Flb from '../../../../Themes/FlbIcon'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
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

setTheme({checkboxStyle: {
  fillColor: Colors.flBlue.ocean,
  borderOnColor: Colors.flBlue.ocean,
  borderOffColor: Colors.flBlue.ocean
}})

class Screen_2 extends React.Component {

  _handleBack () {
    NavigationActions.pop()
  }

  _handleNext () {
    NavigationActions.screen_3()
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Image source={Images.registrationStep2Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('createUserIdAndPassword')}</Text>
          </View>
          {this.props.data && (this.props.data.reasonCode != null || this.props.data.reasonCode != '000' || this.props.data.reasonCode != '999') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.data.reasonDesc}</Text></View>
            </View>
          </View> : <Text />}
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='phoneNumber'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='numbers-and-punctuation'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangePhoneNumber}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.email.focus()
              }}
              placeholder={I18n.t('phoneNumber')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='email'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='email-address'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeEmail}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.confirmEmail.focus()
              }}
              placeholder={I18n.t('email')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='confirmEmail'
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
              placeholder={I18n.t('confirmEmail')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='createUserId'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeCreateUserId}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.password.focus()
              }}
              placeholder={I18n.t('createUserId')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='password'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.props.handleChangePassword}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.confirmPassword.focus()
              }}
              placeholder={I18n.t('password')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='confirmPassword'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.props.handleChangeConfirmPassword}
              underlineColorAndroid={Colors.coal}
              placeholder={I18n.t('confirmPassword')}
            />
          </View>
          <View style={styles.row}>
            <View style={{height: Metrics.doubleBaseMargin * 4, backgroundColor: Colors.flBlue.grey1}}>
              <MKCheckbox
                ref='receiveCommunicationsElectronically'
                onCheckedChange={() => {
                  console.log(this)
                  var checked = this.refs.receiveCommunicationsElectronically.state.checked
                  this.props.handleChangeReceiveCommunicationsElectronically(checked)
                }
                }
              />
            </View>
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => { this._handleBack() }}>
                <Image source={Images.backButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleNext() }}>
                <Image source={Images.nextButton} />
              </TouchableOpacity>
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

Screen_2.propTypes = {
  handleChangePhoneNumber: PropTypes.func,
  handleChangeEmail: PropTypes.func,
  handleChangeConfirmEmail: PropTypes.func,
  handleChangeCreateUserId: PropTypes.func,
  handleChangePassword: PropTypes.func,
  handleChangeConfirmPassword: PropTypes.func,
  handleChangeReceiveCommunicationsElectronically: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    phoneNumber: state.registration.phoneNumber,
    email: state.registration.email,
    confirmEmail: state.registration.confirmEmail,
    createUserId: state.registration.createUserId,
    password: state.registration.password,
    confirmPassword: state.registration.confirmPassword,
    receiveCommunicationsElectronically: state.registration.receiveCommunicationsElectronically,
    fetching: state.registration.fetching,
    error: state.registration.error,
    data: state.registration.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangePhoneNumber: (phoneNumber) => dispatch(RegistrationActions.changePhoneNumber(phoneNumber)),
    handleChangeEmail: (email) => dispatch(RegistrationActions.changeEmail(email)),
    handleChangeConfirmEmail: (confirmEmail) => dispatch(RegistrationActions.changeConfirmEmail(confirmEmail)),
    handleChangeCreateUserId: (createUserId) => dispatch(RegistrationActions.changeCreateUserId(createUserId)),
    handleChangePassword: (password) => dispatch(RegistrationActions.changePassword(password)),
    handleChangeConfirmPassword: (confirmPassword) => dispatch(RegistrationActions.changeConfirmPassword(confirmPassword)),
    handleChangeReceiveCommunicationsElectronically: (receiveCommunicationsElectronically) => dispatch(RegistrationActions.changeReceiveCommunicationsElectronically(receiveCommunicationsElectronically))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_2)
