import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
const window = Dimensions.get('window')

export default class DoctorLocation extends Component{
    render(){
        return(
            <View style={{
                width : window.width,
                height : window.height * 0.4,
                backgroundColor : 'red'
            }}>
                <MapView
                    style={{
                        flex : 1,
                    }}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                <MapView.Marker style={{
                                    width : 10,
                                    height : 10
                                }}
                                //image={marker_image}
                                coordinate= {{latitude : 37.78825,longitude: -122.4324}}
                                title= "Test"
                                description= "Test Desc"
                                //onPress= {()=>{this.selectDoctorFromMap(coor.id)}}
                />
                </MapView>
            </View>
        );
    }
}