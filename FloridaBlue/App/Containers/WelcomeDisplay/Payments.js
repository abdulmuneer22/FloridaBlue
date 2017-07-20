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

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
  }


    _renderBarCode () {
    return ( <Image source={{uri: 'data:image/jpeg;base64,'
    + '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'}}
    style={{
    width: (Metrics.screenHeight * .6),
     height: (Metrics.screenHeight - (Metrics.screenHeight * 0.6)) / 2,
     transform: [{rotate: '270deg'}],
     top: -90
    }}
     >



              </Image>)
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
                            <View style={{flex: 0.3, marginTop: this.props.isPortrait ? 220: 265, marginLeft: -50, marginRight: 0}}>
                                <Text allowFontScaling={false} style={{color: Colors.flBlue.ocean,  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0045, transform: [{rotate: '270deg'}], top: 120, left: -120}}>Pay in Person</Text>
                                <Text style={{transform: [{rotate: '270deg'}], bottom: 150, textAlign: 'right', width: 230, right: 20}}> Accepted at the following retailers: <Image source={Images.claimlistsearch} /></Text> 
                            </View>
                            <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', right: 40, top: -30}}>

                                    <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: 545, transform: [{rotate: '270deg'}], right: -80, top: 14}}></View>
                                    {this._renderBarCode()} 
                                    
                                     <View style={{height: 80, width: 132, backgroundColor: '#16947C', top: 50}}></View> 
                            </View>
                            <View style={{flex: 0.2}}>
                              <Flb name= 'warning' size={Metrics.icons.regular * Metrics.screenWidth * 0.0025} color={Colors.flBlue.anvil} style={{transform: [{rotate: '270deg'}],  bottom: 180, left: 75}}/>
                              <Text style={{transform: [{rotate: '270deg'}], bottom: 320, left: 10, fontWeight: '500', width: 500, textAlign: 'left'}}>Sales Associate: Scan the barcode above, enter the amount the customer wishes to pay and tender the transaction as normal.</Text>
                                  <View style={{borderBottomWidth: 1, borderBottomColor: Colors.flBlue.grey2, width: 545, transform: [{rotate: '270deg'}], right: -25, bottom: 300}}></View>

                            </View>
                            <View style={{flex: 0.2}}>
                              <TouchableOpacity>
                                <Text style={{transform: [{rotate: '270deg'}], bottom: 320, left: 70, fontWeight: '500', width: 500, textAlign: 'left', textDecorationLine: 'underline', color: Colors.flBlue.teal}}>See Payment Details</Text>
                                <Flb name= 'chevron-right' size={Metrics.icons.regular * Metrics.screenWidth * 0.0010} color={Colors.flBlue.teal} style={{transform: [{rotate: '270deg'}],  bottom: 410, left: 135}}/>
                              </TouchableOpacity>
                            </View>
                             <TouchableOpacity><Flb name= 'delete-circle' size={Metrics.icons.regular * Metrics.screenWidth * 0.0015} color={Colors.flBlue.teal} style={{transform: [{rotate: '270deg'}],  bottom: 790, left: 150}}/></TouchableOpacity>
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
