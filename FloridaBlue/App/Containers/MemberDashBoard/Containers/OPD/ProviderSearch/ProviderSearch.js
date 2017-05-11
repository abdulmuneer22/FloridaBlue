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
  BackAndroid
} from 'react-native'

import React, { Component, PropTypes } from 'react'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './ProviderSearchStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavItems from '../../../../../Navigation/NavItems.js'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Radio, Button, Fab, Card } from 'native-base'
import { MKTextField, MKColor, MKSpinner, MKRadioButton, getTheme, setTheme } from 'react-native-material-kit'
import HideableView from 'react-native-hideable-view'
import ModalDropdown from 'react-native-modal-dropdown'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'
import ActionButton from 'react-native-action-button'
import LinearGradient from 'react-native-linear-gradient'

const closeIcon = (<Icon name='close'
  size={Metrics.icons.small * Metrics.screenWidth * 0.0035}
  style={{backgroundColor: Colors.transparent}}
  color='#000000' />)

const { height, width } = Dimensions.get('window')
const theme = getTheme()
const Permissions = require('react-native-permissions')
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
      userWantsResults: false
    }

    this.handleNeedHelp = this.handleNeedHelp.bind(this)
    this.dismissNeedHelp = this.dismissNeedHelp.bind(this)
  }

  onSelect (index, value) {
    this.setState({helpStatus: false})
  }

  componentDidMount () {
    this.props.attemptCareTypes()
    this._getLocation()
    this._resetState()

    var addressLine1 = this.props.member.defaultContract.homeAddress.addressline1
    var addressLine2 = ''
    if (this.props.member.defaultContract.homeAddress.addressline2) {
      var addressLine2 = this.props.member.defaultContract.homeAddress.addressline2
    }
    var city = this.props.member.defaultContract.homeAddress.city
    var state = this.props.member.defaultContract.homeAddress.state
    var zip = this.props.member.defaultContract.homeAddress.zipCode

    var fullAddress = addressLine1 + addressLine2 + ' ' + city + ', ' + state + ' ' + zip
    this.props.changeHomeAddress(fullAddress)
    this.props.changeAddress(fullAddress)

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

    if (newProps.networkCodeList && this.state.userWantsResults) {
      this._getResults()
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
    //this.handleNeedHelp()
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
    this.props.changeSubCategoryCode(selectedSubCategoryCode)
    this.props.changeSpecialityType(value)
    this.setState({specialityState: false}, function () {
      this.setState({specialityState: true})
    })
  }

  _editLocation (event) {
    this.setState({changeLocaleState: true})
    this.setState({specialityState: false})
  }

  _getResults () {
    this.props.changeUrgentCareBanner(false)
    this.setState({userWantsResults: true})

    if (this.props.networkCodeList) {
      if (this.props.categoryCode == '07' && this.props.subCategoryCode == '700') {
        this.props.attemptPharmacySearch(this.props)
      } else {
        this.props.attemptProviderSearch(this.props)
      }

      NavigationActions.DoctorList()
      this.setState({userWantsResults: false})
    } else {
      this.props.attemptNetworkList()
    }
  }

  _viewListResults () {
    this.props.changeUrgentCareBanner(true)
    this.props.attemptUrgentSearch(this.props)
    NavigationActions.DoctorList()
  }

  _advancedSearch () {
    NavigationActions.AdvancedSearch()
  }

  _selectDifferentLocation (event) {
    if (event.checked) {
      this.setState({customLocationState: true})
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
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
      this.setState({changeLocaleState: false})
      this.setState({specialityState: true})
      this.setState({customLocationState: false})
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
    if (this.props.locationStatus == '' || this.props.locationStatus != 'authorized') {
      var locationStatus = ''
      Permissions.getPermissionStatus('location')
      .then(response => {
        locationStatus = response
        if (response == 'authorized') {
          this.props.changeLocationPermissionStatus(response)
          this._getPosition()
        } else if (response == 'undetermined') {
          Permissions.requestPermission('location')
          .then(response => {
            this.props.changeLocationPermissionStatus(response)
            locationStatus = response
            if (response == 'authorized') {
              this._getPosition()
            }
          })
        }
      })
      this.props.changeLocationPermissionStatus(locationStatus)
    } else if (this.props.locationStatus == 'authorized') {
      this._getPosition()
    }
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
    (position) => {
      var newLat = position['coords']['latitude']
      var newLong = position['coords']['longitude']

      this.props.changeLatitude(newLat)
      this.props.changeLongitude(newLong)
      this.props.changeAddress('Using Current Location')
    },
      (error) => alert("No GPS location found."))
      this.props.changeAddress(this.props.homeAddress)
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
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

  _renderHeader () {
    return (
      <Image style={styles.headerContainer} source={Images.themeHeader}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
          {NavItems.backButton()}
        </View>
        <Text style={styles.headerTextStyle}>Find Care</Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text style={styles.dropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

   _dropdown_3_adjustFrame(style) {
    console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}, right:${style.right}}`);
   // style.top -= 15;
   // style.left += 150;
   style.height -=140
    return style;
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={{flex: 13}}>
          <ScrollView>
            <View style={{flex: 1}}>
              <View style={{flex:1, margin:10}}>
              <Text style={styles.h1_1}>{I18n.t('providerSearchTitle')}</Text>

              <View style={styles.radioView}>
                <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                  width: Metrics.section * Metrics.screenWidth * 0.0025,
                  borderRadius: Metrics.section}} group={this.searchTypeGroup} onCheckedChange={this._onChecked} />
                <Text style={styles.radioText}>{I18n.t('yesTitle')}</Text>
                <MKRadioButton style={{height: Metrics.section * Metrics.screenWidth * 0.0025,
                  width: Metrics.section * Metrics.screenWidth * 0.0025,
                  borderRadius: Metrics.section
                }} group={this.searchTypeGroup} />
                <Text style={styles.radioText}>{I18n.t('noTitle')}</Text>
              </View>
              </View>
              <HideableView visible={this.state.knownCareState} removeWhenHidden>
                <Text style={styles.h2}>{I18n.t('knownCareMessage')}</Text>
                <MKTextField
                  ref='providerName'
                  style={styles.textField}
                  textInputStyle={{flex: 1, color: Colors.flBlue.ocean,
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

              <HideableView visible={this.state.unknownCareState} removeWhenHidden>
                <ModalDropdown options={_.map(this.props.planCategoryList, 'categoryName')} onSelect={this._careSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
                  <MKTextField
                    ref='careType'
                    textInputStyle={{flex: 1, color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
                    style={styles.textField}
                    editable={false}
                    underlineColorAndroid={Colors.coal}
                    placeholder={I18n.t('careTypePlaceholder')}
                    placeholderTextColor={Colors.steel}
                    tintColor={Colors.black}
                    value={this.props.careType}
              />
                </ModalDropdown>
                <Text style={styles.dropdownExampleText}>{I18n.t('careTypeExample')}</Text>
              </HideableView>

              <HideableView visible={this.state.unknownCareState && this.state.specialityState} removeWhenHidden>
                <ModalDropdown options={_.map(this.props.planSubCategoryList, 'subCategoryName')} 
                onSelect={this._specialitySelected} dropdownStyle={styles.dropdown} 
                renderRow={this._renderDropdownRow.bind(this)} 
                //adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                >
                  <MKTextField
                    ref='specialityType'
                    style={styles.textField}
                    textInputStyle={{flex: 1, color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
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

              <HideableView visible={!this.state.changeLocaleState && (this.state.unknownCareState || this.state.knownCareState)} removeWhenHidden>
                <View style={[styles.locationView]}>
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.h2}>{I18n.t('memberLocationTitle')}</Text>
                    <Text style={styles.currentLocationText}>{this.props.address}</Text>
                  </View>
                  <View style={styles.locationButtonContainer}>
                    <TouchableOpacity style={styles.editLocation} onPress={this._editLocation}>
                      <Flb name='pencil' style={styles.editLocationIcon} size={Metrics.icons.small} color={Colors.flBlue.anvil} />
                      <Text style={styles.editLocationText}>{I18n.t('editLocationButton')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </HideableView>

              <HideableView style={styles.editLocationView} visible={this.state.changeLocaleState} removeWhenHidden>
                <View style={styles.mapIcon}>
                  <Image source={Images.mapUnselectedIcon} />
                  <Text style={styles.changeLocationHeader}>{I18n.t('changeLocationTitle')}</Text>
                </View>

                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio}  group={this.locationGroup} onCheckedChange={this._selectCurrentLocation} />
                  <Text style={styles.radioText}>{I18n.t('currentLocationTitle')}</Text>
                </View>
                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectHomeLocation} />
                  <Text style={styles.radioText}>{I18n.t('homeLocationTitle')}</Text>
                </View>
                <Text style={styles.locationText}>({this.props.homeAddress})</Text>
                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectDifferentLocation} />
                  <Text style={styles.radioText}>{I18n.t('differentLocationTitle')}</Text>
                </View>
              </HideableView>

              <HideableView style={{backgroundColor: Colors.flBlue.grey1, paddingBottom: Metrics.doubleBaseMargin}} visible={this.state.changeLocaleState && !this.state.customLocationState} removeWhenHidden />

              <HideableView style={styles.differentLocationView} visible={(this.state.unknownCareState || this.state.knownCareState) && this.state.customLocationState} removeWhenHidden>
                <Text style={styles.newLocationHeader}>{I18n.t('differentLocationMessage')}</Text>
                <MKTextField
                  ref='newLocation'
                  style={styles.newLocationField}
                  textInputStyle={{flex: 1, color: Colors.flBlue.ocean,
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
                    <Text style={styles.advancedSearchLinkText}>{I18n.t('advancedSearchButton')}</Text>
                  </View>
                </TouchableOpacity>
              </HideableView>
            </View>
          </ScrollView>
        </View>

        <View style={{flex: 2}}>
          {
            this.state.floatClicked ?

            this.state.helpStatus ?
            <View style={styles.urgentCareCircle}>
              <TouchableOpacity onPress={this.handleNeedHelp}>
                <Flb name='urgent-care-circle'
                  color='red' size={Metrics.icons.large * Metrics.screenWidth * 0.0035} />
              </TouchableOpacity>
            </View>
          : <View>{this.state._onChecked}</View>

          : <Card style={styles.urgentCareContainer}>


            <Flb name='close-delete' style={styles.dismissUrgentIcon}
                  color={Colors.flBlue.anvil} size={Metrics.icons.small * Metrics.screenWidth * 0.0035}
                  onPress={this.handleNeedHelp} />

            <Text style={styles.needHelpText}>Need Help Now?</Text>
            <Text style={styles.urgentCareMessage}>We can show you a list of urgent care centers closest to you.</Text>
            <View style={{flexDirection:'row'}}>
              <View>
            <TouchableOpacity style={styles.viewListResults} onPress={this._viewListResults}>
              <Image source={Images.viewListButton} style={styles.viewListButton} />
            </TouchableOpacity>
            </View>
          <View style={{marginTop: (Platform.OS === 'ios') ? Metrics.section * Metrics.screenHeight * 0.001 : Metrics.section * Metrics.screenHeight * 0.00127, marginLeft:7}}>
            <Flb name='urgent-care-circle' onPress={this.handleNeedHelp}
                  color='red' size={Metrics.icons.large * Metrics.screenWidth * 0.0035} />
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
    locationStatus: state.provider.locationStatus,
    showUrgentCareBanner: state.provider.showUrgentCareBanner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptCareTypes: () => dispatch(ProviderActions.sendCareTypeRequest()),
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
    changeLocationPermissionStatus: (locationStatus) => dispatch(ProviderActions.changeLocationPermissionStatus(locationStatus)),
    changeUrgentCareBanner: (showUrgentCareBanner) => dispatch(ProviderActions.changeUrgentCareBanner(showUrgentCareBanner)),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderSearch)
