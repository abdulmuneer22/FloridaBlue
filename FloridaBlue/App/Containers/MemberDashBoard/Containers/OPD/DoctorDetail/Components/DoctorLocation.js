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
        console.log(this.props.data)
        console.tron.log(this.props.data)
        return (
            <View style={{
                height: Metrics.screenHeight * 0.5,
                flex:1
                // backgroundColor : 'red'
            }}>

               
                    <MapView
                        style={{
                            flex: 1,
                        }} >
                        <MapView.Marker style={{
                            width: 10,
                            height: 10
                        }}
                        
             coordinate={{ latitude: 30.3322, longitude: 81.6557 }}
    

                        />
                    </MapView>
                    
            </View>
        );
    }
}