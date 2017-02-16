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
import { MKTextField, MKColor } from 'react-native-material-kit'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Screen_3Style'

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

class Screen_3 extends React.Component {

  _handleBack () {
    NavigationActions.pop()
  }

  _handleNext () {
    NavigationActions.screen_4()
  }

  /*
  _handleNext () {
    if (!(phoneNumber && email && confirmEmail && createUserId && password && confirmPassword && communicationsElectronically)) {
      alert("Please enter values in all fields")
    } else {
      this.props.verifyPersonalInformation(phoneNumber, email, confirmEmail, createUserId, password, confirmPassword, communicationsElectronically)
    }
    this.props.verifyPersonalInformation(this.props)
  }

  componentDidUpdate () {
    if (this.props.data) {
      var reasonCode = this.props.data.reasonCode
      console.log(reasonCode)

      if (reasonCode === '000') {
        NavigationActions.screen_4()
      }
    }
  }
  */

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Image source={Images.registrationStep3Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('verifyYourDevice')}</Text>
          </View>
          {this.props.data && (this.props.data.reasonCode != null && this.props.data.reasonCode != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.data.reasonDesc}</Text></View>
            </View>
          </View> : <Text />}
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='enterCode'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='numbers-and-punctuation'
              returnKeyType='done'
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
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleNext() }}>
                <Image source={Images.nextButtonGreen} />
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

Screen_3.propTypes = {
  verifyRegistrationCode: PropTypes.func,
  handleChangeEnterCode: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    enterCode: state.registration.enterCode,
    contractNumber: state.registration.contractNumber,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    dateOfBirth: state.registration.dateOfBirth,
    zipCode: state.registration.zipCode,
    fetching: state.registration.fetching,
    error: state.registration.error,
    data: state.registration.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyRegistrationCode: (data) => dispatch(RegistrationActions.sendRegistrationCodeRequest(data)),
    handleChangeEnterCode: (enterCode) => dispatch(RegistrationActions.changeEnterCode(enterCode))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_3)
