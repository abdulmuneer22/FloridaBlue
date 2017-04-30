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
import styles from '../DoctorDetailStyle'
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
        this.onPressBookmark = this.onPressBookmark.bind(this);
        this.onRemoveBookmark = this.onRemoveBookmark.bind(this);
    }
    onPressBookmark(data) {
        //alert(JSON.stringify(data));

        this.props.saveProvider(data)
    }

    onRemoveBookmark(data) {
        // alert(data)
        this.props.removeProvider(data.providerKey)
    }
    handleCall(phone) {
        console.log(phone)
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

        console.log(latitude, longitude)
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

        const providerAvailable = this.props.savedproviders && this.props.savedproviders.find((savedprovider) => savedprovider.providerKey === this.props.data.providerKey)
        return (
            <View style={styles.container}>

                <View style={{ flex: 1 }}>
                    {this.props.data != undefined ?

                        <Card style={{ flex: 1 }} >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                                <View style={{ flex: 0.2 }}>
                                    {providerAvailable ? <TouchableOpacity onPress={() => this.onRemoveBookmark(value)} >
                                        <Flb name="add-bookmark"
                                            size={Metrics.icons.large} color={Colors.flBlue.orange} />
                                    </TouchableOpacity> : <TouchableOpacity onPress={() => this.onPressBookmark(value)} >
                                            <Flb name="add-bookmark"
                                                size={Metrics.icons.large} color={Colors.flBlue.grey2} />
                                        </TouchableOpacity>

                                    }
                                </View>

                                <View style={{ flex: 0.8, alignItems: 'flex-start' }}>
                                    {this.props.data ?
                                        <Text style={styles.h1}>{this.props.data.displayName}</Text>
                                        : null}
                                    {this.props.data ?
                                        <Text style={styles.h2}>{this.props.data.primarySpecialty}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4}>{this.props.data.address[0].addressLine1}, {this.props.data.address[0].addressLine2}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4_2}>{this.props.data.address[0].city}, {this.props.data.address[0].state}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4_2}>{this.props.data.address[0].zipCode}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4_2}>{this.props.data.address[0].telephoneNumber}</Text> : null}

                                </View>
                            </View>
                            { this.props.data || this.props.data.address ?
                            <View style={{ flex: 1 }}>
                               
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    
                                    <TouchableOpacity style={{ flex: 1, height:50 }} onPress={() => this.handleCall(this.props.data.address.telephoneNumber)}>
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
                                   
                                    <TouchableOpacity style={{ flex: 1,height:50 }} onPress={() => this.handleMaps(this.props.data.latitude, this.props.data.longitude)}>
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
 : null }
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                margin: 5,
                                flex: 1
                            }}>
                                <View style={{ flex: 0.2, alignItems: 'center' }}>
                                    <Flb
                                        name="check"
                                        size={30}
                                        color="green"
                                        style={{
                                            marginTop: 10,

                                        }}
                                    />
                                </View>
                                <View style={{ flex: 0.8 }}>
                                    {this.props.data ?
                                        <Text style={styles.plannameText}>
                                            {this.props.data.acceptingNewPatients}
                                        </Text> : null}
                                </View>
                            </View>
                        </Card>

                        : null
                    }

                </View>
            </View>
        )
    }
}

export default DoctorCard
