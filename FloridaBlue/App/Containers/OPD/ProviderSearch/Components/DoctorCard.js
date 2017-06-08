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
import { Colors, Metrics, Fonts } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
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
    this.handleUrl = this.handleUrl.bind(this)
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

  handleUrl (url) {
    console.tron.log(url)
    NavigationActions.MyView({
      responseURL: url + '?channel=mobile'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        { this.props.configData.pharmacySpecialityType ?

          <View style={{ flex: 1, margin: 15 }}>
            {this.props.configData.pharmacySpecialityType != null ? this.props.configData.pharmacySpecialityType.providerTypeSpecilityList.map((value, i) => {
              return (
                <Card style={{ flex: 1}} key={i}>
                  <View style={{ flex: 1, justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                    <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin, paddingRight: 10}}>
                      {value ?
                        <Text style={styles.h1}>{value.displayName}</Text> : null}
                      {value ?
                        <Text style={styles.h2}>{value.primarySpecialty}</Text> : null}
                      {value ?
                        <Text style={styles.h4_2}>{value.telephoneNumber}</Text> : null}
                      {value ?
                        <Text style={styles.h4_2}>{value.faxNumber}</Text> : null}
                      {value ?
                        <TouchableOpacity onPress={() => this.handleUrl(value.link)}>
                          <Text style={styles.h4_link}>{value.linkTitle}</Text>
                        </TouchableOpacity> : null }
                    </View>
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} onPress={() => this.handleCall(value.telephoneNumber)}>
                        <View style={styles.call}>
                          <View style={{ flex: 0.45, alignItems: 'flex-end' }}>
                            <Flb name='call-phone' size={Metrics.icons.medium * Metrics.screenWidth * 0.002} color={Colors.snow} />
                          </View>
                          <View style={{ flex: 0.55, alignItems: 'flex-start' }}>
                            <Text style={styles.callText}>Call</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              )
            }) :
                <View style={styles.spinnerView}>
                  <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                  <Text style={styles.spinnerText}>Load</Text>
                </View>
          }
          </View> :
          <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading..</Text>
          </View>
          }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configData: state.provider.configData
  }
}

export default connect(mapStateToProps)(DoctorCard)
