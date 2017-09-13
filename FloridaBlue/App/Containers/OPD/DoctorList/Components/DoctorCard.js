import React, { Component, PropTypes } from 'react'
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
import { Colors, Metrics, Fonts } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorListStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../Themes/FlbIcon'
import ProviderActions from '../../../../Redux/ProviderRedux'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import SingleProviderCard from './SingleProviderCard'

const window = Dimensions.get('window')
let urlConfig = require('../../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

class DoctorCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cardLimit: this.props.cardLimit,
      selectedProviderKey : ''
    }
  }

  _doctorPage = (selectedProvider) =>{
    this.props.changeAddressKey(selectedProvider.providerAddressKey)
    this.props.changeProviderKey(selectedProvider.providerKey)
    gaTracker.trackEvent('Provider List', 'Provider Selected')
    NavigationActions.DoctorDetail()
  }

  favouriteProvider = (selectedProvider,currentState) =>{
    this.props.changeProviderKey(selectedProvider.providerKey)
    this.props.changeLocationKey(selectedProvider.providerLocationKey)
    // console.tron.log("checking the save provider", this.props.changeProviderKey(selectedProvider.providerKey))
    // console.tron.log("checking the save provider", this.props.changeProviderKey(selectedProvider.providerLocationKey))
    // console.log("jdaskfbsamfba", this.props.changeProviderKey(selectedProvider.providerKey))
    // console.log("jdaskfbsamfba", this.props.changeLocationKey(selectedProvider.providerLocationKey))
    let data = {
      providerKey:selectedProvider.providerKey,
      locationKey :selectedProvider.providerLocationKey
    }
    //this.props.attemptSavedProvider(data)
    if(currentState){
      this.props.attemptSavedProvider(data)//set unfav
    }else{
      this.props.attemptUnSavedProvider(data)//set unfav
    }
  }

  // unfavouriteProvider(){
  //   this.props.changeProviderKey(selectedProvider.providerKey)
  //   this.props.changeLocationKey(selectedProvider.providerLocationKey)

  // }

  handleCall = (phone) =>{
    gaTracker.trackEvent('Provider List', 'Phone Call')
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

  handleMaps = (address) => {
    gaTracker.trackEvent('Provider List', 'Mapped Location')
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
    return (
      <View style={styles.container}>
        { this.props.data

          ? <View style={{ flex: 1, margin: 15 }}>
            {this.props.data != undefined ? this.props.data.map((value, i) => {
              if (i < this.state.cardLimit) {
                return (
                  <SingleProviderCard
                  key={i}
                  value = {value}
                  _doctorPage = {this._doctorPage}
                  favouriteProvider = {this.favouriteProvider}
                  handleMaps = {this.handleMaps}
                  handleCall ={this.handleCall}
                  isSaved = {this.props.isSaved}
                  />
                )
              }
            })
                : <View style={styles.spinnerView}>
                  <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                  <Text allowFontScaling={false} style={styles.spinnerText}>Load
            </Text>
                </View>
            }
          </View>

                    : <View style={styles.spinnerView}>
                      <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                      <Text allowFontScaling={false} style={styles.spinnerText}>Loading..
                        </Text>
                    </View>
                            }
      </View>
    )
  }
}

DoctorCard.propTypes = {
  attemptSavedProvider: PropTypes.func,
  attemptUnSavedProvider: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    addressKey: state.provider.addressKey,
    provider: state.provider.providerKey,
    selectedProvider: state.provider.selectedLocation,
    locationKey: state.provider.locationKey,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddressKey: (addressKey) => dispatch(ProviderActions.changeAddressKey(addressKey)),
    changeProviderKey: (providerKey) => dispatch(ProviderActions.changeProviderKey(providerKey)),
    changeLocationKey: (locationKey) => dispatch(ProviderActions.changeLocationKey(locationKey)),
    attemptSavedProvider:(data) => dispatch(ProviderActions.sendSavedProviderRequest(data)),
    attemptUnSavedProvider:(data) => dispatch(ProviderActions.sendUnSavedProviderRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorCard)
