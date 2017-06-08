import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert,
  Platform,
  BackAndroid,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { getTheme, MKSpinner, MKTextField, MKColor } from 'react-native-material-kit'
import { Container, Content, Footer, FooterTab, Card } from 'native-base'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import ProviderActions from '../../../Redux/ProviderRedux'
import NavItems from '../../../Navigation/NavItems.js'
import DoctorCard from './Components/DoctorCard'
import styles from './DoctorListStyle'
import Flb from '../../../Themes/FlbIcon'

import MapView from 'react-native-maps'
import HideableView from 'react-native-hideable-view'
import Swiper from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'

const theme = getTheme()
const cardTitle = { cardTitle: { fontSize: 40 } }
const card = {
  card: {
    alignItems: 'flex-start', margin: 15, flex: 1,
    backgroundColor: 'purple', borderRadius: 10
  }
}
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ProviderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listLimit: 10,
      totalNumberOfCardPerScreen: 30,
      isFetchingMore: false,
      loadingMore: true,
      initialCount: 0,
      finalCount: 0,
      asynCall: true,
      displayBannerInfo: false,
      selectedLocation: {},
      showLocationDetail: true,
      currentLat: 0,
      currentLong: 0,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }

    this.loadMore = this.loadMore.bind(this)
    this._mapCalloutSelected = this._mapCalloutSelected.bind(this)
    this._locationSwiped = this._locationSwiped.bind(this)
    this._onRegionChange = this._onRegionChange.bind(this)
  }

  componentDidMount () {
    // Call asynchronously to get more data
    console.tron.log(this.props)
    this.props.changeEnd(300)
    this.setState({isFetchingMore : true});
  }

  componentWillReceiveProps (newProps) {
    console.tron.log(newProps)
    if (this.state.isFetchingMore) {
      this.providerSearchList(newProps)
      this.setState({isFetchingMore: false})
    }

    if (this.props.networkCodeList && this.props.networkCodeList.length > 0) {
      if (newProps.provider && newProps.provider.data && newProps.provider.data.originLatitude != '' && newProps.provider.data.originLongitude != '') {
        this.props.changeLatitude(newProps.provider.data.originLatitude)
        this.props.changeLongitude(newProps.provider.data.originLongitude)
      } else if (newProps.provider && newProps.provider.data) {
        this.props.changeLatitude(newProps.provider.data.providerList[0].latitude)
        this.props.changeLongitude(newProps.provider.data.providerList[0].longitude)
        this.props.changeSelectedLocation(newProps.provider.data.providerList[0])
      }
      // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
      const milesOfLatAtEquator = 69
      this.props.changeLatDelta(2 / milesOfLatAtEquator)
      this.props.changeLongDelta(2 / (Math.cos(this.props.latitude) * milesOfLatAtEquator))
      this.props.changeEnd(300);
    }
  }

  _advancedSearch () {
    NavigationActions.AdvancedSearch({navigatingFrom: 'doctorsListPage'})
  }

  async providerSearchList (newProps) {
    if (newProps.networkCodeList && newProps.networkCodeList.length > 0) {
      if (newProps.error == undefined || newProps.error == null) {
        if (newProps.showUrgentCareBanner) {
          newProps.attemptAsyncUrgentSearch(newProps)
        } else {
          if (newProps.categoryCode == '07' && newProps.subCategoryCode == '700') {
            newProps.attemptAsyncPharmacySearch(newProps)
          } else {
            newProps.attemptAsyncProviderSearch(newProps)
          }
        }
      }
    }
  }

  loadMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    var numberOfCardsPerscreen = this.state.totalNumberOfCardPerScreen
    this.setState({
      listLimit: newLimit + 10
    })

    this.props.changeListLimit(newLimit+10)
  }

  _locationSwiped (event, state, context) {
    this.props.changeSelectedLocation(this.props.provider.data.providerList[state.index])
    this.props.changeLatitude(this.props.provider.data.providerList[state.index].latitude)
    this.props.changeLongitude(this.props.provider.data.providerList[state.index].longitude)

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.props.changeLatDelta(2 / milesOfLatAtEquator)
    this.props.changeLongDelta(2 / (Math.cos(this.props.provider.data.providerList[state.index].longitude) * milesOfLatAtEquator))
  }

  _mapCalloutSelected (event) {
    this.props.changeSelectedLocation(this.props.provider.data.providerList[event.nativeEvent.id])
    this.props.changeLatitude(this.props.provider.data.providerList[event.nativeEvent.id].latitude)
    this.props.changeLongitude(this.props.provider.data.providerList[event.nativeEvent.id].longitude)

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.props.changeLatDelta(2 / milesOfLatAtEquator)
    this.props.changeLongDelta(2 / (Math.cos(this.props.provider.data.providerList[event.nativeEvent.id].longitude) * milesOfLatAtEquator))

    this.setState({showLocationDetail: false}, function () {
      this.setState({showLocationDetail: true})
    })
  }

  _onRegionChange (region) {
    console.tron.log(region)
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

  _renderMapMarkers (location) {
    if (location && location.latitude == this.props.selectedLocation.latitude) {
      return (
        <MapView.Marker key={location.locationIndex} identifier={(location != null && location.locationIndex != null ? location.locationIndex.toString() : '')} coordinate={{latitude: location.latitude, longitude: location.longitude}} onPress={this._mapCalloutSelected} onSelect={this._mapCalloutSelected} image={Images.mapSelectedPin} />
      )
    } else {
      return (
        <MapView.Marker key={location.locationIndex} identifier={(location != null && location.locationIndex != null ? location.locationIndex.toString() : '')} coordinate={{latitude: location.latitude, longitude: location.longitude}} onPress={this._mapCalloutSelected} onSelect={this._mapCalloutSelected} image={Images.mapUnselectedPin} />
      )
    }
  }

  _renderLocationDetail (location) {
    return (
      <View key={location.uniqueId} style={{flex: 1, marginTop: (Platform.OS === 'ios') ? 10 : -5,
        marginBottom: (Platform.OS === 'ios') ? Metrics.section * Metrics.screenHeight * 0.002 :  Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
      }} >
        <DoctorCard data={location} />
      </View>
    )
  }

  _displayCondition (doctorCard) {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait</Text>
      </View>)
    } else if (this.props.provider && this.props.provider.data) {
      if (this.props.selectedTab == 'listView') {
        return (
          <View style={{flex: 1 }}>
          <View style={styles.container}>
            {this.props.provider ?
              <View style={{flex: 9}}>
                <ScrollView >
                  {this.props.showUrgentCareBanner ?
                    <View style={{flex: 1, margin: 15, marginTop: -5 }}>
                      <Card style={{flex: 1, borderRadius: 15, backgroundColor: Colors.flBlue.red, paddingLeft: 10}} >
                        <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{ flex: 0.15, marginRight: 10 }}>
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
                  {
                    this.props.provider && this.props.provider.data && this.props.provider.data && this.props.provider.data.totalCount >= 300 ?
                      <View style={{flex: 1, margin: 15, marginTop: -5 }}>
                        <Card style={{flex: 1, borderRadius: 15, backgroundColor: Colors.flBlue.deepBlue, paddingLeft: 10}} >
                          <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 0.15 }}>
                              <Flb name='flag' size={Metrics.icons.medium} color={Colors.snow} />
                            </View>
                            <View style={{ flex: 0.85 }}>
                              <Text style={{
                                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0015,
                                color: Colors.snow
                              }}>
                                <Text style={{
                                  fontSize: Fonts.size.input * Metrics.screenWidth * 0.0015,
                                  color: Colors.snow, fontWeight: '700'
                                }}>Please Note:</Text>Your inquiry resulted in a very large list of providers. For now, we have limited your display to only the first 300 providers.</Text>
                            </View>
                          </View>
                        </Card>
                      </View>
                    : null
                  }

                  <View style={{flex: 1, marginTop: -20}}>
                    {
                       this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                       {doctorCard}
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

                  {this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length >= 10
                    && !(this.state.listLimit > this.props.provider.data.providerList.length)
                    && !(this.props.provider.data.providerList.length == 300 && this.props.provider.data.providerList.length == this.state.listLimit)
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
                  <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this._advancedSearch()}>
                    <View style={styles.refinesearch}>
                      <View style={{flex: 0.25, alignItems: 'flex-end', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                        <Flb
                          name='search-find'
                          size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                          color={Colors.snow} />
                      </View>
                      <View style={{flex: 0.75, alignItems: 'flex-start'}}>
                        <Text style={styles.footerText}>Refine Search</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={
                    this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                    {flex: 1, backgroundColor: Colors.flBlue.grass} : {flex: 1, backgroundColor: Colors.flBlue.grey3}
                  }
                    onPress={() => this._mapView()}>
                    <View style={styles.footerView}>

                      <View style={{flex: 0.35, alignItems: 'flex-end', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                        <Flb
                          name='map'
                          size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                          color={Colors.snow} />
                      </View>

                      <View style={{flex: 0.65,
                        alignItems: 'flex-start'}}>

                        <Text style={styles.footerText}>Map View</Text>
                      </View>

                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

          </View>
          </View>
        )
      } else {
        return (
          <View style={{flex: 1 }}>
            {this.props.latitude != 0 && this.props.longitude != 0 && this.props.provider.data.providerList ?
              <View style={styles.container}>
                <MapView
                  style={styles.map}
                  showsUserLocation={true}
                  loadingEnabled={true}
                  onRegionChangeComplete={this._onRegionChange}
                  region={{
                    latitude: this.props.latitude,
                    longitude: this.props.longitude,
                    latitudeDelta: this.props.latDelta,
                    longitudeDelta: this.props.longDelta
                  }}>

                  {doctorCard}

                </MapView>
                <HideableView visible={this.state.showLocationDetail} style={styles.locationDetailContainer} removeWhenHidden>
                  <Swiper index={this.props.selectedLocation ? this.props.selectedLocation.uniqueId : ''} loop={false} style={{marginBottom: Metrics.searchBarHeight1 * Metrics.screenHeight * 0.003}} showsButtons showsPagination={false}
                    width={(Platform.OS === 'ios') ? (Metrics.screenWidth - (Metrics.screenWidth * 0.08)) : (Metrics.screenWidth - (Metrics.screenWidth * 0.10))}
                    height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.49)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.55))}
                    bottom={(Platform.OS === 'ios') ? 0 : -Metrics.textHeight * Metrics.screenHeight * 0.0013}
                    nextButton={<Text style={{fontSize:Fonts.size.h1 * Metrics.screenWidth* 0.0045,
                                              // fontWeight:'400',
                                               marginRight: (Platform.OS === 'ios') ? -Metrics.baseMargin * Metrics.screenWidth * 0.002 : -Metrics.baseMargin * Metrics.screenWidth * 0.001,
                                               color:Colors.flBlue.grey3,
                                               marginBottom:(Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.003}}>›</Text>}
                    onMomentumScrollEnd={this._locationSwiped}
                    prevButton={<Text style={{fontSize:Fonts.size.h1 * Metrics.screenWidth* 0.0045,
                                               //fontWeight:'400',
                                               marginLeft: (Platform.OS === 'ios') ? -Metrics.baseMargin * Metrics.screenWidth * 0.002 :  -Metrics.baseMargin * Metrics.screenWidth * 0.0009,
                                               color:Colors.flBlue.grey3,
                                               marginBottom: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.003}}>‹</Text>}


                    >


                  </Swiper>
                </HideableView>
              </View>
            : <View style={styles.spinnerView}>
              <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
              <Text style={styles.spinnerText}>Loading Please Wait </Text>
            </View>}
          </View>
        )
      }
    } else if ((this.props.error != null) ||
     ( this.props.provider ==null ||
     (this.props.provider != null &&
     (this.props.provider.data == null || this.props.provider.data.length ==0 )
      ) ) ) {
      Alert.alert(
        'Find care',
       'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
          { text: 'OK' }
        ])
    }
  }

  render () {
  let  doctorCard = []
    {this.props.provider && this.props.provider.data && this.props.provider.data.providerList.map((provider) => {
      masterCard = this._renderLocationDetail(provider)
    })
  }
    return (
      <View style={styles.container}>
        <View >
          {this._renderHeader()}
        </View>

        <View>
          {this._displayCondition(doctorCard)}
        </View>
      </View>
    )
  }
}

ProviderList.propTypes = {
  data: PropTypes.string,
  provider: PropTypes.object,
  attemptAsyncProviderSearch: PropTypes.func,
  attemptAsyncPharmacySearch: PropTypes.func,
  attemptAsyncUrgentSearch: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func,
  onTabSelect: PropTypes.func,
  selectedTab: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    latitude: state.provider.latitude,
    longitude: state.provider.longitude,
    member: state.member,
    region: state.provider.region,
    searchRange: state.provider.searchRange,
    latDelta: state.provider.latDelta,
    longDelta: state.provider.longDelta,
    provider: state.provider.data,
    addressKey: state.provider.addressKey,
    providerKey: state.provider.providerKey,
    selectedLocation: state.provider.selectedLocation,
    showLocationDetail: state.provider.showLocationDetail,
    listLimit: state.provider.listLimit,
    selectedTab: state.provider.selectedTab,
    fetching: state.provider.fetching,
    error: state.provider.error,
    start: state.provider.start,
    end: state.provider.end,
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
    officeHours: state.provider.officeHours,
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest()),
    attemptAsyncProviderSearch: (data) => dispatch(ProviderActions.sendAsyncProviderSearchRequest(data)),
    attemptAsyncPharmacySearch: (data) => dispatch(ProviderActions.sendAsyncPharmacySearchRequest(data)),
    attemptAsyncUrgentSearch: (data) => dispatch(ProviderActions.sendAsyncUrgentSearchRequest(data)),
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey)),
    changeLatDelta: (latDelta) => dispatch(ProviderActions.changeLatDelta(latDelta)),
    changeLongDelta: (longDelta) => dispatch(ProviderActions.changeLongDelta(longDelta)),
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeEnd: (end) => dispatch(ProviderActions.changeEnd(end)),
    changeListLimit: (listLimit) => dispatch(ProviderActions.changeListLimit(listLimit)),
    changeSelectedLocation: (selectedLocation) => dispatch(ProviderActions.changeSelectedLocation(selectedLocation)),
    onTabSelect: (selectedTab) => dispatch(ProviderActions.onTabSelect(selectedTab))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderList)
