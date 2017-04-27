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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorListStyle'
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

    _doctorPage() {
        NavigationActions.DoctorDetail()
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
        const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`

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
                {this.props.data != undefined ?

                    <View style={{ flex: 1, margin: 15 }}>
                        {this.props.data != undefined ? this.props.data.map((value, i) => {
                            const providerAvailable = this.props.savedproviders && this.props.savedproviders.find((savedprovider) => savedprovider.providerKey === value.providerKey)

                            return (
                                <Card style={{ flex: 1 }} key={i}>

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
                                            {value ?
                                                <TouchableOpacity onPress={() => this._doctorPage()}>
                                                    <Text style={styles.h1}>{value.displayName}</Text>
                                                </TouchableOpacity> : null}
                                            {value ?
                                                <Text style={styles.h2}>{value.primarySpecialty}</Text> : null}
                                            {value ?
                                                <Text style={styles.h4}>{value.addressLine1}, {value.addressLine2}</Text> : null}
                                            {value ?
                                                <Text style={styles.h4_2}>{value.city}, {value.state}</Text> : null}
                                            {value ?
                                                <Text style={styles.h4_2}>{value.zipCode}</Text> : null}
                                            {value ?
                                                <Text style={styles.h4_2}>{value.telephoneNumber}</Text> : null}
                                            {value ?
                                                <Text style={styles.h4_3}>{value.distance} miles</Text> : null}
                                        </View>
                                    </View>


                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleCall(value.telephoneNumber)}>
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
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleMaps(value.latitude, value.longitude)}>
                                                <View style={styles.directions}>

                                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                                        <Flb
                                                            name='directions'
                                                            size={Metrics.icons.medium}
                                                            color={Colors.snow} />
                                                    </View>

                                                    <View style={{
                                                        flex: 1,
                                                        alignItems: 'flex-start'
                                                    }}>

                                                        <Text style={styles.directionText}>Directions</Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </Card>
                            )
                        })
                            : null
                        }
                    </View>

                    : <View style={{ flex: 1 }}>
                        {this.props.leftActive
                            ? <View style={styles.spinnerView}>
                                <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                                <Text style={styles.spinnerText}>Loading Please Wait
</Text>
                            </View>
                            : <View>
                                <Text style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    "You didn't Saved any Provider"
</Text></View>
                        }
                    </View>
                }
            </View>
        )
    }
}

export default DoctorCard
