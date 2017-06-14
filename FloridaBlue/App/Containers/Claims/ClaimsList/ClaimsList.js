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
  Platform,
  Alert
} from 'react-native'

import styles from './ClaimsStyle'
import ClaimsCard from './Components/ClaimsCard'
import axios from 'axios'
// import ClaimsListActions from '../../../Redux/ClaimsListRedux'
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
let moment = require('moment')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimsList extends Component {
  // const memberList = ['Ashlyn', 'Shane', 'Grace', 'Noah', 'Hope', 'Jack']
  constructor (props) {
    super(props)
    this.state = {
      listLimit: 10,
      totalNumberOfCardPerScreen: 10,
      isFetchingMore: false,
      loadingMore: true,
      initialCount: 0,
      finalCount: 0,
      asynCall: true,
      displayBannerInfo: false,
      searchVisible: false,
      endDateSelected: false
    }
    this.viewMore = this.viewMore.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
    this.hideDatePicker = this.hideDatePicker.bind(this)
    this.addStartDate = this.addStartDate.bind(this)
    this.addEndDate = this.addEndDate.bind(this)
    this.memberSelected = this.memberSelected.bind(this)
  }

  viewClaimsList () {
    this.props.attemptClaimsList()
    NavigationActions.ClaimsList()
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
        Plan Claims
              </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
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

  viewMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    this.setState({
      listLimit: newLimit + 10
    })
    if (newLimit + 10 >= this.props.claimsdata.length) {
      this.setState({ listLimit: this.props.claimsdata.length })
    }
  }

  claimsListRequest (newProps) {
    if (newProps.claimsdata && newProps.claimsdata.length > 0) {
      if (newProps.error == undefined || newProps.error == null) {
        newProps.attemptClaimsList(newProps)
      }
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.state.isFetchingMore) {
      // this.props.attemptProviderSearch(newProps)
      this.claimsListRequest(newProps)
      this.setState({
        isFetchingMore: false
      })
    }
  }

  handleSearch () {
    if (this.state.searchVisible) {
      this.setState({ searchVisible: false })
    } else {
      this.setState({ searchVisible: true })
    }
  }

  hideDatePicker () {
    this.setState({ isDatePickerVisible: false })
  }

  addStartDate () {
    this.setState({ endDateSelected: false })
    this.props.changeDatePickerVisible(true)
  }

  addEndDate () {
    this.setState({ endDateSelected: true })
    this.props.changeDatePickerVisible(true)
  }

  hideDatePicker () {
    this.props.changeDatePickerVisible(false)
  }

  handleDatePicked (date) {
    this.hideDatePicker()
    let selectedDate = moment(date).format('MMM Do YYYY')

    if (this.state.endDateSelected) {
      let startTime = new Date(this.props.startDate)
      if (this.props.endDate == 'End Date' || moment(selectedDate).isAfter(startTime)) {
        this.props.changeEndDate(selectedDate)
        this.setState({ searchVisible: false }, function () {
          this.setState({ searchVisible: true })
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
      if (this.props.endDate != 'End Date') {
        let endTime = new Date(this.props.endDate)
        if (moment(selectedDate).isBefore(endTime)) {
          this.props.changeStartDate(selectedDate)
          this.setState({ searchVisible: false }, function () {
            this.setState({ searchVisible: true })
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
        this.setState({ searchVisible: false }, function () {
          this.setState({ searchVisible: true })
        })
      }
    }
  }

  memberSelected (index, value: string) {
    let selectedMember = memberList[index]
    this.props.changeMemberName(selectedMember)
    this.setState({ searchVisible: false }, function () {
      this.setState({ searchVisible: true })
    })
  }

  componentDidMount () {
    // this.props.attemptClaimsList(this.props)
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (
        <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>)
    } else if (this.props.claimsdata && this.props.claimsdata.length > 0) {
      return (
        <View style={{ flex: 1 }}>

          <View style={styles.claimsListHeader1}>
            <View style={styles.claimsListHeader2}>
              <View style={styles.claimsListHeader3}>
                <View style={styles.claimsListHeader4}>
                  <Text style={styles.claimsListHeaderText}>Claims List</Text>
                  <TouchableOpacity onPress={this.handleSearch}>
                    <Image source={Images.claimlistsearch} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.claimsCategories1}>
              <View style={styles.claimsCategories2}>
                <View style={styles.claimsCardRow1}>
                  <TouchableOpacity style={styles.claimsSortCategories}><Text style={styles.claimsCategoryText}> Date</Text><Flb name='caret-up-down' size={20} color={Colors.flBlue.anvil} /></TouchableOpacity>
                </View>
                <View style={styles.claimsCardRow2}>
                  <TouchableOpacity onPress={() => this.props.claimsdata.sortBy('providerName', true)} style={styles.claimsSortCategories}>
                    <Text style={styles.claimsCategoryText}> Member</Text>
                    <Flb name='caret-up-down' size={20} color={Colors.flBlue.anvil} />
                  </TouchableOpacity>
                </View>
                <View style={styles.claimsCardRow3}>
                  <TouchableOpacity style={styles.claimsSortCategories}><Text style={styles.claimsCategoryText}> Providers</Text><Flb name='caret-up-down' size={20} color={Colors.flBlue.anvil} /></TouchableOpacity>
                </View>
              </View>
            </View>

          </View>

          <View style={styles.claimsCardContainer}>

            <ClaimsCard
              data={this.props.claimsdata}
              cardLimit={this.state.listLimit}
              claimsCount={this.props.claimsdata.length}
              viewMore={this.viewMore}
            />
          </View>
          <HideableView style={styles.searchContainer} visible={this.state.searchVisible} removeWhenHidden duration={200}>
            <TouchableOpacity style={styles.closeSearchButton} onPress={this.handleSearch}>
              <Flb name='remove' size={20} />
            </TouchableOpacity>
            <Text style={styles.searchTitle}>Search for a claim by filling out the fields below:</Text>
            <MKTextField
              ref='providerName'
              style={styles.textField}
              textInputStyle={{ flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025 }}
              editable
              underlineColorAndroid={Colors.coal}
              placeholder={'Provider Name'}
              placeholderTextColor={Colors.steel}
              tintColor={Colors.black}
            />
            <ModalDropdown options={_.map(memberList, 'memberName')} onSelect={this._careSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
              <MKTextField
                ref='careType'
                textInputStyle={{ flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025 }}
                style={styles.textField}
                editable={false}
                underlineColorAndroid={Colors.coal}
                placeholder={'Member Name'}
                placeholderTextColor={Colors.steel}
                tintColor={Colors.black}
                value={''}
              />
            </ModalDropdown>
            <TouchableOpacity style={styles.startDateButton} onPress={this.showDatePicker}>
              <Text>Start Date</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
            />
            <Button rounded style={styles.searchButton} onPress={this.handleSearch}>
              <Text style={{ color: 'white', fontWeight: '500', marginLeft: 20, paddingRight: 20, paddingLeft: 5, alignItems: 'center' }}>Search</Text>
            </Button>
          </HideableView>
        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
        'Claim List',
        'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
          { text: 'OK' }

        ]
      )
    }
  }

  render () {
    console.log('claims list data' + this.props.datePickerVisible)
    console.log('entered to claims list ' + this.props.claimsdata)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
        <View style={{ flex: 1 }}>
          {
            this._displayCondition()
          }
        </View>
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
    fetching: state.claims.fetching,
    claimsdata: state.claims.claimslist,
    error: state.claims.error,
    claimsListCount: state.claims.claimlist,
    datePickerVisible: state.claims.datePickerVisible,
    startDate: state.claims.startDate,
    endDate: state.claims.endDate,
    providerName: state.claims.providerName,
    memberName: state.claims.memberName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: () => dispatch(ClaimsActions.claimsListRequest()),
    changeListLimit: (listLimit) => dispatch(ClaimsActions.changeListLimit(listLimit)),
    changeDatePickerVisible: (datePickerVisible) => dispatch(ClaimsActions.changeDatePickerVisible(datePickerVisible)),
    changeStartDate: (startDate) => dispatch(ClaimsActions.changeStartDate(startDate)),
    changeEndDate: (endDate) => dispatch(ClaimsActions.changeEndDate(endDate)),
    changeProviderName: (providerName) => dispatch(ClaimsActions.changeProviderName(providerName)),
    changeMemberName: (memberName) => dispatch(ClaimsActions.changeMemberName(memberName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
