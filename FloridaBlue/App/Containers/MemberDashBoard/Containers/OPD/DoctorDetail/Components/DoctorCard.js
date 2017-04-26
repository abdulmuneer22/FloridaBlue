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

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

const card = { card: { width: Metrics.screenWidth, alignItems: 'flex-start', marginBottom: 20 } };
const cardTitle = { cardTitle: { fontSize: 40 } }

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

                <View style={{flex:1}}>
                    {this.props.data != undefined ?

                        <View style={styles.cardview} >
                            <View style={{ flex: 1, flexDirection: 'row', marginRight: 20 }}>
                                <View >
                                    {providerAvailable ? <TouchableOpacity onPress={() => this.onRemoveBookmark(this.props.data)} >
                                        <Flb name="add-bookmark"
                                            size={Metrics.icons.large} color={Colors.flBlue.orange} />
                                    </TouchableOpacity> : <TouchableOpacity onPress={() => this.onPressBookmark(this.props.data)} >
                                            <Flb name="add-bookmark"
                                                size={Metrics.icons.large} color={Colors.flBlue.grey2} />
                                        </TouchableOpacity>

                                    }
                                </View>

                                <View style={{ marginTop: 5, marginRight: 30 }}>
                                    {this.props.data ?
                                        <Text style={styles.h1}>{this.props.data.displayName}</Text>
                                        : null}
                                    {this.props.data ?
                                        <Text style={styles.h2}>{this.props.data.primarySpecialty}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4}> {this.props.data.address[0].addressLine1}, {this.props.data.address[0].addressLine2}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4_2}> {this.props.data.address[0].city}, {this.props.data.address[0].state}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4_2}> {this.props.data.address[0].zipCode}</Text> : null}
                                    {this.props.data && this.props.data.address[0] ?
                                        <Text style={styles.h4_2}> {this.props.data.address[0].telephoneNumber}</Text> : null}

                                </View>
                            </View>
                            <View style={styles.cardButton}>

                                <TouchableOpacity onPress={() => this.handleCall(this.props.data.address.telephoneNumber)}>
                                    <View style={styles.cardButtonView}>

                                        <Flb
                                            name='call-phone'
                                            size={Metrics.icons.medium}
                                            style={{
                                                marginRight: 2
                                            }}
                                            color={Colors.snow} />

                                        <Text style={{
                                            color: Colors.snow,
                                            fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
                                            marginLeft: Metrics.baseMargin,
                                            fontWeight: '400'
                                        }}>Call</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.handleMaps(this.props.data.latitude, this.props.data.longitude)}  >
                                    <View style={styles.cardButtonView1}>

                                        <Flb
                                            name='directions'
                                            size={Metrics.icons.medium}
                                            style={{
                                                marginRight: 1
                                            }}
                                            color={Colors.snow} />

                                        <Text style={{
                                            color: 'white',
                                            fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
                                            marginLeft: Metrics.baseMargin,
                                            fontWeight: '400'
                                        }}>Directions</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={{
                                flexDirection : 'row',
                                alignItems : 'center',
                                margin:5,
                                flex:1
                            }}>
                            <View style={{flex:0.2, alignItems:'center'}}>
                            <Icon 
                                name="ios-checkmark" 
                                size={40} 
                                color="#3bb324" 
                                style={{
                                    marginTop:10,
                                    
                                }}
                            />
                            </View>
                            <View style={{flex:0.8}}>
                             {this.props.data ?
                            <Text style={styles.plannameText}> 
                             {this.props.data.acceptingNewPatients}
                                </Text>:null} 
                            </View>
                        </View>   
                        </View>


                        : null
                    }

                </View>
            </View>

        )
    }
}

export default DoctorCard
