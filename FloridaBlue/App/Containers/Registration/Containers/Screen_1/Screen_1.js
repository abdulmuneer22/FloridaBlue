// @flow

import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Screen_1Style'

import Flb from '../../../../Themes/FlbIcon'
// I18n
import I18n from 'react-native-i18n'

class Screen_1 extends React.Component {

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position'>
          <Image source={Images.registrationStep1Hdr} style={styles.headerImage} />
          <View style={styles.row}>
            <Text style={styles.heading}>{I18n.t('personalInformation')}</Text>
          </View>
          <View style={styles.messageView}>
            <View><Flb name="exclamation-triangle" size={30}/></View>
            <View style={styles.messagePadding}>
              <View><Text style={styles.message}> {I18n.t('createAccountMessage')}</Text></View>
            </View>
          </View>
          <View style={styles.row}>
            <TextInput
              ref='memberId'
              style={styles.textInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={() => {}}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={() => this.refs.memberId.focus()}
              placeholder={I18n.t('memberId')} />
          </View>
          <View style={styles.row}>
            <Text style={[styles.message, {fontSize: Fonts.size.regular}]}> {I18n.t('cantFindMemberId')}</Text>
          </View>
          <View style={styles.findItButton}>
            <TouchableOpacity onPress={() => {}}>
              <Image source={Images.findItButton} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TextInput
              ref='firstName'
              style={styles.textInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={() => {}}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={() => this.refs.firstName.focus()}
              placeholder={I18n.t('firstName')} />
          </View>
          <View style={styles.row}>
            <TextInput
              ref='lastName'
              style={styles.textInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={() => {}}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={() => this.refs.lastName.focus()}
              placeholder={I18n.t('lastName')} />
          </View>
          <View style={styles.row}>
            <TextInput
              ref='dateOfBirth'
              style={styles.textInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={() => {}}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={() => this.refs.dateOfBirth.focus()}
              placeholder={I18n.t('dateOfBirth')} />
          </View>
          <View style={styles.row}>
            <TextInput
              ref='zipCode'
              style={styles.textInput}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={() => {}}
              underlineColorAndroid={Colors.coal}
              onSubmitEditing={() => this.refs.zipCode.focus()}
              placeholder={I18n.t('zipCode')} />
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={() => {}}>
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
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_1)
