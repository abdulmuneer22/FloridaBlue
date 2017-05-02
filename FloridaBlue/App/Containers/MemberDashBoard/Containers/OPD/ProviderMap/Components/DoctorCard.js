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
        console.log(phone)
        const url = `tel:${phone}`

     Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log('Don\'t know how to open URI: ');
        }
     })
    }

    handleMaps(latitude, longitude) {

        console.log(latitude, longitude)
        const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`

 Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log('Don\'t know how to go');
        }
 });
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={{ flex: 1 }}>
                    {this.props.data != undefined ?

                        <Card style={{ flex: 1}} >
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
                             <View style={{ flex: 1, marginTop:150 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ flex: 1, height:50 }} onPress={() => this.handleCall(value.telephoneNumber)}>
                                                <View style={styles.call}>

                                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                                        <Flb
                                                            name='call-phone'
                                                            size={Metrics.icons.medium}
                                                            color={Colors.snow} />
                                                    </View>

                                                    <View style={{ flex: 1, alignItems: 'flex-start' }}>

                                                        <Text style={styles.callText}>Call</Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ flex: 1,height:50 }} onPress={() => this.handleMaps(value.latitude, value.longitude)}>
                                                <View style={styles.directions}>

                                                    <View style={{ flex: 0.3, alignItems: 'center' }}>
                                                        <Flb
                                                            name='directions'
                                                            size={Metrics.icons.medium}
                                                            color={Colors.snow} />
                                                    </View>

                                                    <View style={{
                                                        flex: 0.7,
                                                        alignItems: 'flex-start'
                                                    }}>

                                                        <Text style={styles.directionText}>Directions</Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
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
