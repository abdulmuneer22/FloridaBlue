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
import Orientation from 'react-native-orientation'

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
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
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

  componentWillMount () {
    console.log('I mountin on payments bruh¡')
    Orientation.lockToPortrait()
  }

  componentDidMount () {
    gaTracker.trackScreenView('Support')
  }

  componentWillUnmount () {
    Orientation.unlockAllOrientations()
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`)
    })

    // Remember to remove listener
  }

  _renderBarCode () {
    return (<Image source={{uri: 'data:image/jpeg;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAiCAMAAAAtWWZIAAAAHnRFWHRTb2Z0d2FyZQBid2lwLWpzLm1ldGFmbG9vci5jb21Tnbi0AAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlMA/1uRIrUAAABpSURBVHic7c/BDcAwCENRe/+lKwgO7QiV/iUyCJI82bJk16EO1fC76KyKJ3fXGemuPtWZmzArStzad3Z/sBtzr3VfctaUv6a9Y0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIED+BnkAXYAMwYW/U1QAAAAASUVORK5CYII='}}
      style={{
        width: Metrics.textHeight*Metrics.screenHeight*0.1,
        height: 80,
        resizeMode:'contain',
        transform: [{rotate: '270deg'}],
        top: -40
      }}
      />)
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
        {this.props.isPortrait ?
          <View>
            {this._renderHeader()}
          </View>
        : null}

        <View style={styles.textBackground2}>
          <ScrollView showsVerticalScrollIndicator={false} >
            {this.props.data
             ? <View >
               {this.props.data && this.props.data.support
                    ? <View style={{flex: 1, flexDirection: 'column'}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{flex: 0.3, marginTop: this.props.isPortrait ? 220 : 265, marginLeft: -50, marginRight: 0}}>
                          <Text allowFontScaling={false} style={{color: Colors.flBlue.ocean, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0045, transform: [{rotate: '270deg'}], top: 100, left: -120}}>Pay in Person</Text>
                          <Text style={{transform: [{rotate: '270deg'}], bottom: 150, textAlign: 'right', width: 230, right: 20, color: Colors.flBlue.anvil}}> Accepted at the following retailers: <Image source={Images.claimlistsearch} /></Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', right: 40, top: -30}}>

                          <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: 545, transform: [{rotate: '270deg'}], right: -80, top: 14}} />
                          {this._renderBarCode()}

                          
                        </View>
                        <View style={{flex: 0.2}}>
                          <Flb name='warning' size={Metrics.icons.regular * Metrics.screenWidth * 0.0025} color={Colors.flBlue.anvil} style={{transform: [{rotate: '270deg'}], bottom: 40, left: 75}} />
                          <Text style={{transform: [{rotate: '270deg'}], bottom: 180, left: 10, fontWeight: '500', width: 500, textAlign: 'left', color: Colors.flBlue.anvil}}>Sales Associate: Scan the barcode above, enter the amount the customer wishes to pay and tender the transaction as normal.</Text>
                          <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: 545, transform: [{rotate: '270deg'}], right: -25, bottom: 160}} />

                        </View>
                        <View style={{flex: 0.2}}>
                          <TouchableOpacity>
                            <Text style={{transform: [{rotate: '270deg'}], bottom: 190, left: 70, fontWeight: '500', width: 500, textAlign: 'left', textDecorationLine: 'underline', color: Colors.flBlue.teal}}>See Payment Details</Text>
                            <Flb name='chevron-right' size={Metrics.icons.regular * Metrics.screenWidth * 0.0010} color={Colors.flBlue.teal} style={{transform: [{rotate: '270deg'}], bottom: 280, left: 135}} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity><Flb name='delete-circle' size={Metrics.icons.regular * Metrics.screenWidth * 0.0015} color={Colors.flBlue.teal} style={{transform: [{rotate: '270deg'}], bottom: 649, left: 155}} /></TouchableOpacity>
                      </View>

                      
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
