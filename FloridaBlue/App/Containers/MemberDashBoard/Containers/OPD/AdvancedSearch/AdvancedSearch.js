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
} from 'react-native-card-view';

const card = { card: { width: Metrics.screenWidth, marginLeft: 0, marginTop: 0, marginBottom: 0, alignItems: 'flex-start' } };
const cardTitle = { cardTitle: { fontSize: 40 } }


//import StaffLanguageActions from '../../../../../Redux/StaffLanguageRedux'
//import DoctorLanguageActions from '../../../../../Redux/DoctorLanguageRedux'
import SearchDoctorActions from '../../../../../Redux/SearchDoctorRedux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import SearchDataActions from '../../../../../Redux/SearchDataRedux'
import _ from 'lodash'
import MemberActions from '../../../../../Redux/MemberRedux'
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
} from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import { MKTextField, MKSlider, MKRangeSlider, MKColor, MKIconToggle, MKSpinner, getTheme, MKRadioButton, setTheme, mdl } from 'react-native-material-kit'


const theme = getTheme()

const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];


const doctorsGender = [
  { text: 'Any', value: "" },
  { text: 'Female', value: 'F' },
  { text: 'Male', value: 'M' }
];


const Textfield = MKTextField.textfield()
  .withPlaceholder('Enter City or Zipcode')
  .withStyle(styles.textfield)
  .withTextInputStyle({ color: Colors.flBlue.anvil, flex: 1 })
  .withTintColor(Colors.flBlue.ocean)
  //.withHighlightColor(MKColor.Lime)
  .build();


const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

setTheme({
  radioStyle: {
    fillColor: Colors.flBlue.ocean,
    borderOnColor: Colors.flBlue.ocean,
    borderOffColor: Colors.flBlue.grey2,
    // rippleColor: `rgba(${MKColor.RGBTeal},.18)`,
  }
});

class AdvancedSearch extends Component {

  constructor(props) {
    super(props);

    this.radioGroup = new MKRadioButton.Group();
    this.state = {
      acceptNewPatient: "",
      workingTime: "",
      programs: "",
      gender: "",
      doctorSpeaks: "",
      staffSpeaks: "",
      searchRange: 10
    }
    this._timeSelected = this._timeSelected.bind(this)
    this._languageSelected = this._languageSelected.bind(this)
    this._patientTypeSelected = this._patientTypeSelected.bind(this)
    this._doctorLanguageSelected = this._doctorLanguageSelected.bind(this);
    this._staffLanguageSelected = this._staffLanguageSelected.bind(this);
    this._programSelected = this._programSelected.bind(this);

  }

  _handleDoctordetail() {
    //alert(JSON.stringify(this.state))
    // this.props.attemptSearchDoctor(this.state)
    console.log('state data',this.state)
    this.props.attemptProviderSearch(this.state)
    NavigationActions.DoctorList()
  }

  _languageSelected(event, value: string) {
    this.setState({ doctorSpeaks: value })
  }

  _patientTypeSelected(index, value: string) {
    var selectPatientType = this.props.configData.acceptingPatient.acceptPatientList[index].value
     this.props.changePatientType(selectPatientType)
    this.setState({ acceptNewPatient: value }, function () {
    })
  }

  _timeSelected(index, value: string) {
    var selectTime = this.props.configData.workingHours.workHoursList[index].value
     this.props.changeTimeType(selectTime)
    this.setState({ workingTime: value }, function () {
    })
  }

  _staffLanguageSelected(index, value: string) {
    
    var selectStaffLanguage = this.props.staffLanguage[index].value
     this.props.changeStaffLanguage(selectStaffLanguage)
    this.setState({ staffSpeaks: value }, function () {
    })
  }

  _doctorLanguageSelected(index, value: string) {
    var selectDoctorLanguage = this.props.providerLanguage[index].value
    this.props.changeDoctorLanguage(selectDoctorLanguage)
    this.setState({ doctorSpeaks: value }, function () {
    })
  }

  _programSelected(index, value: string) {
    var selectProgramType = this.props.configData.program.programList[index].value
    this.props.changeProgramType(selectProgramType)
    this.setState({ programs: value }, function () {
    })
  }

  _renderHeader() {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
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

  componentDidMount() {
    console.log('I am Language screen')
   
    //this.props.attemptLanguage()
    this.props.attemptConfigData()
    this.props.attemptStaffLanguage()
    this.props.attemptDoctorLanguage()
    //this.props.attemptProviderSearch()
  }

  _renderDropdownRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor='white'>
        <Text style={styles.dropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  render() {

    return (
      <View style={styles.container}>

        {this._renderHeader()}
        <ScrollView style={{ flex: 1, marginBottom: 20 }}>

          <View>
            <Text style={styles.h1}>Change Location:</Text>
          </View>

          <View style={styles.radioView}>
            <MKRadioButton
              checked={true}
              group={this.radioGroup}
            />
            <View >
              <Text style={styles.radioText}>Current Location</Text>
              <Text style={styles.radioBottomText}>(Neptune Beach, FL 32266)</Text>
            </View>

          </View>

          <View style={styles.radioView}>
            <MKRadioButton group={this.radioGroup} />
            <View >
              <Text style={styles.radioText}>Home</Text>
              <View style={{ marginRight: Metrics.searchBarHeight }}>
                <Text style={styles.radioBottomText}>(801 Penman Rd, Neptune Beach, FL 32266)</Text>
              </View>
            </View>
          </View>

          <View style={styles.radioView}>
            <MKRadioButton group={this.radioGroup} />
            <View >
              <Text style={styles.radioText}>Different Location</Text>
            </View>
          </View>

          <View style={{ marginLeft: 15, marginTop: 10 }}>
            <Text style={styles.radioText}> Enter New City or Zipcode</Text>
            <Textfield />
          </View>

          <View style={{ marginLeft: 15, marginTop: 10 }}>
            <Text style={styles.searchText}> Search Radius:</Text>
            <Text style={{ textAlign: 'center', fontSize: Fonts.size.regular }}> {`${this.state.searchRange} mi.`}</Text>
            <Slider
              value={10}
              minimumValue={0}
              maximumValue={50}
              step={0.5}
              style={{ width: Metrics.screenWidth * 0.87, marginLeft: 10 }}
              onValueChange={(value) => this.setState({ searchRange: value })}
            />
          </View>

          <View style={styles.genderView}>
            {
                this.props.configData !=undefined && this.props.configData.gender !=undefined ?
            <Text style={styles.doctorTextStyle}>
             {this.props.configData.gender.displayName}
             </Text>:null}
            <View style={{ flexDirection: 'row', marginLeft: 30 }}>

              {
                this.props.configData !=undefined && this.props.configData.gender !=undefined ?
                this.props.configData.gender.genderList.map((value, i) => <View key={i} style={{ marginRight: 30, flexDirection: 'row' }}>

                  <MKRadioButton checked={this.state.gender === value.value} onCheckedChange={() => this.setState({ gender: value.value })} />
                  <View >
                    <Text style={styles.genderText}>{value.gender}</Text>
                  </View>
                </View>
                ): null
              }
            </View>
          </View>

          <View style={styles.programView}>
            <View style={{ flex: 0.4 }}>
              {this.props.configData && this.props.configData.acceptingPatient ?
                <Text style={styles.programText}>
                  {this.props.configData.acceptingPatient.displayName}

                </Text> : null}
            </View>

            <View style={{ flex: 0.6, marginTop: 15 }}>

              <ModalDropdown
                dropdownStyle={styles.dropdown}
                options={this.props.configData != undefined && this.props.configData.acceptingPatient != undefined ?
                  _.map(this.props.configData.acceptingPatient.acceptPatientList, 'patientPreference') : null}
                renderRow={this._renderDropdownRow.bind(this)}
                onSelect={this._patientTypeSelected}>

                <MKTextField
                  ref='patientType'
                  style={styles.textField}
                  textInputStyle={{
                    flex: 1, color: Colors.flBlue.ocean,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                  }}
                  editable={false}
                  underlineColorAndroid={Colors.coal}
                  placeholder="No Preference"
                  //placeholder={this.state.acceptingPatientsIndicator}
                  placeholderTextColor={Colors.flBlue.ocean}
                  tintColor={Colors.black}
                  value={this.state.acceptNewPatient}
                />

              </ModalDropdown>
            </View>
          </View>



          <View style={styles.programView}>

            <View style={{ flex: 0.4 }}>
              {this.props.configData && this.props.configData.workingHours ?
              <Text style={styles.programText}>
                {this.props.configData.workingHours.displayName}
                  </Text>
                  :null}

            </View>

            <View style={{ flex: 0.6, marginTop: 10 }}>

              <ModalDropdown dropdownStyle={styles.dropdown}
                onSelect={this._timeSelected}
                options={this.props.configData != undefined && this.props.configData.workingHours != undefined ?
                  _.map(this.props.configData.workingHours.workHoursList, 'hours') : null}
                renderRow={this._renderDropdownRow.bind(this)} >

                <MKTextField
                  ref='Working Hours'
                  textInputStyle={{
                    flex: 1, color: Colors.flBlue.ocean,
                    fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                  }}
                  style={styles.textField}
                  editable={false}
                  underlineColorAndroid={Colors.coal}
                  placeholder="No Preference"
                  placeholderTextColor={Colors.flBlue.ocean}
                  tintColor={Colors.black}
                  value={this.state.workingTime}
                />
              </ModalDropdown>

            </View>

          </View>

          <View style={styles.languageView}>
            <Text style={styles.languageText}>
              Language Selection
            </Text>

            <View style={styles.dropDownView}>
              <View style={{ flex: 0.5 }}>

                <Text style={styles.dropDownText}>
                  Doctor Speaks
            </Text>
              </View>
              <View style={{ flex: 0.5, marginTop: 5 }}>

                <ModalDropdown dropdownStyle={styles.languagedropdown}
                  onSelect={this._doctorLanguageSelected}
                  options={this.props.providerLanguage != undefined  ?
                    _.map(this.props.providerLanguage, 'label') : null}
                  renderRow={this._renderDropdownRow.bind(this)} >

                  <MKTextField
                    textInputStyle={{
                      flex: 1, color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                    }}
                    style={styles.languageTextField}
                    editable={false}
                    underlineColorAndroid={Colors.coal}
                    placeholder="No Preference"
                    placeholderTextColor={Colors.flBlue.ocean}
                    tintColor={Colors.black}
                    value={this.state.doctorSpeaks}
                  />
                </ModalDropdown>
              </View>
            </View>

            <View style={styles.dropDownView}>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.dropDownText}>
                  Staff Speaks
                  </Text>
              </View>

              <View style={{ flex: 0.5, marginTop: 5 }}>
                <ModalDropdown dropdownStyle={styles.languagedropdown}
                  onSelect={this._staffLanguageSelected}
                  options={this.props.staffLanguage != undefined  ?
                    _.map(this.props.staffLanguage, 'label') : null}
                  renderRow={this._renderDropdownRow.bind(this)} >

                  <MKTextField
                    textInputStyle={{
                      flex: 1, color: Colors.flBlue.ocean,
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025
                    }}
                    style={styles.languageTextField}
                    editable={false}
                    underlineColorAndroid={Colors.coal}
                    placeholder="No Preference"
                    placeholderTextColor={Colors.flBlue.ocean}
                    tintColor={Colors.black}
                    value={this.state.staffSpeaks}
                  />
                </ModalDropdown>
              </View>
            </View>

          </View>


          <View style={styles.programView}>
            <View style={{ flex: 0.3 }}>
                {this.props.configData && this.props.configData.program ?
              <Text style={styles.programText}>
                {this.props.configData.program.displayName}
            </Text>
            :null}
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
                  placeholder="No Preference"
                  placeholderTextColor={Colors.flBlue.ocean}
                  placeholderTextSize={Fonts.size.h2}
                  tintColor={Colors.black}
                  value={this.state.programs}

                />
              </ModalDropdown>

            </View>
          </View>

          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => { this._handleDoctordetail() }}>
              <Image source={Images.getResultsButton}
                style={{
                  width: Metrics.screenWidth * 0.4,
                  borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                  height: Metrics.screenHeight * 0.06,

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
  attemptConfigData:PropTypes.func,
  attemptSearchData: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {

    serror: state.searchdoctor.error,
    sfetching: state.searchdoctor.fetching,
    sdata: state.searchdoctor.data,

    languageList:state.provider.languageList,
    acceptingPatientsIndicator: state.provider.acceptingPatientsIndicator,
    providerLanguage: state.provider.providerLanguage,
    staffLanguage: state.provider.staffLanguage,
    configData: state.provider.configData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

   // attemptSearchDoctor: (data) => dispatch(SearchDoctorActions.searchdoctorRequest(data)),
    attemptStaffLanguage: () => dispatch(ProviderActions.sendStaffLanguageRequest()),
    attemptDoctorLanguage: () => dispatch(ProviderActions.sendDoctorLanguageRequest()),
    attemptSearchData: (data) => dispatch(SearchDataActions.searchdataRequest(data)),
    attemptConfigData: () => dispatch(ProviderActions.sendConfigTypeRequest()),
    attemptProviderSearch: (data) => dispatch(ProviderActions.sendProviderSearchRequest(data)),
    changePatientType: (acceptingPatientsIndicator) => dispatch(ProviderActions.changePatientType(acceptingPatientsIndicator)),
    changeDoctorLanguage: (providerLanguage) => dispatch(ProviderActions.changeDoctorLanguage(providerLanguage)),
    changeStaffLanguage: (staffLanguage) => dispatch(ProviderActions.changeStaffLanguage(staffLanguage)),
    changeProgramType: (programsList) => dispatch(ProviderActions.changeProgramType(programsList)),
    changeTimeType: (officeHours) => dispatch(ProviderActions.changeTimeType(officeHours))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)