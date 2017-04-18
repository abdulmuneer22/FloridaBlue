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
    Linking
} from 'react-native'

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

const card = { card: { width: Metrics.screenWidth * 0.94, alignItems: 'flex-start', marginBottom: 20 } };
const cardTitle = { cardTitle: { fontSize: 40 } }

import { Colors, Metrics, Fonts } from '../../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorList/DoctorListStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../../Themes/FlbIcon'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

const window = Dimensions.get('window')

class DoctorCard extends Component {
    constructor(props) {
        super(props)
        this.handleCall=this.handleCall.bind(this);
        this.handleMaps=this.handleMaps.bind(this);
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
    const url=`tel:${phone}`

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ');
      }
    });
	}

     handleMaps(latitude, longitude) {

         console.log(latitude, longitude)
         const url=`http://maps.apple.com/?ll=${latitude},${longitude}`


	 	Linking.canOpenURL(url).then(supported => {
       if (supported) {
         Linking.openURL(url);
       } else {
         console.log('Don\'t know how to go');
       }
     }).catch(err => console.error('An error occurred', err));
	 }


    render() {
        console.log(this.props.data)
        return (
            <View style={styles.container}>
                {this.props.data != null ?

                    <View>
                        {this.props.data != undefined ? this.props.data.map((value, i) => {
                            const providerAvailable = this.props.savedproviders && this.props.savedproviders.find((savedprovider) => savedprovider.providerKey === value.providerKey)

                            return (
                                <Card styles={card} key={i}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View >
                                            {providerAvailable ? <TouchableOpacity onPress={() => this.onRemoveBookmark(value)} >
                                                <Flb name="add-bookmark"
                                                    size={Metrics.icons.large} color={Colors.flBlue.orange} />
                                            </TouchableOpacity> : <TouchableOpacity onPress={() => this.onPressBookmark(value)} >
                                                    <Flb name="add-bookmark"
                                                        size={Metrics.icons.large} color={Colors.flBlue.grey2} />
                                                </TouchableOpacity>

                                            }
                                        </View>

                                        <View style={{ marginTop: 5, marginRight: 30 }}>

                                            <Text style={styles.h1}>{value.displayName}</Text>
                                            <Text style={styles.h2}>{value.primarySpecialty}</Text>
                                            <Text style={styles.h4}> {value.addressLine1}, {value.addressLine2}</Text>
                                            <Text style={styles.h4_2}> {value.city}, {value.state}</Text>
                                            <Text style={styles.h4_2}> {value.zipCode}</Text>
                                            <Text style={styles.h4_2}> {value.telephoneNumber}</Text>
                                            <Text style={styles.h4_3}>{value.distance} miles</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardButton}>

                                        <TouchableOpacity onPress={() => this.handleCall(value.telephoneNumber)}>
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

                                        <TouchableOpacity onPress={() => this.handleMaps(value.latitude, value.longitude)}
                                        
                                        >
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

                                </Card>
                            )
                        })
                            : null
                        }
                    </View>

: <View>
    {this.props.leftActive
        ? <View style={styles.spinnerView}>
                <SingleColorSpinner strokeColor={Colors.flBlue.ocean}/>
                <Text style={styles.spinnerText}>Loading Please Wait
                </Text>
            </View>
        : <View><Text>"I am monarch"
        </Text></View>
}</View>
}
            </View>
        )
    }
}

export default DoctorCard