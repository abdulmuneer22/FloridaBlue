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
      sortOnClaims: false,
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
          sortBy : {
            providerName:0,
            memberName:0,
            date:0
          }
      }
    }
    this.viewMore = this.viewMore.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
    this.hideDatePicker = this.hideDatePicker.bind(this)
    this.addStartDate = this.addStartDate.bind(this)
    this.addEndDate = this.addEndDate.bind(this)
    this.memberSelected = this.memberSelected.bind(this)
    this.sortClaims = this.sortClaims.bind(this)
    this.searchResults=this.searchResults.bind(this)
  }

  searchResults(){
    this.props.attemptClaimsList(this.props)
    this.setState({ searchVisible: false })
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
          Plan Claims
      </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
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
    this.props.changeDatePickerVisible(false)
  }

  addStartDate() {
    this.setState({endDateSelected: false})
    this.props.changeDatePickerVisible(true)
  }

  addEndDate() {
    this.setState({endDateSelected: true})
    this.props.changeDatePickerVisible(true)
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
          this.hideDatePicker()
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

  memberSelected (index, value:string) {
    let selectedMember = this.props.memberObject.contractMembers[index].firstName + " " + this.props.memberObject.contractMembers[index].lastName
    let selectedValue = this.props.memberObject.contractMembers[index].memberId
    this.props.changeMemberName(selectedMember)
    this.props.changeMemberId(selectedValue)
    this.setState({ searchVisible: false }, function () {
      this.setState({ searchVisible: true })
    })
  }

  componentDidMount() {
    if (this.props.startDate == '') {
      let newDate = moment(new Date()).format('MMM Do YYYY')
      this.props.changeStartDate(newDate)
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.state.isFetchingMore || this.state.sortOnClaims) {
      newProps.attemptClaimsList(newProps)
      this.setState({isFetchingMore: false})
      this.setState({sortOnClaims: false})
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

  sortClaims(column){
    let sortBy = [];
    if(column == 'provider'){
      let providerSortState = this.state.searchData.sortBy.providerName;
      let sortByState = 0
      if(providerSortState == 0 || providerSortState == -1){
         sortByState = 1
      }else if( providerSortState == 1){
         sortByState =  -1
      }else{
        sortByState = 1
      }
      this.state.searchData.sortBy.providerName = sortByState;
    }

    if(column == 'date'){
      let dateSortState = this.state.searchData.sortBy.date;
      let sortByState = 0
      if(dateSortState == 0 || dateSortState == -1){
         sortByState = 1
      }else if( dateSortState == 1){
         sortByState =  -1
      }else{
        sortByState = 1
      }
      this.state.searchData.sortBy.date = sortByState;
    }

    if(column == 'member'){
      let memberSortState = this.state.searchData.sortBy.memberName;
      let sortByState = 0
      if(memberSortState == 0 || memberSortState == -1){
         sortByState = 1
      }else if( memberSortState == 1){
         sortByState =  -1
       }else{
        sortByState = 1
      }
      this.state.searchData.sortBy.memberName = sortByState;
    }


    if(this.state.searchData.sortBy.providerName != 0 ){
      sortBy.push({
            "columnName": "providerName",
            "sortOrder": this.state.searchData.sortBy.providerName
       });
    }

    if(this.state.searchData.sortBy.date != 0 ){
      sortBy.push({
            "columnName": "date",
            "sortOrder": this.state.searchData.sortBy.date
       });
    }

    if(this.state.searchData.sortBy.memberName != 0 ){
      sortBy.push({
            "columnName": "memberName",
            "sortOrder": this.state.searchData.sortBy.memberName
       });
    }


    this.props.changeSortBy(sortBy)
    this.state.sortOnClaims = true
    //this.props.attemptClaimsList(this.props);
  }
   _renderViewMore () {
     console.tron.log("view more" +this.props.asyncfetching)
      if(!this.props.asyncfetching){
        return( <View style={{flex: 1, margin: 14}}>
                <Text style={{textAlign: 'center', opacity: 0.6}}>Showing {(this.state.listLimit < this.props.claimsdata.totalCount) ? this.state.listLimit : this.props.claimsdata.data.length} out of {this.props.claimsdata.totalCount} Claims</Text>
                {
                  this.state.listLimit < this.props.claimsdata.totalCount ?
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
      if(this.props.asyncfetching){
        return (<View style={{flex: 1, alignSelf: 'center', marginTop:10 }}>
                    <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                </View>
              )
      }
  }

  _displayCondition () {
     console.tron.log("before view more" +this.props.fetching)
     if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 0) {
        return (
        <View style={{flex:1}}>

          <View style={{flex:1.5,backgroundColor:Colors.snow}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <View style={{flex:0.5}}>
                  <Text allowFontScaling={false} style={styles.claimsListHeaderText}>Claims List</Text>
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
                  <TouchableOpacity style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() => this.sortClaims('date')}>
                      <Text allowFontScaling={false} style={styles.claimsCategoryText}>Date</Text>
                      <Flb name = {this.state.searchData.sortBy.date==0 ? 'caret-up-down' : (this.state.searchData.sortBy.date==1 ?  'caret-up' :  'caret-down' ) } size={Metrics.icons.regular*Metrics.screenWidth*0.0015} color={Colors.flBlue.anvil} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.3}}>
                    <TouchableOpacity style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() => this.sortClaims('member')}>
                      <Text allowFontScaling={false} style={styles.claimsCategoryText}>Member</Text>
                      <Flb name = {this.state.searchData.sortBy.memberName==0 ? 'caret-up-down' : (this.state.searchData.sortBy.memberName==1 ?  'caret-up' :  'caret-down' ) } size={Metrics.icons.regular*Metrics.screenWidth*0.0015} color={Colors.flBlue.anvil} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.4}}>
                     <TouchableOpacity style={{flex:0.4,flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() => this.sortClaims('provider')}>
                      <Text allowFontScaling={false} style={styles.claimsCategoryText}>Providers</Text>
                      <Flb name = {this.state.searchData.sortBy.providerName==0 ? 'caret-up-down' : (this.state.searchData.sortBy.providerName==1 ?  'caret-up' :  'caret-down' ) } size={Metrics.icons.regular*Metrics.screenWidth*0.0015} color={Colors.flBlue.anvil} />
                    </TouchableOpacity>
                </View>
              </View>
            </View>

          <View style={{flex:15}}>
            <ScrollView style={{flex: 15}}>
              <View style={{flex:14}}>
                <ClaimsCard
                  data={this.props.claimsdata.data}
                  cardLimit={this.state.listLimit < this.props.claimsdata.totalCount ? this.state.listLimit : this.props.claimsdata.data.length}
                  claimsCount={this.props.claimsdata.totalCount}
                  />
                  </View>
                  <View style={{flex:1}}>
                {this._renderViewMore()}  
                </View>   
                
            </ScrollView>
          </View>

          <HideableView style={styles.searchContainer} visible={this.state.searchVisible} removeWhenHidden duration={200}>
            <TouchableOpacity style={styles.closeSearchButton} onPress={this.handleSearch}>
              <Flb name='remove' size={Metrics.doubleBaseMargin*Metrics.screenWidth*0.003} />
            </TouchableOpacity>
            <Text style={styles.searchTitle}>Search for a claim by filling out the fields below:</Text>
            <MKTextField
              ref='providerName'
              style={styles.textField}
              textInputStyle={{ flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025 }}
              autoCorrect={false}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              underlineColorAndroid={Colors.coal}
              placeholder={'Provider Name'}
              placeholderTextColor={Colors.steel}
              tintColor={Colors.black}
              onChangeText={this.props.changeProviderName}
             // value={this.props.providerName}
            />

            <ModalDropdown options={_.map(this.props.memberObject.contractMembers, 'firstName')} onSelect={this.memberSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
              <MKTextField
                ref='memberName'
                textInputStyle={{ flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025 }}
                style={styles.textField}
                editable={false}
                underlineColorAndroid={Colors.coal}
                placeholder={'Member Name'}
                placeholderTextColor={Colors.steel}
                tintColor={Colors.black}
                value={this.props.memberName}
              />
            </ModalDropdown>
            <View style={styles.dateContainer}>
              <TouchableOpacity style={styles.startDateButton} onPress={this.addStartDate}>
                <Text style={styles.dateText}>
                  <Text>{this.props.startDate}  </Text>
                  <Flb style={styles.calendarIcon} color={Colors.flBlue.grey3} name="calendar" size={15} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.endDateButton} onPress={this.addEndDate}>
                <Text style={styles.dateText}>
                  <Text>{this.props.endDate}  </Text>
                  <Flb color={Colors.flBlue.grey3} name="calendar" size={15} />
                </Text>
              </TouchableOpacity>
            </View>
            <Button rounded style={styles.searchButton} onPress={()=>{this.searchResults()}}>
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
   /* console.tron.log("claims list data" + this.props.datePickerVisible)
    console.tron.log("entered to claims list "  + this.props.claimsdata)*/
  //  console.tron.log("entered to claims member list " + JSON.stringify(this.props.memberObject.contractMembers))
    return (
      <View style={styles.container}>
          {this._renderHeader()}
        <View style={{ flex: 1 }}>
          {this._displayCondition()}
        </View>
      </View>

    )
  }
}

ClaimsList.propTypes = {
  data: PropTypes.object,
  attemptClaimsList: PropTypes.func,
  attemptMemberList: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string,
  asyncfetching:PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claims.fetching,
    asyncfetching: state.claims.asyncfetching,
    claimsdata: state.claims.claimslist,
    claimsMemberList : state.claims.claimsMemberList,
    error: state.claims.error,
    claimsListCount: state.claims.claimslist,
    datePickerVisible: state.claims.datePickerVisible,
    startDate: state.claims.startDate,
    endDate: state.claims.endDate,
    providerName: state.claims.providerName,
    memberName: state.claims.memberName,
    start: state.claims.start,
    end: state.claims.end,
    sortBy: state.claims.sortBy,
    memberObject:state.member.memberObject,
    memberId: state.claims.memberId
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
    changeMemberId: (memberId) => dispatch(ClaimsActions.changeMemberId(memberId)),
    changeStart: (start) => dispatch(ClaimsActions.changeStart(start)),
    changeEnd: (end) => dispatch(ClaimsActions.changeEnd(end)),
    changeSortBy: (sortBy) => dispatch(ClaimsActions.changeSortBy(sortBy)),
    attemptMemberList: () => dispatch(ClaimsActions.memberListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
