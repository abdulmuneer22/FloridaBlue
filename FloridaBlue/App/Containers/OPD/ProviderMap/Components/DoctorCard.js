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
    Alert,
    Platform
} from 'react-native'

import { Card } from 'native-base'

import { Colors, Metrics, Fonts } from '../../../../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './DoctorCardStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../Themes/FlbIcon'
import ProviderActions from '../../../../Redux/ProviderRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

const window = Dimensions.get('window')

class DoctorCard extends Component {
  constructor (props) {
    super(props)
    this.handleCall = this.handleCall.bind(this)
    this.handleMaps = this.handleMaps.bind(this)
    this.providerSelected = this.providerSelected.bind(this)
  }

  handleCall (phone) {
    console.tron.log(phone)
    const url = `tel:${phone}`

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.tron.log('Don\'t know how to open URI: ')
      }
    })
  }

 
  handleMaps (address) {
   
    const url = `http://maps.apple.com/?daddr=`+address.addressLine1+" "+address.addressLine2+" "+address.city+" "+address.state+
    " "+address.zipCode;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.tron.log('Don\'t know how to go')
      }
    })
  }

  providerSelected () {
    console.tron.log(this.props.data)
    this.props.changeAddressKey(this.props.data.providerAddressKey)
    this.props.changeProviderKey(this.props.data.providerKey)
    NavigationActions.DoctorDetail({type: ActionConst.REPLACE})
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: -5}}>
          {this.props.data != undefined ?
            <Card style={{ flex: 1,}}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: (Platform.OS === 'ios') ? 10 : 10 }}>

                <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin * 2, paddingRight: 10}}>
                  {this.props.data ?
                    <TouchableOpacity onPress={this.providerSelected}>
                      <Text style={styles.mapHeaderText}>{this.props.data.displayName}</Text>
                    </TouchableOpacity>
                  : null}
                  <View style={{flexDirection: 'row'}}>
                    {this.props.data ?
                      <View >
                        <Text style={styles.mapSubText}>{this.props.data.primarySpecialty}</Text>
                      </View> : null}
                    <View style={{marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0015, marginLeft: Metrics.section * Metrics.screenWidth * 0.005}}>
                      {this.props.data && this.props.data.handicappedAccessIn && this.props.data.handicappedAccessIn == 'Y' ?
                        <Flb name='accessibility' size={Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} /> : null}
                    </View>
                  </View>
                  <Text style={styles.h4}>{this.props.data ? this.props.data.addressLine1 : null}, {this.props.data ? this.props.data.addressLine2 : null}</Text>

                  <Text style={styles.mapAdressText}>{this.props.data ? this.props.data.city : null}, { this.props.data ? this.props.data.state : null}, {this.props.data ? this.props.data.zipCode : null}</Text>
                  {this.props.data ?
                    <Text style={styles.mapAdressText}>{this.props.data.telephoneNumber}</Text> : null}
                  {this.props.data ?
                    <Text style={styles.mapAdressText}>{this.props.data.distance} miles</Text> : null}
                </View>
              </View>
              <View style={{ flex: 1, marginTop: Metrics.textHeight * Metrics.screenHeight * 0.0065 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flex: 1, height: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.0015 : Metrics.textHeight * Metrics.screenHeight * 0.0016 }} onPress={() => this.handleCall(this.props.data.telephoneNumber)}>
                    <View style={styles.call}>

                      <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                        <Flb
                          name='call-phone'
                          size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                          color={Colors.snow} />
                      </View>

                      <View style={{ flex: 0.6, alignItems: 'flex-start' }}>

                        <Text style={styles.callText}>Call</Text>
                      </View>

                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, height: (Platform.OS === 'ios') ? Metrics.textHeight * Metrics.screenHeight * 0.0015 : Metrics.textHeight * Metrics.screenHeight * 0.0016 }} onPress={() => this.handleMaps(this.props.data ? this.props.data : '')}>
                    <View style={styles.directions}>

                      <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                        <Flb
                          name='directions'
                          size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
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

const mapStateToProps = (state) => {
  return {
    addressKey: state.provider.addressKey,
    provider: state.provider.providerKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard)
