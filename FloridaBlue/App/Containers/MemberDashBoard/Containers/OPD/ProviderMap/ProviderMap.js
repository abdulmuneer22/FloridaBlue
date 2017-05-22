import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Platform,
  BackAndroid,
  Image,
  TouchableOpacity
} from 'react-native'

import React, { Component } from 'react'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './ProviderMapStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { getTheme, MKSpinner } from 'react-native-material-kit'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import { connect } from 'react-redux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import MapView from 'react-native-maps'
import DoctorCard from './Components/DoctorCard'
import HideableView from 'react-native-hideable-view'
import Swiper from 'react-native-swiper'

const theme = getTheme()
const screen = Dimensions.get('window')
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

var region = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0
}

class ProviderMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLocation: {},
      showLocationDetail: true,
      currentLat: 0,
      currentLong: 0,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      uniqueLocations: [],
      limitLocations: []
    }

    this._mapCalloutSelected = this._mapCalloutSelected.bind(this)
    this._locationSwiped = this._locationSwiped.bind(this)
    this._onRegionChange = this._onRegionChange.bind(this)
  }

  componentWillMount () {
    //Check all values in the incoming array and eliminate any duplicates
    var uniqueLocations = [] //Create a new array to be returned with unique values
    var limitLocations = []
    //Iterate through all values in the array passed to this function
    o:for(var i = 0, n = this.props.listLimit; i < n; i++) {
      //Iterate through any values in the array to be returned
      limitLocations.push(this.props.provider.data.providerList[i])
      for(var x = 0, y = uniqueLocations.length; x < y; x++) {
         //Compare the current value in the return array with the current value in the incoming array
         if ( uniqueLocations[x].latitude == this.props.provider.data.providerList[i].latitude) {
            //If they match, then the incoming array value is a duplicate and should be skipped
            continue o
         }
      }
      //If the value hasn't already been added to the return array (not a duplicate) then add it
      uniqueLocations.push(this.props.provider.data.providerList[i])
    }

    console.tron.log(limitLocations)
    this.setState({uniqueLocations: uniqueLocations})
    this.setState({limitLocations: limitLocations})
    this.setState({selectedLocation: this.props.provider.data.providerList[0]})
    this.setState({currentLat: this.props.provider.data.providerList[0].latitude})
    this.setState({currentLong: this.props.provider.data.providerList[0].longitude})
  }

  _onRegionChange (event, region) {
    this.setState({region: region })
  }

  _locationSwiped (event, state, context) {
    this.setState({selectedLocation: this.props.provider.data.providerList[state.index]})
    this.setState({currentLat: this.props.provider.data.providerList[state.index].latitude})
    this.setState({currentLong: this.props.provider.data.providerList[state.index].longitude})

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.props.changeLatDelta(2 / milesOfLatAtEquator)
    this.props.changeLongDelta(2 / (Math.cos(this.props.provider.data.providerList[state.index].longitude) * milesOfLatAtEquator))
  }

  _mapCalloutSelected (event) {
    this.setState({selectedLocation: this.props.provider.data.providerList[event.nativeEvent.id]})
    this.setState({currentLat: this.props.provider.data.providerList[event.nativeEvent.id].latitude})
    this.setState({currentLong: this.props.provider.data.providerList[event.nativeEvent.id].longitude})

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.props.changeLatDelta(2 / milesOfLatAtEquator)
    this.props.changeLongDelta(2 / (Math.cos(this.props.provider.data.providerList[state.index].longitude) * milesOfLatAtEquator))

    this.setState({showLocationDetail: false}, function () {
      this.setState({showLocationDetail: true})
    })
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
    if (location && location.latitude == this.state.selectedLocation.latitude) {
      return (
        <MapView.Marker key={location.uniqueId} identifier={(location != null && location.uniqueId != null ? location.uniqueId.toString() : '')} coordinate={{latitude: location.latitude, longitude: location.longitude}} onPress={this._mapCalloutSelected} onSelect={this._mapCalloutSelected} image={Images.mapSelectedPin} />
      )
    } else {
      return (
        <MapView.Marker key={location.uniqueId} identifier={(location != null && location.uniqueId != null ? location.uniqueId.toString() : '')} coordinate={{latitude: location.latitude, longitude: location.longitude}} onPress={this._mapCalloutSelected} onSelect={this._mapCalloutSelected} image={Images.mapUnselectedPin} />
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

  render () {
    return (
      <View style={{flex: 1 }}>
        {this._renderHeader()}
        {this.props.provider.data.providerList ?
          <View style={styles.container}>
            <MapView
              style={styles.map}
              showsUserLocation
             // onRegionChange={this._onRegionChange}
              region={{
                latitude: this.state.currentLat,
                longitude: this.state.currentLong,
                latitudeDelta: this.props.latDelta,
                longitudeDelta: this.props.longDelta
              }}>
              {this.props.provider && this.state.uniqueLocations.map((provider, index) => this._renderMapMarkers(provider, index))}
            </MapView>
            <HideableView visible={this.state.showLocationDetail} style={styles.locationDetailContainer} removeWhenHidden>
              <Swiper index={this.state.selectedLocation ? this.state.selectedLocation.uniqueId : ''} loop={false} style={{marginBottom: Metrics.searchBarHeight1 * Metrics.screenHeight * 0.003}} showsButtons showsPagination={false}
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

                {this.props.provider && this.state.limitLocations.map((provider) => this._renderLocationDetail(provider))}
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
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.provider.currentLocation,
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
    listLimit: state.provider.listLimit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey)),
    changeLatDelta: (latDelta) => dispatch(ProviderActions.changeLatDelta(latDelta)),
    changeLongDelta: (longDelta) => dispatch(ProviderActions.changeLongDelta(longDelta))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderMap)
