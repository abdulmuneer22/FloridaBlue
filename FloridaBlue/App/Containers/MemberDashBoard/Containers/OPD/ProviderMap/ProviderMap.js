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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
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
      showLocationDetail: false
    }

    this._mapCalloutSelected = this._mapCalloutSelected.bind(this)
  }

  componentDidMount () {

  }

  _mapCalloutSelected (event) {
    for (var i = 0; i < this.props.provider.data.providerList.length; i++) {
      var provider = this.props.provider.data.providerList[i]
      if (provider.displayName == event.nativeEvent.id) {
        this.state.selectedLocation = provider
      }
    }

    if (this.state.showLocationDetail) {
      this.setState({showLocationDetail: false})
    } else {
      this.setState({showLocationDetail: true})
    }
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
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

  _renderMapMarkers(location) {
    return (
      <MapView.Marker identifier={location.displayName} coordinate={{latitude: location.latitude, longitude: location.longitude}} onPress={this._mapCalloutSelected} onSelect={this._mapCalloutSelected} image={Images.mapUnselectedPin} />
    )
  }

  _renderLocationDetail(location) {
    return(
      <DoctorCard data={location} />
    )
  }

  render () {
    return (
      <View>
        {this._renderHeader()}
        {this.props.provider.data.providerList ?
          <View style={styles.container}>
            <MapView
              style={styles.map}
              showsUserLocation
              initialRegion={{
                latitude: this.props.latitude,
                longitude: this.props.longitude,
                latitudeDelta: this.props.latDelta,
                longitudeDelta: this.props.longDelta
              }}>
              {this.props.provider && this.props.provider.data.providerList.map((provider) => this._renderMapMarkers(provider))}
            </MapView>
            <HideableView visible={this.state.showLocationDetail} style={styles.locationDetailContainer} removeWhenHidden>
              <Swiper style={{marginBottom:40, marginTop:-5}} width={(Platform.OS === 'ios') ? (Metrics.screenWidth - (Metrics.screenWidth * 0.08)) : (Metrics.screenWidth - (Metrics.screenWidth * 0.10))} height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.52)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.55))} showsButtons={true} showsPagination={false}>
                {this.props.provider && this.props.provider.data.providerList.map((provider) => this._renderLocationDetail(provider))}
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
    showLocationDetail: state.provider.showLocationDetail,
    addressKey: state.provider.addressKey,
    providerKey: state.provider.providerKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderMap)
