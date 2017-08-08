import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
  BackHandler,
  Image,
  TouchableOpacity
} from 'react-native'

import React, { Component } from 'react'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './ProviderMapStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import { getTheme, MKSpinner } from 'react-native-material-kit'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import { connect } from 'react-redux'
import ProviderActions from '../../../Redux/ProviderRedux'
import MapView from 'react-native-maps'
import DoctorCard from './Components/DoctorCard'
import HideableView from 'react-native-hideable-view'
import Swiper from 'react-native-swiper'
import _ from 'lodash'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import DeviceInfo from 'react-native-device-info'


const theme = getTheme()
const screen = Dimensions.get('window')
let urlConfig = require('../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

const ASPECT_RATIO = screen.width / screen.height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

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
      currentLocationIndex: 0
    }

    this._mapCalloutSelected = this._mapCalloutSelected.bind(this)
    this._locationSwiped = this._locationSwiped.bind(this)
    this._onRegionChange = this._onRegionChange.bind(this)
  }

  componentDidMount () {
    gaTracker.trackScreenView('Provider Map')
    this.setState({selectedLocation: this.props.provider.data.providerList[0]})
    this.setState({currentLat: this.props.provider.data.providerList[0].latitude})
    this.setState({currentLong: this.props.provider.data.providerList[0].longitude})
  }

  _onRegionChange (region) {
    console.tron.log(region)
  }

  _locationSwiped (event, state, context) {
    let provider = _.find(this.props.provider.data.providerList, { uniqueId: state.index})
    let newLocationIndex = provider.locationIndex
    this.setState({selectedLocation: provider})

    if (this.state.currentLocationIndex != newLocationIndex) {
      this.setState({currentLat: provider.latitude})
      this.setState({currentLong: provider.longitude})
      this.setState({currentLocationIndex: state.index})
    }
  }

  _mapCalloutSelected (event) {
    var newLocationIndex = parseInt(event.nativeEvent.id)
    let provider = _.find(this.props.provider.data.providerList, { locationIndex: newLocationIndex})
    this.setState({selectedLocation: provider})
    this.setState({currentLat: provider.latitude})
    this.setState({currentLong: provider.longitude})

    this.setState({showLocationDetail: false}, function () {
      this.setState({showLocationDetail: true})
    })
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage : Images.landscapeHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
         Find Care
      </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _renderMapMarkers (location) {
    if (location && location.locationIndex == this.state.selectedLocation.locationIndex) {
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
      <View key={location.locationIndex} style={{flex: 1,
        marginTop: (Platform.OS === 'ios') ? 10 : -5,
        marginBottom: (Platform.OS === 'ios') ? Metrics.section * Metrics.screenHeight * 0.002 : Metrics.searchBarHeight * Metrics.screenHeight * 0.0015
      }} >
        <DoctorCard data={location} />
      </View>
    )
  }

  render () {
    return (
      <View style={{flex: 1 }}>
        {this._renderHeader()}
        {this.props.isPortrait ? <View>{this.props.provider.data.providerList
          ? <View style={styles.container}>
            <MapView
              style={[styles.map, {height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.55) : Metrics.screenHeight - (Metrics.screenHeight * 0.5655), width: Metrics.screenWidth}]}
              showsUserLocation
              loadingEnabled
              onRegionChangeComplete={this._onRegionChange}
              region={{
                latitude: this.state.currentLat,
                longitude: this.state.currentLong,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}>
              {this.props.provider && this.props.provider.data.providerLocationList.map((provider, index) => this._renderMapMarkers(provider, index))}

            </MapView>
            <HideableView visible={this.state.showLocationDetail} style={[styles.locationDetailContainer, {top: (Platform.OS === 'ios') ? Metrics.textHeight2 * Metrics.screenHeight * 0.009 : Metrics.textHeight2 * Metrics.screenHeight * 0.008}]} removeWhenHidden>
              <Swiper index={this.state.selectedLocation ? this.state.selectedLocation.uniqueId : ''} loop={false} style={{marginBottom: Metrics.searchBarHeight1 * Metrics.screenHeight * 0.003}} showsButtons showsPagination={false}
                width={(Platform.OS === 'ios') ? (Metrics.screenWidth - (Metrics.screenWidth * 0.08)) : (Metrics.screenWidth - (Metrics.screenWidth * 0.10))}
                height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.49)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.55))}
                bottom={(Platform.OS === 'ios') ? 0 : -Metrics.textHeight * Metrics.screenHeight * 0.0013}
                nextButton={<Text allowFontScaling={false} style={{fontSize: Fonts.size.h1 * Metrics.screenWidth * 0.0045,
                                            // fontWeight:'400',
                  marginRight: (Platform.OS === 'ios') ? -Metrics.baseMargin * Metrics.screenWidth * 0.002 : -Metrics.baseMargin * Metrics.screenWidth * 0.001,
                  color: Colors.flBlue.grey3,
                  marginBottom: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.003}}>›</Text>}
                onMomentumScrollEnd={this._locationSwiped}
                prevButton={<Text allowFontScaling={false} style={{fontSize: Fonts.size.h1 * Metrics.screenWidth * 0.0045,
                                            // fontWeight:'400',
                  marginLeft: (Platform.OS === 'ios') ? -Metrics.baseMargin * Metrics.screenWidth * 0.002 : -Metrics.baseMargin * Metrics.screenWidth * 0.0009,
                  color: Colors.flBlue.grey3,
                  marginBottom: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.003}}>‹</Text>}

                  >

                {this.props.provider && this.props.provider.data.providerList.map((provider) => this._renderLocationDetail(provider))}
              </Swiper>
            </HideableView>
          </View>
        : <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
        </View>}</View> : <ScrollView>{this.props.provider.data.providerList
          ? <View style={[styles.container, {flexDirection: 'row'}]}>
            <MapView
              style={[styles.map, {height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.54) : Metrics.screenHeight - (Metrics.screenHeight * 0.5655), width: Metrics.screenWidth}]}
              showsUserLocation
              loadingEnabled
              onRegionChangeComplete={this._onRegionChange}
              region={{
                latitude: this.state.currentLat,
                longitude: this.state.currentLong,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              }}>
              {this.props.provider && this.props.provider.data.providerLocationList.map((provider, index) => this._renderMapMarkers(provider, index))}

            </MapView>
            <HideableView visible={this.state.showLocationDetail} style={[styles.locationDetailContainer, {top: (Platform.OS === 'ios') ? Metrics.textHeight2 * Metrics.screenHeight * 0.0087 : Metrics.textHeight2 * Metrics.screenHeight * 0.008}]} removeWhenHidden>
              <Swiper index={this.state.selectedLocation ? this.state.selectedLocation.uniqueId : ''} loop={false} style={{marginBottom: Metrics.searchBarHeight1 * Metrics.screenHeight * 0.00315}} showsButtons showsPagination={false}
                width={(Platform.OS === 'ios') ? (Metrics.screenWidth - (Metrics.screenWidth * 0.10)) : (Metrics.screenWidth - (Metrics.screenWidth * 0.10))}
                height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.398)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.55))}
                bottom={(Platform.OS === 'ios') ? 300 : -Metrics.textHeight * Metrics.screenHeight * 0.0013}
                nextButton={<Text allowFontScaling={false} style={{fontSize: Fonts.size.h1 * Metrics.screenWidth * 0.0045, bottom: 300,
                                            // fontWeight:'400',
                  marginRight: (Platform.OS === 'ios') ? -Metrics.baseMargin * Metrics.screenWidth * 0.002 : -Metrics.baseMargin * Metrics.screenWidth * 0.001,
                  color: Colors.flBlue.grey3,
                  marginBottom: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.003}}>›</Text>}
                onMomentumScrollEnd={this._locationSwiped}
                prevButton={<Text allowFontScaling={false} style={{fontSize: Fonts.size.h1 * Metrics.screenWidth * 0.0045, bottom: 300,
                                            // fontWeight:'400',
                  marginLeft: (Platform.OS === 'ios') ? -Metrics.baseMargin * Metrics.screenWidth * 0.002 : -Metrics.baseMargin * Metrics.screenWidth * 0.0009,
                  color: Colors.flBlue.grey3,
                  marginBottom: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.003}}>‹</Text>}

                  >

                {this.props.provider && this.props.provider.data.providerList.map((provider) => this._renderLocationDetail(provider))}
              </Swiper>
            </HideableView>
          </View>
        : <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
        </View>}</ScrollView>}

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
    provider: state.provider.data,
    addressKey: state.provider.addressKey,
    providerKey: state.provider.providerKey,
    selectedLocation: state.provider.selectedLocation,
    showLocationDetail: state.provider.showLocationDetail,
    listLimit: state.provider.listLimit,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey)),
    changeLatDelta: (latDelta) => dispatch(ProviderActions.changeLatDelta(latDelta)),
    changeLongDelta: (longDelta) => dispatch(ProviderActions.changeLongDelta(longDelta)),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderMap)
