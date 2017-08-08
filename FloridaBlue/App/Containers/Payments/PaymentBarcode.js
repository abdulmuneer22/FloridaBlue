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
              flex: 0.4, width: Metrics.screenWidth * 0.1,
              justifyContent: 'center'
            }}>
              <Text allowFontScaling={false}
                style={{
                  color: Colors.flBlue.ocean,
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0035,
                  transform: [{ rotate: '270deg' }],
                  top: this.props.isPortrait ? DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 0.7 : Metrics.screenHeight - Metrics.screenHeight * 0.75 : Metrics.screenHeight - Metrics.screenHeight * 0.65,
                  left: this.props.isPortrait ? DeviceInfo.isTablet() ? Metrics.textHeight2 - Metrics.screenHeight * 0.12 : Metrics.textHeight2 - Metrics.screenHeight * 0.09 : Metrics.textHeight - Metrics.screenHeight * 0.09
                }}>
                Pay in Person</Text>
              <Text allowFontScaling={false}
                style={{
                  color: Colors.flBlue.anvil,
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                  transform: [{ rotate: '270deg' }],
                  top: DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * 1.3 : Metrics.screenHeight - Metrics.screenHeight * 1.2,
                  bottom: Metrics.payment3 - Metrics.screenWidth * 0.001,
                  // textAlign: 'right',
                  //left:-80, 
                  width: Metrics.screenHeight - Metrics.screenWidth * 0.99,
                  right: this.props.isPortrait ? Metrics.textHeight1 * Metrics.screenHeight * 0.004 : Metrics.searchBarHeight * Metrics.screenHeight * 0.002
                }}>Accepted at the following retailers:
              </Text>
              <Image style={{
                transform: [{ rotate: '270deg' }],
                left: this.props.isPortrait ? Metrics.textHeight * Metrics.screenHeight * 0.0017 : DeviceInfo.isTablet() ? Metrics.textHeight * Metrics.screenHeight * 0.002 : Metrics.textHeight * Metrics.screenHeight * 0.001,
                bottom: DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * .6 : Metrics.payment - Metrics.screenWidth * 0.001
              }}
                source={Images.claimlistsearch} />
              <Image style={{
                transform: [{ rotate: '270deg' }],
                left: this.props.isPortrait ? Metrics.textHeight * Metrics.screenHeight * 0.0017 : DeviceInfo.isTablet() ? Metrics.textHeight * Metrics.screenHeight * 0.002 : Metrics.textHeight * Metrics.screenHeight * 0.001,
                bottom: DeviceInfo.isTablet() ? Metrics.screenHeight - Metrics.screenHeight * .67 : Metrics.payment3 - Metrics.screenHeight * 0.001
              }}
                source={Images.claimlistsearch} />

            </View>

            <View style={{
              borderBottomWidth: 1, flex: 0.001, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight,
              transform: [{ rotate: '270deg' }], bottom: Metrics.textHeight * Metrics.screenHeight * 0.004, right: -Metrics.textHeight * Metrics.screenHeight * 0.0025
            }} />
            <View style={{
              flex: 0.2,
              // backgroundColor:'red',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: DeviceInfo.isTablet() ? (this.props.isPortrait ? -Metrics.payment2 * Metrics.screenWidth * 0.00245 : -Metrics.payment2 * Metrics.screenWidth * 0.00275) : -Metrics.payment2 * Metrics.screenWidth * 0.003,
              right: DeviceInfo.isTablet() ? Metrics.doubleBaseMargin * Metrics.screenHeight * 0.005 : Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002
            }}>
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
                  top: -Metrics.textHeight * Metrics.screenHeight * 0.005
                }}
              />
            </View>
            <View style={{
              borderBottomWidth: 1, flex: 0.001, borderBottomColor: Colors.flBlue.grey2, width: Metrics.screenHeight,
              transform: [{ rotate: '270deg' }], bottom: Metrics.textHeight * Metrics.screenHeight * 0.004, right: -Metrics.textHeight * Metrics.screenHeight * 0.0025
            }} />
            <View style={{
              flex: 0.2,
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
              flex: 0.1, width: Metrics.screenWidth * 0.1,
              justifyContent: 'center',
              //backgroundColor:'red'
            }}>
              <TouchableOpacity style={{ flex: 0.1, width: 0, backgroundColor: 'red' }}>
                <Text allowFontScaling={false} style={{
                  transform: [{ rotate: '270deg' }],
                  bottom: DeviceInfo.isTablet() ? this.props.isPortrait ? -Metrics.payment8 * Metrics.screenHeight * 0.0012 : -Metrics.payment8 * Metrics.screenHeight * 0.0014 : -Metrics.payment8 * Metrics.screenHeight * 0.001,
                  right: DeviceInfo.isTablet() ? Metrics.textHeight2 * Metrics.screenHeight * 0.0035 : Metrics.textHeight2 * Metrics.screenHeight * 0.0025,
                  //left: this.props.isPortrait ? Metrics.payment*Metrics.screenHeight*0.0043:Metrics.payment*Metrics.screenHeight*0.005, fontWeight: '500', 
                  width: Metrics.screenWidth - Metrics.screenWidth * 0.375,
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                  textDecorationLine: 'underline', color: Colors.flBlue.teal
                }}>See Details
                </Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 0.1 }}>

              <Flb name='delete-circle' onPress={() => NavigationActions.pop()} size={Metrics.icons.regular * Metrics.screenWidth * 0.0025} color={Colors.flBlue.teal}
                style={{
                  transform: [{ rotate: '270deg' }],
                  top: Metrics.baseMargin * Metrics.screenWidth * 0.003,
                  right: Metrics.baseMargin * Metrics.screenHeight * 0.002
                }} />

            </View>
          </View>

        </View>

      )
    } else if (this.props.error != null)
      Alert.alert(
        'Payment Barcode',
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }

        ])
  }


  render() {
    console.tron.log("image", this.props.paymentbarcodedata && this.props.paymentbarcodedata.GetBarCodeTransactionResponse && this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream)
    console.log("image", this.props.paymentbarcodedata.GetBarCodeTransactionResponse.barcodeByteStream)
    return (
      <View style={styles.container}>
        {this.props.isPortrait ?
          <View>
            {this._renderHeader()}
          </View>
          : null}


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
