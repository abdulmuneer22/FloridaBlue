import React, { Component, PropTypes } from 'react'
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
  Linking,
  Alert
} from 'react-native'

import styles from './ClaimsStyle'
import ClaimsCard from './Components/ClaimsCard'
import axios from 'axios'
import ClaimsListActions from '../../../Redux/ClaimsListRedux'
import ClaimsActions from '../../../Redux/ClaimsRedux'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Button, Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import HideableView from 'react-native-hideable-view'
import ModalDropdown from 'react-native-modal-dropdown'
import DateTimePicker from 'react-native-modal-datetime-picker'

const window = Dimensions.get('window')
let memberList = ['Ashlyn', 'Shane', 'Grace', 'Noah', 'Hope', 'Jack']
let moment = require('moment');

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimsList extends Component {
  //const memberList = ['Ashlyn', 'Shane', 'Grace', 'Noah', 'Hope', 'Jack']
  constructor (props) {
    super(props)
    this.state = {
      listLimit: 10,
      totalNumberOfCardPerScreen: 10,
      isFetchingMore: false,
      loadingMore: true,
      initialCount: 0,
      finalCount: 0,
      displayBannerInfo: false,
      searchVisible: false,
      endDateSelected: false
    }
    this.loadMore = this.loadMore.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
    this.hideDatePicker = this.hideDatePicker.bind(this)
    this.addStartDate = this.addStartDate.bind(this)
    this.addEndDate = this.addEndDate.bind(this)
    this.memberSelected = this.memberSelected.bind(this)
  }

  viewClaimsList () {
    // this.props.attemptClaimsList()
    NavigationActions.ClaimsList()
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Plan Claims
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
    console.tron.log(rowData)
    return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text style={styles.dropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  loadMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    var numberOfCardsPerscreen = this.state.totalNumberOfCardPerScreen
    this.setState({
      listLimit: newLimit + 10
    })
    this.props.changeListLimit(newLimit + 10)
    if (this.state.totalNumberOfCardPerScreen == newLimit) {
      this.props.changeEnd(this.state.totalNumberOfCardPerScreen + 10)
      this.state.isFetchingMore = true
      this.setState({isFetchingMore: true})
      this.setState({totalNumberOfCardPerScreen: this.state.totalNumberOfCardPerScreen + 10})
    }
  }

  handleSearch () {
    if (this.state.searchVisible) {
      this.setState({searchVisible: false})
    } else {
      this.setState({searchVisible: true})
    }
  }

  hideDatePicker () {
    this.setState({isDatePickerVisible: false})
  }

  addStartDate() {
    this.setState({endDateSelected: false})
    this.props.changeDatePickerVisible(true)
  }

  addEndDate() {
    this.setState({endDateSelected: true})
    this.props.changeDatePickerVisible(true)
  }

  hideDatePicker() {
    this.props.changeDatePickerVisible(false)
  }

  handleDatePicked(date) {
    this.hideDatePicker()
    let selectedDate = moment(date).format('MMM Do YYYY')

    if (this.state.endDateSelected) {
      let startTime = new Date(this.props.startDate)
      if (this.props.endDate == "End Date" || moment(selectedDate).isAfter(startTime)) {
        this.props.changeEndDate(selectedDate)
        this.setState({searchVisible: false}, function () {
          this.setState({searchVisible: true})
        })
      } else {
        Alert.alert(
          'Invalid date range',
          'Oops! The end date you selected is not after your selected start date.',
          [
            { text: 'OK' }
          ])
      }
    } else {
      if (this.props.endDate != "End Date") {
        let endTime = new Date(this.props.endDate)
        if (moment(selectedDate).isBefore(endTime)) {
          this.props.changeStartDate(selectedDate)
          this.setState({searchVisible: false}, function () {
            this.setState({searchVisible: true})
          })
        } else {
          Alert.alert(
            'Invalid date range',
            'Oops! The start date you selected is not before your selected end date.',
            [
              { text: 'OK' }
            ])
        }
      } else {
        this.props.changeStartDate(selectedDate)
        this.setState({searchVisible: false}, function () {
          this.setState({searchVisible: true})
        })
      }
    }
  }

  memberSelected(index, value:string) {
    let selectedMember = memberList[index]
    this.props.changeMemberName(selectedMember)
    this.setState({searchVisible: false}, function () {
      this.setState({searchVisible: true})
    })
  }


  componentDidMount () {
    this.props.attemptClaimsList(this.props)
  }

  render () {
     console.log("claims list data" +this.props.datePickerVisible)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 0.2}}>

            <View style={{flex: 0.2, backgroundColor: 'white'}}>
              <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, margin: 10}}>
                <Text style={{fontSize: 20, paddingLeft: 15, opacity: 0.9, color: Colors.flBlue.anvil}}>Claims List</Text>
                <Button rounded style={{backgroundColor: '#00003f', marginBottom: 20, justifyContent: 'center'}} onPress={this.handleSearch}>
                  <Text style={{color: 'white', fontWeight: '500', marginLeft: 20, paddingRight: 20, paddingLeft: 5, alignItems: 'center'}}>Search</Text>
                </Button>
              </View>
            </View>

            <View style={{margin: 10, marginBottom: 15, paddingTop: 5}}>
              <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginBottom: -15}}>
                <View style={{flex: 0.27, alignItems: 'center'}}>
                  <TouchableOpacity><Text style={{fontWeight: 'bold', opacity: 0.9, color: Colors.flBlue.anvil}}> Date</Text></TouchableOpacity>
                </View>
                <View style={{flex: 0.33, alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.props.claimsdata.sortBy('providerName', true)}><Text style={{fontWeight: 'bold', color: Colors.flBlue.anvil}}> Member</Text></TouchableOpacity>
                </View>
                <View style={{flex: 0.34, alignItems: 'center'}}>
                  <TouchableOpacity><Text style={{fontWeight: 'bold', color: Colors.flBlue.anvil}}> Providers</Text></TouchableOpacity>
                </View>
              </View>
            </View>
             <View style={{flex:1}}>

              <ClaimsCard
                data={this.props.claimsdata.data}
                     />

            </View>

            {/* If 10+ Claims, Show More Button */}

            {this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 10 ?
              <View style={{flex: 0, margin: 14}}>
                <Text style={{textAlign: 'center', opacity: 0.6, color: Colors.flBlue.anvil}}>Showing 10 out of {this.props.claimsdata.count} Claims</Text>
                <TouchableOpacity>
                  <Text style={{textAlign: 'center', color: 'teal', fontSize: 20}}>View More <Icon name='chevron-down' /></Text>
                </TouchableOpacity>
              </View> : null }

          </View>
        </View>
        <HideableView style={styles.searchContainer} visible={this.state.searchVisible} removeWhenHidden duration={200}>
          <TouchableOpacity style={styles.closeSearchButton} onPress={this.handleSearch}>
            <Flb color={Colors.flBlue.anvil} name="remove" size={20} />
          </TouchableOpacity>
          <Text style={styles.searchTitle}>Search for a claim by filling out the fields below:</Text>
          <MKTextField
            ref='providerName'
            style={styles.textField}
            textInputStyle={{flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
            editable
            underlineColorAndroid={Colors.coal}
            placeholder={'Provider Name'}
            placeholderTextColor={Colors.steel}
            tintColor={Colors.black}
            onChangeText={this.props.changeProviderName}
            value={this.props.providerName}
          />
          <ModalDropdown options={_.map(memberList)} onSelect={this.memberSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
            <MKTextField
              ref='memberName'
              textInputStyle={{flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
              style={styles.textField}
              editable={false}
              underlineColorAndroid={Colors.coal}
              placeholder={'Member Name'}
              placeholderTextColor={Colors.steel}
              tintColor={Colors.black}
              value={this.props.memberName}s
            />
          </ModalDropdown>
          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.startDateButton} onPress={this.addStartDate}>
              <Text style={styles.dateText}>{this.props.startDate}
                <Text>     </Text>
                <Flb style={styles.calendarIcon} color={Colors.flBlue.grey3} name="calendar" size={15} />
              </Text>
            </TouchableOpacity>
            <HideableView visible={!this.state.endDateSelected} removeWhenHidden={true}>
              <TouchableOpacity style={styles.endDateButton} onPress={this.addEndDate}>
                <Flb style={styles.addEndDateIcon} color={Colors.flBlue.ocean} name="plus" size={15} />
                <Text style={styles.addEndDateText}>Add End Date</Text>
              </TouchableOpacity>
            </HideableView>
            <HideableView visible={this.state.endDateSelected} removeWhenHidden={true}>
              <TouchableOpacity style={styles.endDateButton} onPress={this.addEndDate}>
                <Text style={styles.dateText}>{this.props.endDate}
                  <Text>     </Text>
                  <Flb color={Colors.flBlue.grey3} name="calendar" size={15} />
                </Text>
              </TouchableOpacity>
            </HideableView>
          </View>
          <Button rounded style={styles.searchButton} onPress={()=>{this.handleSearch()}}>
            <Text style={{color: 'white', fontWeight: '500', marginLeft: 20, paddingRight: 20, paddingLeft: 5, alignItems: 'center'}}>Search</Text>
          </Button>
        </HideableView>

        <DateTimePicker
          isVisible={this.props.datePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
          datePickerModeAndroid='spinner'
          date={new Date()}
          mode='date'
        />
      </View>
    )
  }
}

ClaimsList.propTypes = {
  data: PropTypes.object,
  attemptClaimsList: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claimslist.fetching,
    claimsdata: state.claimslist.data,
    error: state.claimslist.error,
    claimsListCount: state.claimslist.count,
    datePickerVisible: state.claims.datePickerVisible,
    startDate: state.claims.startDate,
    endDate: state.claims.endDate,
    providerName: state.claims.providerName,
    memberName: state.claims.memberName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: () => dispatch(ClaimsListActions.claimsListRequest()),
    changeListLimit: (listLimit) => dispatch(ClaimsListActions.changeListLimit(listLimit)),
    changeDatePickerVisible: (datePickerVisible) => dispatch(ClaimsActions.changeDatePickerVisible(datePickerVisible)),
    changeStartDate: (startDate) => dispatch(ClaimsActions.changeStartDate(startDate)),
    changeEndDate: (endDate) => dispatch(ClaimsActions.changeEndDate(endDate)),
    changeProviderName: (providerName) => dispatch(ClaimsActions.changeProviderName(providerName)),
    changeMemberName: (memberName) => dispatch(ClaimsActions.changeMemberName(memberName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
