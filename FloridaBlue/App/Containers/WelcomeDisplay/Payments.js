import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './DashBoardStyle'

import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import NavItems from '../../Navigation/NavItems.js'
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
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')
import SettingActions from '../../Redux/SettingRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class Payments extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
                Payments
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }


    _renderBarCode () {
    return ( <Image source={{uri: 'data:image/jpeg;base64,' 
    + '/9j/4AAQSkZJRgABAQEASABIAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSgBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIALcBpQMBIgACEQEDEQH/xAAcAAADAQEAAwEAAAAAAAAAAAAABwgGBAECBQP/2gAIAQEAAAAAqkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbeJ1/dzfgmKFUPNuFVRnwFhqd6oWAtvsttKUJKm/+OwFs3sjmOfz0PyedwqqRze9nQ/d6boABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8ddPMkABQEh9VFcs51qgONloyvsqk9w00A1k7oX5N1Zws1s+1k6/sFiuP266okployxcc05C8dd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'}} 
    style={{
    width: (Metrics.screenHeight * .8),
     height: (Metrics.screenHeight - (Metrics.screenHeight * 0.4)) / 2,
     transform: [{rotate: '270deg'}],
     top: 160
    }}
     >
 
   

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
                    ? <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 0.3, marginTop: 250, marginLeft: -50, marginRight: -70}}>
                                <Text allowFontScaling={false} style={{color: Colors.flBlue.ocean,  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025, transform: [{rotate: '270deg'}]}}>John Doe Barcode</Text>
                            </View>
                            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                                    
                                    {this._renderBarCode()}
                            </View>  
                        </View> 
                                            
                        <View style={{flex: 1, marginTop: 300}}>{this.props.data.support.map(function (support, i) {
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

Payments.propTypes = {
  data: PropTypes.object,
  attemptSupportScreen: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.support.fetching,
    data: state.support.data,
    error: state.support.error,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
