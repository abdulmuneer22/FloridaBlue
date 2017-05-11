// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableHighlight
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
import styles from './Screen_4Style'

import Flb from '../../../../Themes/FlbIcon'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RegistrationActions from '../../../../Redux/RegistrationRedux'

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withPlaceholderTextColor(Colors.steel)
  .withFloatingLabelFont({
    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025,
   // fontStyle: 'italic',
    fontWeight: '200'
  })
  .build()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.build()

class Screen_4 extends React.Component {
  _handleBack () {
    Keyboard.dismiss()
    NavigationActions.pop()
  }

  _handleNext () {
    Keyboard.dismiss()

    var securityHint1 = this.props.securityHint1
    var securityAnswer1 = this.props.securityAnswer1
    var securityHint2 = this.props.securityHint2
    var securityAnswer2 = this.props.securityAnswer2
    var securityHint3 = this.props.securityHint3
    var securityAnswer3 = this.props.securityAnswer3

    if (!(securityHint1 && securityAnswer1 && securityHint2 && securityAnswer2 && securityHint3 && securityAnswer3)) {
      this.props.handleChangeSecurityHintsStatus('999')
      this.props.handleChangeSecurityHintsStatusMessage('Please enter all information.')
    } else if (securityHint1.length < 4 || securityHint2.length < 4 || securityHint3.length < 4) {
      this.props.handleChangeSecurityHintsStatus('999')
      this.props.handleChangeSecurityHintsStatusMessage('All hints must be at least four characters in length.')
    } else if (securityAnswer1.length < 3 || securityAnswer2.length < 3 || securityAnswer3.length < 3) {
      this.props.handleChangeSecurityHintsStatus('999')
      this.props.handleChangeSecurityHintsStatusMessage('All answers must be at least three characters in length.')
    } else {
      this.props.verifySecurityHints(this.props)
    }
  }

  _handleSecurityHint () {
    Keyboard.dismiss()
    NavigationActions.securityHint()
  }

  componentDidMount () {
    this.props.handleChangeSecurityHintsStatus(null)
    if (this.props && this.props.username) {
      var username = this.props.username
      this.props.handleChangeCreateUserId(username)
    }
  }

  componentDidUpdate () {
    if (this.props.securityHintsStatus) {
      var status = this.props.securityHintsStatus

      if (status === '000') {
        this.props.handleChangeSecurityHintsStatus(null)
        console.tron.log('terms of use')
        NavigationActions.Termsofuse({'origin': 'registration'})
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='always' contentInset={null}>
          {this.props.username ? <View /> : <Image source={Images.registrationStep4Hdr} style={styles.headerImage}>
            <Text style={styles.headerTextStyle}>Almost Done!</Text>
          </Image>}
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('setUpSecurityQuestions')}</Text>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.topText}>{I18n.t('setUpSecurityQuestionsInstructions')}</Text>
            </View>
          </View>
          {this.props.securityHintsStatus && (this.props.securityHintsStatus != null && this.props.securityHintsStatus != '000') ? <View style={styles.messageView}>
            <View><Flb name='alert' color={Colors.snow} size={30} /></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.securityHintsStatusMessage}</Text></View>
            </View>
            <View>
              <TouchableOpacity onPress={() => { this.props.handleChangeSecurityHintsStatus(null) }}>
                <Image source={Images.closeIconWhite} />
              </TouchableOpacity>
            </View>
          </View> : <Text />}
          <View style={styles.hintRow}>
            <Text style={styles.heading}>{I18n.t('securityHint1')}</Text>
            <TouchableHighlight onPress={this._handleSecurityHint}>
              <Image source={Images.infoIcon} style={styles.hintImage} />
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityHint1'
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                    flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityHint1}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityAnswer1.focus()
              }}
              placeholder={I18n.t('securityCreateHintOrQuestion')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityAnswer1'
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                    flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityAnswer1}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityHint2.focus()
              }}
              placeholder={I18n.t('securityEnterYourAnswer')}
            />
          </View>
          <View style={styles.hintRow}>
            <Text style={styles.heading}>{I18n.t('securityHint2')}</Text>
            <TouchableHighlight onPress={this._handleSecurityHint}>
              <Image source={Images.infoIcon} style={styles.hintImage} />
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityHint2'
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                    flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityHint2}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityAnswer2.focus()
              }}
              placeholder={I18n.t('securityCreateHintOrQuestion')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityAnswer2'
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                    flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityAnswer2}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityHint3.focus()
              }}
              placeholder={I18n.t('securityEnterYourAnswer')}
            />
          </View>
          <View style={styles.hintRow}>
            <Text style={styles.heading}>{I18n.t('securityHint3')}</Text>
            <TouchableHighlight onPress={this._handleSecurityHint}>
              <Image source={Images.infoIcon} style={styles.hintImage} />
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityHint3'
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                    flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityHint3}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityAnswer3.focus()
              }}
              placeholder={I18n.t('securityCreateHintOrQuestion')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityAnswer3'
              style={styles.textfieldWithFloatingLabel}
              textInputStyle={{
                    flex: 1, color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0020
                  }}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityAnswer3}
              underlineColorAndroid={Colors.coal}
              placeholder={I18n.t('securityEnterYourAnswer')}
            />
          </View>
          <View style={styles.buttonRow}>
            {false ? <View style={styles.backButton}>
              <TouchableOpacity onPress={() => { this._handleBack() }}>
                <Image source={Images.backButton}
                  style={{width: Metrics.screenWidth * 0.35,
                    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                    height: Metrics.screenHeight * 0.055}} />
              </TouchableOpacity>
            </View> : <View />}
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
              <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

Screen_4.propTypes = {
  verifySecurityHints: PropTypes.func,
  handleChangeSecurityHint1: PropTypes.func,
  handleChangeSecurityAnswer1: PropTypes.func,
  handleChangeSecurityHint2: PropTypes.func,
  handleChangeSecurityAnswer2: PropTypes.func,
  handleChangeSecurityHint3: PropTypes.func,
  handleChangeSecurityAnswer3: PropTypes.func,
  handleChangeSecurityHintsStatus: PropTypes.func,
  handleChangeSecurityHintsStatusMessage: PropTypes.func,
  handleChangeCreateUserId: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    contractNumber: state.registration.contractNumber,
    securityHint1: state.registration.securityHint1,
    securityAnswer1: state.registration.securityAnswer1,
    securityHint2: state.registration.securityHint2,
    securityAnswer2: state.registration.securityAnswer2,
    securityHint3: state.registration.securityHint3,
    securityAnswer3: state.registration.securityAnswer3,
    token: state.registration.token,
    securityHintsStatus: state.registration.securityHintsStatus,
    securityHintsStatusMessage: state.registration.securityHintsStatusMessage,
    fetching: state.registration.fetching,
    error: state.registration.error,
    createUserId: state.registration.createUserId

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifySecurityHints: (data) => dispatch(RegistrationActions.sendSecurityHintsRequest(data)),
    handleChangeSecurityHint1: (securityHint1) => dispatch(RegistrationActions.changeSecurityHint1(securityHint1)),
    handleChangeSecurityAnswer1: (securityAnswer1) => dispatch(RegistrationActions.changeSecurityAnswer1(securityAnswer1)),
    handleChangeSecurityHint2: (securityHint2) => dispatch(RegistrationActions.changeSecurityHint2(securityHint2)),
    handleChangeSecurityAnswer2: (securityAnswer2) => dispatch(RegistrationActions.changeSecurityAnswer2(securityAnswer2)),
    handleChangeSecurityHint3: (securityHint3) => dispatch(RegistrationActions.changeSecurityHint3(securityHint3)),
    handleChangeSecurityAnswer3: (securityAnswer3) => dispatch(RegistrationActions.changeSecurityAnswer3(securityAnswer3)),
    handleChangeSecurityHintsStatus: (data) => dispatch(RegistrationActions.changeSecurityHintsStatus(data)),
    handleChangeSecurityHintsStatusMessage: (data) => dispatch(RegistrationActions.changeSecurityHintsStatusMessage(data)),
    handleChangeCreateUserId: (createUserId) => dispatch(RegistrationActions.changeCreateUserId(createUserId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_4)
