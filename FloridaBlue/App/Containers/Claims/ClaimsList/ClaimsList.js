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

  viewMore () {
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

  async claimsListRequest (newProps) {
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
      this.setState({searchVisible: false})
    } else {
      this.setState({searchVisible: true})
    }
  }

  hideDatePicker () {
    this.setState({isDatePickerVisible: false})
  }

  addStartDate () {
    this.setState({endDateSelected: false})
    this.props.changeDatePickerVisible(true)
  }

  addEndDate () {
    this.setState({endDateSelected: true})
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
      if (this.props.endDate != 'End Date') {
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

  memberSelected (index, value:string) {
    let selectedMember = memberList[index]
    this.props.changeMemberName(selectedMember)
    this.setState({searchVisible: false}, function () {
      this.setState({searchVisible: true})
    })
  }

  componentDidMount () {
    this.props.attemptClaimsList(this.props)
  }

  _displayCondition () {
    const height = Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.60) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)
    const width = Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.60) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)
    console.tron.log(this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length + ' this.props.claimsdata.data' + JSON.stringify(this.props.claimsdata))
    console.tron.log('this.props.fetching' + this.props.fetching)
    if (this.props.fetching) {
      return (
        <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>)
    } else if (this.props.claimsdata && this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length != 0) {
      return (
        <View style={styles.container}>
          <View>
            {this._renderHeader()}
          </View>
          <View style={{flex: 0.3}}>
            <View style={{flex: 0.2, marginBottom: 20}}>
              <View style={{flex: 0.2, backgroundColor: 'white'}}>
                <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 0, margin: 10}}>
                  <Text style={{fontSize: 20, paddingLeft: 15, opacity: 0.9}}>Claims List</Text>
                  <Image source={Images.claimlistsearch} />
                </View>
              </View>
            </View>

            <View style={{margin: 10, marginBottom: 0, paddingTop: 5}}>
              <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-start', marginTop: -15}}>
                <View style={{flex: 0.27, alignItems: 'center'}}>
                  <TouchableOpacity><Text style={{fontWeight: 'bold', opacity: 0.9}}> Date</Text></TouchableOpacity>
                </View>
                <View style={{flex: 0.33, alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.props.claimsdata.sortBy('providerName', true)}><Text style={{fontWeight: 'bold'}}> Member</Text></TouchableOpacity>
                </View>
                <View style={{flex: 0.34, alignItems: 'center'}}>
                  <TouchableOpacity><Text style={{fontWeight: 'bold'}}> Providers</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{flex: 1}}>
            {/* {
                    this._displayCondition()
                  } */}

            <ClaimsCard
              data={this.props.claimsdata.data}
              cardLimit={this.state.listLimit}
                      />

          </View>

          {this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length >= 10
                  && !(this.state.listLimit > this.props.claimsdata.data.length)
                  && !(this.props.claimsdata.data.length == 300 && this.props.claimsdata.data.length == this.state.listLimit)
                  ?
                    <View style={{flex: 0, margin: 14}}>
                      <Text style={{textAlign: 'center', opacity: 0.6}}>Showing {this.state.listLimit} out of {this.props.claimsdata.count} Claims</Text>
                      <TouchableOpacity onPress={this.viewMore}>
                        <Text style={{textAlign: 'center', color: 'teal', fontSize: 20}}>View More <Icon name='chevron-down' /></Text>
                      </TouchableOpacity>
                    </View> : null }

        </View>
      )
    }
  }

  render () {
    console.log('claims list data' + this.props.datePickerVisible)
    return (
      <View style={styles.container}>

        <View style={{flex: 1}}>
          {
                  this._displayCondition()
                }

          {/* <ClaimsCard
                      data={this.props.claimsdata.data}
                     /> */}

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
