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
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Radio, Button, Icon, Fab } from 'native-base'
import { MKTextField, MKColor, MKSpinner, MKRadioButton, getTheme } from 'react-native-material-kit'
import HideableView from 'react-native-hideable-view'
import ModalDropdown from 'react-native-modal-dropdown'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'

type ProviderSearchProps = {
  dispatch: () => any,
  attemptNetworkList:() => void,
  attemptCareTypes:() => void,
  attemptSpecialityTypes:() => void,
  attemptProviderSearch:() => void,
  fetching: boolean,
  error: string
}

const theme = getTheme()
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

  class ProviderSearch extends Component {

    constructor(props) {
       super(props);
       this.searchTypeGroup = new MKRadioButton.Group();
       this.locationGroup = new MKRadioButton.Group();
       this.state = {
         selectedCareType: "",
         selectedSpeciality: "",
         showSavedProvider: true,
         showKnownCare: false,
         showUnknownCare: false,
         showSpeciality: false,
         showChangeLocale: false,
         showNewLocation: false
      }

      this._onChecked = this._onChecked.bind(this)
      this._careSelected = this._careSelected.bind(this)
      this._specialitySelected = this._specialitySelected.bind(this)
      this._editLocation = this._editLocation.bind(this)
      this._selectNewLocation = this._selectNewLocation.bind(this)
      this._saveLocation = this._saveLocation.bind(this)
      this._getResults = this._getResults.bind(this)
    }

    componentDidMount() {
      this.props.attemptNetworkList()
      this.props.attemptCareTypes()
    }

    _onChecked(event) {
      if (event.checked) {
        this.props.changeSubCategoryCode("")
        this.props.changeCategoryCode("ALL")

        this.setState({showKnownCare: true})
        this.setState({showUnknownCare: false})
        this.setState({showSavedProvider: false})
      } else {
        this.props.changeProviderName("")

        this.setState({showKnownCare: false})
        this.setState({showUnknownCare: true})
        this.setState({showSavedProvider: false})
      }
    }

    _careSelected(index, value:string) {
      var selectedCategoryCode = this.props.planCategoryList[index].categoryCode
      this.props.getSpecialityTypes(selectedCategoryCode)

      this.setState({showUnknownCare: false})
      this.setState({selectedCareType: value}, function() {
        this.setState({showUnknownCare: true})
      })
      this.setState({showSpeciality: true})
    }

    _specialitySelected(index, value:string) {
      var selectedSubCategoryCode = this.props.planSubCategoryList[index].categoryCode
      this.props.changeSubCategoryCode(selectedSubCategoryCode)

      this.setState({showSpeciality: false})
      this.setState({selectedSpeciality: value}, function() {
        this.setState({showSpeciality: true})
      })
    }

    _editLocation(event) {
      this.setState({showChangeLocale: true})
      this.setState({showSpeciality: false})
    }

    _getResults() {
      console.tron.log(this.props)
      this.props.attemptProviderSearch(this.props)
      // NavigationActions.DoctorList()
    }

    _advancedSearch() {
      NavigationActions.AdvancedSearch()
    }

    _selectNewLocation(event) {
      if (event.checked) {
        this.setState({showNewLocation: true})
      }
    }

    _saveLocation(event) {
      this.setState({showNewLocation: false})
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

                <HideableView visible={this.state.showSavedProvider} removeWhenHidden={true}>
                  <Text style={styles.subheading}>Already saved your providers?</Text>
                  <TouchableOpacity style={styles.savedProviderLink}>
                    <Text style={styles.savedProviderLinkText}>View Saved Providers</Text>
                  </TouchableOpacity>
                </HideableView>

                <HideableView visible={this.state.showKnownCare} removeWhenHidden={true}>
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

                <HideableView visible={this.state.showUnknownCare} removeWhenHidden={true}>
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
                      value={this.state.selectedCareType}
                    />
                  </ModalDropdown>
                  <Text style={styles.dropdownExampleText}>{I18n.t('careTypeExample')}</Text>
                </HideableView>

                <HideableView visible={this.state.showUnknownCare && this.state.showSpeciality} removeWhenHidden={true}>
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
                      value={this.state.selectedSpeciality}
                    />
                  </ModalDropdown>
                  <Text style={styles.dropdownExampleText}>{I18n.t('specialityTypeExample')}</Text>
                </HideableView>

                <HideableView visible={this.state.showUnknownCare && this.state.showChangeLocale == false} removeWhenHidden={true}>
                  <View style={[styles.locationView, styles.flexColumn]}>
                    <Text style={styles.h2}>My Location:</Text>
                    <View style={styles.editButton}>
                      <Text style={styles.currentLocationText}>Jacksonville, FL 32246</Text>
                      <TouchableOpacity style={styles.editLocation} onPress={this._editLocation}>
                        <Text style={styles.editLocationText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </HideableView>

                <HideableView style={styles.locationView} visible={this.state.showUnknownCare && this.state.showChangeLocale} removeWhenHidden={true}>
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

                <HideableView style={styles.locationView} visible={this.state.showUnknownCare && this.state.showNewLocation} removeWhenHidden={true}>
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

                <HideableView visible={this.state.showKnownCare||this.state.showUnknownCare} removeWhenHidden={true}>
                  <TouchableOpacity style={styles.getResults} onPress={this._getResults}>
                    <Image source={Images.getResultsButton} style={styles.getResultsButton} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.advancedSearchLink} onPress={this._advancedSearch}>
                    <Text style={styles.advancedSearchLinkText}>Advanced Search</Text>
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
      providerName: state.provider.providerName
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
      changeProviderName: (providerName) => dispatch(ProviderActions.changeProviderName(providerName))
    }
  }

  export default connect (mapStateToProps, mapDispatchToProps)(ProviderSearch)
