import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
    Alert
} from 'react-native'

import { Card } from 'native-base'


import { Colors, Metrics, Fonts } from '../../../../../../Themes'
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './DoctorCardStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../../../Themes/FlbIcon'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

const window = Dimensions.get('window')

class DoctorCard extends Component {
    constructor(props) {
        super(props)
        this.handleCall = this.handleCall.bind(this);
        this.handleMaps = this.handleMaps.bind(this);
    }

    handleCall(phone) {
        const url = `tel:${phone}`

        Alert.alert(
            'Alert Title',
            'leaving app',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                {
                    text: 'OK', onPress: () => Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            Linking.openURL(url);
                        } else {
                            console.log('Don\'t know how to open URI: ');
                        }
                    })
                },
            ]
        )
    }

    handleMaps(latitude, longitude) {
        const url = `http://maps.apple.com/?ll=${latitude},${longitude}`

        Alert.alert(
            'Alert Title',
            'leaving app',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                {
                    text: 'OK', onPress: () => Linking.canOpenURL(url).then(supported => {
                        if (supported) {
                            Linking.openURL(url);
                        } else {
                            console.log('Don\'t know how to go');
                        }
                    }).catch(err => console.error('An error occurred', err))
                },
            ]
        )
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={{ flex: 1 }}>
                    {this.props.data != undefined ?

                        <Card style={{ flex: 1 }} >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                                <View style={{ flex:1, paddingLeft:Metrics.doubleBaseMargin }}>
                                    {this.props.data ?
                                        <Text style={styles.h1}>{this.props.data.displayName}</Text> : null}
                                    {this.props.data ?
                                        <Text style={styles.h2}>{this.props.data.primarySpecialty}</Text> : null}
                                    {this.props.data ?
                                        <Text style={styles.h4}>{this.props.data.addressLine1}, {this.props.data.addressLine2}</Text> : null}
                                    {this.props.data ?
                                        <Text style={styles.h4_2}>{this.props.data.city}, {this.props.data.state}</Text> : null}
                                    {this.props.data ?
                                        <Text style={styles.h4_2}>{this.props.data.zipCode}</Text> : null}
                                    {this.props.data ?
                                        <Text style={styles.h4_2}>{this.props.data.telephoneNumber}</Text> : null}

                                </View>
                            </View>
                            
                        </Card>

                        : null}

                </View>
            </View>
        )
    }
}

export default DoctorCard
