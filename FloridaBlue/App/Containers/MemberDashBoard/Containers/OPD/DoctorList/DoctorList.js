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
  BackAndroid
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Card } from 'native-base'

const card = {
  card: {
    alignItems: 'flex-start', margin: 15, flex: 1,
    backgroundColor: 'purple', borderRadius: 10
  }
}
const cardTitle = { cardTitle: { fontSize: 40 } }

import DoctorCard from './Components/DoctorCard'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorListStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab } from 'native-base'
import SaveProviderActions from '../../../../../Redux/SaveProviderRedux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorList extends Component {

constructor(props){
         super(props);
         this.state = {
          listLimit : 10,
          totalNumberOfCardPerScreen : 30,
          isFetchingMore: false
      }
      this.loadMore = this.loadMore.bind(this)
   }


  _advancedSearch () {
    NavigationActions.AdvancedSearch({navigatingFrom: 'doctorsListPage'});
  }

  _mapView () {
      if(this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0){
          NavigationActions.ProviderMap()
      }
  }
  componentDidMount () {
  
  }

  componentWillReceiveProps (newProps) {
    console.tron.log(newProps)
    if (this.state.isFetchingMore) {
      this.props.attemptProviderSearch(newProps)
      this.setState({isFetchingMore: false})
    }

    if (newProps.provider && newProps.provider.data && newProps.provider.data.originLatitude != '' && newProps.provider.data.originLongitude != '') {
      this.props.changeLatitude(newProps.provider.data.originLatitude)
      this.props.changeLongitude(newProps.provider.data.originLongitude)
    }

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.props.changeLatDelta(2 / milesOfLatAtEquator)
    this.props.changeLongDelta(2 / (Math.cos(this.props.latitude) * milesOfLatAtEquator))
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
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

    loadMore() {
       var currentLimit = this.state.listLimit
        console.log("currentLimit=>" , currentLimit)
        var newLimit = currentLimit
        console.log("new limit =>" , newLimit)

        this.setState({
            listLimit : newLimit + 10
        })

        if(this.state.totalNumberOfCardPerScreen == newLimit) {
          this.props.changeEnd(this.state.totalNumberOfCardPerScreen + 30)
          this.state.isFetchingMore = true

          this.setState({
             // listLimit : this.state.totalNumberOfCardPerScreen,
              totalNumberOfCardPerScreen : this.state.totalNumberOfCardPerScreen + 30
          })
        }
     }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.provider && this.props.provider.data) {
      return (
        <View style={styles.container}>
          {this.props.provider ?
            <View style={{flex: 9}}>

              <ScrollView >

              {this.props.showUrgentCareBanner ?
                <View style={{flex: 1, margin: 15 }}>
                  <Card style={{flex: 1, borderRadius: 15, backgroundColor: 'purple'}} >
                     <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{ flex: 0.15 }}>
                        <Flb name='accident' size={Metrics.icons.large} color={Colors.snow} />
                      </View>
                      <View style={{ flex: 0.85 }}>
                        <Text style={{
                          fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
                          color: Colors.snow
                        }}>If this is an emergency, please call 911.</Text>
                      </View>
                    </View>
                   </Card>
                </View>
              : null}

                <View style={{flex: 1}}>

                  {this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                     <DoctorCard
                      cardLimit = {this.state.listLimit}
                      data={this.props.provider.data.providerList}
                    //savedproviders={this.props.saveProvider}
                    //saveProvider={this.saveProvider}
                    //removeProvider={this.removeProvider}
                    //leftActive={this.props.leftActive}
                    //rightActive={this.props.rightActive}

                  />
                  :
                      <LinearGradient style={{flex: 1, margin: 15, borderRadius: 20}} colors={['#EECDA3', '#EF629F']}>
                        <View style={{flex: 1, margin: 15}}>

                          <Card style={{flex: 1, borderRadius: 20, justifyContent: 'center'}}>

                           <View style={{flex: 1, margin: 15}}>

                            <Text style={{fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.anvil
                          }}>Oops! We did not find an exact match for your search. Try a new Search.</Text>

                          </View>

                         </Card>

                        </View>
                      </LinearGradient>
                    }

                </View>
                 {this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                <View style={{flex:1}}>
                 <TouchableOpacity
            onPress = {this.loadMore}
            style={{
                backgroundColor : 'grey',
                paddingLeft : 14,
                paddingRight : 14,
                paddingTop: 10,
                paddingBottom : 10,
                width : window.width * 0.4,
                alignSelf : 'center',
                margin : window.height * 0.02,
                alignItems : 'center',
                borderRadius : 5
            }}>
                <Text style={{
                    color : 'white'
                }}>Load More</Text>
            </TouchableOpacity>
            </View> : null}
              </ScrollView>
            </View>

          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
          }
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this._advancedSearch()}>
                  <View style={styles.refinesearch}>

                     <View style={{flex: 0.3, alignItems: 'center'}}>
                      <Flb
                        name='search-find'
                        size={Metrics.icons.medium}
                        color={Colors.snow} />
                    </View>

                     <View style={{flex: 0.7, alignItems: 'flex-start'}}>

                      <Text style={styles.footerText}>Refine Search</Text>
                    </View>

                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={
                  this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                  {flex: 1, backgroundColor:Colors.flBlue.grass}:{flex: 1, backgroundColor:Colors.flBlue.grey3}
                }
                onPress={() => this._mapView()}>
                  <View style={styles.footerView}>

                     <View style={{flex: 0.4, alignItems: 'center'}}>
                      <Flb
                        name='map'
                        size={Metrics.icons.medium}
                        color={Colors.snow} />
                    </View>

                     <View style={{flex: 0.6,
                      alignItems: 'flex-start'}}>

                      <Text style={styles.footerText}>Map View</Text>
                    </View>

                   </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>

        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
        'Find care',
       'Oops! Looks like we`re having trouble with your request. Please try again later.',
        [
          { text: 'OK' }

        ])
    }
  }

  render () {
    // alert(this.props.data)
    return (
      <View style={styles.container}>
        <View >
          {this._renderHeader()}
        </View>

        <View style={{flex: 7}}>
          {
         this._displayCondition()
       }
        </View>
      </View>

    )
  }
}

DoctorList.propTypes = {
  data: PropTypes.string,
  provider: PropTypes.object,
  attemptProviderSearch: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func,

}

const mapStateToProps = (state) => {
  return {
    fetching: state.provider.fetching,
    error: state.provider.error,
   // leftActive: state.provider.leftActive,
    //rightActive: state.provider.rightActive,
    //saveProvider: state.saveprovider.data,
    provider: state.provider.data,
    latitude: state.provider.latitude,
    longitude: state.provider.longitude,
    searchRange: state.provider.searchRange,
    latDelta: state.provider.latDelta,
    longDelta: state.provider.longDelta,
    start:state.provider.start,
    end:state.provider.end,
    networkCodeList: state.provider.networkCodeList,
    showUrgentCareBanner: state.provider.showUrgentCareBanner,
    planCategoryList: state.provider.planCategoryList,
    planSubCategoryList: state.provider.planSubCategoryList,
    categoryCode: state.provider.categoryCode,
    subCategoryCode: state.provider.subCategoryCode,
    providerName: state.provider.providerName,
    careType: state.provider.careType,
    specialityType: state.provider.specialityType,
    knownCareState: state.provider.knownCareState,
    unknownCareState: state.provider.unknownCareState,
    specialityState: state.provider.specialityState,
    changeLocaleState: state.provider.changeLocaleState,
    customLocationState: state.provider.customLocationState,
    currentLocation: state.provider.currentLocation,
    address: state.provider.address,
    homeAddress: state.provider.homeAddress,
    member: state.member,
    urgentCareState: state.urgentCareState,
    locationStatus: state.provider.locationStatus,
    acceptingPatientsIndicator: state.provider.acceptingPatientsIndicator,
    providerLanguage: state.provider.providerLanguage,
    providerLanguages: state.provider.providerLanguages,
    staffLanguage: state.provider.staffLanguage,
    staffLanguages: state.provider.staffLanguages,
    configData: state.provider.configData,
    newLocationState: state.provider.newLocationState,
    gender: state.provider.gender,
    programsList: state.provider.programsList,
    officeHours: state.provider.officeHours
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProviderSearch: (data) => dispatch(ProviderActions.sendProviderSearchRequest(data)),
    // attemptHandleLeft: () => dispatch(ProviderActions.providerClickleft()),
    // attemptHandleRight: () => dispatch(ProviderActions.providerClickright()),
    // addProviderRequest: (data) => dispatch(SaveProviderActions.addProviderRequest(data)),
    // removeProviderRequest: (savedProviderKey) => dispatch(SaveProviderActions.removeProviderRequest(savedProviderKey)),
     changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeLatDelta: (latDelta) => dispatch(ProviderActions.changeLatDelta(latDelta)),
    changeLongDelta: (longDelta) => dispatch(ProviderActions.changeLongDelta(longDelta)),
  // changeStart: (start) => dispatch(ProviderActions.changeStart(start)),
    changeEnd: (end) => dispatch(ProviderActions.changeEnd(end)),
     attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
