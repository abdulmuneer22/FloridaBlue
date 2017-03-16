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
import styles from './Screen_1Style'

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

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.build()

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

    var contractNumber = this.props.contractNumber
    var firstName = this.props.firstName
    var lastName = this.props.lastName
    var dateOfBirth = this.props.dateOfBirth
    var zipCode = this.props.zipCode

    var dateTest = new RegExp('^\\d{2}\/\\d{2}\/\\d{4}$')
    if (!(contractNumber && firstName && lastName && dateOfBirth && zipCode)) {
      this.props.handleChangeIdentificationStatus('999')
      this.props.handleChangeIdentificationStatusMessage('Please enter values in all fields')
    } else if(!dateTest.test(dateOfBirth)) {
      this.props.handleChangeIdentificationStatus('999')
      this.props.handleChangeIdentificationStatusMessage('Please enter a valid date - MM/DD/YYYY')
    } else {
      this.props.verifyIdentification(this.props)
    }
  }

  componentDidMount () {
    this.props.handleChangeIdentificationStatus(null)
    this.props.handleChangeIdentificationStatusMessage(null)
  }

  componentDidUpdate () {
    if (this.props.identificationStatus) {
      var status = this.props.identificationStatus

      if (status === '000') {
        this.props.handleChangeIdentificationStatus(null)
        console.tron.log('Navigating to Screen 2')
        NavigationActions.screen_2()
      }
    }
  }

  _handleFindMemberId () {
    Keyboard.dismiss()
    NavigationActions.memberid()
  }

  _handleBack () {
    Keyboard.dismiss()
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps>
          <Image source={Images.registrationStep1Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('personalInformation')}</Text>
          </View>
          {this.props.identificationStatus && (this.props.identificationStatus != null && this.props.identificationStatus != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.identificationStatusMessage}</Text></View>
            </View>
            <View>
              <TouchableOpacity onPress={() => { this.props.handleChangeIdentificationStatus(null) }}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : <Text />}
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='contractNumber'
              value={this.props.contractNumber}
              style={styles.textfieldWithFloatingLabel}
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
            <Text style={[styles.message, {fontSize: Fonts.size.regular}]}> {I18n.t('cantFindMemberId')}</Text>
          </View>
          <View style={styles.findItButton}>
            <TouchableOpacity onPress={() => { this._handleFindMemberId() }}>
              <Image source={Images.findItButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='firstName'
              value={this.props.firstName}
              style={styles.textfieldWithFloatingLabel}
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
                <Image source={Images.backButton} />
              </TouchableOpacity>
            </View>
            {this.props.fetching ? <SingleColorSpinner strokeColor={Colors.flBlue.ocean} style={styles.spinnerView} /> :
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleNext() }}>
                <Image source={Images.nextButtonGreen} />
              </TouchableOpacity>
            </View>}
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
  error: PropTypes.string
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
    handleChangeIdentificationStatusMessage: (data) => dispatch(RegistrationActions.changeIdentificationStatusMessage(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_1)
