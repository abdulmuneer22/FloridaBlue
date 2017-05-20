import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native'

import { Colors, Metrics, Fonts, Images } from '../../../../../../Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
const window = Dimensions.get('window')
const milesOfLatAtEquator = 69

class DoctorLocation extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount() {
    console.tron.log(this.props)
  }

  render () {
    return (
      <View style={{
        height: Metrics.screenHeight * 0.3,
        flex: 1
                // backgroundColor : 'red'
      }}>
        <MapView style={{flex: 1}}
          initialRegion={{
            latitude: this.props.data.latitude,
            longitude:  this.props.data.longitude,
            latitudeDelta: 2 / milesOfLatAtEquator,
            longitudeDelta: 2 / (Math.cos(this.props.data.latitude) * milesOfLatAtEquator)
          }}>
          <MapView.Marker style={{width: 10, height: 10}} coordinate={{ latitude: this.props.data && this.props.data.latitude ? this.props.data.latitude : '', longitude: this.props.data && this.props.data.longitude ? this.props.data.longitude : '' }} image={Images.mapSelectedPin} />
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    originLatitude: state.provider.latitude,
    originLongitude: state.provider.longitude,
    latDelta: state.provider.latDelta,
    longDelta: state.provider.longDelta
  }
}

export default connect(mapStateToProps)(DoctorLocation)
