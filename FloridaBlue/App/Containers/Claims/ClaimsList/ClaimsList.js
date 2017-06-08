import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, TouchableHighlight, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './ClaimsStyle'
import ClaimsCard from './Components/ClaimsCard'
import axios from 'axios'
import ClaimsListActions from '../../../Redux/ClaimsListRedux'
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
import DateTimePicker from 'react-native-modal-datetime-picker';

const window = Dimensions.get('window')

const memberList = ['Ashlyn', 'Shane', 'Grace', 'Noah', 'Hope', 'Jack']

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimsList extends Component {
  constructor (props) {
    super(props)
   this.state = {
      
    }
    this.loadMore = this.loadMore.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)
    this.hideDatePicker = this.hideDatePicker.bind(this)
    this.showDatePicker = this.showDatePicker.bind(this)
  }

  viewClaimsList(){
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
    this.props.changeListLimit(newLimit+10)
    if(this.state.totalNumberOfCardPerScreen == newLimit) {
           this.props.changeEnd(this.state.totalNumberOfCardPerScreen + 10)
           this.state.isFetchingMore = true
           this.setState({isFetchingMore : true});
           this.setState({totalNumberOfCardPerScreen : this.state.totalNumberOfCardPerScreen + 10});
    }
  }

  handleSearch() {
    if (this.state.searchVisible) {
      this.setState({searchVisible: false})
    } else {
      this.setState({searchVisible: true})
    }
  }

  showDatePicker() {
    this.setState({isDatePickerVisible: true})
  }

  hideDatePicker() {
    this.setState({isDatePickerVisible: false})
  }

  handleDatePicked(date) {
    this.setState({isDatePickerVisible: false})
    console.tron.log(date)
  }

  componentDidMount () {
    console.tron.log('I am Claims List screen')
    this.props.attemptClaimsList(this.props)
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait</Text>
      </View>)
    } else if (this.props.claimsdata && this.props.claimsdata.data) {
      return (
        <View style={styles.container}>

                <View style={{flex: 1, marginTop: -20}}>

                  {
                     this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 0 ?
                       <ClaimsCard
                         cardLimit={this.state.listLimit}
                         data={this.props.claimsdata.data}
                      />
                  :

                         <View style={{flex: 1, margin: 15}}>
                           <Card style={{flex: 1, borderRadius: 20, justifyContent: 'center'}}>
                             <View style={{flex: 1, margin: 15}}>
                               <Text style={{fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                 color: Colors.flBlue.anvil
                               }}>Oops! We did not find an exact match for your search. Try a new Search.</Text>
                             </View>
                           </Card>
                         </View>

                    }

                </View>

                 {/*{
                          this.props.asyncfetching ?
                          <View style={{flex: 1,alignSelf: 'center',}}>
                            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                          </View> : null
                }*/}

                {this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length >= 10
                  && !(this.state.listLimit > this.props.claimsdata.data.length)
                  ?
                    <View style={{flex: 1, marginBottom: 10}}>
                      <TouchableOpacity
                        onPress={this.loadMore}
                        style={{
                          backgroundColor: Colors.flBlue.ocean,
                          paddingLeft: 14,
                          paddingRight: 14,
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: window.width * 0.4,
                          alignSelf: 'center',
                          margin: window.height * 0.02,
                          alignItems: 'center',
                          borderRadius: 5
                        }}>
                        <Text style={{
                          color: 'white'
                        }}>Show More</Text>
                      </TouchableOpacity>
                    </View> : null
                }

         
        </View>
      )

    } else if ((this.props.error != null) ||
     ( this.props.claimsdata ==null ||
     (this.props.claimsdata != null &&
     (this.props.claimsdata.data == null || this.props.claimsdata.data.length ==0 )
      ) ) ) {
      Alert.alert(
        'Claims List',
       'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
          { text: 'OK' }
        ])
    }
  }

  

  render () {
     console.log("claims list data" +this.props.claimsdata.data)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: .2}}>

            <View style={{flex: .2, backgroundColor: 'white'}}>
                <View style={{flex: .1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, margin: 10}}>
                  <Text style={{fontSize: 20, paddingLeft: 15, opacity: .9}}>Claims List</Text>
                  <Button rounded style={{backgroundColor: '#00003f', marginBottom: 20, justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontWeight: '500', marginLeft: 20, paddingRight: 20, paddingLeft: 5, alignItems: 'center'}}>Search</Text>
                  </Button>
                </View>
            </View>

            <View style={{margin:10, marginBottom: 15, paddingTop: 5}}>
              <View style={{flex:0, flexDirection:'row', justifyContent:'flex-start', marginBottom: -15}}>
                    <View style={{flex:0.27, alignItems:'center'}}>
                      <TouchableOpacity><Text style={{fontWeight: 'bold', opacity: .9}}> Date</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:0.33, alignItems:'center'}}>
                      <TouchableOpacity onPress={() => this.props.claimsdata.sortBy('providerName', true)}><Text style={{fontWeight: 'bold'}}> Member</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:0.34, alignItems:'center'}}>
                      <TouchableOpacity><Text style={{fontWeight: 'bold'}}> Providers</Text></TouchableOpacity>
                    </View>
              </View>
            </View>
            
             <View style={{flex:1}}>
                {/*{
                  this._displayCondition()
                }*/}

                    <ClaimsCard
                      data={this.props.claimsdata.data}
                     />


             </View>

             {/*If 10+ Claims, Show More Button*/}

            {this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 10 ?
             <View style={{flex: 0, margin: 14}}>
               <Text style={{textAlign: 'center', opacity: 0.6}}>Showing 10 out of {this.props.claimsdata.count} Claims</Text>
               <TouchableOpacity>
                 <Text style={{textAlign: 'center', color: 'teal', fontSize: 20}}>View More <Icon name="chevron-down"></Icon></Text>
               </TouchableOpacity>
              </View> : null }


          </View>
        </View>
        <HideableView style={styles.searchContainer} visible={this.state.searchVisible} removeWhenHidden={true} duration={200}>
          <TouchableOpacity style={styles.closeSearchButton} onPress={this.handleSearch}>
            <Flb name="remove" size={20} />
          </TouchableOpacity>
          <Text style={styles.searchTitle}>Search for a claim by filling out the fields below:</Text>
          <MKTextField
            ref='providerName'
            style={styles.textField}
            textInputStyle={{flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
            editable={true}
            underlineColorAndroid={Colors.coal}
            placeholder={"Provider Name"}
            placeholderTextColor={Colors.steel}
            tintColor={Colors.black}
          />
          <ModalDropdown options={_.map(memberList, 'memberName')} onSelect={this._careSelected} dropdownStyle={styles.dropdown} renderRow={this._renderDropdownRow.bind(this)}>
            <MKTextField
              ref='careType'
              textInputStyle={{flex: 1, color: Colors.flBlue.ocean, fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025}}
              style={styles.textField}
              editable={false}
              underlineColorAndroid={Colors.coal}
              placeholder={"Member Name"}
              placeholderTextColor={Colors.steel}
              tintColor={Colors.black}
              value={""}
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
            <Text style={{color: 'white', fontWeight: '500', marginLeft: 20, paddingRight: 20, paddingLeft: 5, alignItems: 'center'}}>Search</Text>
          </Button>
        </HideableView>
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
    claimsListCount: state.claimslist.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: () => dispatch(ClaimsListActions.claimsListRequest()),
    changeListLimit: (listLimit) => dispatch(ClaimsListActions.changeListLimit(listLimit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
