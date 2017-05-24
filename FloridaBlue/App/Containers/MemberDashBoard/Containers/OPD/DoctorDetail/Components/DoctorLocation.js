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
import ProviderActions from '../../../../../../Redux/ProviderRedux'
import styles from '../DoctorDetailStyle'
import { MKSpinner } from 'react-native-material-kit'

const screen = Dimensions.get('window')
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class DoctorLocation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      latitudeDelta: 0,
      longitudeDelta: 0
    }
  }

  componentDidMount() {
    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    let latDelta = 2 / milesOfLatAtEquator
    let longDelta = 2 / (Math.cos(this.props.data.latitude) * milesOfLatAtEquator)

    this.setState({ latitudeDelta: latDelta })
    this.setState({ longitudeDelta: longDelta })

  }

  render () {
    return (
      <View>
        {this.state.latitudeDelta != 0 && this.state.longitudeDelta != 0 ?
          <View style={{ height: Metrics.screenHeight * 0.3, flex: 1}}>
            <MapView style={{flex: 1}}
              region={{
                latitude: this.props.data.latitude,
                longitude: this.props.data.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }} >
              <MapView.Marker style={{width: 10, height: 10}} coordinate={{ latitude: this.props.data && this.props.data.latitude ? this.props.data.latitude : '', longitude: this.props.data && this.props.data.longitude ? this.props.data.longitude : '' }} image={Images.mapSelectedPin} />
            </MapView>
          </View>
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
