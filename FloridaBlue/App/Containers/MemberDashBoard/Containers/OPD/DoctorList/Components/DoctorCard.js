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
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorListStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../../../Themes/FlbIcon'
import ProviderActions from '../../../../../../Redux/ProviderRedux'

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

  handleMaps (latitude, longitude) {
    console.tron.log(latitude, longitude)
    console.log(latitude, longitude)
    const url = `http://maps.apple.com/?daddr=${latitude},${longitude}`

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
    return (
      <View style={styles.container}>
        { this.props.data ?

          <View style={{ flex: 1, margin: 15 }}>
            {this.props.data != undefined ? this.props.data.map((value, i) => {
              if(i < this.state.cardLimit){

                 return (
                <Card style={{ flex: 1}} key={i}>

                  <View style={{ flex: 1, justifyContent: 'center', marginBottom: 10, marginTop:10 }}>

                    <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin, paddingRight:10}}>
                        {value ?
                          <TouchableOpacity onPress={this._doctorPage.bind(this, value)}>
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
                        <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={() => this.handleCall(value.telephoneNumber)}>
                          <View style={styles.call}>

                                <View style={{ flex: 0.45, alignItems: 'flex-end' }}>
                                    <Flb
                                        name='call-phone'
                                        size={Metrics.icons.medium}
                                        color={Colors.snow} />
                                  </View>

                                <View style={{ flex: 0.55, alignItems: 'flex-start' }}>

                              <Text style={styles.callText}>Call</Text>
                            </View>

                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={() => this.handleMaps(value.latitude, value.longitude)}>
                          <View style={styles.directions}>

                                <View style={{ flex: 0.28, alignItems: 'flex-end' }}>
                                    <Flb
                                        name='directions'
                                        size={Metrics.icons.medium}
                                        color={Colors.snow} />
                                  </View>

                                <View style={{
                                    flex: 0.72,
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
              }
            })
                            : <View style={styles.spinnerView}>
                              <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                              <Text style={styles.spinnerText}>Load
                        </Text>
                            </View>
                        }
          </View>

                    : <View style={styles.spinnerView}>
                      <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                      <Text style={styles.spinnerText}>Loading..
                        </Text>
                    </View>
                            }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    addressKey: state.provider.addressKey,
    provider: state.provider.providerKey,
    selectedProvider: state.provider.selectedLocation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard)
