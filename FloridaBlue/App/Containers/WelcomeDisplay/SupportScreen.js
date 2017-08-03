import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './DashBoardStyle'

import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import SupportActions from '../../Redux/SupportRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class SupportScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image source={this.props.isPortrait ? Images.newHeaderImage : Images.landscapeHeaderImage} style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
                Support
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    gaTracker.trackScreenView('Support')
  }

  _handleCall (phone) {
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

  _handleCall (phone) {
    console.tron.log(phone)
    const url = `tel:${phone}`

    Linking.canOpenURL('tel:1-800-841-2900').then(supported => {
      if (supported) {
        Linking.openURL('tel:1-800-841-2900')
      } else {
        console.tron.log('Don\'t know how to open URI: ')
      }
    })
  }

  render () {
    var texts = []
    var i = 0
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
        <View style={styles.textBackground2}>
          <ScrollView showsVerticalScrollIndicator={false} >
            {this.props.data
             ? <View >
               {this.props.data && this.props.data.support
                    ? <View>
                      <View>{this.props.data.support.map(function (support, i) {
                        return (

                          <View>
                            {support.contactNumber

                              ? <Card style={styles.textBackground3} key={i}>

                                <View style={{flex: 1}}>
                                  <TouchableOpacity onPress={() => Communications.phonecall(support.contactNumber, true)} style={styles.textBackground3} >

                                    <View style={{flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                      <Text allowFontScaling={false} style={styles.textStyle}>
                                        {support.contactType ? support.contactType : null}
                                      </Text>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                                        {support.contactNumber ? <Flb name='call-phone' size={Metrics.icons.xm * Metrics.screenWidth * 0.0028} color={Colors.flBlue.ocean} /> : <View />}
                                      </View>
                                      <View style={{flex: 0.8, alignItems: 'flex-start', justifyContent: 'center'}}>
                                        <Text allowFontScaling={false} style={styles.textStyle1}>
                                          {support.contactNumber ? support.contactNumber : null}
                                        </Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </Card>

                              : <View style={{flex: 1}} style={styles.textBackground1}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                  <Text allowFontScaling={false} style={styles.textStyle}>
                                    {support.contactType ? support.contactType : null}
                                  </Text>
                                </View>
                              </View>

                            }
                          </View>
                        )
                        i += 1
                      }

                    )}</View>
                    </View>
                    : <Text allowFontScaling={false}>
                           Loading ..
                         </Text>}
             </View>
             : <View style={{alignItems: 'center', justifyContent: 'center'}}>
               <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
               <Text allowFontScaling={false} style={styles.spinnerText}>
                   Loading Please Wait
                 </Text>
             </View>}
          </ScrollView>
        </View>
      </View>
    )
  }
}

SupportScreen.propTypes = {
  data: PropTypes.object,
  attemptSupportScreen: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.support.fetching,
    data: state.support.data,
    error: state.support.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)
