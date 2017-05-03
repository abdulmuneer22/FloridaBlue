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
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps'
import DoctorCard from './Components/DoctorCard'
import HideableView from 'react-native-hideable-view'

const theme = getTheme()
const screen = Dimensions.get('window');
const markerList = []
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
  constructor(props) {
    super(props)
    this.state = {
      selectedLocation: {},
      showLocationDetail: false
    }

    this._mapCalloutSelected = this._mapCalloutSelected.bind(this)
  }

  componentDidMount() {
    console.tron.log(this.props)

    var providerLocations = []
    for (var i = 0; i < this.props.provider.data.providerList.length; i++) {
      var providerItem = this.props.provider.data.providerList[i]
      var providerData = {}

      providerData["providerName"] = providerItem["displayName"]
      providerData["practiceType"] = providerItem["primarySpecialty"]
      providerData["latitude"] = providerItem["latitude"]
      providerData["longitude"] = providerItem["longitude"]
      providerData["id"] = providerItem["providerKey"] + "." + providerItem["providerLocationKey"]
      providerData["distance"] = providerItem["distance"]

      markerList.push(providerData)
    }
  }

  _mapCalloutSelected(event) {
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

  _renderHeader() {
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
       <MapView.Marker key={location.id} identifier={location.providerName} coordinate={{latitude: location.latitude, longitude: location.longitude}} onPress={this._mapCalloutSelected} image={Images.mapUnselectedPin}></MapView.Marker>
     )
   }


  render () {
    return(
      <View>
        {this._renderHeader()}
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              latitudeDelta: this.props.latDelta,
              longitudeDelta: this.props.longDelta
            }}>
              {this.props.provider && markerList.map((provider) => this._renderMapMarkers(provider))}
          </MapView>
          
          <HideableView visible={this.state.showLocationDetail} style={styles.locationDetailContainer}>
         
            <DoctorCard data={this.state.selectedLocation} />
         
          </HideableView>
          
        </View>
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

export default connect (mapStateToProps, mapDispatchToProps)(ProviderMap)
