import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Platform,
  BackAndroid,
  Image
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

const theme = getTheme()
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

const markerList = []


class ProviderMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latDelta: 0,
      longDelta: 0
    }
  }

  componentDidMount() {
    console.tron.log(this.props)
    navigator.geolocation.getCurrentPosition(
    (position) => {
      this.props.changeCurrentLocation(position)

      var newLat = position["coords"]["latitude"]
      var newLong = position["coords"]["longitude"]

      this.props.changeLatitude(newLat)
      this.props.changeLongitude(newLong)
    },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    });

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.setState({latDelta: this.props.searchRange / milesOfLatAtEquator})
    this.setState({longDelta: this.props.searchRange / (Math.cos(this.props.latitude) * milesOfLatAtEquator)})

    var providerLocations = []
    for (var i = 0; i < this.props.provider.data.providerList.length; i++) {
      var providerItem = this.props.provider.data.providerList[i]
      var providerData = {}

      providerData["providerName"] = providerItem["displayName"]
      providerData["practiceType"] = providerItem["primarySpecialty"]
      providerData["latitude"] = providerItem["latitude"]
      providerData["longitude"] = providerItem["longitude"]
      providerData["id"] = providerItem["providerKey"]
      providerData["distance"] = providerItem["distance"]

      console.tron.log(providerData["id"])

      markerList.push(providerData)
    }
  }

  _mapCalloutSelected(event) {
    console.tron.log("Callout selected..")
    console.tron.log(event)
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

  render () {
    return(
      <View style={styles.container}>
        {this._renderHeader()}

        {this.props.latitude != 0 && this.props.longitude != 0 ?
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              latitudeDelta: this.state.latDelta,
              longitudeDelta: this.state.longDelta,
            }}>
            {markerList.map(marker => (
               <MapView.Marker
                 coordinate= {{latitude : marker.latitude,longitude: marker.longitude}}
                 image={Images.mapUnselectedPin}
                 key={marker.id}
                 onPress={this._mapCalloutSelected}>

                 <MapView.Callout style={styles.calloutView}>
                  <View>
                    <Text>Test</Text>
                  </View>
                 </MapView.Callout>
               </MapView.Marker>
             ))}
          </MapView>
          :
          <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
        }
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
    provider: state.provider.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentLocation: (currentLocation) => dispatch(ProviderActions.changeCurrentLocation(currentLocation)),
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude))
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProviderMap)
