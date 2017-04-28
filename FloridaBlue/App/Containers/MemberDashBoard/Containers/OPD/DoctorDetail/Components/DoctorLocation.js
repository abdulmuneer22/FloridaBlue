import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native'

import { Colors, Metrics, Fonts } from '../../../../../../Themes'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
const window = Dimensions.get('window')

export default class DoctorLocation extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{
                height: Metrics.screenHeight * 0.5,
                flex:1
                // backgroundColor : 'red'
            }}>

               
                    <MapView
                        style={{
                            flex: 1,
                        }}
                        initialRegion={{
                            latitude: 32.78825,
                            longitude: -12.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}  >
                        <MapView.Marker style={{
                            width: 10,
                            height: 10
                        }}
                            //image={marker_image}
                            coordinate={{ latitude: 32.78825, longitude: -12.4324 }}
                            title="Test"

                        />
                    </MapView>
                    
            </View>
        );
    }
}