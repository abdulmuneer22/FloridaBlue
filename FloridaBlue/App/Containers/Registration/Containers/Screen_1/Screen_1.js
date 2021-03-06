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
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HTMLView from 'react-native-htmlview'
import styles from './Screen_1Style'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RegistrationActions from '../../../../Redux/RegistrationRedux'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

let urlConfig = require('../../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withPlaceholderTextColor(Colors.steel)
  .withAllowFontScaling(false)
  .withFloatingLabelFont({
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025,
   // fontStyle: 'italic',
    fontWeight: '200'
  })
  .build()

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

class Screen_1 extends React.Component {
  constructor (props) {
    super(props)
  }

  /*
  _handleNext () {
    NavigationActions.screen_2()
  }
  */

  _handleNext () {
    Keyboard.dismiss()

    let contractNumber = this.props.contractNumber
    let firstName = this.props.firstName
    let lastName = this.props.lastName
    let dateOfBirth = this.props.dateOfBirth
    let zipCode = this.props.zipCode

    let dateTest = new RegExp('^\\d{2}\/\\d{2}\/\\d{4}$')
    let zipCodeTest = new RegExp('^(^\\d{5}$)|(^\\d{5}-\\d{4}$)$')
    if (!(contractNumber && firstName && lastName && dateOfBirth && zipCode)) {
      this.props.handleChangeIdentificationStatus('999')
      this.props.handleChangeIdentificationStatusMessage('Please enter all information.')
    } else if (!dateTest.test(dateOfBirth)) {
      this.props.handleChangeIdentificationStatus('999')
      this.props.handleChangeIdentificationStatusMessage('Please enter a valid date - MM/DD/YYYY')
    } else if (!zipCodeTest.test(zipCode)) {
      this.props.handleChangeIdentificationStatus('999')
      this.props.handleChangeIdentificationStatusMessage('Please enter a valid zip code.')
    } else {
      this.props.verifyIdentification(this.props)
    }
  }

  componentDidMount () {
    this.props.requestClear()
    this.props.handleChangeIdentificationStatus(null)
    this.props.handleChangeIdentificationStatusMessage(null)
    gaTracker.trackScreenView('Registration Screen One')
  }

  componentDidUpdate () {
    if (this.props.identificationStatus) {
      var status = this.props.identificationStatus

      if (status === '000') {
        this.props.handleChangeIdentificationStatus(null)
        NavigationActions.screen_2()
      }
    }
  }

  _handleFindMemberId () {
    Keyboard.dismiss()
    NavigationActions.memberid()
  }

  _handleBack () {
    this.props.requestClear()
    Keyboard.dismiss()
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentInset={null}>
          <Image source={Images.registrationStep1Hdr} style={styles.headerImage} >
            <Text allowFontScaling={false} style={styles.headerTextStyle}>{'Let\'s Get Started!'}</Text>
          </Image>

          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.heading}>{I18n.t('personalInformation')}</Text>
          </View>
          {this.props.identificationStatus && (this.props.identificationStatus != null && this.props.identificationStatus != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View>
                <HTMLView value={'<p>' + this.props.identificationStatusMessage + '</P>'} stylesheet={HtMLstyles} />
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => { this.props.handleChangeIdentificationStatus(null) }}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : null}
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='contractNumber'
              value={this.props.contractNumber}
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeContractNumber}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.firstName.focus()
              }}

              placeholder={I18n.t('memberId')}
            />
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={[styles.findMessage, {fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}]}> {I18n.t('cantFindMemberId')}</Text>
          </View>
          <View style={styles.findItButton}>
            <TouchableOpacity onPress={() => { this._handleFindMemberId() }}>
              <Image style={{width: Metrics.screenWidth * 0.35,
                borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                height: Metrics.screenHeight * 0.055}}
                source={Images.findItButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='firstName'
              value={this.props.firstName}
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeFirstName}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.lastName.focus()
              }}
              placeholder={I18n.t('firstName')} />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='lastName'
              value={this.props.lastName}
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeLastName}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.dateOfBirth.focus()
              }}
              placeholder={I18n.t('lastName')} />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='dateOfBirth'
              value={this.props.dateOfBirth}
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeDateOfBirth}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.zipCode.focus()
              }}
              placeholder={I18n.t('dateOfBirth')} />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='zipCode'
              value={this.props.zipCode}
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                flex: 1,
                color: Colors.flBlue.anvil,
                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
              }}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeZipCode}
              underlineColorAndroid={Colors.coal}
              placeholder={I18n.t('zipCode')} />
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => { this._handleBack() }}>
                <Image style={{width: Metrics.screenWidth * 0.35,
                  borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                  height: Metrics.screenHeight * 0.055}}
                  source={Images.backButton} />
              </TouchableOpacity>
            </View>
            {this.props.fetching ? <SingleColorSpinner strokeColor={Colors.flBlue.ocean} style={styles.spinnerView} />
            : <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleNext() }}>
                <Image source={Images.nextButtonGreen}
                  style={{width: Metrics.screenWidth * 0.35,
                    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                    height: Metrics.screenHeight * 0.055}} />
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

Screen_1.propTypes = {
  verifyIdentification: PropTypes.func,
  handleChangeContractNumber: PropTypes.func,
  handleChangeFirstName: PropTypes.func,
  handleChangeLastName: PropTypes.func,
  handleChangeDateOfBirth: PropTypes.func,
  handleChangeZipCode: PropTypes.func,
  handleChangeIdentificationStatus: PropTypes.func,
  handleChangeIdentificationStatusMessage: PropTypes.func,
  fetching: PropTypes.bool,
  contractNumber: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  zipCode: PropTypes.string,
  error: PropTypes.string,
  requestClear: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    fetching: state.registration.fetching,
    contractNumber: state.registration.contractNumber,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    dateOfBirth: state.registration.dateOfBirth,
    zipCode: state.registration.zipCode,
    identificationStatus: state.registration.identificationStatus,
    identificationStatusMessage: state.registration.identificationStatusMessage,
    error: state.registration.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyIdentification: (data) => dispatch(RegistrationActions.sendIdentificationRequest(data)),
    handleChangeContractNumber: (contractNumber) => dispatch(RegistrationActions.changeContractNumber(contractNumber)),
    handleChangeFirstName: (firstName) => dispatch(RegistrationActions.changeFirstName(firstName)),
    handleChangeLastName: (lastName) => dispatch(RegistrationActions.changeLastName(lastName)),
    handleChangeDateOfBirth: (dateOfBirth) => dispatch(RegistrationActions.changeDateOfBirth(dateOfBirth)),
    handleChangeZipCode: (zipCode) => dispatch(RegistrationActions.changeZipCode(zipCode)),
    handleChangeIdentificationStatus: (data) => dispatch(RegistrationActions.changeIdentificationStatus(data)),
    handleChangeIdentificationStatusMessage: (data) => dispatch(RegistrationActions.changeIdentificationStatusMessage(data)),
    requestClear: () => dispatch(RegistrationActions.clearRegistration())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_1)
