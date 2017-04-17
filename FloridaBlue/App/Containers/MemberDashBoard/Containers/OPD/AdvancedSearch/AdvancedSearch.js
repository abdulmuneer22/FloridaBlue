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


import StaffLanguageActions from '../../../../../Redux/StaffLanguageRedux'
import DoctorLanguageActions from '../../../../../Redux/DoctorLanguageRedux'
import SearchDoctorActions from '../../../../../Redux/SearchDoctorRedux'
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
  { text: 'Any', value: 'A' },
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
      acceptNewPatient:"",
      workingHours:"",
      programs:"",
      gender:"",
      doctorSpeaks: 'ENG',
      staffSpeaks: 'ENG',
      radius: 10
    }
    this._timeSelected = this._timeSelected.bind(this)
    this.onDoctorSpeaksChange = this.onDoctorSpeaksChange.bind(this);
    this.onStaffSpeaksChange = this.onStaffSpeaksChange.bind(this);
  }

  _handleDoctordetail() {
   // alert(JSON.stringify(this.state))
    this.props.attemptSearchDoctor(this.state)
    NavigationActions.DoctorList()
  }

  onDoctorSpeaksChange(value) {
    this.setState({
      doctorSpeaks: value
    });
  }

  _timeSelected(event, value:string) {
     this.setState({acceptNewPatient: value})
    }

  onStaffSpeaksChange(value) {
    this.setState({
      staffSpeaks: value
    });
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
    console.tron.log(this.props)
    //  this.props.attemptLanguage()
  }

   _renderDropdownRow(rowData, rowID, highlighted) {
      return (
        <TouchableHighlight>
            <Text style={styles.dropdownItem}>{rowData}</Text>
        </TouchableHighlight>
      )
    }

  render() {

    var temp=  this.props.dummydata && this.props.dummydata.workingHours.workHoursList
     const rowData = [];
     temp.forEach(function (value) {
       rowData.push(`${value.hours}`);
     }, this);

     const Programs = [];
     this.props.dummydata && this.props.dummydata.program.programList.forEach(function (value) {
       Programs.push(`${value.programName}`);
     }, this);

     const acceptPatients = [];
     this.props.dummydata && this.props.dummydata.acceptingPatient.acceptPatientList.forEach(function (value) {
       acceptPatients.push(`${value.patientPreference}`);
     }, this);

    return (
      <View style={styles.container}>

        {this._renderHeader()}
        <ScrollView style={{ flex: 1, marginBottom:20 }}>

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
            <Text style={{ textAlign: 'center', fontSize: Fonts.size.regular }}> {`${this.state.radius} mi.`}</Text>
            <Slider
              value={10}
              minimumValue={0}
              maximumValue={100}
              step={0.5}
              style={{ width: Metrics.screenWidth * 0.87, marginLeft: 10 }}
              onValueChange={(value) => this.setState({ radius: value })}
            />
          </View>

          <View style={styles.genderView}>
            <Text style={styles.doctorTextStyle}>
              Doctor's Gender
             </Text>
            <View style={{ flexDirection: 'row', marginLeft: 30 }}>

              {
                doctorsGender.map((value, i) => <View key={i} style={{ marginRight: 30, flexDirection: 'row' }}>

                  <MKRadioButton checked={this.state.gender === value.value}  onCheckedChange={()=>this.setState({gender:value.value})} />
                  <View >
                    <Text style={styles.genderText}>{value.text}</Text>
                  </View>
                </View>
                )
              }
              </View>
            </View>

            <View style={styles.programView}>
              <View style={{ flex: 0.4 }}>
                <Text style={styles.programText}>
                {this.props.dummydata && this.props.dummydata.acceptingPatient.displayName}
                 
            </Text>
              </View>

              <View style={{ flex: 0.6, marginTop: 15 }}>

                <ModalDropdown style={styles.dropdown_1}
                  dropdownStyle={{ width: 150,marginRight:10, marginTop: 10}}
                  textStyle={styles.dropdownText}
                  options={acceptPatients}
                   defaultValue="Check..."
                   onSelect={(Index,value)=>this.setState({value})}
                />


              </View>
            </View>



            <View style={styles.programView}>

              <View style={{ flex: 0.4 }}>
               
                  <Text style={styles.programText}>
                   Working Hours
                  </Text>
                  
              </View>

              <View style={{ flex: 0.6, marginTop: 10 }}>

                <ModalDropdown  dropdownStyle={styles.dropdown}
                 onSelect={this._timeSelected}
                  options={rowData}
                  renderRow={this._renderDropdownRow.bind(this)}
                 // onSelect={() => false}
                >

                 <MKTextField
                      textInputStyle={{flex: 1}}
                      style={styles.textField}
                      editable={false}
                      underlineColorAndroid={Colors.coal}
                      placeholder="Check"
                      placeholderTextColor={Colors.steel}
                      tintColor={Colors.black}
                      value={this.state.acceptNewPatient}
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
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.doctorSpeaks}
                    onValueChange={this.onDoctorSpeaksChange}>

                    {
                      this.props.doctordata && this.props.doctordata.languageList && this.props.doctordata.languageList.map((value, i) =>
                        <Item key={i} label={value.label} value={value.value} />)
                    }
                  </Picker>

                </View>
              </View>

              <View style={styles.dropDownView}>

                <View style={{ flex: 0.5 }}>
                  <Text style={styles.dropDownText}>
                    Staff Speaks
            </Text>
                </View>

                <View style={{ flex: 0.5, marginTop: 5 }}>
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.staffSpeaks}
                    onValueChange={this.onStaffSpeaksChange}>

                    {
                      this.props.staffdata && this.props.staffdata.languageList && this.props.staffdata.languageList.map((value, i) =>
                        <Item key={i} label={value.label} value={value.value} />)
                    }
                  </Picker>

                </View>
              </View>

            </View>


            <View style={styles.programView}>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.programText}>
                  Programs
            </Text>
              </View>

              <View style={{ flex: 0.7, marginTop: 5 }}>
                <ModalDropdown style={styles.dropdown_1}
                textStyle={styles.programDrop}
                dropdownStyle={{ width: 150, marginTop: 10 }}
                options={Programs}
                 defaultValue="Choice of Programs "
                onSelect={(Index,value)=>this.setState({value})}
                  
                />
              </View>
            </View>

            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => { this._handleDoctordetail()}}>
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
 
  sdata: PropTypes.object,
  attemptSearchDoctor: PropTypes.func,
  serror: PropTypes.string,
  doctordata: PropTypes.object,
  attemptDoctorLanguage: PropTypes.func,
  doctorerror: PropTypes.string,
  staffdata: PropTypes.object,
  attemptStaffLanguage: PropTypes.func,
  stafferror: PropTypes.string,
  dummydata: PropTypes.object,
  attemptSearchData: PropTypes.func,
  dummyerror: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
  
    serror: state.searchdoctor.error,
    sfetching: state.searchdoctor.fetching,
    sdata: state.searchdoctor.data,

    doctorerror: state.doctorlanguage.error,
    doctorfetching: state.doctorlanguage.fetching,
    doctordata: state.doctorlanguage.data,

    stafferror: state.stafflanguage.error,
    stafffetching: state.stafflanguage.fetching,
    staffdata: state.stafflanguage.data,

    dummyerror: state.searchdata.error,
    dummyfetching: state.searchdata.fetching,
    dummydata: state.searchdata.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   
    attemptSearchDoctor: (data) => dispatch(SearchDoctorActions.searchdoctorRequest(data)),
    attemptStaffLanguage: () => dispatch(StaffLanguageActions.stafflanguageRequest()),
    attemptDoctorLanguage: () => dispatch(DoctorLanguageActions.doctorlanguageRequest()),
    attemptSearchData: () => dispatch(SearchDataActions.searchdataRequest())
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)