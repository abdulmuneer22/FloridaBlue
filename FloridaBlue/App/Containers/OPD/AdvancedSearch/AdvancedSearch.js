import React, { Component, PropTypes } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Platform,
  BackHandler,
  TouchableHighlight,
  Slider
} from 'react-native'

import ProviderActions from '../../../Redux/ProviderRedux'
import SearchDataActions from '../../../Redux/SearchDataRedux'
import SettingActions from '../../../Redux/SettingRedux'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import styles from './AdvancedSearchStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Header, ListItem, Input, Radio, Label, Picker, Item } from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown'
import HideableView from 'react-native-hideable-view'
import I18n from 'react-native-i18n'
import { MKTextField, MKSlider, MKRangeSlider, MKColor, MKIconToggle, MKSpinner, getTheme, MKRadioButton, setTheme, mdl } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import DeviceInfo from 'react-native-device-info'


const theme = getTheme()
const card = { card: { width: Metrics.screenWidth, marginLeft: 0, marginTop: 0, marginBottom: 0, alignItems: 'flex-start' } }
const cardTitle = { cardTitle: { fontSize: 40 } }
const Permissions = require('react-native-permissions')
let urlConfig = require('../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const doctorsGender = [
  { text: 'Any', value: '' },
  { text: 'Female', value: 'F' },
  { text: 'Male', value: 'M' }
]

const Textfield = MKTextField.textfield()
  .withPlaceholder('Enter City or Zipcode')
  .withStyle(styles.textfield)
  .withTextInputStyle({ color: Colors.flBlue.anvil, flex: 1 })
  .withTintColor(Colors.flBlue.ocean)
  // .withHighlightColor(MKColor.Lime)
  .build()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

setTheme({
  radioStyle: {
    fillColor: Colors.flBlue.ocean,
    borderOnColor: Colors.flBlue.ocean,
    borderOffColor: Colors.flBlue.grey2
    // rippleColor: `rgba(${MKColor.RGBTeal},.18)`,
  }
})

class AdvancedSearch extends Component {
  constructor (props) {
    super(props)
    this.searchTypeGroup = new MKRadioButton.Group()
    this.radioGroup = new MKRadioButton.Group()
    this.genderGroup = new MKRadioButton.Group()
    this.state = {
      gender: '',
      doctorSpeaks: '',
      searchRange: 50,
      newLocationState: false,
      knownCareState: false,
      unknownCareState: false,
      specialityState: false,
      isDifferentLocationSelected: false,
      differentLocationText: false,
      comingFromBackButton: false,
      searchFrom: this.props.navigatingFrom,
      diffLocation: false,
      homeLocation: false,
      currentLocation: false

    }
    this._timeSelected = this._timeSelected.bind(this)
    this._patientTypeSelected = this._patientTypeSelected.bind(this)
    this._doctorLanguageSelected = this._doctorLanguageSelected.bind(this)
    this._staffLanguageSelected = this._staffLanguageSelected.bind(this)
    this._programSelected = this._programSelected.bind(this)
    this._selectDifferentLocation = this._selectDifferentLocation.bind(this)
    this._selectHomeLocation = this._selectHomeLocation.bind(this)
    this._selectCurrentLocation = this._selectCurrentLocation.bind(this)
    this._anyGenderSelected = this._anyGenderSelected.bind(this)
    this._maleGenderSelected = this._maleGenderSelected.bind(this)
    this._femaleGenderSelected = this._femaleGenderSelected.bind(this)
    this._careSelected = this._careSelected.bind(this)
    this._specialitySelected = this._specialitySelected.bind(this)
  }

  _handleDoctordetail () {
    if (this.props.networkCodeList && this.props.networkCodeList.length > 0) {
      if ((this.props.member && this.props.member.visibilityRules && this.props.member.visibilityRules.isStateGroup &&
            (this.props.categoryCode == '07' || (this.props.subCategoryCode == '702' || this.props.subCategoryCode == '700' ||
            this.props.subCategoryCode == '701')))) {
        Alert.alert(
                  'Find care',
                    'Not Available.',
          [
                    { text: 'OK' }
          ])
        return
      }
      if (this.state.isDifferentLocationSelected) {
        if (this.state.diffLocation) {
          this.props.changeUrgentCareBanner(false)
          if (this.props.categoryCode == '07' && this.props.subCategoryCode == '700') {
            this.props.attemptPharmacySearch(this.props)
          } else {
            this.props.attemptProviderSearch(this.props)
          }
          NavigationActions.DoctorList({type: ActionConst.PUSH_OR_POP})
        } else {
          alert('Please Enter Zip Code or City')
        }
      } else {
        this.props.changeUrgentCareBanner(false)
        if (this.props.categoryCode == '07' && this.props.subCategoryCode == '700') {
          this.props.attemptPharmacySearch(this.props)
        } else {
          this.props.attemptProviderSearch(this.props)
        }
        NavigationActions.DoctorList({type: ActionConst.PUSH_OR_POP})
      }
    } else {
      Alert.alert(
          'Find care',
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
            { text: 'OK' }
        ])
    }
  }

  _patientTypeSelected (index, value: string) {
    var selectedPatientType = this.props.configData.acceptingPatient.acceptPatientList[index].value
    var selectedPatientLabel = this.props.configData.acceptingPatient.acceptPatientList[index].patientPreference
    var acceptedPatient = {
      'selectedPatientType': selectedPatientType,
      'selectedPatientLabel': selectedPatientLabel
    }
    this.props.changePatientType(acceptedPatient)
  }

  _timeSelected (index, value: string) {
    var selectedTime = this.props.configData.workingHours.workHoursList[index].value
    var selectedTimeLabel = this.props.configData.workingHours.workHoursList[index].hours
    var timeSelected = {
      'selectedTime': selectedTime,
      'selectedTimeLabel': selectedTimeLabel
    }
    this.props.changeTimeType(timeSelected)
  }

  _staffLanguageSelected (index, value: string) {
    var selectedStaffLanguage = this.props.staffLanguages[index].value
    var selectedStaffLabel = this.props.staffLanguages[index].label
    var staffLanguageSelected = {
      'selectedStaffLanguage': selectedStaffLanguage,
      'selectedStaffLabel': selectedStaffLabel
    }
    this.props.changeStaffLanguage(staffLanguageSelected)
  }

  _doctorLanguageSelected (index, value: string) {
    var selectedDoctorLanguage = this.props.providerLanguages[index].value
    var selectedDoctorLabel = this.props.providerLanguages[index].label
    var doctorLanguageSelected = {
      'selectedDoctorLanguage': selectedDoctorLanguage,
      'selectedDoctorLabel': selectedDoctorLabel
    }
    this.props.changeDoctorLanguage(doctorLanguageSelected)
  }

  _programSelected (index, value: string) {
    var selectedProgramType = this.props.configData.program.programList[index].value
    var selectedProgramLabel = this.props.configData.program.programList[index].programName
    var programTypeSelected = {
      'selectedProgramType': selectedProgramType,
      'selectedProgramLabel': selectedProgramLabel
    }
    this.props.changeProgramType(programTypeSelected)
  }

  _selectHomeLocation (event) {
    if (event.checked) {
      this.setState({currentLocation: false})
      this.setState({homeLocation: true})
      this.setState({newLocationState: false})
      this.setState({isDifferentLocationSelected: false})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
      this.props.changeAddress(this.props.homeAddress)
      gaTracker.trackEvent('Advanced Search', 'Selected Home Address')
    }
  }

  _selectCurrentLocation (event) {
    if (event.checked) {
      if (this.props.geolocationEnabled) {
        this._getLocation()
        this.props.changeAddress('Using Current Address')
      } else {
        Permissions.getPermissionStatus('location').then(response => {
          if (response == 'authorized') {
            this.props.changeGeolocationEnabled(true)
            this._getPosition()
          } else if (response == 'undetermined') {
            Permissions.requestPermission('location').then(response => {
              if (response == 'authorized') {
                this.props.changeGeolocationEnabled(true)
                this._getPosition()
              } else {
                this.props.changeGeolocationEnabled(false)
              }
            })
          } else {
            this.props.changeGeolocationEnabled(false)
            this._alertForLocationPermission()
          }
        })
      }
      this.setState({currentLocation: true})
      this.setState({specialityState: true})
      this.setState({newLocationState: false})
      this.setState({isDifferentLocationSelected: false})
      this.setState({homeLocation: false})
      gaTracker.trackEvent('Advanced Search', 'Selected Current Location')
    }
  }

  _alertForLocationPermission () {
    Alert.alert(
      'Allow Florida Blue to use your current location.',
      'To see this information, you need to allow geolocation on your phone. Please go to Location in your phone\'s settings and turn it on.',
      [
        {text: 'Cancel', onPress: () => console.tron.log('permission denied'), style: 'cancel'},
        {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }

  _selectDifferentLocation (event) {
    if (event.checked) {
      this.setState({isDifferentLocationSelected: true})
      this.setState({newLocationState: true})
      this.setState({homeLocation: false})
      this.setState({currentLocation: false})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
      gaTracker.trackEvent('Advanced Search', 'Selected Custom Address')
    }
  }
  _addDiffLocation (address) {
    if (address) {
      this.props.changeAddress(address)
      this.setState({
        diffLocation: true
      })
    }
  }

  _anyGenderSelected (event) {
    if (event.checked) {
      this.setState({gender: true})
      this.props.changeGenderType('')
    }
  }

  _maleGenderSelected (event) {
    if (event.checked) {
      this.setState({gender: false})
      this.props.changeGenderType('M')
    }
  }

  _femaleGenderSelected (event) {
    if (event.checked) {
      this.setState({gender: false})
      this.props.changeGenderType('F')
    }
  }

  _resetState () {
    this.props.changeSubCategoryCode('')
    this.props.changeCategoryCode('ALL')
    this.props.changeProviderName('')
    this.props.changeCareType('')
    this.props.changeAdvancedSpecialityType('')
    this.props.changeCurrentLocation('Unknown')
    this.props.changeLatitude(0)
    this.props.changeLongitude(0)
    if (this.state.searchFrom == 'providerSearch') {
      let timeSelected = {
        'selectedTime': '',
        'selectedTimeLabel': ''
      }
      this.props.changeTimeType(timeSelected)
      let acceptedPatient = {
        'selectedPatientType': '',
        'selectedPatientLabel': ''
      }
      this.props.changePatientType(acceptedPatient)
      let programTypeSelected = {
        'selectedProgramType': '',
        'selectedProgramLabel': ''
      }
      this.props.changeProgramType(programTypeSelected)
      let staffLanguageSelected = {
        'selectedStaffLanguage': '',
        'selectedStaffLabel': ''
      }
      this.props.changeStaffLanguage(staffLanguageSelected)
      let doctorLanguageSelected = {
        'selectedDoctorLanguage': '',
        'selectedDoctorLabel': ''
      }
      this.props.changeDoctorLanguage(doctorLanguageSelected)
    }
  }

  _getLocation () {
    Permissions.getPermissionStatus('location').then(response => {
      if (response == 'authorized') {
        this.props.changeGeolocationEnabled(true)
        this._getPosition()
      } else if (response == 'undetermined') {
        Permissions.requestPermission('location').then(response => {
          if (response == 'authorized') {
            this.props.changeGeolocationEnabled(true)
            this._getPosition()
          } else {
            this.props.changeGeolocationEnabled(false)
          }
        })
      } else {
        this.props.changeGeolocationEnabled(false)
      }
    })
  }

  _getPosition () {
    navigator.geolocation.getCurrentPosition(
    (position) => {
      let newLat = position['coords']['latitude']
      let newLong = position['coords']['longitude']

      this.props.changeLatitude(newLat)
      this.props.changeLongitude(newLong)
      this.props.changeAddress('Using Current Location')
    },
      (error) => alert('No GPS location found.'))
    this.props.changeAddress(this.props.homeAddress)
    this.props.changeLatitude(0)
    this.props.changeLongitude(0)
  }

  _careSelected (index, value:string) {
    let selectedCategoryCode = this.props.planCategoryList[index].categoryCode
    this.props.attemptAdvancedSpecialityTypes(selectedCategoryCode)
    this.props.changeCareType(value)
    this.props.changeSubCategoryCode('')
    this.props.changeAdvancedSpecialityType('')
    this.setState({unknownCareState: false}, function () {
      this.setState({unknownCareState: true})
    })
    gaTracker.trackEvent('Advanced Search', 'Care Category ' + value)
  }

  _specialitySelected (index, value:string) {
    let selectedSubCategoryCode = this.props.advancedPlanSubCategoryList[index].subCategoryCode
    if (this.props.categoryCode == '07' && selectedSubCategoryCode == '999' || selectedSubCategoryCode == '701') {
      gaTracker.trackEvent('Provider Search', 'Speciality Category Pharmacy')
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      NavigationActions.ProviderTypeInfo()
    } else {
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      this.props.changeAdvancedSpecialityType(value)
      this.setState({specialityState: false}, function () {
        this.setState({specialityState: true})
      })
      gaTracker.trackEvent('Advanced Search', 'Speciality Category ' + value)
    }
  }

  _renderHeader () {
    return (<Image style={[styles.headerContainer, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage : Images.landscapeHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        Find Care
      </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    // this._resetState()
    /*
    this.props.attemptConfigData()
    this.props.attemptStaffLanguage()
    this.props.attemptDoctorLanguage()
    this._getLocation()

    if (this.props.categoryCode != 'ALL') {
      this.setState({specialityState: true})
    }
    */

    gaTracker.trackScreenView('Advanced Search')
  }

  componentWillReceiveProps (newProps) {
    console.tron.log(newProps)
    if (newProps.advancedPlanSubCategoryList.length > 0 && this.state.unknownCareState) {
      this.setState({specialityState: false}, function () {
        this.setState({specialityState: true})
      })
    }
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='white'>
        <Text allowFontScaling={false} style={styles.dropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  render () {
    return (
      <View style={styles.container}>

        {this._renderHeader()}
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <View style={{flex: 1}}>
            <View style={styles.careView}>

              <MKTextField
                ref='providerName'
                style={styles.careTextField}
                textInputStyle={{
                  flex: 1,
                  color: Colors.flBlue.ocean,
                  fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                }}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid={Colors.coal}
                placeholder={I18n.t('providerPlaceholder')}
                placeholderTextColor={Colors.steel}
                tintColor={Colors.black}
                onChangeText={this.props.changeProviderName}
              />

              <ModalDropdown options={_.map(this.props.planCategoryList, 'categoryName')} onSelect={this._careSelected} dropdownStyle={this.props.isPortrait ? styles.dropdown : styles.dropDownLandscape} renderRow={this._renderDropdownRow.bind(this)}>
                <MKTextField
                  ref='careType'
                  textInputStyle={{
                    flex: 1,
                    color: Colors.flBlue.ocean,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                  }}
                  style={styles.careTextField}
                  editable={false}
                  underlineColorAndroid={Colors.coal}
                  placeholder={I18n.t('careTypePlaceholder')}
                  placeholderTextColor={Colors.steel}
                  tintColor={Colors.black}
                  value={this.props.careType}
                />
              </ModalDropdown>
              <Text allowFontScaling={false} style={styles.dropdownExampleText}>{I18n.t('careTypeExample')}</Text>

              <HideableView visible={this.state.unknownCareState && this.state.specialityState} removeWhenHidden>
                <ModalDropdown options={_.map(this.props.advancedPlanSubCategoryList, 'subCategoryName')} onSelect={this._specialitySelected}
                  dropdownStyle={this.props.isPortrait ? this.props.advancedPlanSubCategoryList.length >= 2 ? styles.dropdown : styles.dropD : this.props.advancedPlanSubCategoryList.length >= 2 ? styles.dropDownLandscape : styles.dropDLandscape}
                  renderRow={this._renderDropdownRow.bind(this)}>
                  <MKTextField
                    ref='advancedSpecialityType'
                    style={styles.careTextField}
                    textInputStyle={{
                      flex: 1,
                      color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                    }}
                    editable={false}
                    underlineColorAndroid={Colors.coal}
                    placeholder={I18n.t('specialityTypePlaceholder')}
                    placeholderTextColor={Colors.steel}
                    tintColor={Colors.black}
                    value={this.props.advancedSpecialityType}
                />
                </ModalDropdown>
                <Text allowFontScaling={false} style={styles.dropdownExampleText}>{I18n.t('specialityTypeExample')}</Text>
              </HideableView>
            </View>

            <View style={styles.locationView}>
              <View style={{flex: 1}}>
                <Text allowFontScaling={false} style={styles.h1}>Change Location:</Text>
              </View>

              <View style={styles.radioView}>
                <View style={{flex: 0.15}}>
                  <MKRadioButton ref='currentLocation' style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                    width: Metrics.section * Metrics.screenWidth * 0.0025,
                    borderRadius: Metrics.section}} group={this.radioGroup} onCheckedChange={this._selectCurrentLocation} />
                </View>
                <View style={{width: Metrics.screenWidth, flex: 0.85}}>
                  <TouchableOpacity style={{width: Metrics.screenWidth, flex: 1}} onPress={() => { if (!this.refs.currentLocation.state.checked) this.refs.currentLocation.confirmToggle() }}>
                    <Text allowFontScaling={false} style={styles.radioText} >Current Location</Text>
                  </TouchableOpacity>
                </View>

              </View>

              <View style={styles.radioView}>
                <View style={{flex: 0.15}}>
                  <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                    width: Metrics.section * Metrics.screenWidth * 0.0025,
                    borderRadius: Metrics.section}} ref='homeLocation' group={this.radioGroup} onCheckedChange={this._selectHomeLocation} />
                </View>
                <View style={{width: Metrics.screenWidth, flex: 0.85}}>
                  <TouchableOpacity style={{width: Metrics.screenWidth, flex: 1}} onPress={() => { if (!this.refs.homeLocation.state.checked) this.refs.homeLocation.confirmToggle() }}>
                    <Text allowFontScaling={false} style={styles.radioText} >Home</Text>
                    <View style={{ marginRight: Metrics.searchBarHeight * Metrics.screenWidth * 0.008, flex: 1 }}>
                      <Text allowFontScaling={false} style={styles.radioBottomText}>({this.props.homeAddress})</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.radioView}>
                <View style={{flex: 0.15}}>
                  <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                    width: Metrics.section * Metrics.screenWidth * 0.0025,
                    borderRadius: Metrics.section}} ref='differentLocation' group={this.radioGroup} onCheckedChange={this._selectDifferentLocation} />
                </View>
                <View style={{width: Metrics.screenWidth, flex: 0.85}}>
                  <TouchableOpacity style={{width: Metrics.screenWidth, flex: 1}} onPress={() => { if (!this.refs.differentLocation.state.checked) this.refs.differentLocation.confirmToggle() }}>
                    <Text allowFontScaling={false} style={styles.radioText} >Different Location</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <HideableView style={{ marginLeft: 15, marginTop: 10, flex: 1 }} visible={this.state.newLocationState} removeWhenHidden>
                <Text allowFontScaling={false} for='' style={styles.radioText}>{I18n.t('differentLocationMessage')}</Text>
                <MKTextField
                  ref='newLocation'
                  textInputStyle={{flex: 1}}
                  editable
                  underlineColorAndroid={Colors.coal}
                  placeholderTextColor={Colors.steel}
                  tintColor={Colors.black}
                  onChangeText={(address) => this._addDiffLocation(address)}

              />
              </HideableView>

              <View style={{ marginLeft: 15, marginTop: 10, flex: 1 }}>
                <Text allowFontScaling={false} style={styles.searchText}> Search Distance:</Text>
                <Text allowFontScaling={false} style={{ textAlign: 'center',
                  fontSize: Fonts.size.regular,
                  color: Colors.flBlue.anvil }}>{this.props.searchRange} mi</Text>
                <Slider
                  value={this.props.searchRange}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  maximumTrackTintColor={(Platform.OS === 'ios') ? Colors.flBlue.anvil : Colors.flBlue.ocean}
                  minimumTrackTintColor={(Platform.OS === 'ios') ? Colors.flBlue.ocean : Colors.flBlue.night}
                  style={this.props.isPortrait ? styles.slider : styles.sliderLandscape}
                // onValueChange={this.props.changeSearchRange}
                  onSlidingComplete={this.props.changeSearchRange}
              />
              </View>
            </View>

            <View style={styles.genderView}>
              {
                this.props.configData != undefined && this.props.configData.gender != undefined
                  ? <Text allowFontScaling={false} style={styles.doctorTextStyle}>
                    {this.props.configData.gender.displayName}:
             </Text> : null}
              <View style={{flex: 1}}>
                <View style={{ flexDirection: 'row', marginLeft: 20, flex: 0.3}}>
                  <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                    width: Metrics.section * Metrics.screenWidth * 0.0025,
                    borderRadius: Metrics.section}} checked group={this.genderGroup} onCheckedChange={this._anyGenderSelected} />
                  <Text allowFontScaling={false} style={styles.genderText}>Any</Text>
                  <View style={{flexDirection: 'row', marginLeft: 20, flex: 0.3}}>
                    <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                      width: Metrics.section * Metrics.screenWidth * 0.0025,
                      borderRadius: Metrics.section}} checked={false} group={this.genderGroup} onCheckedChange={this._maleGenderSelected} />
                    <Text allowFontScaling={false} style={styles.genderText}>Male</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginLeft: 20, flex: 0.4}}>
                    <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                      width: Metrics.section * Metrics.screenWidth * 0.0025,
                      borderRadius: Metrics.section}} checked={false} group={this.genderGroup} onCheckedChange={this._femaleGenderSelected} />
                    <Text allowFontScaling={false} style={styles.genderText}>Female</Text>
                  </View>
                </View>
              </View>
            </View>

            {this.props.configData && this.props.configData.acceptingPatient
              ? <View style={styles.programView}>
                <View style={{ flex: 0.4 }}>

                  <Text allowFontScaling={false} style={styles.programText}>
                    {this.props.configData.acceptingPatient.displayName}

                  </Text>
                </View>

                <View style={{ flex: 0.6, marginTop: 15, marginLeft: 15 }}>

                  <ModalDropdown
                    dropdownStyle={styles.dropdown1}
                    options={this.props.configData != undefined && this.props.configData.acceptingPatient != undefined
                  ? _.map(this.props.configData.acceptingPatient.acceptPatientList, 'patientPreference') : null}
                    renderRow={this._renderDropdownRow.bind(this)}
                    onSelect={this._patientTypeSelected}>

                    <MKTextField
                      ref='patientType'
                      style={styles.textField}
                      textInputStyle={{
                        flex: 1,
                        color: Colors.flBlue.ocean,
                        fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                      }}
                      editable={false}
                      underlineColorAndroid={Colors.coal}
                      placeholder='No Preference'
                  // placeholder={this.state.acceptingPatientsIndicator}
                      placeholderTextColor={Colors.flBlue.ocean}
                      tintColor={Colors.black}
                      value={this.props.acceptingPatientsIndicator.selectedPatientLabel}
                />

                  </ModalDropdown>
                </View>
              </View>
          : null}

            {this.props.configData && this.props.configData.workingHours
              ? <View style={styles.programView}>
                <View style={{ flex: 0.4 }}>
                  <Text allowFontScaling={false} style={styles.programText}>
                    {this.props.configData.workingHours.displayName}
                  </Text>

                </View>

                <View style={{ flex: 0.6, marginTop: 10, marginLeft: 15 }}>

                  <ModalDropdown dropdownStyle={styles.dropdown1}
                    onSelect={this._timeSelected}
                    options={this.props.configData != undefined && this.props.configData.workingHours != undefined
                  ? _.map(this.props.configData.workingHours.workHoursList, 'hours') : null}
                    renderRow={this._renderDropdownRow.bind(this)} >

                    <MKTextField
                      ref='Working Hours'
                      textInputStyle={{
                        flex: 1,
                        color: Colors.flBlue.ocean,
                    // marginLeft:100,
                        marginRight: -100,
                        fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                      }}
                      style={styles.textField}
                      editable={false}
                      underlineColorAndroid={Colors.coal}
                      placeholder='No Preference'
                      placeholderTextColor={Colors.flBlue.ocean}
                      tintColor={Colors.black}
                      value={this.props.officeHours.selectedTimeLabel}
                />
                  </ModalDropdown>

                </View>

              </View>
           : null}
            <View style={styles.languageView}>
              <Text allowFontScaling={false} style={styles.languageText}>
              Language Selection
            </Text>

              <View style={styles.dropDownView}>
                <View style={{ flex: 0.4 }}>

                  <Text allowFontScaling={false} style={styles.dropDownText}>
                  Doctor Speaks
            </Text>
                </View>
                <View style={{ flex: 0.6, marginTop: 5 }}>

                  <ModalDropdown dropdownStyle={styles.languagedropdown}
                    onSelect={this._doctorLanguageSelected}
                    options={this.props.providerLanguage != undefined
                    ? _.map(this.props.providerLanguages, 'label') : null}
                    renderRow={this._renderDropdownRow.bind(this)} >

                    <MKTextField
                      textInputStyle={{
                        flex: 1,
                        color: Colors.flBlue.ocean,
                        fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                      }}
                      style={styles.languageTextField}
                      editable={false}
                      underlineColorAndroid={Colors.coal}
                      placeholder='No Preference'
                      placeholderTextColor={Colors.flBlue.ocean}
                      tintColor={Colors.black}
                      value={this.props.providerLanguage.selectedDoctorLabel}
                  />
                  </ModalDropdown>
                </View>
              </View>

              <View style={styles.dropDownView}>
                <View style={{ flex: 0.4 }}>
                  <Text allowFontScaling={false} style={styles.dropDownText}>
                  Staff Speaks
                  </Text>
                </View>

                <View style={{ flex: 0.6, marginTop: 5 }}>
                  <ModalDropdown dropdownStyle={styles.languagedropdown}
                    onSelect={this._staffLanguageSelected}
                    options={
                    _.map(this.props.staffLanguages, 'label')}
                    renderRow={this._renderDropdownRow.bind(this)} >

                    <MKTextField
                      textInputStyle={{
                        flex: 1,
                        color: Colors.flBlue.ocean,
                        fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                      }}
                      style={styles.languageTextField}
                      editable={false}
                      underlineColorAndroid={Colors.coal}
                      placeholder='No Preference'
                      placeholderTextColor={Colors.flBlue.ocean}
                      tintColor={Colors.black}
                      value={this.props.staffLanguage.selectedStaffLabel}
                  />
                  </ModalDropdown>
                </View>
              </View>

            </View>
            {this.props.configData && this.props.configData.program
              ? <View style={styles.programView}>
                <View style={{ flex: 0.3 }}>

                  <Text allowFontScaling={false} style={styles.programText}>
                    {this.props.configData.program.displayName}
                  </Text>

                </View>

                <View style={{ flex: 0.7, marginTop: 5 }}>
                  <ModalDropdown dropdownStyle={styles.programdropdown}
                    onSelect={this._programSelected}
                    options={this.props.configData != undefined && this.props.configData.program != undefined
                  ? _.map(this.props.configData.program.programList, 'programName') : null}
                    renderRow={this._renderDropdownRow.bind(this)} >

                    <MKTextField
                      textInputStyle={{
                        flex: 1,
                        color: Colors.flBlue.ocean,
                        fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                      }}
                      style={styles.programtextField}
                      editable={false}
                      underlineColorAndroid={Colors.coal}
                      placeholder='No Preference'
                      placeholderTextColor={Colors.flBlue.ocean}
                      placeholderTextSize={Fonts.size.h2}
                      tintColor={Colors.black}
                      value={this.props.programsList.selectedProgramLabel}

                />
                  </ModalDropdown>

                </View>
              </View>
          : null}

            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleDoctordetail() }}>
                <Image source={Images.getResultsButton}
                  style={{
                    flex: 1,
                    width: Metrics.screenWidth * 0.4,
                    borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                    height: Metrics.screenHeight * 0.06

                  }} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

AdvancedSearch.propTypes = {

  attemptSearchDoctor: PropTypes.func,
  attemptDoctorLanguage: PropTypes.func,
  attemptStaffLanguage: PropTypes.func,
  attemptConfigData: PropTypes.func,
  attemptSearchData: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    error: state.provider.error,
    fetching: state.provider.fetching,
    languageList: state.provider.languageList,
    acceptingPatientsIndicator: state.provider.acceptingPatientsIndicator,
    providerLanguage: state.provider.providerLanguage,
    providerLanguages: state.provider.providerLanguages,
    staffLanguage: state.provider.staffLanguage,
    staffLanguages: state.provider.staffLanguages,
    configData: state.provider.configData,
    latitude: state.provider.latitude,
    longitude: state.provider.longitude,
    homeAddress: state.provider.homeAddress,
    address: state.provider.address,
    newLocationState: state.provider.newLocationState,
    currentLocation: state.provider.currentLocation,
    searchRange: state.provider.searchRange,
    gender: state.provider.gender,
    programsList: state.provider.programsList,
    planCategoryList: state.provider.planCategoryList,
    advancedPlanSubCategoryList: state.provider.advancedPlanSubCategoryList,
    categoryCode: state.provider.categoryCode,
    subCategoryCode: state.provider.subCategoryCode,
    providerName: state.provider.providerName,
    careType: state.provider.careType,
    officeHours: state.provider.officeHours,
    advancedSpecialityType: state.provider.advancedSpecialityType,
    member: state.member,
    knownCareState: state.provider.knownCareState,
    unknownCareState: state.provider.unknownCareState,
    specialityState: state.provider.specialityState,
    networkCodeList: state.provider.networkCodeList,
    geolocationEnabled: state.setting.geolocationEnabled,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptStaffLanguage: () => dispatch(ProviderActions.sendStaffLanguageRequest()),
    attemptDoctorLanguage: () => dispatch(ProviderActions.sendDoctorLanguageRequest()),
    attemptSearchData: (data) => dispatch(SearchDataActions.searchdataRequest(data)),
    attemptConfigData: () => dispatch(ProviderActions.sendConfigTypeRequest()),
    attemptProviderSearch: (data) => dispatch(ProviderActions.sendProviderSearchRequest(data)),
    attemptPharmacySearch: (data) => dispatch(ProviderActions.sendPharmacySearchRequest(data)),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest()),
    attemptAdvancedSpecialityTypes: (selectedCategoryCode) => dispatch(ProviderActions.sendAdvancedSpecialityTypeRequest(selectedCategoryCode)),
    changePatientType: (acceptingPatientsIndicator) => dispatch(ProviderActions.changePatientType(acceptingPatientsIndicator)),
    changeDoctorLanguage: (providerLanguage) => dispatch(ProviderActions.changeDoctorLanguage(providerLanguage)),
    changeStaffLanguage: (staffLanguage) => dispatch(ProviderActions.changeStaffLanguage(staffLanguage)),
    changeProgramType: (programsList) => dispatch(ProviderActions.changeProgramType(programsList)),
    changeTimeType: (officeHours) => dispatch(ProviderActions.changeTimeType(officeHours)),
    changeGenderType: (gender) => dispatch(ProviderActions.changeGenderType(gender)),
    changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeAddress: (address) => dispatch(ProviderActions.changeAddress(address)),
    changeSearchRange: (searchRange) => dispatch(ProviderActions.changeSearchRange(searchRange)),
    changeCategoryCode: (categoryCode) => dispatch(ProviderActions.changeCategoryCode(categoryCode)),
    changeSubCategoryCode: (subCategoryCode) => dispatch(ProviderActions.changeSubCategoryCode(subCategoryCode)),
    changeProviderName: (providerName) => dispatch(ProviderActions.changeProviderName(providerName)),
    changeCareType: (careType) => dispatch(ProviderActions.changeCareType(careType)),
    changeAdvancedSpecialityType: (advancedSpecialityType) => dispatch(ProviderActions.changeAdvancedSpecialityType(advancedSpecialityType)),
    changeUrgentCareBanner: (showUrgentCareBanner) => dispatch(ProviderActions.changeUrgentCareBanner(showUrgentCareBanner)),
    changeGeolocationEnabled: (geolocationEnabled) => dispatch(SettingActions.changeGeolocationEnabled(geolocationEnabled)),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
