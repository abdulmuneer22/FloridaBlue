import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native'

import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
import ProviderActions from '../../../../Redux/ProviderRedux'
import styles from '../DoctorDetailStyle'
import { MKSpinner } from 'react-native-material-kit'

const screen = Dimensions.get('window')
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class DoctorLocation extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <View style={{ height: Metrics.screenHeight * 0.3, flex: 1}}>
          <MapView style={{flex: 1}}
            region={{
              latitude: this.props.data.latitude,
              longitude: this.props.data.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }} >
            <MapView.Marker style={{width: 10, height: 10}} coordinate={{ latitude: this.props.data && this.props.data.latitude ? this.props.data.latitude : '', longitude: this.props.data && this.props.data.longitude ? this.props.data.longitude : '' }} image={Images.mapSelectedPin} />
          </MapView>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    originLatitude: state.provider.latitude,
    originLongitude: state.provider.longitude
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLatDelta: (latDelta) => dispatch(ProviderActions.changeLatDelta(latDelta)),
    changeLongDelta: (longDelta) => dispatch(ProviderActions.changeLongDelta(longDelta))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorLocation)
