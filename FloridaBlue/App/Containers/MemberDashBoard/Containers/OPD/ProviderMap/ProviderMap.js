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
import { getTheme } from 'react-native-material-kit'
import I18n from 'react-native-i18n'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import { connect } from 'react-redux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import MapView from 'react-native-maps'

const theme = getTheme()

class ProviderMap extends Component {
  constructor(props) {
    super(props)
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
        <MapView
          style={{flex: 1}}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}
        />
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
    region: state.provider.region
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
