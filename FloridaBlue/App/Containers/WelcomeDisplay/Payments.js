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
        height: Metrics.textHeight*Metrics.screenHeight*0.003,
        resizeMode:'contain',
        transform: [{rotate: '270deg'}],
        top: -Metrics.textHeight*Metrics.screenHeight*0.005
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
                        <View style={{flex: 0.3, marginTop: this.props.isPortrait ? Metrics.screenWidth-Metrics.screenWidth*0.35 : Metrics.screenWidth-Metrics.screenWidth*0.28, marginLeft: -Metrics.textHeight2*Metrics.screenHeight*0.0013}}>
                          <Text allowFontScaling={false} style={{color: Colors.flBlue.ocean, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0045, 
                          transform: [{rotate: '270deg'}], top: Metrics.screenHeight-Metrics.screenHeight*0.9, left: -Metrics.textHeight2-Metrics.screenHeight*0.09}}>Pay in Person</Text>
                         
                          <Text allowFontScaling={false} 
                          style={{color: Colors.flBlue.anvil, 
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                          transform: [{rotate: '270deg'}], 
                          bottom: Metrics.payment2-Metrics.screenWidth*0.001, 
                         // textAlign: 'right', 
                          width: Metrics.screenHeight-Metrics.screenWidth*0.99, 
                          right: Metrics.doubleBaseMargin*Metrics.screenHeight*0.004}}>Accepted at the following retailers: 
                            
                           </Text>
                           <Image style={{transform: [{rotate: '270deg'}], left:Metrics.textHeight*Metrics.screenHeight*0.003, bottom:Metrics.payment3-Metrics.screenWidth*0.001}} source={Images.claimlistsearch} />
                            <Image style={{transform: [{rotate: '270deg'}], left:Metrics.textHeight*Metrics.screenHeight*0.003, bottom:Metrics.payment2-Metrics.screenWidth*0.009}} source={Images.claimlistsearch} />
                           
                        </View>
                        <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', right: Metrics.doubleBaseMargin*Metrics.screenHeight*0.002}}>

                          <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight, 
                          transform: [{rotate: '270deg'}], bottom:Metrics.textHeight*Metrics.screenHeight*0.004, right: -Metrics.textHeight*Metrics.screenHeight*0.0025}} />
                          {this._renderBarCode()}
                        </View>
                        <View style={{flex: 0.2, flexDirection:'column',top:Metrics.searchBarHeight*Metrics.screenWidth*0.005, justifyContent:'center'}}>
                          <Flb name='warning' size={Metrics.icons.regular * Metrics.screenWidth * 0.0025}
                          color={Colors.flBlue.anvil} style={{transform: [{rotate: '270deg'}], bottom: Metrics.screenWidth-Metrics.screenWidth*0.6, left: Metrics.textHeight*Metrics.screenHeight*0.003}} />
                          <Text style={{transform: [{rotate: '270deg'}],
                          bottom: Metrics.screenWidth-Metrics.screenWidth*0.2,
                          //left:-Metrics.baseMargin*Metrics.screenHeight*0.0001, 
                          fontWeight: '500', width: Metrics.screenHeight-Metrics.screenWidth*0.4,
                          
                          }}>
                          Sales Associate: Scan the barcode above, enter the amount the customer wishes to pay and tender the transaction as normal.
                          </Text>
                          <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight, transform: [{rotate: '270deg'}], 
                          right: Metrics.doubleBaseMargin*Metrics.screenHeight*0.002, bottom: Metrics.screenWidth-Metrics.screenWidth*0.2}} />

                        </View>
                        <View style={{flex: 0.2}}>
                          <TouchableOpacity style={{flex: 0.2,width:0, flexDirection:'row'}}>
                            <Text  allowFontScaling={false} style={{transform: [{rotate: '270deg'}], bottom: Metrics.screenWidth-Metrics.screenWidth*0.7, 
                            left: Metrics.payment*Metrics.screenHeight*0.00475, fontWeight: '500', 
                            width: Metrics.screenWidth-Metrics.screenWidth*0.375, textAlign: 'left',
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                            textDecorationLine: 'underline', color: Colors.flBlue.teal}}>See Payment Details
                           </Text>
                            <Flb name='chevron-right' size={Metrics.icons.regular * Metrics.screenWidth * 0.0015} color={Colors.flBlue.teal} 
                            style={{transform: [{rotate: '270deg'}], bottom:Metrics.screenWidth-Metrics.screenWidth*0.5, left:Metrics.textHeight2*Metrics.screenHeight*0.0029}} />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                          <Flb name='delete-circle' size={Metrics.icons.regular * Metrics.screenWidth * 0.0025} color={Colors.flBlue.teal} 
                          style={{transform: [{rotate: '270deg'}], bottom: Metrics.screenHeight*1.05, left: Metrics.textHeight2*Metrics.screenHeight*0.0048}} />
                          </TouchableOpacity>
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
