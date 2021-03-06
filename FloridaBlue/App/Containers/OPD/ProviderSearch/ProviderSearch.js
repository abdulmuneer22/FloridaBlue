import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  Platform,
  BackHandler
} from 'react-native'

import React, { Component, PropTypes } from 'react'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import styles from './ProviderSearchStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavItems from '../../../../Navigation/NavItems.js'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, CardItem,Body,Footer, FooterTab, Radio, Button, Fab, Card ,StyleProvider} from 'native-base'
import { MKTextField, MKColor, MKSpinner, MKRadioButton, getTheme, setTheme } from 'react-native-material-kit'
import HideableView from 'react-native-hideable-view'
import ModalDropdown from 'react-native-modal-dropdown'
import ProviderActions from '../../../Redux/ProviderRedux'
import SettingActions from '../../../Redux/SettingRedux'
import _ from 'lodash'
import LinearGradient from 'react-native-linear-gradient'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import DeviceInfo from 'react-native-device-info'


const { height, width } = Dimensions.get('window')
const theme = getTheme()
const Permissions = require('react-native-permissions')
let urlConfig = require('../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

import Orientation from 'react-native-orientation'

const closeIcon = (<Icon name='close'
  size={Metrics.icons.small * Metrics.screenWidth * 0.0035}
  style={{backgroundColor: Colors.transparent}}
  color='#000000' />)

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

class ProviderSearch extends Component {
  constructor (props) {
    super(props)
    this.searchTypeGroup = new MKRadioButton.Group()
    this.locationGroup = new MKRadioButton.Group()
    this._onChecked = this._onChecked.bind(this)
    this._careSelected = this._careSelected.bind(this)
    this._specialitySelected = this._specialitySelected.bind(this)
    this._editLocation = this._editLocation.bind(this)
    this._saveLocation = this._saveLocation.bind(this)
    this._getResults = this._getResults.bind(this)
    this._selectCurrentLocation = this._selectCurrentLocation.bind(this)
    this._selectHomeLocation = this._selectHomeLocation.bind(this)
    this._selectDifferentLocation = this._selectDifferentLocation.bind(this)
    this._urgentCare = this._urgentCare.bind(this)
    this._viewListResults = this._viewListResults.bind(this)

    this.state = {
      knownCareState: false,
      unknownCareState: false,
      specialityState: false,
      changeLocaleState: false,
      customLocationState: false,
      urgentCareState: false,
      floatClicked: false,
      helpStatus: true,
      userWantsResults: false,
      savedProviderStatus: true
    }

    this.handleNeedHelp = this.handleNeedHelp.bind(this)
    this.dismissNeedHelp = this.dismissNeedHelp.bind(this)
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }

  onSelect (index, value) {
    this.setState({helpStatus: false})
  }

  _orientationDidChange (orientation) {
    if (orientation === 'LANDSCAPE') {
      this.props.changeOrientation(false)
      console.log('Hey, Im in landscape mode')
    } else {
      this.props.changeOrientation(true)
      console.log('Hey, Im in portrait mode')
    }
  }

  componentDidMount () {
    gaTracker.trackScreenView('Provider Search')
    this.props.attemptConfigData()
    this.props.attemptCareTypes(this.props.member)
    this._getLocation()
    this._resetState()

    var addressLine1 = this.props.member && this.props.member.defaultContract && this.props.member.defaultContract.homeAddress ? this.props.member.defaultContract.homeAddress.addressline1 : ''
    var addressLine2 = ''
    if (this.props.member && this.props.member.defaultContract && this.props.member.defaultContract.homeAddress && this.props.member.defaultContract.homeAddress.addressline2) {
      var addressLine2 = this.props.member && this.props.member.defaultContract && this.props.member.defaultContract.homeAddress ? this.props.member.defaultContract.homeAddress.addressline2 : ''
    }
    var city = this.props.member && this.props.member.defaultContract && this.props.member.defaultContract.homeAddress ? this.props.member.defaultContract.homeAddress.city : ''
    var state = this.props.member && this.props.member.defaultContract && this.props.member.defaultContract.homeAddress ? this.props.member.defaultContract.homeAddress.state : ''
    var zip = this.props.member && this.props.member.defaultContract && this.props.member.defaultContract.homeAddress ? this.props.member.defaultContract.homeAddress.zipCode : ''

    var fullAddress = addressLine1 + ',' + addressLine2 + ' ' + city + ', ' + state + ' ' + zip
    this.props.changeHomeAddress(fullAddress)
    this.props.changeAddress(fullAddress)

    if (this.props.categoryCode != 'ALL') {
      this.setState({specialityState: true})
    }
    Orientation.addOrientationListener(this._orientationDidChange)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.planSubCategoryList.length > 0 && this.state.unknownCareState) {
      this.setState({specialityState: false}, function () {
        this.setState({specialityState: true})
      })
    }
  }

  handleNeedHelp () {
    let floatClicked1 = this.state.floatClicked
    this.setState({floatClicked: !floatClicked1})
  }

  dismissNeedHelp () {
    this.setState({floatClicked: false})
  }

  _onChecked (event) {
    this.setState({floatClicked: true})
    this.setState({savedProviderStatus: false})
    if (event.checked) {
      this.props.changeSubCategoryCode('')
      this.props.changeCategoryCode('ALL')
      this.props.changeCareType('')
      this.props.changeSpecialityType('')
      this.setState({knownCareState: true})
      this.setState({unknownCareState: false})
    } else {
      this.props.changeProviderName('')
      this.setState({knownCareState: false})
      this.setState({unknownCareState: true})
    }
  }

  _careSelected (index, value:string) {
    let selectedCategoryCode = this.props.planCategoryList[index].categoryCode
    this.props.getSpecialityTypes(selectedCategoryCode)
    this.props.changeCareType(value)
    this.props.changeSubCategoryCode('')
    this.props.changeSpecialityType('')
    this.setState({unknownCareState: false}, function () {
      this.setState({unknownCareState: true})
    })
    gaTracker.trackEvent('Provider Search', 'Care Category ' + value)
  }

  _specialitySelected (index, value:string) {
    let selectedSubCategoryCode = this.props.planSubCategoryList[index].subCategoryCode
    if (this.props.categoryCode == '07' && selectedSubCategoryCode == '999' || selectedSubCategoryCode == '701') {
      gaTracker.trackEvent('Provider Search', 'Speciality Category Pharmacy')
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      NavigationActions.ProviderTypeInfo()
    } else {
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      this.props.changeSpecialityType(value)
      this.setState({specialityState: false}, function () {
        this.setState({specialityState: true})
      })
      gaTracker.trackEvent('Provider Search', 'Speciality Category ' + value)
    }
  }

  _editLocation (event) {
    this.setState({changeLocaleState: true})
    this.setState({specialityState: false})
  }

  _getResults () {
    this.props.changeUrgentCareBanner(false)
    this.setState({userWantsResults: true})
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
      if (this.props.categoryCode == '07' && this.props.subCategoryCode == '700') {
        this.props.attemptPharmacySearch(this.props)
      } else {
        this.props.changeEnd(30)
        this.props.attemptProviderSearch(this.props)
      }
      NavigationActions.DoctorList({type: ActionConst.PUSH_OR_POP})
      this.setState({userWantsResults: false})
    } else {
      Alert.alert(
          'Find care',
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
            { text: 'OK' }
        ])

      // this.props.attemptNetworkList()
      // NavigationActions.DoctorList()
    }
  }

  _viewListResults () {
    gaTracker.trackEvent('Provider Search', 'Urgent Care Search')
    this.props.changeUrgentCareBanner(true)
    this.props.attemptUrgentSearch(this.props)
    NavigationActions.DoctorList({type: ActionConst.PUSH_OR_POP})
  }

  _advancedSearch () {
    gaTracker.trackEvent('Provider Search', 'Advanced Search Opened')
    NavigationActions.AdvancedSearch({navigatingFrom: 'providerSearch'})
  }

  _selectDifferentLocation (event) {
    if (event.checked) {
      this.setState({customLocationState: true})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
      gaTracker.trackEvent('Provider Search', 'Selected Custom Address')
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
      this.setState({changeLocaleState: false})
      this.setState({specialityState: true})
      this.setState({customLocationState: false})
      gaTracker.trackEvent('Provider Search', 'Selected Current Location')
    }
  }

  _selectHomeLocation (event) {
    if (event.checked) {
      this.setState({changeLocaleState: false})
      this.setState({specialityState: true})
      this.setState({customLocationState: false})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
      this.props.changeAddress(this.props.homeAddress)
      gaTracker.trackEvent('Provider Search', 'Selected Home Address')
    }
  }

  _saveLocation (event) {
    this.setState({changeLocaleState: false})
    this.setState({specialityState: true})
    this.setState({customLocationState: false})
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
  }

  _urgentCare () {
    if (this.state.urgentCareState) {
      this.setState({urgentCareState: false})
    } else {
      this.setState({urgentCareState: true})
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

  _renderHeader () {
    return (
      <Image style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage : Images.landscapeHeaderImage}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
          {NavItems.backButton()}
        </View>
        <Text allowFontScaling={false} style={styles.headerTextStyle}>Find Care</Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text allowFontScaling={false} style={styles.dropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={{flex: 13}}>
          <ScrollView>
            <View style={{flex: 1}}>
              <View style={{flex: 1, marginTop: 20}}>
                <Text allowFontScaling={false} style={styles.h1_1}>{I18n.t('providerSearchTitle')}</Text>

                <View style={styles.radioView}>
                  <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                    width: Metrics.section * Metrics.screenWidth * 0.0025,
                    borderRadius: Metrics.section}} group={this.searchTypeGroup} onCheckedChange={this._onChecked} />
                  <Text allowFontScaling={false} style={styles.radioText}>{I18n.t('yesTitle')}</Text>
                  <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                    width: Metrics.section * Metrics.screenWidth * 0.0025,
                    borderRadius: Metrics.section
                  }} group={this.searchTypeGroup} />
                  <Text allowFontScaling={false} style={styles.radioText}>{I18n.t('noTitle')}</Text>
                </View>
              </View>

               <HideableView style={{flex:1, alignItems:'center', justifyContent: 'center'}} removeWhenHidden={true} visible={this.state.savedProviderStatus}>
                 <Text allowFontScaling={false} style={styles.h1_2}>Already saved your provider?</Text>
                 <Text allowFontScaling={false} style={styles.h1_3}>View Saved Providers</Text>
               </HideableView>

              <HideableView visible={this.state.knownCareState} removeWhenHidden >
                <Text allowFontScaling={false} style={[styles.h2, {width: 10}]}>{I18n.t('knownCareMessage')}</Text>
                <MKTextField
                  ref='providerName'
                  style={styles.textField}
                  textInputStyle={{flex: 1,
                    color: Colors.flBlue.ocean,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid={Colors.coal}
                  placeholder={I18n.t('providerPlaceholder')}
                  placeholderTextColor={Colors.steel}
                  onChangeText={this.props.changeProviderName}
            />
              </HideableView>

              <HideableView visible={this.state.unknownCareState && (this.props.planCategoryList.length > 0)} removeWhenHidden>
                <ModalDropdown options={_.map(this.props.planCategoryList, 'categoryName')} onSelect={this._careSelected} dropdownStyle={this.props.isPortrait ? styles.dropDown : styles.dropDownLandscape} renderRow={this._renderDropdownRow.bind(this)}>
                  <MKTextField
                    ref='careType'
                    textInputStyle={{flex: 1,
                      color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                    style={[styles.textField, {width: this.props.isPortrait ? 410 : 668}]}
                    editable={false}
                    underlineColorAndroid={Colors.coal}
                    placeholder={I18n.t('careTypePlaceholder')}
                    placeholderTextColor={Colors.steel}
                    tintColor={Colors.black}
                    value={this.props.careType}
              />
                </ModalDropdown>
                <Text allowFontScaling={false} style={styles.dropdownExampleText}>{I18n.t('careTypeExample')}</Text>
              </HideableView>

              <HideableView visible={this.state.unknownCareState && this.state.specialityState && (this.props.planSubCategoryList.length > 0)} removeWhenHidden>
                <ModalDropdown options={_.map(this.props.planSubCategoryList, 'subCategoryName')}
                  onSelect={this._specialitySelected} dropdownStyle={this.props.isPortrait ? this.props.planSubCategoryList.length >= 2 || this.props.planSubCategoryList[this.props.planSubCategoryList.length - 1] == '' ? styles.dropDown : styles.dropD : this.props.planSubCategoryList.length >= 2 || this.props.planSubCategoryList[this.props.planSubCategoryList.length - 1] == '' ? styles.dropDownLandscape : styles.dropDLandscape}
                  renderRow={this._renderDropdownRow.bind(this)}
                // adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                >
                  <MKTextField
                    ref='specialityType'
                    style={styles.textField}
                    textInputStyle={{flex: 1,
                      color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                    editable={false}
                    underlineColorAndroid={Colors.coal}
                    placeholder={I18n.t('specialityTypePlaceholder')}
                    placeholderTextColor={Colors.steel}
                    tintColor={Colors.black}
                    value={this.props.specialityType}
              />
                </ModalDropdown>
                <Text allowFontScaling={false} style={styles.dropdownExampleText}>{I18n.t('specialityTypeExample')}</Text>
              </HideableView>

              <HideableView visible={!this.state.changeLocaleState && (this.state.unknownCareState || this.state.knownCareState)} removeWhenHidden>
                <View style={[styles.locationView]}>
                  <View style={styles.locationTextContainer}>
                    <Text allowFontScaling={false} style={styles.h2}>{I18n.t('memberLocationTitle')}</Text>
                    <Text allowFontScaling={false} style={styles.currentLocationText}>{this.props.address}</Text>
                  </View>
                  <View style={styles.locationButtonContainer}>
                    <TouchableOpacity style={styles.editLocation} onPress={this._editLocation}>
                      <Flb name='pencil' style={styles.editLocationIcon} size={Metrics.icons.small * Metrics.screenWidth * 0.0025} color={Colors.flBlue.anvil} />
                      <Text allowFontScaling={false} style={styles.editLocationText}>{I18n.t('editLocationButton')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </HideableView>

              <HideableView style={styles.editLocationView} visible={this.state.changeLocaleState} removeWhenHidden>
                <View style={styles.mapIcon}>
                  <Image source={Images.mapUnselectedIcon} />
                  <Text allowFontScaling={false} style={styles.changeLocationHeader}>{I18n.t('changeLocationTitle')}</Text>
                </View>

                <View style={styles.locationRadio}>
                  <MKRadioButton ref='currentLocation' style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectCurrentLocation} />
                  <View style={{width: Metrics.screenWidth}}>
                    <TouchableOpacity style={{width: Metrics.screenWidth}} onPress={() => { if (!this.refs.currentLocation.state.checked) this.refs.currentLocation.confirmToggle() }}>
                      <Text allowFontScaling={false} style={styles.radioText} >Current Location</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} ref='homeLocation' group={this.locationGroup} onCheckedChange={this._selectHomeLocation} />
                  <TouchableOpacity style={{width: Metrics.screenWidth}} onPress={() => { if (!this.refs.homeLocation.state.checked) this.refs.homeLocation.confirmToggle() }}>
                    <Text allowFontScaling={false} style={styles.radioText}>{I18n.t('homeLocationTitle')}</Text>
                  </TouchableOpacity>
                </View>
                <Text allowFontScaling={false} style={styles.locationText}>({this.props.homeAddress})</Text>
                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} ref='differentLocation' group={this.locationGroup} onCheckedChange={this._selectDifferentLocation} />
                  <View style={{width: Metrics.screenWidth}}>
                    <TouchableOpacity style={{width: Metrics.screenWidth}} onPress={() => { if (!this.refs.differentLocation.state.checked) this.refs.differentLocation.confirmToggle() }}>
                      <Text allowFontScaling={false} style={styles.radioText} >{I18n.t('differentLocationTitle')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </HideableView>

              <HideableView style={{backgroundColor: Colors.flBlue.grey1, paddingBottom: Metrics.doubleBaseMargin}} visible={this.state.changeLocaleState && !this.state.customLocationState} removeWhenHidden />

              <HideableView style={styles.differentLocationView} visible={(this.state.unknownCareState || this.state.knownCareState) && this.state.customLocationState} removeWhenHidden>
                <Text allowFontScaling={false} allowFontScaling={false} style={styles.newLocationHeader}>{I18n.t('differentLocationMessage')}</Text>
                <MKTextField
                  ref='newLocation'
                  style={styles.newLocationField}
                  textInputStyle={{flex: 1,
                    color: Colors.flBlue.ocean,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                  }}
                  editable
                  underlineColorAndroid={Colors.coal}
                  placeholderTextColor={Colors.steel}
                  tintColor={Colors.black}
                  onChangeText={this.props.changeAddress}
            />

                <TouchableOpacity style={styles.saveLocation} onPress={this._saveLocation}>
                  <Image source={Images.saveLocationButton} style={styles.saveLocationButton} />
                </TouchableOpacity>
              </HideableView>

              <HideableView visible={this.state.knownCareState || this.state.unknownCareState} removeWhenHidden>
                <TouchableOpacity style={styles.getResults} onPress={this._getResults}>
                  <Image source={Images.getResultsButton} style={styles.getResultsButton} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.advancedSearchLink} onPress={this._advancedSearch}>
                  <View style={styles.advancedSearchContainer}>
                    <Flb name='search-find' size={Metrics.icons.xm * Metrics.screenWidth * 0.0026} color={Colors.flBlue.anvil} />
                    <Text allowFontScaling={false} style={styles.advancedSearchLinkText}>{I18n.t('advancedSearchButton')}</Text>
                  </View>
                </TouchableOpacity>
              </HideableView>
            </View>
          </ScrollView>
        </View>

        <View style={{flex: 1}}>
          {
            this.state.floatClicked

            ? this.state.helpStatus
              ? <View style={styles.urgentCareCircle}>
                <TouchableOpacity onPress={this.handleNeedHelp}>
                  <Flb name='urgent-care-circle'
                    style={{backgroundColor: Colors.transparent}}
                    color={Colors.flBlue.red} size={Metrics.icons.large * Metrics.screenWidth * 0.0035} />
                </TouchableOpacity>
              </View>
          : <View>{this.state._onChecked}</View>

          :

          <Card style={{
            width: Metrics.screenWidth * 0.9,
            height: Metrics.screenWidth * 0.9,
          flex: 1,
          // zIndex: -1,
          // backgroundColor:'red',
            borderWidth: 1,
            borderRadius: Metrics.screenWidth * 1,
            borderColor: Colors.flBlue.grey1,
            position: 'absolute',
            bottom: -Metrics.textHeight1 * Metrics.screenWidth * 0.005,
            right: -Metrics.textHeight2 * Metrics.screenWidth * 0.0035
            }}>
            <Flb name='close-delete' style={styles.dismissUrgentIcon}
              color={Colors.flBlue.grey4} size={Metrics.icons.small * Metrics.screenWidth * 0.0035}
              onPress={this.handleNeedHelp} />

            <Text allowFontScaling={false} style={styles.needHelpText}>Need Help Now?</Text>
            <Text allowFontScaling={false} style={styles.urgentCareMessage}>We can show you a list of urgent care centers closest to you.</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TouchableOpacity style={styles.viewListResults} onPress={this._viewListResults}>
                  <Image source={Images.viewListButton} style={styles.viewListButton} />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: (Platform.OS === 'ios') ? Metrics.section * Metrics.screenHeight * 0.0014 : Metrics.section * Metrics.screenHeight * 0.0016,
                marginLeft: (Platform.OS === 'ios') ? Metrics.smallMargin * Metrics.screenWidth * 0.0035 : Metrics.smallMargin * Metrics.screenWidth * 0.0038}}>
                <Flb name='urgent-care-circle' onPress={this.handleNeedHelp}
                  color={Colors.flBlue.red} size={Metrics.icons.large * Metrics.screenWidth * 0.0035} />
              </View>
            </View>
          </Card>


          }
        </View>

      </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    planCategoryList: state.provider.planCategoryList,
    planSubCategoryList: state.provider.planSubCategoryList,
    categoryCode: state.provider.categoryCode,
    subCategoryCode: state.provider.subCategoryCode,
    providerName: state.provider.providerName,
    careType: state.provider.careType,
    specialityType: state.provider.specialityType,
    knownCareState: state.provider.knownCareState,
    unknownCareState: state.provider.unknownCareState,
    specialityState: state.provider.specialityState,
    changeLocaleState: state.provider.changeLocaleState,
    customLocationState: state.provider.customLocationState,
    currentLocation: state.provider.currentLocation,
    latitude: state.provider.latitude,
    longitude: state.provider.longitude,
    address: state.provider.address,
    homeAddress: state.provider.homeAddress,
    member: state.member,
    urgentCareState: state.urgentCareState,
    networkCodeList: state.provider.networkCodeList,
    showUrgentCareBanner: state.provider.showUrgentCareBanner,
    searchRange: state.provider.searchRange,
    start: state.provider.start,
    configData: state.provider.configData,
    geolocationEnabled: state.setting.geolocationEnabled,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptConfigData: () => dispatch(ProviderActions.sendConfigTypeRequest()),
    attemptCareTypes: (member) => dispatch(ProviderActions.sendCareTypeRequest(member)),
    changeEnd: (end) => dispatch(ProviderActions.changeEnd(end)),
    getSpecialityTypes: (selectedCategoryCode) => dispatch(ProviderActions.sendSpecialityTypeRequest(selectedCategoryCode)),
    attemptProviderSearch: (data) => dispatch(ProviderActions.sendProviderSearchRequest(data)),
    attemptPharmacySearch: (data) => dispatch(ProviderActions.sendPharmacySearchRequest(data)),
    attemptUrgentSearch: (data) => dispatch(ProviderActions.sendUrgentSearchRequest(data)),
    changeCategoryCode: (categoryCode) => dispatch(ProviderActions.changeCategoryCode(categoryCode)),
    changeSubCategoryCode: (subCategoryCode) => dispatch(ProviderActions.changeSubCategoryCode(subCategoryCode)),
    changeProviderName: (providerName) => dispatch(ProviderActions.changeProviderName(providerName)),
    changeCareType: (careType) => dispatch(ProviderActions.changeCareType(careType)),
    changeSpecialityType: (specialityType) => dispatch(ProviderActions.changeSpecialityType(specialityType)),
    changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeAddress: (address) => dispatch(ProviderActions.changeAddress(address)),
    changeHomeAddress: (homeAddress) => dispatch(ProviderActions.changeHomeAddress(homeAddress)),
    changeUrgentCareBanner: (showUrgentCareBanner) => dispatch(ProviderActions.changeUrgentCareBanner(showUrgentCareBanner)),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest()),
    changeGeolocationEnabled: (geolocationEnabled) => dispatch(SettingActions.changeGeolocationEnabled(geolocationEnabled)),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSearch)
