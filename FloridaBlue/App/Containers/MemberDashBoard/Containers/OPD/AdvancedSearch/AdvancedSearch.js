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
  BackAndroid,
  TouchableHighlight,
  Slider
} from 'react-native'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view'

const card = { card: { width: Metrics.screenWidth, marginLeft: 0, marginTop: 0, marginBottom: 0, alignItems: 'flex-start' } }
const cardTitle = { cardTitle: { fontSize: 40 } }
const Permissions = require('react-native-permissions')

import ProviderActions from '../../../../../Redux/ProviderRedux'
import SearchDataActions from '../../../../../Redux/SearchDataRedux'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './AdvancedSearchStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import {
  Container, Content, Header, ListItem, Input, Radio, Label,
  Picker, Item
} from 'native-base'
import ModalDropdown from 'react-native-modal-dropdown'
import HideableView from 'react-native-hideable-view'
import I18n from 'react-native-i18n'
import { MKTextField, MKSlider, MKRangeSlider, MKColor, MKIconToggle, MKSpinner, getTheme, MKRadioButton, setTheme, mdl } from 'react-native-material-kit'

const theme = getTheme()

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9']

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
      diffLocation: false

    }
    this._timeSelected = this._timeSelected.bind(this)
    this._languageSelected = this._languageSelected.bind(this)
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
    this._onChecked = this._onChecked.bind(this)
    this._careSelected = this._careSelected.bind(this)
    this._specialitySelected = this._specialitySelected.bind(this)
    console.tron.log('*****************' + this.props.navigatingFrom)
  }

  _onChecked (event) {
    if (event.checked) {
      this.props.changeSubCategoryCode('')
      this.props.changeCategoryCode('ALL')
      this.setState({knownCareState: true})
      this.setState({unknownCareState: false})
    } else {
      this.props.changeProviderName('')
      this.setState({knownCareState: false})
      this.setState({unknownCareState: true})
    }
  }

  _handleDoctordetail() {

    if (this.props.networkCodeList) {
      if (this.state.isDifferentLocationSelected) {
        if (this.state.diffLocation) {
          
          this.props.changeUrgentCareBanner(false)
          if (this.props.categoryCode == '07' && this.props.subCategoryCode == '700') {           
            this.props.attemptPharmacySearch(this.props)
          } else {
            this.props.attemptProviderSearch(this.props)
          }
          NavigationActions.DoctorList()
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
        NavigationActions.DoctorList()
      }
    } else {
      this.props.attemptNetworkList()
      NavigationActions.DoctorList()
    }
  }

  _languageSelected (event, value: string) {
    this.setState({ doctorSpeaks: value })
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
      this.setState({newLocationState: false})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
      this.props.changeAddress(this.props.homeAddress)
    }
  }

  _selectCurrentLocation (event) {
    if (event.checked) {
      if (this.props.locationStatus == 'authorized') {
        this._getLocation()
        this.props.changeAddress('Using Current Address')
      } else {
        Permissions.requestPermission('location')
        .then(response => {
          if (response == 'authorized') {
            this._getLocation()
          } else {
            this._alertForLocationPermission()
          }
        })
      }
      this.setState({specialityState: true})
      // this.setState({customLocationState: false})
    }
  }

  _alertForLocationPermission () {
    Alert.alert(
      'Can we access your current location?',
      'We need access so you can see provider data near your location',
      [
        {text: 'No way', onPress: () => console.tron.log('permission denied'), style: 'cancel'},
        this.state.photoPermission == 'undetermined' ?
        {text: 'OK', onPress: this._requestPermission.bind(this)} : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )
  }

  _selectDifferentLocation (event) {
    if (event.checked) {
      this.setState({isDifferentLocationSelected: true})
      this.setState({newLocationState: true})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
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

  _careSelected (index, value:string) {
    var selectedCategoryCode = this.props.planCategoryList[index].categoryCode
    this.props.getSpecialityTypes(selectedCategoryCode)
    this.props.changeCareType(value)
  }

  _specialitySelected (index, value:string) {
    var selectedSubCategoryCode = this.props.planSubCategoryList[index].categoryCode
    this.props.changeSubCategoryCode(selectedSubCategoryCode)
    this.props.changeSpecialityType(value)
  }

  _resetState () {
    this.props.changeSubCategoryCode('')
    this.props.changeCategoryCode('ALL')
    this.props.changeProviderName('')
    this.props.changeCareType('')
    this.props.changeSpecialityType('')
    this.props.changeCurrentLocation('Unknown')
    this.props.changeLatitude(0)
    this.props.changeLongitude(0)
    console.tron.log('*****Page from ' + this.state.searchFrom)
    if (this.state.searchFrom == 'providerSearch') {
      console.tron.log('*****Resttting Form *****')
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
    var getCurrentLocation = false

    if (this.props.locationStatus == '' || this.props.locationStatus != 'authorized') {
      var locationStatus = ''
      Permissions.getPermissionStatus('location')
      .then(response => {
        locationStatus = response
        if (response == 'authorized') {
          getCurrentLocation = true
          this.props.changeLocationPermissionStatus(response)
        } else if (response == 'undetermined') {
          Permissions.requestPermission('location')
          .then(response => {
            this.props.changeLocationPermissionStatus(response)
            locationStatus = response
            if (response == 'authorized') {
              getCurrentLocation = true
            }
          })
        }
      })
      this.props.changeLocationPermissionStatus(locationStatus)
    } else if (this.props.locationStatus == 'authorized') {
      getCurrentLocation = true
    }

    if (getCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
      (position) => {
        var newLat = position['coords']['latitude']
        var newLong = position['coords']['longitude']

        this.props.changeLatitude(newLat)
        this.props.changeLongitude(newLong)
        this.props.changeAddress('Using Current Location')
      },
        (error) => alert('No GPS location found.'))
      this.props.changeAddress(this.props.homeAddress)
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
    }
  }

  _careSelected (index, value:string) {
    var selectedCategoryCode = this.props.planCategoryList[index].categoryCode
    this.props.getSpecialityTypes(selectedCategoryCode)
    this.props.changeCareType(value)
    this.props.changeSubCategoryCode('')
    this.props.changeSpecialityType('')
    this.setState({unknownCareState: false}, function () {
      this.setState({unknownCareState: true})
    })
  }

  _specialitySelected (index, value:string) {
    var selectedSubCategoryCode = this.props.planSubCategoryList[index].subCategoryCode
    if (this.props.categoryCode == '07' && selectedSubCategoryCode == '999' || selectedSubCategoryCode == '701') {
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      NavigationActions.ProviderTypeInfo()
    } else
    {    
    this.props.changeSubCategoryCode(selectedSubCategoryCode)
    this.props.changeSpecialityType(value)
    this.setState({specialityState: false}, function () {
      this.setState({specialityState: true})
    })
    }
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
        Find Care
      </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    this._resetState()
    this.props.attemptConfigData()
    this.props.attemptStaffLanguage()
    this.props.attemptDoctorLanguage()
    this._getLocation()

    if (this.props.categoryCode != 'ALL') {
      this.setState({specialityState: true})
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.planSubCategoryList && this.state.unknownCareState) {
      this.setState({specialityState: false}, function () {
        this.setState({specialityState: true})
      })
    }
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='white'>
        <Text style={styles.dropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  render () {
    return (
      <View style={styles.container}>

        {this._renderHeader()}
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>
          <View style={styles.careView}>

            <MKTextField
              ref='providerName'
              style={styles.careTextField}
              textInputStyle={{
                flex: 1, color: Colors.flBlue.ocean,
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

            <ModalDropdown options={_.map(this.props.planCategoryList, 'categoryName')} onSelect={this._careSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
              <MKTextField
                ref='careType'
                textInputStyle={{
                  flex: 1, color: Colors.flBlue.ocean,
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
            <Text style={styles.dropdownExampleText}>{I18n.t('careTypeExample')}</Text>

            <HideableView visible={this.state.unknownCareState && this.state.specialityState} removeWhenHidden>
              <ModalDropdown options={_.map(this.props.planSubCategoryList, 'subCategoryName')} onSelect={this._specialitySelected} 
              dropdownStyle={{ height:33*_.map(this.props.planSubCategoryList, 'subCategoryName').length,
              width: Metrics.screenWidth * 0.9,
    marginLeft: Metrics.doubleBaseMargin}} renderRow={this._renderDropdownRow.bind(this)}>
                <MKTextField
                  ref='specialityType'
                  style={styles.careTextField}
                  textInputStyle={{
                    flex: 1, color: Colors.flBlue.ocean,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                  }}
                  editable={false}
                  underlineColorAndroid={Colors.coal}
                  placeholder={I18n.t('specialityTypePlaceholder')}
                  placeholderTextColor={Colors.steel}
                  tintColor={Colors.black}
                  value={this.props.specialityType}
                />
              </ModalDropdown>
              <Text style={styles.dropdownExampleText}>{I18n.t('specialityTypeExample')}</Text>
            </HideableView>
          </View>

          <View style={styles.locationView}>
            <View>
              <Text style={styles.h1}>Change Location:</Text>
            </View>

            <View style={styles.radioView}>
              <MKRadioButton ref='currentLocation' style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                width: Metrics.section * Metrics.screenWidth * 0.0025,
                borderRadius: Metrics.section}} group={this.radioGroup} onCheckedChange={this._selectCurrentLocation} />
              <View style={{width: Metrics.screenWidth}}>
                <TouchableOpacity style={{width: Metrics.screenWidth}} onPress={() => { if (!this.refs.currentLocation.state.checked) this.refs.currentLocation.confirmToggle() }}>
                  <Text style={styles.radioText} >Current Location</Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.radioView}>
              <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                width: Metrics.section * Metrics.screenWidth * 0.0025,
                borderRadius: Metrics.section}} ref='homeLocation' group={this.radioGroup} onCheckedChange={this._selectHomeLocation} />
              <View style={{width: Metrics.screenWidth}}>
                <TouchableOpacity style={{width: Metrics.screenWidth}} onPress={() => { if (!this.refs.homeLocation.state.checked) this.refs.homeLocation.confirmToggle() }}>
                  <Text style={styles.radioText} >Home</Text>
                  <View style={{ marginRight: Metrics.searchBarHeight }}>
                    <Text style={styles.radioBottomText}>({this.props.homeAddress})</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.radioView}>
              <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                width: Metrics.section * Metrics.screenWidth * 0.0025,
                borderRadius: Metrics.section}} ref='differentLocation' group={this.radioGroup} onCheckedChange={this._selectDifferentLocation} />
              <View style={{width: Metrics.screenWidth}}>
                <TouchableOpacity style={{width: Metrics.screenWidth}} onPress={() => { if (!this.refs.differentLocation.state.checked) this.refs.differentLocation.confirmToggle() }}>
                  <Text style={styles.radioText} >Different Location</Text>
                </TouchableOpacity>
              </View>
            </View>

            <HideableView style={{ marginLeft: 15, marginTop: 10 }} visible={this.state.newLocationState} removeWhenHidden>
              <Text for='' style={styles.radioText}>{I18n.t('differentLocationMessage')}</Text>
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

            <View style={{ marginLeft: 15, marginTop: 10 }}>
              <Text style={styles.searchText}> Search Distance:</Text>
              <Text style={{ textAlign: 'center', fontSize: Fonts.size.regular,
                color: Colors.flBlue.anvil }}>{this.props.searchRange} mi</Text>
              <Slider
                value={this.props.searchRange}
                minimumValue={0}
                maximumValue={100}
                step={1}
                maximumTrackTintColor={(Platform.OS === 'ios') ? Colors.flBlue.anvil : Colors.flBlue.ocean}
                minimumTrackTintColor={(Platform.OS === 'ios') ? Colors.flBlue.ocean : Colors.flBlue.night}
                style={{ width: Metrics.screenWidth * 0.87,
                  marginLeft: 10,
                  backgroundColor: Colors.snow
                }}
                //onValueChange={this.props.changeSearchRange}
                onSlidingComplete = { this.props.changeSearchRange }
              />
            </View>
          </View>

          <View style={styles.genderView}>
            {
                this.props.configData != undefined && this.props.configData.gender != undefined ?
                  <Text style={styles.doctorTextStyle}>
                    {this.props.configData.gender.displayName}:
             </Text> : null}

            <View style={{ flexDirection: 'row', marginLeft: 30 }}>
              <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                width: Metrics.section * Metrics.screenWidth * 0.0025,
                borderRadius: Metrics.section}} checked group={this.genderGroup} onCheckedChange={this._anyGenderSelected} />
              <View >
                <Text style={styles.genderText}>Any</Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 20}}>
                <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                  width: Metrics.section * Metrics.screenWidth * 0.0025,
                  borderRadius: Metrics.section}} checked={false} group={this.genderGroup} onCheckedChange={this._maleGenderSelected} />
                <Text style={styles.genderText}>Male</Text>
              </View>

              <View style={{flexDirection: 'row', marginLeft: 20}}>
                <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                  width: Metrics.section * Metrics.screenWidth * 0.0025,
                  borderRadius: Metrics.section}} checked={false} group={this.genderGroup} onCheckedChange={this._femaleGenderSelected} />
                <Text style={styles.genderText}>Female</Text>
              </View>
            </View>
          </View>

          {this.props.configData && this.props.configData.acceptingPatient ?
            <View style={styles.programView}>
              <View style={{ flex: 0.4 }}>

                <Text style={styles.programText}>
                  {this.props.configData.acceptingPatient.displayName}

                </Text>
              </View>

              <View style={{ flex: 0.6, marginTop: 15, marginLeft: 15 }}>

                <ModalDropdown
                  dropdownStyle={styles.dropdown1}
                  options={this.props.configData != undefined && this.props.configData.acceptingPatient != undefined ?
                  _.map(this.props.configData.acceptingPatient.acceptPatientList, 'patientPreference') : null}
                  renderRow={this._renderDropdownRow.bind(this)}
                  onSelect={this._patientTypeSelected}>

                  <MKTextField
                    ref='patientType'
                    style={styles.textField}
                    textInputStyle={{
                      flex: 1,
                      color: Colors.flBlue.ocean,
                   // textAlign:'center',
                    // alignItems:'center',
                   // marginRight:30,

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

          {this.props.configData && this.props.configData.workingHours ?
            <View style={styles.programView}>

              <View style={{ flex: 0.4 }}>

                <Text style={styles.programText}>
                  {this.props.configData.workingHours.displayName}
                </Text>

              </View>

              <View style={{ flex: 0.6, marginTop: 10, marginLeft: 15 }}>

                <ModalDropdown dropdownStyle={styles.dropdown1}
                  onSelect={this._timeSelected}
                  options={this.props.configData != undefined && this.props.configData.workingHours != undefined ?
                  _.map(this.props.configData.workingHours.workHoursList, 'hours') : null}
                  renderRow={this._renderDropdownRow.bind(this)} >

                  <MKTextField
                    ref='Working Hours'
                    textInputStyle={{
                      flex: 1, color: Colors.flBlue.ocean,
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
            <Text style={styles.languageText}>
              Language Selection
            </Text>

            <View style={styles.dropDownView}>
              <View style={{ flex: 0.4 }}>

                <Text style={styles.dropDownText}>
                  Doctor Speaks
            </Text>
              </View>
              <View style={{ flex: 0.6, marginTop: 5 }}>

                <ModalDropdown dropdownStyle={styles.languagedropdown}
                  onSelect={this._doctorLanguageSelected}
                  options={this.props.providerLanguage != undefined ?
                    _.map(this.props.providerLanguages, 'label') : null}
                  renderRow={this._renderDropdownRow.bind(this)} >

                  <MKTextField
                    textInputStyle={{
                      flex: 1, color: Colors.flBlue.ocean,
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
                <Text style={styles.dropDownText}>
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
                      flex: 1, color: Colors.flBlue.ocean,
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
          {this.props.configData && this.props.configData.program ?
            <View style={styles.programView}>
              <View style={{ flex: 0.3 }}>

                <Text style={styles.programText}>
                  {this.props.configData.program.displayName}
                </Text>

              </View>

              <View style={{ flex: 0.7, marginTop: 5 }}>
                <ModalDropdown dropdownStyle={styles.programdropdown}
                  onSelect={this._programSelected}
                  options={this.props.configData != undefined && this.props.configData.program != undefined ?
                  _.map(this.props.configData.program.programList, 'programName') : null}
                  renderRow={this._renderDropdownRow.bind(this)} >

                  <MKTextField
                    textInputStyle={{
                      flex: 1, color: Colors.flBlue.ocean,
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
                  width: Metrics.screenWidth * 0.4,
                  borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                  height: Metrics.screenHeight * 0.06

                }} />
            </TouchableOpacity>
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
    planSubCategoryList: state.provider.planSubCategoryList,
    categoryCode: state.provider.categoryCode,
    subCategoryCode: state.provider.subCategoryCode,
    providerName: state.provider.providerName,
    careType: state.provider.careType,
    officeHours: state.provider.officeHours,
    specialityType: state.provider.specialityType,
    member: state.member,
    locationStatus: state.provider.locationStatus,
    knownCareState: state.provider.knownCareState,
    unknownCareState: state.provider.unknownCareState,
    specialityState: state.provider.specialityState,
    networkCodeList: state.provider.networkCodeList
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
    getSpecialityTypes: (selectedCategoryCode) => dispatch(ProviderActions.sendSpecialityTypeRequest(selectedCategoryCode)),
    changeCategoryCode: (categoryCode) => dispatch(ProviderActions.changeCategoryCode(categoryCode)),
    changeSubCategoryCode: (subCategoryCode) => dispatch(ProviderActions.changeSubCategoryCode(subCategoryCode)),
    changeProviderName: (providerName) => dispatch(ProviderActions.changeProviderName(providerName)),
    changeCareType: (careType) => dispatch(ProviderActions.changeCareType(careType)),
    changeSpecialityType: (specialityType) => dispatch(ProviderActions.changeSpecialityType(specialityType)),
    changeUrgentCareBanner: (showUrgentCareBanner) => dispatch(ProviderActions.changeUrgentCareBanner(showUrgentCareBanner)),
    changeLocationPermissionStatus: (locationStatus) => dispatch(ProviderActions.changeLocationPermissionStatus(locationStatus)),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
