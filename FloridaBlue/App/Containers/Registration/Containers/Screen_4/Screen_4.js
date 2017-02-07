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
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();

class Screen_4 extends React.Component {

  _handleBack() {
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <Image source={Images.registrationStep4Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('setUpSecurityQuestions')}</Text>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.footerText}>{I18n.t('setUpSecurityQuestionsInstructions')}</Text>
            </View>
          </View>
          {this.props.data && (this.props.data.reasonCode != null || this.props.data.reasonCode != '000' || this.props.data.reasonCode != '999') ? <View style={styles.messageView}>
            <View><Flb name="alert" color={Colors.snow} size={30}/></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {this.props.data.reasonDesc}</Text></View>
            </View>
          </View> : <Text></Text>}
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('securityHint1')}</Text>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityHint1'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityHint1}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityAnswer1.focus();
              }}
              placeholder={I18n.t('securityCreateHintOrQuestion')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityAnswer1'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityAnswer1}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityHint2.focus();
              }}
              placeholder={I18n.t('securityEnterYourAnswer')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('securityHint2')}</Text>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityHint2'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityHint2}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityAnswer2.focus();
              }}
              placeholder={I18n.t('securityCreateHintOrQuestion')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityAnswer2'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityAnswer2}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityHint3.focus();
              }}
              placeholder={I18n.t('securityEnterYourAnswer')}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('securityHint3')}</Text>
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityHint3'
              style={styles.textfieldWithFloatingLabel}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.props.handleChangeSecurityHint3}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={(event) => {
                this.refs.securityAnswer3.focus();
              }}
              placeholder={I18n.t('securityCreateHintOrQuestion')}
            />
          </View>
          <View style={styles.row}>
            <TextfieldWithFloatingLabel
              ref='securityAnswer3'
              style={styles.textfieldWithFloatingLabel}
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
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => {this._handleBack()}}>
                <Image source={Images.backButton} />
              </TouchableOpacity>
            </View>
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => {}}>
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

Screen_4.propTypes = {
  handleChangeSecurityHint1: PropTypes.func,
  handleChangeSecurityAnswer1: PropTypes.func,
  handleChangeSecurityHint2: PropTypes.func,
  handleChangeSecurityAnswer2: PropTypes.func,
  handleChangeSecurityHint3: PropTypes.func,
  handleChangeSecurityAnswer3: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    securityHint1: state.registration.securityHint1,
    securityAnswer1: state.registration.securityAnswer1,
    securityHint2: state.registration.securityHint2,
    securityAnswer2: state.registration.securityAnswer2,
    securityHint3: state.registration.securityHint3,
    securityAnswer3: state.registration.securityAnswer3,
    fetching: state.registration.fetching,
    error: state.registration.error,
    data :state.registration.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSecurityHint1:(securityHint1) => dispatch(RegistrationActions.changeSecurityHint1(securityHint1)),
    handleChangeSecurityAnswer1:(securityAnswer1) => dispatch(RegistrationActions.changeSecurityAnswer1(securityAnswer1)),
    handleChangeSecurityHint2:(securityHint2) => dispatch(RegistrationActions.changeSecurityHint2(securityHint2)),
    handleChangeSecurityAnswer2:(securityAnswer2) => dispatch(RegistrationActions.changeSecurityAnswer2(securityAnswer2)),
    handleChangeSecurityHint3:(securityHint3) => dispatch(RegistrationActions.changeSecurityHint3(securityHint3)),
    handleChangeSecurityAnswer3:(securityAnswer3) => dispatch(RegistrationActions.changeSecurityAnswer3(securityAnswer3))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_4)
