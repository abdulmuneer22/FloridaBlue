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
import Icon from 'react-native-vector-icons/Ionicons'
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
  constructor (props) {
    super(props)
    this.handleCall = this.handleCall.bind(this)
    this.handleMaps = this.handleMaps.bind(this)
  }

  handleCall (phone) {
    console.tron.log(phone)
    console.log('im number' + phone)
    const url = `tel:${phone}`
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.tron.log('Don\'t know how to open URI: ')
      }
    })
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
    return (
      <View style={styles.container}>

        <View style={{ flex: 1, marginTop:-5 }}>
          { this.props.data ?

            <Card style={{ flex: 1 }} >
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>

                <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin }}>
                  {this.props.data ?
                    <Text style={styles.h1}>{this.props.data.displayName}</Text>
                                        : null}
                  {this.props.data ?
                    <Text style={styles.h2}>{this.props.data.primarySpecialty}</Text> : null}
                  {this.props.data && this.props.data.address[0] ?
                    <Text style={styles.h4}>{this.props.data.address[0].addressLine1}, {this.props.data.address[0].addressLine2}</Text> : null}
                  {this.props.data && this.props.data.address[0] ?
                    <Text style={styles.h4_2}>{this.props.data.address[0].city}, {this.props.data.address[0].state}, {this.props.data.address[0].zipCode}</Text> : null}
                  {this.props.data && this.props.data.address[0] ?
                    <Text style={styles.h4_2}>{this.props.data.address[0].telephoneNumber}</Text> : null}

                </View>
              </View>
              { this.props.data && this.props.data.address.length > 0 ?

                <View style={{ flex: 1 }}>

                  <View style={{ flex: 1, flexDirection: 'row' }}>

                    <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={() => this.handleCall(this.props.data && this.props.data.address[0] ? this.props.data.address[0].telephoneNumber : '')}>
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

                    <TouchableOpacity style={{ flex: 1, height: 50 }} onPress={() => this.handleMaps(this.props.data ? this.props.data.latitude : '', this.props.data ? this.props.data.longitude : '')}>
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

              {this.props.data && this.props.data.gender ?
                <View style={{flex: 1}}>
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
                      <Text style={styles.plannameText}>Gender: </Text>
                      <Text style={styles.plannameText}>
                        {this.props.data.gender}
                      </Text>
                    </View>
                  </View>
                </View>
               : null}

              {this.props.data && this.props.data.languageCodes.length > 0 ?
                <View style={{flex: 1}}>
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
                      <View style={{flex: 0.4}}>
                        <Text style={styles.plannameText}>Doctor Also Speaks: </Text>
                      </View>
                      <View style={{flex: 0.4}}>
                        {this.props.data && this.props.data.languageCodes ? this.props.data.languageCodes.map((value, i) => {
                          return (<View style={{flex: 1}} key={i}>

                            <Text style={styles.plannameText}>
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

              {this.props.data && this.props.data.staffLanguageCodes.length > 0 ?
                <View style={{flex: 1}}>
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
                      <Text style={styles.plannameText}> Staff Speaks: </Text>
                      {this.props.data && this.props.data.staffLanguageCodes ? this.props.data.staffLanguageCodes.map((value, i) => {
                        return (<View style={{flex: 1}} key={i}>
                          <Text style={styles.plannameText}>
                            {value.desc}
                          </Text>
                        </View>
                        )
                      }
                      ) : null}
                    </View>
                  </View>
                </View>
               : null}

              {this.props.data && this.props.data.acceptingNewPatients ?
                <View style={{
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

                    <Text style={styles.plannameText}>
                      {this.props.data.acceptingNewPatients}
                    </Text>
                  </View>
                </View>
                            : null}
            </Card>

                        : null
                    }

        </View>
      </View>
    )
  }
}

export default DoctorCard
