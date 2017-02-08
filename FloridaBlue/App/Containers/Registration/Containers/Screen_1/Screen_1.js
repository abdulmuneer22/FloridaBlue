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
    fontWeight: '200',
  })
  .build();

class Screen_1 extends React.Component {
  constructor(props) {
    super(props)
  }

  
  _handleRegistration(){
    NavigationActions.screen_2()
  }


  /*
  _handleRegistration() {
    var contractNumber = this.props.contractNumber
    var firstName = this.props.firstName
    var lastName = this.props.lastName
    var dateOfBirth = this.props.dateOfBirth
    var zipCode = this.props.zipCode

    if (!(contractNumber && firstName && lastName && dateOfBirth && zipCode)) {
      alert("Please enter values in all fields")
    } else {
      this.props.verifyIdentification(contractNumber,firstName,lastName,dateOfBirth,zipCode)
    }
  }
  */

  _handleFindMemberId() {
    NavigationActions.memberid()
  }

  _handleBack() {
    NavigationActions.pop()
  }

  componentDidUpdate() {
    if(this.props.data) {
      var reasonCode = this.props.data.reasonCode
      console.log(reasonCode)

      if(reasonCode === '000') {
        NavigationActions.screen_2()
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Image source={Images.registrationStep1Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('personalInformation')}</Text>
          </View>
          {this.props.data && (this.props.data.reasonCode != null && this.props.data.reasonCode != '000') ? <View style={styles.messageView}>
            <View><Flb name="alert" color={Colors.snow} size={30}/></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.data.reasonDesc}</Text></View>
            </View>
            <View>
              <TouchableOpacity onPress={() => {this.props.handleChangeReasonCode({reasonCode: null, reasonDesc: null})}}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : <Text></Text>}
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='contractNumber'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeContractNumber}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.firstName.focus();
              }}
              placeholder={I18n.t('memberId')}
            />
          </View>
          <View style={styles.row}>
            <Text style={[styles.message, {fontSize: Fonts.size.regular}]}> {I18n.t('cantFindMemberId')}</Text>
          </View>
          <View style={styles.findItButton}>
            <TouchableOpacity onPress={() => {this._handleFindMemberId()}}>
              <Image source={Images.findItButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='firstName'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeFirstName}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.lastName.focus();
              }}
              placeholder={I18n.t('firstName')} />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='lastName'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeLastName}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.dateOfBirth.focus();
              }}
              placeholder={I18n.t('lastName')} />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='dateOfBirth'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeDateOfBirth}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.zipCode.focus();
              }}
              placeholder={I18n.t('dateOfBirth')} />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='zipCode'
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
              <TouchableOpacity onPress={() => {this._handleBack()}}>
                <Image source={Images.backButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => {this._handleRegistration()}}>
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

Screen_1.propTypes = {
  verifyIdentification: PropTypes.func,
  handleChangeContractNumber: PropTypes.func,
  handleChangeFirstName: PropTypes.func,
  handleChangeLastName: PropTypes.func,
  handleChangeDateOfBirth: PropTypes.func,
  handleChangeZipCode: PropTypes.func,
  handleChangeReasonCode: PropTypes.func,
  fetching: PropTypes.bool,
  contractNumber : PropTypes.string,
  firstName :PropTypes.string,
  lastName : PropTypes.string,
  dateOfBirth : PropTypes.string,
  zipCode : PropTypes.string,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.registration.fetching,
    contractNumber: state.registration.contractNumber,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    dateOfBirth:state.registration.dateOfBirth,
    zipCode:state.registration.zipCode,
    error: state.registration.error,
    data :state.registration.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyIdentification:(contractNumber,firstName,lastName,dateOfBirth,zipCode) => dispatch(RegistrationActions.registrationRequest(contractNumber,firstName,lastName,dateOfBirth,zipCode)),
    handleChangeContractNumber:(contractNumber) => dispatch(RegistrationActions.changeContractNumber(contractNumber)),
    handleChangeFirstName:(firstName) => dispatch(RegistrationActions.changeFirstName(firstName)),
    handleChangeLastName:(lastName) => dispatch(RegistrationActions.changeLastName(lastName)),
    handleChangeDateOfBirth:(dateOfBirth) => dispatch(RegistrationActions.changeDateOfBirth(dateOfBirth)),
    handleChangeZipCode:(zipCode) => dispatch(RegistrationActions.changeZipCode(zipCode)),
    handleChangeReasonCode:(data) => dispatch(RegistrationActions.changeReasonCode(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_1)
