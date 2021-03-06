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
import ClaimsActions from '../../../Redux/ClaimsRedux'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
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
import SettingActions from '../../../Redux/SettingRedux'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info'

let urlConfig = require('../../../UrlConfig')

const window = Dimensions.get('window')
let moment = require('moment')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimsList extends Component {
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
      dateError: false,
      members: [],
      isMemeberSortin : false,
      isDateSorting : false,
      isProviderSorting : false,
      member : '',
      date : '',
      provider : '',
      searchData: {
        memberName: '',
        providerName: '',
        startDate: '',
        endDate: '',
        start: 1,
        end: 10,
        sortBy: {
          providerName: 0,
          memberName: 0,
          date: 0
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
    this._sortItems = this._sortItems.bind(this)
    this.searchResults = this.searchResults.bind(this)
    this.handleSearchClose = this.handleSearchClose.bind(this)
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }

  searchResults () {
    let currentStartDate = moment(this.props.startDate, 'MM-DD-YYYY')
    let currentEndDate = moment(this.props.endDate, 'MM-DD-YYYY')

    if (moment(currentEndDate).isAfter(currentStartDate) && moment(currentStartDate).isBefore(currentEndDate)) {
      this.props.attemptClaimsList(this.props)
      this.setState({ searchVisible: false })
      this.setState({ dateError: false })
    } else {
      this.setState({ dateError: true })
      this.setState({ searchVisible: false }, function () {
        this.setState({ searchVisible: true })
      })
    }
  }

  _renderHeader () {
   return (<Image source={this.props.isPortrait ? (DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage) : Images.landscapeHeaderImage} style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        Claim Overview
        </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _renderDropdownRow (rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text allowFontScaling={false} style={styles.dropdownItem}>{rowData}</Text>
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

  handleSearchClose () {
    this.setState({ searchVisible: false })
    let newStartDate = moment(new Date()).add(-730, 'days').format('MM-DD-YYYY')
    let newEndDate = moment(new Date()).format('MM-DD-YYYY')
    this.props.changeStartDate(newStartDate)
    this.props.changeEndDate(newEndDate)
    this.props.changeProviderName('')
    this.props.changeMemberName('')
    this.props.changeMemberId('')
  }

  hideDatePicker () {
    this.props.changeDatePickerVisible(false)
  }

  addStartDate () {
    this.setState({ endDateSelected: false })
    this.props.changeDatePickerVisible(true)
  }

  addEndDate () {
    this.setState({ endDateSelected: true })
    this.props.changeDatePickerVisible(true)
  }

  handleDatePicked (date) {
    let selectedDate = moment(date)

    if (this.state.endDateSelected) {
      this.props.changeEndDate(moment(selectedDate).format('MM-DD-YYYY'))
      this.setState({ searchVisible: false }, function () {
        this.setState({ searchVisible: true })
      })
    } else {
      this.props.changeStartDate(moment(selectedDate).format('MM-DD-YYYY'))
      this.setState({ searchVisible: false }, function () {
        this.setState({ searchVisible: true })
      })
    }

    this.hideDatePicker()
  }

  memberSelected (index, value: string) {
    let selectedMember = this.props.memberList[index].memberName
    let selectedValue = this.props.memberList[index].memberId
    this.props.changeMemberName(selectedMember)
    this.props.changeMemberId(selectedValue)
    this.setState({ searchVisible: false }, function () {
    this.setState({ searchVisible: true })
    })
  }
  componentWillMount () {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation()
    if (initial === 'PORTRAIT') {
      this.props.changeOrientation(true)
      console.log('Hey, Im in landscape mode')
    } else {
      this.props.changeOrientation(false)
      console.log('Hey, Im in landscape mode')
    }
  }

  _orientationDidChange (orientation) {
    if (orientation === 'LANDSCAPE') {
      this.props.changeOrientation(false)
      console.log('Hey, Im in landscape mode')
    } else {
      this.props.changeOrientation(true)
      console.log('Hey, Im in portrait mode')
    }
  }

  componentDidMount () {
    let newStartDate = moment(new Date()).add(-730, 'days').format('MM-DD-YYYY')
    let newEndDate = moment(new Date()).format('MM-DD-YYYY')
    this.props.changeStartDate(newStartDate)
    this.props.changeEndDate(newEndDate)

    if (this.props.claimsdata && this.props.claimsdata.members) {
      this.props.changeMemberList(this.props.claimsdata.members)
    }

    //this.setState({ members: memberArray })
    Orientation.addOrientationListener(this._orientationDidChange)
  }

  componentWillReceiveProps (newProps) {
    console.tron.log("New props")
    console.tron.log(newProps)
    if (this.state.isFetchingMore || this.state.sortOnClaims) {
      newProps.attemptAsyncClaimList(newProps)
      this.setState({ isFetchingMore: false })
      this.setState({ sortOnClaims: false })
    }
  }

  viewMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    if (newLimit <= this.props.claimsdata.totalCount) {
      this.props.changeEnd(newLimit + 10)
      this.setState({ listLimit: newLimit + 10 })
      this.state.isShowingViewMore = false
      this.state.isFetchingMore = true
      this.setState({ isShowingViewMore: false })
      this.setState({ isFetchingMore: true })
    }
  }

  
  _renderViewMore () {
    // console.tron.log("view more" +this.props.asyncfetching)
    if (!this.props.asyncfetching) {
      return (<View style={{ flex: 1, margin: 14 }}>
        <Text allowFontScaling={false} 
        style={{ textAlign: 'center', opacity: 0.6,
                   color:Colors.flBlue.grey5,
                   fontSize:Fonts.size.regular*Metrics.screenWidth*0.0022}}>
                   Showing {(this.state.listLimit < this.props.claimsdata.totalCount) ? this.state.listLimit : this.props.claimsdata.data.length} out of {this.props.claimsdata.totalCount} Claims
                   </Text>
        {
          this.state.listLimit < this.props.claimsdata.totalCount ?
            <View style={{ flex: 1, justifyContent: 'center',alignItems:'center', marginTop:Metrics.baseMargin*Metrics.screenWidth*0.001 }}>
              <TouchableOpacity onPress={this.viewMore} style={{ flexDirection: 'row', flex: 1 }}>
                <Text allowFontScaling={false} style={styles.claimsViewMore}>View More </Text>
                <Flb name='chevron-down' size={Metrics.icons.large*Metrics.screenWidth*0.0015} color={Colors.flBlue.ocean} style={{ marginTop: Metrics.smallMargin*Metrics.screenHeight*0.001 }} />
              </TouchableOpacity>
            </View>
            : null
        }
      </View>)
    }
    if (this.props.asyncfetching) {
      return (<View style={{ flex: 1, alignSelf: 'center', marginTop: 10 }}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
      </View>
      )
    }
  }

  _renderTwoCarets = (sorter) => {
      return(
          <View>
                <TouchableOpacity
                onPress = {()=>{
                    if(sorter === "date") {
                        this.setState({
                            isDateSorting : true,
                            isMemeberSortin : false,
                            isProviderSorting : false,
                            date : 1,
                            member : '',
                            provider : '',
                        })
                        this._sortItems("date",1)
                    } else if(sorter === "member"){
                        this.setState({
                            isDateSorting : false,
                            isMemeberSortin : true,
                            isProviderSorting : false,
                            date : '',
                            member : 1,
                            provider : ''
                        })
                        this._sortItems("memberName",1)
                    }else if(sorter === "provider"){
                        this.setState({
                            isDateSorting : false,
                            isMemeberSortin : false,
                            isProviderSorting : true,
                            date : '',
                            member : '',
                            provider : 1
                        })
                        this._sortItems("providerName",1)
                    }
                }}
                >
                <Icon name='caret-up' size={Metrics.icons.large*Metrics.screenWidth*0.0012} color={Colors.flBlue.anvil}
                style={{paddingHorizontal : 5,backgroundColor:Colors.transparent, marginTop:Metrics.smallMargin*Metrics.screenHeight*0.0013,}}/>
                </TouchableOpacity>

                <TouchableOpacity
                onPress = {()=>{
                    if(sorter === "date") {
                        this.setState({
                            isDateSorting : true,
                            isMemeberSortin : false,
                            isProviderSorting : false,
                            date : -1,
                            member : '',
                            provider : ''
                        })
                        this._sortItems("date",-1)
                    }else if(sorter === "member"){
                        this.setState({
                            isDateSorting : false,
                            isMemeberSortin : true,
                            isProviderSorting : false,
                            date : '',
                            member : -1,
                            provider : ''
                        })
                        this._sortItems("memberName",-1)
                    }else if(sorter === "provider"){
                        this.setState({
                            isDateSorting : false,
                            isMemeberSortin : false,
                            isProviderSorting : true,
                            date : '',
                            member : '',
                            provider : -1,
                        })
                        this._sortItems("providerName",-1)
                    }
                }}
                >
                <Icon name='caret-down' size={Metrics.icons.large*Metrics.screenWidth*0.0012} color={Colors.flBlue.anvil}
                    style={{paddingHorizontal : 5, backgroundColor:Colors.transparent}}/>
                </TouchableOpacity>
            </View>
      )
  }


  _renderUpCaret = (sorter) => {
    return(
      <View>
        <TouchableOpacity
        onPress = {()=>{
            if(sorter === "date") {
                this.setState({
                    date : 1,
                    member : '',
                    provider : ''
                })
                this._sortItems("date",1)
            } else if(sorter === "member"){
                this.setState({
                        date : '',
                        member : 1,
                        provider : ''
                })
                this._sortItems("memberName",1)
            }else if(sorter === "provider",1){
                this.setState({
                    date : '',
                    member : '',
                    provider : 1
                })
                this._sortItems("providerName",1)
            }
        }
        }
        >
        <Flb
        name='caret-up'
        size={Metrics.icons.regular * Metrics.screenWidth * 0.0015}
        color={Colors.flBlue.anvil}
        />
        </TouchableOpacity>
        </View>
        )
  }


  _renderDownCaret = (sorter) => {
    return(
    <View>
        <TouchableOpacity
        onPress = {()=>{
            if(sorter === "date") {
            this.setState({
            date : -1,
            member : '',
            provider : ''
            })
            this._sortItems("date",-1)
            } else if(sorter === "member"){
            this.setState({
            date : '',
            member : -1,
            provider : ''
            })
            this._sortItems("memberName",-1)
            }else if(sorter === "provider"){
            this.setState({
            date : '',
            member : '',
            provider : -1
            })
            this._sortItems("providerName",-1)
            }
        }}
        >
        <Flb
        name='caret-down'
        size={Metrics.icons.regular * Metrics.screenWidth * 0.0015} color={Colors.flBlue.anvil}
       />
        </TouchableOpacity>
        </View>
    )
  }


  _sortItems = (sorter,order) => {
    let sortBy = [{'columnName' : sorter,'sortOrder' : order}]
    this.setState({
      sortOnClaims : true  
    },()=>{
      this.props.changeSortBy(sortBy)
    })  
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.claimsdata && this.props.claimsdata.data && (Object(this.props.claimsdata.data).length > 0)) {
      console.log('newww data',this.props.claimsdata)
      return (
        <View style={{ flex: 1 }}>

          <View style={{ flex: 1.5, backgroundColor: Colors.snow }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 0.5 }}>
                <Text allowFontScaling={false} style={styles.claimsListHeaderText}>Claims List</Text>
              </View>
              <View style={{ flex: 0.5, alignItems: 'flex-end', marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.004 }}>
                <TouchableOpacity onPress={this.handleSearch}>
                  <Image source={Images.claimlistsearch} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, marginBottom:Metrics.smallMargin*Metrics.screenHeight*0.001, marginTop:Metrics.smallMargin*Metrics.screenHeight*0.001}}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ flex: 0.3, flexDirection:'row',justifyContent:'center', alignItems:'center' }}>
                  <Text allowFontScaling={false} style={styles.claimsCategoryText}>Date</Text>
                  {!this.state.isDateSorting && 
                  this._renderTwoCarets("date")
                  }
                  {this.state.date === -1 && this._renderUpCaret("date")}
                  {this.state.date === 1 && this._renderDownCaret("date")}
              </View>
              <View style={{ flex: 0.3,flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                  <Text allowFontScaling={false} style={styles.claimsCategoryText}>Member</Text>
                  {!this.state.isMemeberSortin && this._renderTwoCarets("member")}
                  {this.state.member === -1 && this._renderUpCaret("member")}
                  {this.state.member === 1 && this._renderDownCaret("member")}
              </View>
              <View style={{ flex: 0.4,flexDirection:'row', justifyContent:'center', alignItems:'center'  }}>
                 <Text allowFontScaling={false} style={styles.claimsCategoryText}>Providers</Text>
                  {!this.state.isProviderSorting && this._renderTwoCarets("provider")}
                  {this.state.provider === -1 && this._renderUpCaret("provider")}
                  {this.state.provider === 1 && this._renderDownCaret("provider")}
        
              </View>
            </View>
          </View>

          <View style={{ flex: 15 }}>
            <ScrollView style={{ flex: 15 }}>
              <View style={{ flex: 14 }}>
                <ClaimsCard
                  data={this.props.claimsdata.data}
                  cardLimit={this.state.listLimit < this.props.claimsdata.totalCount ? this.state.listLimit : this.props.claimsdata.data.length}
                  claimsCount={this.props.claimsdata.totalCount}
                  isPortrait={this.props.isPortrait}
                />
              </View>
              <View style={{ flex: 1 }}>
                {this._renderViewMore()}
              </View>
              {this.props.isPortrait
                  ? <TouchableOpacity style={{flex: 1, margin: 15, marginTop: -5 }} onPress={() => { NavigationActions.MyView({responseURL: urlConfig.internetStatementURL}) }}>
                    <Card style={{flex: 1, borderRadius: 15, backgroundColor: Colors.flBlue.deepBlue, paddingLeft: 10}} >
                      <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.15, marginRight: 10 }}>
                          <Flb name='flag' size={Metrics.icons.large} color={Colors.snow} />
                        </View>
                        <View style={{ flex: 0.85 }}>
                          <Text allowFontScaling={false} style={{
                            fontSize: Fonts.size.input * Metrics.screenWidth * 0.002,
                            color: Colors.snow
                          }}>Pharmacy claims are not shown here. For a full list of claims, click <Text style={{textDecorationLine: 'underline'}}>here.</Text> </Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
              : null}

            </ScrollView>
          </View>

         <HideableView style={styles.searchContainer} visible={this.state.searchVisible} removeWhenHidden duration={200}>
            <View style={{backgroundColor: 'white'}}>
              <TouchableOpacity style={styles.closeSearchButton} onPress={this.handleSearchClose}>
                <Flb name='remove' color={Colors.flBlue.grey5} size={Metrics.doubleBaseMargin * Metrics.screenWidth * 0.003} />
              </TouchableOpacity>
              <Text allowFontScaling={false} style={styles.searchTitle}>Search for specific claims by filling out one or more of the fields below.</Text>
              <HideableView visible={this.state.dateError} removeWhenHidden>
                <Text allowFontScaling={false} style={styles.error}>Oops! Something went wrong. Check your dates and try again.</Text>
              </HideableView>
            <MKTextField
            ref='providerName'
            style={{flex:1,
                    //width:Metrics.screenWidth * 0.8
                    marginLeft:Metrics.doubleBaseMargin*Metrics.screenWidth*0.002,
                    marginRight:Metrics.doubleBaseMargin*Metrics.screenWidth*0.002
            }}
                textInputStyle={{ flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025 }}
                autoCorrect={false}
                keyboardType='default'
                autoCapitalize='none'
                underlineColorAndroid={Colors.coal}
                placeholder={'Provider Name'}
                placeholderTextColor={Colors.steel}
                tintColor={Colors.flBlue.grey4}
                onChangeText={this.props.changeProviderName}
                defaultValue={this.props.providerName}
            />
            <View style={{flexDirection:'row', flex:1, marginTop:10}}>
              <View style={{flex:0.95}}>
            <ModalDropdown options={_.map(this.props.memberList, 'memberName')} onSelect={this.memberSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
               
                <MKTextField
                ref='memberName'
                textInputStyle={{ flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025 }}
                 style={{flex:1,
                        //width:Metrics.screenWidth * 0.8,
                        marginTop:Metrics.doubleBaseMargin*Metrics.screenHeight*0.001,
                        marginLeft:Metrics.doubleBaseMargin*Metrics.screenWidth*0.002,
                        //marginRight:Metrics.doubleBaseMargin*Metrics.screenWidth*0.002,
                        height: Metrics.searchBarHeight * Metrics.screenHeight * 0.0015,
                        //width: this.props.isPortrait ? 410 : 668
                        }}
                  editable={false}
                  underlineColorAndroid={Colors.coal}
                  placeholder={'Member Name'}
                  placeholderTextColor={Colors.steel}
                  tintColor={Colors.flBlue.grey4}
                  value={this.props.memberName}
                />
                  </ModalDropdown>
                  </View>
                  <View style={{flex:0.05}}>
                <Flb name="caret-down-two" style={{
                                                marginTop: (Platform.OS === 'ios') ? Metrics.baseMargin*Metrics.screenHeight*0.001 : Metrics.baseMargin*Metrics.screenWidth*0.004,
                                                marginLeft:(Platform.OS === 'ios') ? -Metrics.section*Metrics.screenWidth*0.002 : -Metrics.mediumMargin*Metrics.screenWidth*0.004}} 
                    size={Metrics.icons.large*Metrics.screenWidth*0.0015} 
                    color={Colors.flBlue.grey4} />
                </View>
             </View>
              <View style={{ flex: 1,
                            flexDirection: 'row',
                            alignItems:'center',
                            justifyContent:'center',
                           // margin:Metrics.baseMargin*Metrics.screenHeight*0.001,
                            marginTop:Metrics.baseMargin*Metrics.screenHeight*0.003,
                            //marginBottom:Metrics.baseMargin*Metrics.screenHeight*0.003
                            }}>
                <View style={{flex:0.5,
                            justifyContent:'center',
                            margin:Metrics.baseMargin*Metrics.screenHeight*0.001,
                            marginLeft: Metrics.doubleBaseMargin*Metrics.screenHeight*0.0012}}>            
                <Text allowFontScaling={false} 
                style={{fontSize: Fonts.size.regular * Metrics.screenWidth*0.0027,
                        fontFamily: Fonts.type.base,
                        fontWeight: '400',
                        color: Colors.flBlue.grey5,}}>
                  Start Date
                </Text>
                </View>
                <View style={{flex:0.5,justifyContent:'center',
                              margin:Metrics.baseMargin*Metrics.screenHeight*0.001,
                              marginLeft:Metrics.textHeight2*Metrics.screenWidth*0.005}}>
                 <Text allowFontScaling={false} 
                 style={{fontSize: Fonts.size.regular * Metrics.screenWidth*0.0027,
                        fontFamily: Fonts.type.base,
                        fontWeight: '400',
                        color: Colors.flBlue.grey5,}}>
                   End Date
                  </Text>
               </View>
    
              </View>

              <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.startDateButton} onPress={this.addStartDate}>
                  <Text allowFontScaling={false} style={styles.dateText}>
                    <Text>{this.props.startDate}   </Text>
                    <Flb style={styles.calendarIcon} color={Colors.flBlue.grey5} name='calendar' size={Metrics.icons.large*Metrics.screenWidth*0.0011} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.endDateButton} onPress={this.addEndDate}>
                  <Text allowFontScaling={false} style={styles.dateText}>
                    <Text>{this.props.endDate}   </Text>
                     <Flb style={styles.calendarIcon} color={Colors.flBlue.grey5} name='calendar' size={Metrics.icons.large*Metrics.screenWidth*0.0011} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.searchView}>
                <TouchableOpacity onPress={() => { this.searchResults() }}
                  style={styles.searchButton}>

                  <Flb name="search-find" color={Colors.snow} 
                        style={{marginRight:Metrics.doubleBaseMargin*Metrics.screenWidth*0.0015}} size={Metrics.icons.large*Metrics.screenWidth*0.0015} />
                  <Text allowFontScaling={false}
                        style={styles.searchText}>Search</Text>

                </TouchableOpacity>
              </View>
            </View>
            <View style={{backgroundColor: 'rgba(0,0,0,.65)', paddingBottom: Metrics.screenHeight - Metrics.screenHeight*0.6}} />
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
    } else {
      Alert.alert(
        'Claim List',
        'Oops! Something went wrong. Check your details and try again.',
        [
          { text: 'OK' }
        ]
      )
    }
  }

  render () {
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
  attemptAsyncClaimList: PropTypes.func,
  attemptMemberList: PropTypes.func,
  fetching: PropTypes.bool,
  error: PropTypes.string,
  asyncfetching: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claims.fetching,
    asyncfetching: state.claims.asyncfetching,
    claimsdata: state.claims.claimslist,
    claimsMemberList: state.claims.claimsMemberList,
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
    memberObject: state.member.memberObject,
    memberId: state.claims.memberId,
    memberList: state.claims.memberList,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptAsyncClaimList: (data) => dispatch(ClaimsActions.asyncClaimListRequest(data)),
    attemptClaimsList: (data) => dispatch(ClaimsActions.claimsListRequest(data)),
    changeListLimit: (listLimit) => dispatch(ClaimsActions.changeListLimit(listLimit)),
    changeDatePickerVisible: (datePickerVisible) => dispatch(ClaimsActions.changeDatePickerVisible(datePickerVisible)),
    changeStartDate: (startDate) => dispatch(ClaimsActions.changeStartDate(startDate)),
    changeEndDate: (endDate) => dispatch(ClaimsActions.changeEndDate(endDate)),
    changeProviderName: (providerName) => dispatch(ClaimsActions.changeProviderName(providerName)),
    changeMemberName: (memberName) => dispatch(ClaimsActions.changeMemberName(memberName)),
    changeMemberId: (memberId) => dispatch(ClaimsActions.changeMemberId(memberId)),
    changeMemberList: (memberList) => dispatch(ClaimsActions.changeMemberList(memberList)),
    changeStart: (start) => dispatch(ClaimsActions.changeStart(start)),
    changeEnd: (end) => dispatch(ClaimsActions.changeEnd(end)),
    changeSortBy: (sortBy) => dispatch(ClaimsActions.changeSortBy(sortBy)),
    attemptMemberList: () => dispatch(ClaimsActions.memberListRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
