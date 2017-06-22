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
      listLimit: this.props.claimsdata.data.length > 0 ? this.props.claimsdata.data.length : 0,
      totalNumberOfCardPerScreen: 10,
      isFetchingMore: false,
      searchVisible: false,
      endDateSelected: false,
      isShowingViewMore: true,
      searchData : {
          memberName: '',
          providerName : '',
          startDate : '',
          endDate : '',
          start : 1,
          end : 10,
          sortBy : '',
      }
    }
    this.viewMore = this.viewMore.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
    this.hideDatePicker = this.hideDatePicker.bind(this)
    this.addStartDate = this.addStartDate.bind(this)
    this.addEndDate = this.addEndDate.bind(this)
    this.memberSelected = this.memberSelected.bind(this)
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
    
  }
   claimsListRequest (newProps) {
    this.state.searchData.start = newProps.start;
    this.state.searchData.end = newProps.end;
    this.state.searchData.sortBy = newProps.sortBy;
    newProps.attemptClaimsList(this.state.searchData)
    this.setState({isShowingViewMore: true})

  }

  componentWillReceiveProps (newProps) {
    if (this.state.isFetchingMore) {
      this.claimsListRequest(newProps)
      this.setState({isFetchingMore: false})
    }
  }

  viewMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    if (newLimit  <= this.props.claimsdata.totalCount) {
      this.props.changeEnd(newLimit + 10)
      this.setState({listLimit: newLimit + 10})
      this.state.isShowingViewMore = false
      this.state.isFetchingMore = true
      this.setState({isShowingViewMore: false})
      this.setState({isFetchingMore: true})
    }
  }

   _renderViewMore () {
            if(this.state.isShowingViewMore){
             return( <View style={{flex: 1, margin: 14}}>
                      <Text style={{textAlign: 'center', opacity: 0.6}}>Showing {this.props.claimsdata.data.length} out of {this.props.claimsdata.totalCount} Claims</Text>
                      { 
                        this.props.claimsdata.data.length < this.props.claimsdata.totalCount ?
                        <View style={{flex:1, justifyContent: 'center'}}>
                          <TouchableOpacity onPress={this.viewMore} style={{flexDirection: 'row',flex:1}}>
                            <Text style={styles.claimsViewMore}>View More </Text>
                            <Flb name="chevron-down" size={20} color={Colors.flBlue.teal} style={{marginTop: 3}}/> 
                          </TouchableOpacity>
                        
                        </View>
                        : null 
                      }
                  </View>)
            }
          if(!this.state.isShowingViewMore){
            return (<View style={{flex: 1, alignSelf: 'center' }}>
                        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                    </View>)
          }
    }

  _displayCondition () {
    if (this.props.fetching) {
      return (
        <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>)
      } else if (this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 0) {
        return (
        <View style={{flex:1}}>
          <View style={{flex:0.4,backgroundColor:Colors.snow}}/>
          <View style={{flex:1,backgroundColor:Colors.snow}}>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
              <View style={{flex:0.5}}>
                  <Text style={styles.claimsListHeaderText}>Claims List</Text>
                </View>
                <View style={{flex:0.5,alignItems:'flex-end',marginRight:Metrics.baseMargin*Metrics.screenWidth*0.004}}>  
                  <TouchableOpacity onPress={this.handleSearch}>
                    <Image source={Images.claimlistsearch} />
                  </TouchableOpacity>
                </View>
             </View> 
            </View>

            <View style={{flex:1}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <View style={{flex:0.3,flexDirection:'row'}}>
                  
                  <TouchableOpacity style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.claimsCategoryText}>Date</Text>
                    <Flb name='caret-up-down' size={Metrics.icons.regular*Metrics.screenWidth*0.002} color={Colors.flBlue.anvil} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.3}}>
                    <TouchableOpacity style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.claimsCategoryText}> Member</Text>
                    <Flb name='caret-up-down' size={Metrics.icons.regular*Metrics.screenWidth*0.002} color={Colors.flBlue.anvil} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.4}}>
                     <TouchableOpacity style={{flex:0.4,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.claimsCategoryText}> Providers</Text>
                    <Flb name='caret-up-down' size={Metrics.icons.regular*Metrics.screenWidth*0.002} color={Colors.flBlue.anvil} />
                    </TouchableOpacity>
                </View>
              </View>
            </View>

          <View style={styles.claimsCardContainer}>
            <ScrollView style={{flex: 10}}>
              <View style={{flex:10}}>
                <ClaimsCard
                          data={this.props.claimsdata.data}
                          cardLimit={this.props.claimsdata.data.length ==  this.props.claimsdata.totalCount ? this.props.claimsdata.data.length : this.state.listLimit}
                          claimsCount={this.props.claimsdata.totalCount}
                         />

                {this._renderViewMore()}
                </View>      
            </ScrollView>
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
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }

        ]
      )
    }
  }

  render () {
     console.log("claims list data" +this.props.datePickerVisible)
       console.log("entered to claims list " ,this.props.claimsdata)
    return (
      <View style={styles.container}>
          {this._renderHeader()}
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
    claimsListCount: state.claims.claimslist,
    datePickerVisible: state.claims.datePickerVisible,
    startDate: state.claims.startDate,
    endDate: state.claims.endDate,
    providerName: state.claims.providerName,
    memberName: state.claims.memberName,
    start: state.claims.start,
    end: state.claims.end,
    sortBy: state.claims.sortBy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: (data) => dispatch(ClaimsActions.claimsListRequest(data)),
    changeListLimit: (listLimit) => dispatch(ClaimsActions.changeListLimit(listLimit)),
    changeDatePickerVisible: (datePickerVisible) => dispatch(ClaimsActions.changeDatePickerVisible(datePickerVisible)),
    changeStartDate: (startDate) => dispatch(ClaimsActions.changeStartDate(startDate)),
    changeEndDate: (endDate) => dispatch(ClaimsActions.changeEndDate(endDate)),
    changeProviderName: (providerName) => dispatch(ClaimsActions.changeProviderName(providerName)),
    changeMemberName: (memberName) => dispatch(ClaimsActions.changeMemberName(memberName)),
    changeStart: (start) => dispatch(ClaimsActions.changeStart(start)),
    changeEnd: (end) => dispatch(ClaimsActions.changeEnd(end)),
    changeSortBy: (sortBy) => dispatch(ClaimsActions.changeSortBy(sortBy))


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
