import React, { Component, PropTypes } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
  Alert
} from 'react-native'

import styles from './PaymentStyle'

import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import PaymentActions from '../../Redux/PaymentRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import Orientation from 'react-native-orientation'
import DeviceInfo from 'react-native-device-info'

const window = Dimensions.get('window')
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')
import SettingActions from '../../Redux/SettingRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class PaymentBarcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader() {
    return (<Image source={DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        PaymentBarcode
</Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentWillMount() {
    Orientation.lockToPortrait()
  }

  componentDidMount() {
    Orientation.lockToPortrait()
    gaTracker.trackScreenView('Payment Barcode')
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations()
    Orientation.getOrientation((err, orientation) => {
    })

    // Remember to remove listener
  }

  _renderBarCode() {
    return (<Image source={{
      uri: 'data:image/jpeg;base64'
      + this.props.paymentbarcodedata && this.props.paymentbarcodedata.GetBarCodeTransactionResponse && this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream
    }}
      style={{
        width: Metrics.textHeight * Metrics.screenHeight * 0.1,
        height: Metrics.textHeight * Metrics.screenHeight * 0.003,
        resizeMode: 'contain',
        //backgroundColor:'red',
        transform: [{ rotate: '270deg' }],
        top: -Metrics.textHeight * Metrics.screenHeight * 0.005
      }}
    />)
  }

  _displayCondition() {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props && this.props.paymentbarcodedata && this.props.paymentbarcodedata.GetBarCodeTransactionResponse && this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream !=0) {

      return (
        <View style={{ flex: 1 }}>

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{
              flex: 3,
              justifyContent: 'center'
            }}>
              <Text allowFontScaling={false}
                style={{
                  color: Colors.flBlue.ocean,
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0035,
                  transform: [{ rotate: '270deg' }],
                  width: this.props.isPortrait ? DeviceInfo.isTablet() ? Metrics.screenWidth-Metrics.screenWidth*0.6 : Metrics.screenWidth-Metrics.screenWidth*0.4 : (DeviceInfo.isTablet() ? Metrics.screenWidth-Metrics.screenWidth*0.4 :Metrics.screenWidth-Metrics.screenWidth*0.4),
                  top: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.7 : Metrics.screenHeight - Metrics.screenHeight * 0.75) : (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.75 : Metrics.screenHeight - Metrics.screenHeight * 0.75),
                  //left: this.props.isPortrait ? DeviceInfo.isTablet() ? Metrics.textHeight2 - Metrics.screenHeight * 0.12 : Metrics.baseMargin - Metrics.screenHeight * 0.13 : Metrics.textHeight - Metrics.screenHeight * 0.09
                  right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.baseMargin * Metrics.screenHeight * 0.007: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.006) : (DeviceInfo.isTablet() ? Metrics.textHeight * Metrics.screenHeight * 0.004 :Metrics.textHeight * Metrics.screenHeight * 0.003)
                }}>
                Pay in Person</Text>
                
              <Flb name='delete-circle' onPress={() => NavigationActions.pop()} size={Metrics.icons.regular * Metrics.screenWidth * 0.0025} color={Colors.flBlue.teal}
                style={{
                  transform: [{ rotate: '270deg' }],
                  top:  this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 1.53 :  Metrics.screenHeight - Metrics.screenHeight * 1.5) : (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 1.5 : Metrics.screenHeight - Metrics.screenHeight * 1.5),
                  bottom: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.payment3 - Metrics.screenWidth * 0.001 : Metrics.payment3 - Metrics.screenWidth * 0.001) : (DeviceInfo.isTablet() ? Metrics.payment3 - Metrics.screenWidth * 0.001 : Metrics.payment3 - Metrics.screenWidth * 0.001),
                  //width: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenWidth * 0.99 :  Metrics.screenHeight - Metrics.screenWidth * 0.99 :  Metrics.screenHeight - Metrics.screenWidth * 0.99,
                  right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.002 : Metrics.mediumMargin * Metrics.screenHeight * 0.002) : (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.002 : Metrics.mediumMargin * Metrics.screenHeight * 0.002)
                }} />

            </View>

            <View style={{
              borderBottomWidth: 1, flex: 0.001, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight,
              transform: [{ rotate: '270deg' }], bottom: Metrics.textHeight * Metrics.screenHeight * 0.004, right: -Metrics.textHeight * Metrics.screenHeight * 0.0025
            }} />
            <View style={{
              flex: 1.5,
              // backgroundColor:'red',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: DeviceInfo.isTablet() ? (this.props.isPortrait ? -Metrics.payment2 * Metrics.screenWidth * 0.00245 : -Metrics.payment2 * Metrics.screenWidth * 0.00275) : -Metrics.payment2 * Metrics.screenWidth * 0.003,
              right: DeviceInfo.isTablet() ? Metrics.doubleBaseMargin * Metrics.screenHeight * 0.005 : Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002
            }}>
              <Flb name='shopping-cart-1' size={Metrics.icons.large*Metrics.screenWidth*0.002} color={Colors.flBlue.anvil}
                      style={{ transform: [{ rotate: '270deg' }],
                                top:Metrics.screenHeight-Metrics.screenHeight*0.5}} />
              <Image source={{
                uri: 'data:image/jpeg;base64,'
                + this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream
              }}
                style={{
                  width: (Metrics.screenHeight - (Metrics.screenHeight * 0.4)),
                  height: (Metrics.screenHeight - (Metrics.screenHeight * 0.79)/2),
                  resizeMode: 'contain',
                  //backgroundColor:'red',
                  transform: [{ rotate: '270deg' }],
                  top: -Metrics.textHeight * Metrics.screenHeight * 0.007
                }}
              />
            </View>
            <View style={{
              borderBottomWidth: 1, flex: 0.001, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight,
              transform: [{ rotate: '270deg' }], bottom: Metrics.textHeight * Metrics.screenHeight * 0.004, right: -Metrics.textHeight * Metrics.screenHeight * 0.0025
            }} />
            <View style={{
              flex: 2,
              justifyContent: 'center',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderLeftColor: Colors.flBlue.grey2,
              borderRightColor: Colors.flBlue.grey2,
            }}>
              <Flb name='warning' size={Metrics.icons.regular * Metrics.screenWidth * 0.0025}
                color={Colors.flBlue.anvil}
                style={{
                  transform: [{ rotate: '270deg' }],
                  bottom: - Metrics.payment6 * Metrics.screenHeight * 0.001,
                  left: this.props.isPortrait ? -Metrics.smallMargin * Metrics.screenHeight * 0.001 : -Metrics.baseMargin * Metrics.screenHeight * 0.001
                }} />
              <Text allowFontScaling={false} style={{
                transform: [{ rotate: '270deg' }],
                bottom: Metrics.screenWidth - Metrics.screenHeight * 0.4,
                width: Metrics.screenHeight - Metrics.screenWidth * 0.5,
                right: this.props.isPortrait ? DeviceInfo.isTablet() ? Metrics.textHeight2 * Metrics.screenHeight * 0.005 : Metrics.textHeight2 * Metrics.screenHeight * 0.006 : DeviceInfo.isTablet() ? Metrics.textHeight2 * Metrics.screenHeight * 0.0048 : Metrics.textHeight2 * Metrics.screenHeight * 0.0062,
                top: Metrics.screenHeight - Metrics.screenHeight * 1.1,
                fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                color: Colors.flBlue.anvil,

              }}>
                Sales Associate: Scan the barcode above, enter the amount the customer wishes to pay and tender the transaction as normal.
              </Text>
            </View>

            <View style={{
              flex: 3, width: Metrics.screenWidth * 0.1,
              justifyContent: 'center',
              //backgroundColor:'red'
            }}>
              <TouchableOpacity style={{width: 0}} onPress={() => NavigationActions.PaymentContent1()}>
                <Text allowFontScaling={false} style={{
                  transform: [{ rotate: '270deg' }],
                 // bottom: this.props.isPortrait ? Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0012 : Metrics.doubleBaseMargin * Metrics.screenHeight * 0.0012,
                  right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.textHeight2 * Metrics.screenHeight * 0.0035 : Metrics.textHeight2 * Metrics.screenHeight * 0.0035) : (DeviceInfo.isTablet() ? Metrics.textHeight2 * Metrics.screenHeight * 0.0025 : Metrics.textHeight2 * Metrics.screenHeight * 0.006),
                  left: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenWidth-Metrics.screenWidth*1.15 : Metrics.screenWidth-Metrics.screenWidth*1.11 ) : (DeviceInfo.isTablet() ? Metrics.screenWidth-Metrics.screenWidth*1.15 :  Metrics.screenWidth-Metrics.screenWidth*1.15), 
                  fontWeight: '500', 
                  width: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenWidth - Metrics.screenWidth * 0.5 : Metrics.screenWidth - Metrics.screenWidth * 0.5) : (DeviceInfo.isTablet() ? Metrics.screenWidth - Metrics.screenWidth * 0.5 : Metrics.screenWidth - Metrics.screenWidth * 0.5),
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                  top: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight-Metrics.screenHeight*0.65 :  Metrics.screenHeight-Metrics.screenHeight*0.65) : (DeviceInfo.isTablet() ? Metrics.screenHeight-Metrics.screenHeight*0.65 :  Metrics.screenHeight-Metrics.screenHeight*0.65),
                  textDecorationLine: 'underline', color: Colors.flBlue.ocean
                }}>See Payment Details
                </Text>
              </TouchableOpacity>
                <Flb name="chevron-right" size={Metrics.icons.medium * Metrics.screenWidth * 0.0017}
                color={Colors.flBlue.ocean}
                style={{
                  transform: [{ rotate: '270deg' }],
                  backgroundColor:Colors.transparent,
                 // bottom: - Metrics.payment6 * Metrics.screenHeight * 0.001,
                 top: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight-Metrics.screenHeight*0.97 : Metrics.screenHeight-Metrics.screenHeight*0.888) : (DeviceInfo.isTablet() ? Metrics.screenHeight-Metrics.screenHeight*0.96 : Metrics.screenHeight-Metrics.screenHeight*0.888),
                  left: this.props.isPortrait ? (DeviceInfo.isTablet() ? -Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002 : -Metrics.smallMargin * Metrics.screenHeight * 0.001) : (DeviceInfo.isTablet() ? -Metrics.searchBarHeight * Metrics.screenHeight * 0.0013 : -Metrics.baseMargin * Metrics.screenHeight * 0.003)
                }} />
          
            <Text allowFontScaling={false} style={{
                  transform: [{ rotate: '270deg' }],
                  right: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.0068 : Metrics.textHeight2 * Metrics.screenHeight * 0.004) : (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.007 : Metrics.textHeight2 * Metrics.screenHeight * 0.004),
                  //left: this.props.isPortrait ? Metrics.screenWidth-Metrics.screenWidth*1.05:Metrics.payment*Metrics.screenHeight*0.005, fontWeight: '500', 
                  width: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenWidth - Metrics.screenWidth * 0.3 : Metrics.screenWidth - Metrics.screenWidth * 0.2) : (DeviceInfo.isTablet() ? Metrics.screenWidth - Metrics.screenWidth * 0.3 : Metrics.screenWidth - Metrics.screenWidth * 0.2),
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                  top: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight-Metrics.screenHeight*1.3 : Metrics.screenHeight-Metrics.screenHeight*1.25) : (DeviceInfo.isTablet() ? Metrics.screenHeight-Metrics.screenHeight*1.34 : Metrics.screenHeight-Metrics.screenHeight*1.25),
                  color: Colors.flBlue.anvil
                }}>Accepted at the following retailers:
            </Text>
              
              <Image style={{
                  transform: [{ rotate: '270deg' }],
                  left: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.004 : Metrics.searchBarHeight * Metrics.screenHeight * 0.001) : (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.002) ,
                  bottom: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.6 : Metrics.screenHeight - Metrics.screenHeight * 0.6) : (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.6 : Metrics.screenHeight - Metrics.screenHeight * 0.6)
                }}
                  source={Images.claimlistsearch} />
             <Image style={{
                  transform: [{ rotate: '270deg' }],
                  left: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.004 : Metrics.searchBarHeight * Metrics.screenHeight * 0.001) : (DeviceInfo.isTablet() ? Metrics.searchBarHeight * Metrics.screenHeight * 0.003 : Metrics.baseMargin * Metrics.screenHeight * 0.002) ,
                  bottom: this.props.isPortrait ? (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.7 : Metrics.screenHeight - Metrics.screenHeight * 0.75) : (DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.7 : Metrics.screenHeight - Metrics.screenHeight * 0.7)
                }}
                  source={Images.claimlistsearch} />
            </View>
          </View>

        </View>

      )
    } else if (this.props.error != null)
      Alert.alert(
        'Payment Barcode',
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK', onPress: () => NavigationActions.pop() }

        ])
  }


  render() {
    // console.tron.log("image", this.props.paymentbarcodedata && this.props.paymentbarcodedata.GetBarCodeTransactionResponse && this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream)
    // console.log("image", this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream)
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this._displayCondition()}
        </View>

      </View>
    )
  }
}

PaymentBarcode.propTypes = {
  data: PropTypes.object,
  attemptPaymentBarcode: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.payment.fetching,
    paymentbarcodedata: state.payment.paymentsbarcode,
    error: state.payment.error,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPaymentBarcode: () => dispatch(PaymentActions.paymentBarcodeRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBarcode)
