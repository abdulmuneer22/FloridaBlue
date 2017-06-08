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
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorListStyle'
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
    this.state = {
      cardLimit: this.props.cardLimit
    }
    this.handleCall = this.handleCall.bind(this)
    this.handleMaps = this.handleMaps.bind(this)
  }

  _doctorPage (selectedProvider) {
    this.props.changeAddressKey(selectedProvider.providerAddressKey)
    this.props.changeProviderKey(selectedProvider.providerKey)
    NavigationActions.DoctorDetail()
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.cardLimit) {
      this.setState({cardLimit: nextProps.cardLimit})
    }
  }

  handleMaps (address) {
    const url = `http://maps.apple.com/?daddr=` + address.addressLine1 + ' ' + address.addressLine2 + ' ' + address.city + ' ' + address.state +
    ' ' + address.zipCode

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.tron.log('Don\'t know how to go')
      }
    })
  }
  render () {
    console.log('limit from state =>', this.state.cardLimit)
    if (this.props.selectedTab == 'listView') {
      return (
        <View style={styles.container}>
          { this.props.data ?

            <View style={{ flex: 1, margin: 15 }}>
              <Card style={{ flex: 1}} key={this.props.data.locationIndex}>
                <View style={{ flex: 1, justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                  <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin, paddingRight: 10}}>
                    {this.props.data ?
                      <TouchableOpacity onPress={this._doctorPage.bind(this, this.props.data)}>
                        <Text style={styles.h1}>{this.props.data.displayName}</Text>
                      </TouchableOpacity> : null}
                    <View style={{flex: 1, flexDirection: 'row'}}>

                      {this.props.data ?
                        <View style={{flex: 0.7}}>
                          <Text style={styles.h2}>{this.props.data.primarySpecialty}</Text>
                        </View> : null}
                      {this.props.data && this.props.data.handicappedAccessIn && this.props.data.handicappedAccessIn == 'Y' ?
                        <View style={{flex: 0.3, alignItems: 'center', marginTop: 10}}>
                          <Flb name='accessibility' size={Metrics.icons.medium * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                        </View> : null }
                    </View>

                    <Text style={styles.h4}>{this.props.data ? this.props.data.addressLine1 : null}, {this.props.data ? this.props.data.addressLine2 : null}</Text>

                    <Text style={styles.h4_2}>{this.props.data ? this.props.data.city : null}, {this.props.data ? this.props.data.state : null}</Text>
                    {this.props.data ?
                      <Text style={styles.h4_2}>{this.props.data.zipCode}</Text> : null}
                    {this.props.data ?
                      <Text style={styles.h4_2}>{this.props.data.telephoneNumber}</Text> : null}
                    {this.props.data ?
                      <Text style={styles.h4_3}>{this.props.data.distance} miles</Text> : null}
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} onPress={() => this.handleCall(this.props.data.telephoneNumber)}>
                      <View style={styles.call}>

                        <View style={{ flex: 0.45, alignItems: 'flex-end' }}>
                          <Flb
                            name='call-phone'
                            size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                            color={Colors.snow} />
                        </View>

                        <View style={{ flex: 0.55, alignItems: 'flex-start' }}>

                          <Text style={styles.callText}>Call</Text>
                        </View>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} onPress={() => this.handleMaps(this.props.data)}>
                      <View style={styles.directions}>
                        <View style={{ flex: 0.28, alignItems: 'flex-end' }}>
                          <Flb
                            name='directions'
                            size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                            color={Colors.snow} />
                        </View>

                        <View style={{flex: 0.72, alignItems: 'flex-start'}}>
                          <Text style={styles.directionText}>Directions</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
            :
            <View style={styles.spinnerView}>
              <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
              <Text style={styles.spinnerText}>Loading..
                </Text>
            </View>
          }
        </View>
      )
    } else {
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
}

const mapStateToProps = (state) => {
  return {
    addressKey: state.provider.addressKey,
    provider: state.provider.providerKey,
    selectedProvider: state.provider.selectedLocation,
    selectedTab: state.provider.selectedTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard)
