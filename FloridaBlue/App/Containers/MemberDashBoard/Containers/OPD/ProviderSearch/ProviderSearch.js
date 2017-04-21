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
       this._selectNewLocation = this._selectNewLocation.bind(this)
       this._saveLocation = this._saveLocation.bind(this)
       this._getResults = this._getResults.bind(this)
    }

    componentDidMount() {
      this._resetState()
      this.props.attemptNetworkList()
      this.props.attemptCareTypes()

      navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.changeCurrentLocation(position)
        this.props.changeLatitude(position["coords"]["latitude"])
        this.props.changeLongitude(position["coords"]["longitude"])
      },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      });
    }

    _onChecked(event) {
      if (event.checked) {
        this.props.changeSubCategoryCode("")
        this.props.changeCategoryCode("ALL")
        this.props.changeKnownCareState(true)
        this.props.changeUnknownCareState(false)
        this.props.changeSavedProviderState(false)
      } else {
        this.props.changeProviderName("")
        this.props.changeKnownCareState(false)
        this.props.changeUnknownCareState(true)
        this.props.changeSavedProviderState(false)
      }
    }

    _careSelected(index, value:string) {
      var selectedCategoryCode = this.props.planCategoryList[index].categoryCode
      this.props.getSpecialityTypes(selectedCategoryCode)
      this.props.changeCareType(value)
      this.props.changeSpecialityState(true)
    }

    _specialitySelected(index, value:string) {
      var selectedSubCategoryCode = this.props.planSubCategoryList[index].categoryCode
      this.props.changeSubCategoryCode(selectedSubCategoryCode)
      this.props.changeSpecialityType(value)
    }

    _editLocation(event) {
      this.props.changeCurrentLocaleState(true)
      this.props.changeSpecialityState(false)
    }

    _getResults() {
      this.props.attemptProviderSearch(this.props)
      NavigationActions.DoctorList()
    }

    _advancedSearch() {
      NavigationActions.AdvancedSearch()
    }

    _selectNewLocation(event) {
      if (event.checked) {
        this.props.changeNewLocationState(true)
      }
    }

    _saveLocation(event) {
      this.props.changeNewLocationState(false)
    }

    _resetState() {
      this.props.changeSubCategoryCode("")
      this.props.changeCategoryCode("ALL")
      this.props.changeProviderName("")
      this.props.changeCareType("")
      this.props.changeSpecialityType("")
      this.props.changeKnownCareState(false)
      this.props.changeUnknownCareState(false)
      this.props.changeSavedProviderState(true)
      this.props.changeSpecialityState(false)
      this.props.changeCurrentLocaleState(false)
      this.props.changeNewLocationState(false)
      this.props.changeCurrentLocation("Unknown")
      this.props.changeLatitude(0)
      this.props.changeLongitude(0)
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
        <TouchableHighlight>
            <Text style={styles.dropdownItem}>{rowData}</Text>
        </TouchableHighlight>
      )
    }

    render () {
      return (
        <View style={styles.container}>
          <View>
            {this._renderHeader()}
            <ScrollView>
              <View>
                <Text style={styles.h1}>Do you know the name of your doctor or care facility?</Text>

                <View style={styles.radioView}>
                  <MKRadioButton group={this.searchTypeGroup} onCheckedChange={this._onChecked} />
                  <Text style={styles.radioText}>Yes</Text>
                  <MKRadioButton group={this.searchTypeGroup} />
                  <Text style={styles.radioText}>No</Text>
                </View>

                <HideableView visible={this.props.savedProviderState} removeWhenHidden={true}>
                  <Text style={styles.subheading}>Already saved your providers?</Text>
                  <TouchableOpacity style={styles.savedProviderLink}>
                    <Text style={styles.savedProviderLinkText}>View Saved Providers</Text>
                  </TouchableOpacity>
                </HideableView>

                <HideableView visible={this.props.knownCareState} removeWhenHidden={true}>
                  <Text style={styles.h2}>Enter doctor or care facility name</Text>
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

                <HideableView visible={this.props.unknownCareState} removeWhenHidden={true}>
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

                <HideableView visible={this.props.unknownCareState && this.props.specialityState} removeWhenHidden={true}>
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

                <HideableView visible={this.props.unknownCareState && this.props.currentLocaleState == false} removeWhenHidden={true}>
                  <View style={[styles.locationView]}>
                    <View style={styles.locationTextContainer}>
                      <Text style={styles.h2}>My Location:</Text>
                      <Text style={styles.currentLocationText}>Jacksonville, FL 32246</Text>
                    </View>
                    <View style={styles.locationButtonContainer}>
                      <TouchableOpacity style={styles.editLocation} onPress={this._editLocation}>
                        <Flb name="pencil" style={styles.editLocationIcon} size={Metrics.icons.small} color={Colors.flBlue.anvil} />
                        <Text style={styles.editLocationText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </HideableView>

                <HideableView style={styles.locationView} visible={this.props.unknownCareState && this.props.currentLocaleState} removeWhenHidden={true}>
                  <View style={styles.mapIcon}>
                    <Image source={Images.mapUnselectedIcon} />
                    <Text style={styles.changeLocationHeader}>Change Location:</Text>
                  </View>

                  <View style={styles.locationRadio}>
                    <MKRadioButton style={styles.radio} group={this.locationGroup} />
                    <Text style={styles.radioText}>Current Location</Text>
                  </View>
                  <Text style={styles.locationText}>(Neptune Beach, FL 32266)</Text>
                  <View style={styles.locationRadio}>
                    <MKRadioButton style={styles.radio} group={this.locationGroup} />
                    <Text style={styles.radioText}>Home</Text>
                  </View>
                  <Text style={styles.locationText}>(Neptune Beach, FL 32266)</Text>
                  <View style={styles.locationRadio}>
                    <MKRadioButton style={styles.radio} group={this.locationGroup} onCheckedChange={this._selectNewLocation} />
                    <Text style={styles.radioText}>Different Location</Text>
                  </View>
                </HideableView>

                <HideableView style={styles.locationView} visible={this.props.unknownCareState && this.props.newLocationState} removeWhenHidden={true}>
                  <Text style={styles.newLocationHeader}>Enter New City or ZipCode:</Text>
                  <MKTextField
                    ref='newLocation'
                    style={styles.newLocationField}
                    textInputStyle={{flex: 1}}
                    editable={true}
                    underlineColorAndroid={Colors.coal}
                    placeholderTextColor={Colors.steel}
                    tintColor={Colors.black}
                  />

                  <TouchableOpacity style={styles.saveLocation} onPress={this._saveLocation}>
                    <Image source={Images.saveLocationButton} style={styles.saveLocationButton} />
                  </TouchableOpacity>
                </HideableView>

                <HideableView visible={this.props.knownCareState||this.props.unknownCareState} removeWhenHidden={true}>
                  <TouchableOpacity style={styles.getResults} onPress={this._getResults}>
                    <Image source={Images.getResultsButton} style={styles.getResultsButton} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.advancedSearchLink} onPress={this._advancedSearch}>
                    <View style={styles.advancedSearchContainer}>
                      <Flb name="search-find" size={Metrics.icons.small} color={Colors.flBlue.anvil} />
                      <Text style={styles.advancedSearchLinkText}>Advanced Search</Text>
                    </View>
                  </TouchableOpacity>
                </HideableView>
              </View>
            </ScrollView>
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
      longitude: state.provider.longitude
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest()),
      attemptCareTypes: () => dispatch(ProviderActions.sendCareTypeRequest()),
      getSpecialityTypes: (selectedCategoryCode) => dispatch(ProviderActions.sendSpecialityTypeRequest(selectedCategoryCode)),
      attemptProviderSearch: (data) => dispatch(ProviderActions.sendProviderSearchRequest(data)),
      changeCategoryCode: (categoryCode) => dispatch(ProviderActions.changeCategoryCode(categoryCode)),
      changeSubCategoryCode: (subCategoryCode) => dispatch(ProviderActions.changeSubCategoryCode(subCategoryCode)),
      changeProviderName: (providerName) => dispatch(ProviderActions.changeProviderName(providerName)),
      changeCareType: (careType) => dispatch(ProviderActions.changeCareType(careType)),
      changeSpecialityType: (specialityType) => dispatch(ProviderActions.changeSpecialityType(specialityType)),
      changeKnownCareState: (knownCareState) => dispatch(ProviderActions.changeKnownCareState(knownCareState)),
      changeUnknownCareState: (unknownCareState) => dispatch(ProviderActions.changeUnknownCareState(unknownCareState)),
      changeSavedProviderState: (savedProviderState) => dispatch(ProviderActions.changeSavedProviderState(savedProviderState)),
      changeSpecialityState: (specialityState) => dispatch(ProviderActions.changeSpecialityState(specialityState)),
      changeCurrentLocaleState: (currentLocaleState) => dispatch(ProviderActions.changeCurrentLocaleState(currentLocaleState)),
      changeNewLocationState: (newLocationState) => dispatch(ProviderActions.changeNewLocationState(newLocationState)),
      changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
      changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
      changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude))
    }
  }

  export default connect (mapStateToProps, mapDispatchToProps)(ProviderSearch)
