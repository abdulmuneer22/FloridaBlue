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
        width: 400,
        height: Metrics.textHeight*Metrics.screenHeight*0.003,
        transform: [{rotate: '270deg'}],
        top: -90
      }}
      />)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.isPortrait ?
          <View>
            {this._renderHeader()}
          </View>
        : null}

        <View style={styles.textBackground2}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
           
               <View style={{flex: 1, flexDirection: 'column', justifyContent:'center'}}>
                      <View style={{flex: 1, flexDirection: 'column',}}>
                        <View style={{flex: 0.3, marginTop: this.props.isPortrait ? 220 : 265, marginLeft: -50}}>
                          <Text allowFontScaling={false} style={{color: Colors.flBlue.ocean, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0045, 
                          transform: [{rotate: '270deg'}], top: 60, left: -100}}>Pay in Person</Text>
                         
                          <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,transform: [{rotate: '270deg'}], bottom: 100, textAlign: 'right', width: 250, right: 40}}>Accepted at the following retailers: 
                            
                           </Text>
                           <Image style={{transform: [{rotate: '270deg'}], left:75, bottom:200}} source={Images.claimlistsearch} />
                            <Image style={{transform: [{rotate: '270deg'}], left:75, bottom:120}} source={Images.claimlistsearch} />
                           
                        </View>
                        <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', right: 30}}>

                          <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight, 
                          transform: [{rotate: '270deg'}], bottom:75, right: -60}} />
                          {this._renderBarCode()}
                        </View>
                        <View style={{flex: 0.2, flexDirection:'column',top:20, justifyContent:'center'}}>
                          <Flb name='warning' size={Metrics.icons.regular * Metrics.screenWidth * 0.0025}
                          color={Colors.flBlue.anvil} style={{transform: [{rotate: '270deg'}], bottom: 100, left: 65}} />
                          <Text style={{transform: [{rotate: '270deg'}], 
                          bottom: 250,left:-15, fontWeight: '500', width: 480,
                          }}>Sales Associate: Scan the barcode above, enter the amount the customer wishes to pay and tender the transaction as normal.</Text>
                          <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight, transform: [{rotate: '270deg'}], 
                          right: 20, bottom: 230}} />

                        </View>
                        <View style={{flex: 0.2}}>
                          <TouchableOpacity style={{flex: 0.2,width:0, flexDirection:'row'}}>
                            <Text  allowFontScaling={false} style={{transform: [{rotate: '270deg'}], bottom: 100, 
                            left: 190, fontWeight: '500', 
                            width: 200, textAlign: 'left',
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                            textDecorationLine: 'underline', color: Colors.flBlue.teal}}>See Payment Details
                           </Text>
                            <Flb name='chevron-right' size={Metrics.icons.regular * Metrics.screenWidth * 0.0015} color={Colors.flBlue.teal} 
                            style={{transform: [{rotate: '270deg'}], bottom:160, left:83}} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity><Flb name='delete-circle' size={Metrics.icons.regular * Metrics.screenWidth * 0.0015} color={Colors.flBlue.teal} style={{transform: [{rotate: '270deg'}], bottom: 790, left: 150}} /></TouchableOpacity>
                      </View>

                     
            
             </View>
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
