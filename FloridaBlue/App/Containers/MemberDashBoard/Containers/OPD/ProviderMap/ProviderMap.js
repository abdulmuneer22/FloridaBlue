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
      latDelta: 0,
      longDelta: 0,
      showLocationDetail: false
    }

    this._mapCalloutSelected = this._mapCalloutSelected.bind(this)
    this._mapPressed = this._mapPressed.bind(this)
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

      // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
      const milesOfLatAtEquator = 69
      this.setState({latDelta: this.props.searchRange / milesOfLatAtEquator})
      this.setState({longDelta: this.props.searchRange / (Math.cos(30.25) * milesOfLatAtEquator)})
    }
  }

  _mapCalloutSelected(event) {
    console.tron.log("Callout selected..")
    for (var i = 0; i < this.props.provider.data.providerList.length; i++) {
      var provider = this.props.provider.data.providerList[i]
      if (provider.displayName == event.nativeEvent.id) {
        this.state.selectedLocation = provider
      }
    }

    this.setState({showLocationDetail: true})
    console.tron.log(this.state.showLocationDetail)
    console.tron.log(this.state.selectedLocation)
  }

  _mapPressed() {
    console.tron.log("Map pressed..")
    this.setState({showLocationDetail: false})
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
       <MapView.Marker key={location.id} identifier={location.providerName} coordinate={{latitude: location.latitude, longitude: location.longitude}} onSelect={this._mapCalloutSelected} image={Images.mapUnselectedPin}></MapView.Marker>
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
            onPress={this._mapPressed}
            initialRegion={{
              latitude: 30.25,
              longitude: -81.55,
              latitudeDelta: this.state.latDelta,
              longitudeDelta: this.state.longDelta,
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
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProviderMap)
