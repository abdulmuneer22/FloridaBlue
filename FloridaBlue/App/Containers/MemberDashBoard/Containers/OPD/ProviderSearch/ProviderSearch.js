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
import NavItems from '../../../../../Navigation/NavItems.js'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Radio, Button, Icon, Fab } from 'native-base'
import { MKTextField, MKColor, MKSpinner, MKRadioButton, getTheme } from 'react-native-material-kit'
import HideableView from 'react-native-hideable-view'
import ModalDropdown from 'react-native-modal-dropdown'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'
import ActionButton from 'react-native-action-button';

const theme = getTheme()
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

  class ProviderSearch extends Component {

    constructor(props) {
       super(props);
       this.searchTypeGroup = new MKRadioButton.Group();
       this.locationGroup = new MKRadioButton.Group();
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

       this.state = {
         knownCareState: false,
         unknownCareState: false,
         specialityState: false,
         currentLocaleState: false,
         newLocationState: false,
         savedProviderState: true,
         urgentCareState: false
       }
    }

    componentDidMount() {
      this._resetState()
      this.props.attemptCareTypes()
    }

    _onChecked(event) {
      if (event.checked) {
        this.props.changeSubCategoryCode("")
        this.props.changeCategoryCode("ALL")
        this.setState({knownCareState: true})
        this.setState({unknownCareState: false})
        this.setState({savedProviderState: false})
      } else {
        this.props.changeProviderName("")
        this.setState({knownCareState: false})
        this.setState({unknownCareState: true})
        this.setState({savedProviderState: false})
      }
    }

    _careSelected(index, value:string) {
      var selectedCategoryCode = this.props.planCategoryList[index].categoryCode
      this.props.getSpecialityTypes(selectedCategoryCode)
      this.props.changeCareType(value)
      this.setState({unknownCareState: false}, function() {
        this.setState({unknownCareState: true})
      })
      this.setState({specialityState: true})

    }

    _specialitySelected(index, value:string) {
      var selectedSubCategoryCode = this.props.planSubCategoryList[index].subCategoryCode
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      this.props.changeSpecialityType(value)
      this.setState({specialityState: false}, function() {
        this.setState({specialityState: true})
      })
    }

    _editLocation(event) {
      this.setState({currentLocaleState: true})
      this.setState({specialityState: false})
    }

    _getResults() {
      if (this.props.categoryCode == "07" && this.props.subCategoryCode == "700") {
          this.props.attemptPharmacySearch(this.props)
      } else {
          this.props.attemptProviderSearch(this.props)
      }

      NavigationActions.DoctorList()
    }

    _advancedSearch() {
      NavigationActions.AdvancedSearch()
    }

    _selectDifferentLocation(event) {
      if (event.checked) {
        this.setState({newLocationState: true})
        this.props.changeLatitude(0)
        this.props.changeLongitude(0)
      }
    }

    _selectCurrentLocation(event) {
      if (event.checked) {
        this.setState({currentLocaleState: false})
        this.setState({specialityState: true})
        this.setState({newLocationState: false})
        this.props.changeAddress("Using Current Address")

        this._getLocation()
      }
    }

    _selectHomeLocation(event) {
      if (event.checked) {
        this.setState({currentLocaleState: false})
        this.setState({specialityState: true})
        this.setState({newLocationState: false})
        this.props.changeLatitude(0)
        this.props.changeLongitude(0)
        this.props.changeAddress(this.props.homeAddress)
      }
    }

    _saveLocation(event) {
      this.setState({currentLocaleState: false})
      this.setState({specialityState: true})
      this.setState({newLocationState: false})
    }

    _resetState() {
      this.props.changeSubCategoryCode("")
      this.props.changeCategoryCode("ALL")
      this.props.changeProviderName("")
      this.props.changeCareType("")
      this.props.changeSpecialityType("")
      this.props.changeCurrentLocation("Unknown")
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
      this.props.changeAddress("Jacksonville, FL 32246")

      var addressLine1 = this.props.member.defaultContract.homeAddress.addressline1
      var addressLine2 = ""
      if (this.props.member.defaultContract.homeAddress.addressline2) {
        var addressLine2 = this.props.member.defaultContract.homeAddress.addressline2
      }
      var city = this.props.member.defaultContract.homeAddress.city
      var state = this.props.member.defaultContract.homeAddress.state
      var zip = this.props.member.defaultContract.homeAddress.zipCode

      var fullAddress = addressLine1 + addressLine2 + " " + city + ", " + state + " " + zip
      this.props.changeHomeAddress(fullAddress)
    }

    _urgentCare() {
      console.tron.log("Urgent care selected..")
      if (this.state.urgentCareState) {
        this.setState({urgentCareState: false})
      } else {
        this.setState({urgentCareState: true})
      }
    }

    _getLocation() {

      navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.changeCurrentLocation(position)

        var newLat = position["coords"]["latitude"]
        var newLong = position["coords"]["longitude"]

        this.props.changeLatitude(newLat)
        this.props.changeLongitude(newLong)
      },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      });
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

    _renderDropdownRow(rowData, rowID, highlighted) {
      return (
        <TouchableHighlight underlayColor={Colors.snow}>
            <Text style={styles.dropdownItem}>{rowData}</Text>
        </TouchableHighlight>
      )
    }

    render () {
      return (
        <View style={styles.container}>
          {this._renderHeader()}
          <View style={{flex:9}}>
          <ScrollView>
            <View style={{flex:1}}>
              <Text style={styles.h1}>{I18n.t('providerSearchTitle')}</Text>

              <View style={styles.radioView}>
                <MKRadioButton group={this.searchTypeGroup} onCheckedChange={this._onChecked} />
                <Text style={styles.radioText}>{I18n.t('yesTitle')}</Text>
                <MKRadioButton group={this.searchTypeGroup} />
                <Text style={styles.radioText}>{I18n.t('noTitle')}</Text>
              </View>

              <HideableView visible={this.state.savedProviderState} removeWhenHidden={true}>
                <Text style={styles.subheading}>{I18n.t('savedProviderMessage')}</Text>
                <TouchableOpacity style={styles.savedProviderLink}>
                  <Text style={styles.savedProviderLinkText}>{I18n.t('savedProviderButton')}</Text>
                </TouchableOpacity>
              </HideableView>

              <HideableView visible={this.state.knownCareState} removeWhenHidden={true}>
                <Text style={styles.h2}>{I18n.t('knownCareMessage')}</Text>
                <MKTextField
                  ref='providerName'
                  style={styles.textField}
                  textInputStyle={{flex: 1}}
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

              <HideableView visible={this.state.unknownCareState} removeWhenHidden={true}>
                <ModalDropdown options={_.map(this.props.planCategoryList, 'categoryName')} onSelect={this._careSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
                  <MKTextField
                    ref='careType'
                    textInputStyle={{flex: 1}}
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

              <HideableView visible={this.state.unknownCareState && this.state.specialityState} removeWhenHidden={true}>
                <ModalDropdown options={_.map(this.props.planSubCategoryList, 'subCategoryName')} onSelect={this._specialitySelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
                  <MKTextField
                    ref='specialityType'
                    style={styles.textField}
                    textInputStyle={{flex: 1}}
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

              <HideableView visible={this.state.unknownCareState && this.state.currentLocaleState == false} removeWhenHidden={true}>
                <View style={[styles.locationView]}>
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.h2}>{I18n.t('memberLocationTitle')}</Text>
                    <Text style={styles.currentLocationText}>{this.props.address}</Text>
                  </View>
                  <View style={styles.locationButtonContainer}>
                    <TouchableOpacity style={styles.editLocation} onPress={this._editLocation}>
                      <Flb name="pencil" style={styles.editLocationIcon} size={Metrics.icons.small} color={Colors.flBlue.anvil} />
                      <Text style={styles.editLocationText}>{I18n.t('editLocationButton')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </HideableView>

              <HideableView style={styles.editLocationView} visible={this.state.unknownCareState && this.state.currentLocaleState} removeWhenHidden={true}>
                <View style={styles.mapIcon}>
                  <Image source={Images.mapUnselectedIcon} />
                  <Text style={styles.changeLocationHeader}>{I18n.t('changeLocationTitle')}</Text>
                </View>

                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectCurrentLocation}/>
                  <Text style={styles.radioText}>{I18n.t('currentLocationTitle')}</Text>
                </View>
                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectHomeLocation}/>
                  <Text style={styles.radioText}>{I18n.t('homeLocationTitle')}</Text>
                </View>
                <Text style={styles.locationText}>({this.props.homeAddress})</Text>
                <View style={styles.locationRadio}>
                  <MKRadioButton style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectDifferentLocation}/>
                  <Text style={styles.radioText}>{I18n.t('differentLocationTitle')}</Text>
                </View>
              </HideableView>

              <HideableView style={{backgroundColor: Colors.flBlue.grey1, paddingBottom: Metrics.doubleBaseMargin}} visible={this.state.currentLocaleState && !this.state.newLocationState && this.state.unknownCareState} removeWhenHidden={true}></HideableView>

              <HideableView style={styles.differentLocationView} visible={this.state.unknownCareState && this.state.newLocationState} removeWhenHidden={true}>
                <Text style={styles.newLocationHeader}>{I18n.t('differentLocationMessage')}</Text>
                <MKTextField
                  ref='newLocation'
                  style={styles.newLocationField}
                  textInputStyle={{flex: 1}}
                  editable={true}
                  underlineColorAndroid={Colors.coal}
                  placeholderTextColor={Colors.steel}
                  tintColor={Colors.black}
                  onChangeText={this.props.changeAddress}
                />

                <TouchableOpacity style={styles.saveLocation} onPress={this._saveLocation}>
                  <Image source={Images.saveLocationButton} style={styles.saveLocationButton} />
                </TouchableOpacity>
              </HideableView>

              <HideableView visible={this.state.knownCareState || this.state.unknownCareState} removeWhenHidden={true}>
                <TouchableOpacity style={styles.getResults} onPress={this._getResults}>
                  <Image source={Images.getResultsButton} style={styles.getResultsButton} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.advancedSearchLink} onPress={this._advancedSearch}>
                  <View style={styles.advancedSearchContainer}>
                    <Flb name="search-find" size={Metrics.icons.small} color={Colors.flBlue.anvil} />
                    <Text style={styles.advancedSearchLinkText}>{I18n.t('advancedSearchButton')}</Text>
                  </View>
                </TouchableOpacity>
              </HideableView>


            </View>



               </ScrollView>
               </View>

                <View style={{flex:4}}>
                <HideableView visible={this.state.urgentCareState} removeWhenHidden={true}>
                  <Text>Need help now?</Text>
                  <Text>We can show you a list of urgent care centers close to you</Text>
                </HideableView>
                <View style={{flex:1}}>
                <ActionButton
                  buttonColor="rgba(231,76,60,1)"
                  onPress={this._urgentCare}
                  position="right"
                  offsetX={10}
                  offsetY={50}
                />
                </View>
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
      savedProviderState: state.provider.savedProviderState,
      specialityState: state.provider.specialityState,
      currentLocaleState: state.provider.currentLocaleState,
      newLocationState: state.provider.newLocationState,
      currentLocation: state.provider.currentLocation,
      latitude: state.provider.latitude,
      longitude: state.provider.longitude,
      address: state.provider.address,
      homeAddress: state.provider.homeAddress,
      member: state.member,
      urgentCareState: state.urgentCareState,
      networkCodeList: state.provider.networkCodeList
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      attemptCareTypes: () => dispatch(ProviderActions.sendCareTypeRequest()),
      getSpecialityTypes: (selectedCategoryCode) => dispatch(ProviderActions.sendSpecialityTypeRequest(selectedCategoryCode)),
      attemptProviderSearch: (data) => dispatch(ProviderActions.sendProviderSearchRequest(data)),
      attemptPharmacySearch: (data) => dispatch(ProviderActions.sendPharmacySearchRequest(data)),
      changeCategoryCode: (categoryCode) => dispatch(ProviderActions.changeCategoryCode(categoryCode)),
      changeSubCategoryCode: (subCategoryCode) => dispatch(ProviderActions.changeSubCategoryCode(subCategoryCode)),
      changeProviderName: (providerName) => dispatch(ProviderActions.changeProviderName(providerName)),
      changeCareType: (careType) => dispatch(ProviderActions.changeCareType(careType)),
      changeSpecialityType: (specialityType) => dispatch(ProviderActions.changeSpecialityType(specialityType)),
      changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
      changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
      changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
      changeAddress: (address) => dispatch(ProviderActions.changeAddress(address)),
      changeHomeAddress: (homeAddress) => dispatch(ProviderActions.changeHomeAddress(homeAddress))
    }
  }

  export default connect (mapStateToProps, mapDispatchToProps)(ProviderSearch)
