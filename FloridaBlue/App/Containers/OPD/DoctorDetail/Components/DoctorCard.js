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
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorDetailStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../Themes/FlbIcon'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

class DoctorCard extends Component {
  constructor (props) {
    super(props)
    this.handleCall = this.handleCall.bind(this)
    this.handleMaps = this.handleMaps.bind(this)
  }

  handleCall (phone) {
    gaTracker.trackEvent('Provider Detail', 'Phone Call')
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
    gaTracker.trackEvent('Provider Detail', 'Mapped Location')
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
    return (
      <View style={styles.container}>

        <View style={{ flex: 1, marginTop: -5 }}>
          { this.props.data

            ? <View style={{ flex: 1, marginBottom: 10 }} >
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin, paddingRight: Metrics.baseMargin }}>
                  {this.props.data
                    ? <Text allowFontScaling={false} style={styles.h1}>{this.props.data.displayName}</Text>
                                        : null}

                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      {this.props.data
                        ? <Text allowFontScaling={false} style={styles.h2}>{this.props.data.primarySpecialty}</Text> : null}
                    </View>
                    {this.props.data && this.props.data.handicappedAccessIn && this.props.data.handicappedAccessIn == 'Y'
                      ? <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
                        <Flb name='accessibility' size={Metrics.icons.medium * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                      </View> : null }
                  </View>

                  <Text allowFontScaling={false} style={styles.h4}>{this.props.data && this.props.data.address[0] ? this.props.data.address[0].addressLine1 : null}, {this.props.data && this.props.data.address[0] ? this.props.data.address[0].addressLine2 : null}</Text>

                  <Text allowFontScaling={false} style={styles.h4_2}>{this.props.data && this.props.data.address[0] ? this.props.data.address[0].city : null}, { this.props.data && this.props.data.address[0] ? this.props.data.address[0].state : null}, {this.props.data && this.props.data.address[0] ? this.props.data.address[0].zipCode : null}</Text>
                  {this.props.data && this.props.data.address[0]
                    ? <Text allowFontScaling={false} style={styles.h4_2}>{this.props.data.address[0].telephoneNumber}</Text> : null}

                </View>
              </View>
              { this.props.data && this.props.data.address.length > 0

                ? <View style={{ flex: 1 }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>

                    <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} onPress={() => this.handleCall(this.props.data && this.props.data.address[0] ? this.props.data.address[0].telephoneNumber : '')}>
                      <View style={styles.call}>

                        <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                          <Flb
                            name='call-phone'
                            size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                            color={Colors.snow} />
                        </View>

                        <View style={{ flex: 0.6, alignItems: 'flex-start' }}>
                          <Text allowFontScaling={false} style={styles.callText}>Call</Text>
                        </View>

                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} onPress={() => this.handleMaps(this.props.data ? this.props.data.address[0] : '')}>
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

                          <Text allowFontScaling={false} style={styles.directionText}>Directions</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
               : null }

              {this.props.data && this.props.data.gender
                ? <View style={{flex: 1}}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    margin: 5
                  }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb
                        name='check'
                        size={30}
                        color='green'
                        style={{
                          marginTop: 10

                        }}
                                    />
                    </View>
                    <View style={{ flex: 0.8, flexDirection: 'row' }}>
                      <Text allowFontScaling={false} style={styles.plannameText}>Gender: </Text>
                      <Text allowFontScaling={false} style={styles.plannameText}>
                        {this.props.data.gender}
                      </Text>
                    </View>
                  </View>
                </View>
               : null}

              {this.props.data && this.props.data.languageCodes.length > 0
                ? <View style={{flex: 1}}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    margin: 5
                  }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb
                        name='check'
                        size={Metrics.icons.medium * Metrics.screenWidth * 0.0030}
                        color='green'
                        style={{
                          marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0008

                        }}
                                    />
                    </View>
                    <View style={{ flex: 0.8, flexDirection: 'row' }}>
                      <View style={{flex: 0.4}}>
                        <Text allowFontScaling={false} style={styles.plannameText}>Doctor Also Speaks: </Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        {this.props.data && this.props.data.languageCodes ? this.props.data.languageCodes.map((value, i) => {
                          return (<View style={{flex: 1}} key={i}>

                            <Text allowFontScaling={false} style={styles.plannameText}>
                              {value.desc}
                            </Text>

                          </View>

                          )
                        }
                      ) : null}
                      </View>
                    </View>
                  </View>
                </View>
               : null}

              {this.props.data && this.props.data.staffLanguageCodes.length > 0
                ? <View style={{flex: 1}}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    margin: 5
                  }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb
                        name='check'
                        size={Metrics.icons.medium * Metrics.screenWidth * 0.0030}
                        color='green'
                        style={{
                          marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.0008

                        }}
                                    />
                    </View>
                    <View style={{ flex: 0.8, flexDirection: 'row' }}>
                      <View style={{flex: 0.4}}>
                        <Text allowFontScaling={false} style={styles.plannameText}>Staff Speaks: </Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        {this.props.data && this.props.data.staffLanguageCodes ? this.props.data.staffLanguageCodes.map((value, i) => {
                          return (<View style={{flex: 1}} key={i}>
                            <Text allowFontScaling={false} style={styles.plannameText}>
                              {value.desc}
                            </Text>
                          </View>
                          )
                        }
                      ) : null}
                      </View>
                    </View>
                  </View>
                </View>
               : null}

              {this.props.data && this.props.data.acceptingNewPatients
                ? <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                  flex: 1
                }}>
                  <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Flb
                      name='check'
                      size={30}
                      color='green'
                      style={{
                        marginTop: 10

                      }}
                                    />
                  </View>
                  <View style={{ flex: 0.8 }}>

                    <Text allowFontScaling={false} style={styles.plannameText}>
                      {this.props.data.acceptingNewPatients}
                    </Text>
                  </View>
                </View>
                            : null}
            </View>

                        : null
                    }

        </View>
      </View>
    )
  }
}

export default DoctorCard
