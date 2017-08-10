import React, { Component, PropTypes } from 'react'
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Linking
} from 'react-native'

import { Colors, Metrics, Fonts, Images } from '../../Themes'
import styles from './PaymentStyle'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import { Card } from 'native-base'
import PopoverTooltip from 'react-native-popover-tooltip';
import Popover, { PopoverTouchable } from 'react-native-modal-popover'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class PaymentDetails extends Component {

  constructor(props) {
    super(props)
    this.handleCall = this.handleCall.bind(this)
    this.state = {
      floatClicked: true
    }
    this._toggleFloat = this._toggleFloat.bind(this)

  }

  handleCall(phone) {
    gaTracker.trackEvent('Payment', 'Phone Call')
    const url = `tel:${phone}`
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.tron.log('Don\'t know how to open URI: ')
      }
    })
  }

  _toggleFloat() {
    if (!this.state.floatClicked) {
      this.setState({ floatClicked: true })
    } else if (this.state.floatClicked) {
      this.setState({ floatClicked: false })
    }
  }


 _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={this.props.isPortrait ? Images.newHeaderImage : Images.landscapeHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        Payment Details</Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  componentDidMount() {
    console.tron.log("coming from payment content")
    gaTracker.trackScreenView('Payment Content')
  }

  _displayCondition() {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.error != null) {
      Alert.alert(
        'Payment Content',
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }

        ]
      )
    }
  }

  render() {
    // console.tron.log(this.props.error)
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', margin: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
              <View style={{ flex: 0.3, alignItems: 'flex-end', marginTop: 10 }}>
                <Flb name='money' size={Metrics.icons.large * Metrics.screenWidth * 0.002}
                  color={Colors.flBlue.grass} />
              </View>
              <View style={{ flex: 0.7, marginTop: 10 }}>
                <Text allowFontScaling={false}
                  style={{
                    fontSize: Fonts.size.h4 * Metrics.screenWidth * 0.0025,
                    color: Colors.flBlue.grass,
                    fontWeight: '500'
                  }}>
                  Payment Details
                </Text>
              </View>
            </View>
            <Card style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.flBlue.grey1 }}>
              <View style={{ flex: 1, justifyContent: 'center', margin: Metrics.baseMargin * Metrics.screenHeight * 0.001 }}>
                <Text allowFontScaling={false} onPress={() => NavigationActions.pop()}
                  style={{
                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025,
                    color: Colors.flBlue.ocean,
                    textDecorationColor: Colors.flBlue.ocean,
                    textDecorationLine: 'underline'
                    //fontWeight:'500'
                  }}>
                  View Barcode
                </Text>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.001 }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb name='check' size={Metrics.icons.large * Metrics.screenWidth * 0.002}
                        color={Colors.flBlue.anvil} />
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                          color: Colors.flBlue.anvil,
                        }}>
                        Your payment will be applied to your account within <Text allowFontScaling={false}
                          style={{
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.anvil,
                            fontWeight: '500'
                          }}>5 business days.</Text>
                      </Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', width:20 }}>
                      <PopoverTouchable onPopoverDisplayed={() => console.log('Popover displayed!')}>
                        <Flb name='info' onPress={() => console.log('Please try after sometime.')}
                          size={Metrics.icons.medium * Metrics.screenHeight * 0.0015}
                          color={Colors.flBlue.ocean} />

                        <Popover
                          contentStyle={styles.content}
                          arrowStyle={{ borderTopColor: Colors.snow }}
                          backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                          placement='left' >
                          <Text allowFontScaling={false}
                                  style={{
                                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                                  color: Colors.flBlue.anvil,
                                }}>Walgreens can accept payments from $1 to $999 per 24 hours.
                          </Text>
                        </Popover>
                      </PopoverTouchable>
                    </View>
                  </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.001 }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb name='check' size={Metrics.icons.large * Metrics.screenWidth * 0.002}
                        color={Colors.flBlue.anvil} />
                    </View>
                    <View style={{ flex: 0.6 }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                          color: Colors.flBlue.anvil,
                        }}>
                        Your payment will be applied to your account within <Text allowFontScaling={false}
                          style={{
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.anvil,
                            fontWeight: '500'
                          }}>5 business days.</Text>
                      </Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center', width:20 }}>
                      <PopoverTouchable onPopoverDisplayed={() => console.log('Popover displayed!')}>
                        <Flb name='info' onPress={() => console.log('Please try after sometime.')}
                          size={Metrics.icons.medium * Metrics.screenHeight * 0.0015}
                          color={Colors.flBlue.ocean} />

                        <Popover
                          contentStyle={styles.content}
                          arrowStyle={{ borderTopColor: Colors.snow }}
                          backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                          placement='left' >
                          <Text allowFontScaling={false}
                                  style={{
                                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                                  color: Colors.flBlue.anvil,
                                }}>Walgreens can accept payments from $1 to $999 per 24 hours.
                          </Text>
                        </Popover>
                      </PopoverTouchable>
                    </View>
                  </View>

                  <View style={{ flex: 1, flexDirection: 'row', marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.001 }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb name='check' size={Metrics.icons.large * Metrics.screenWidth * 0.002}
                        color={Colors.flBlue.anvil} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                          color: Colors.flBlue.anvil,
                        }}>
                        Your payment is due by the due date on your bill. payments received after your due date do not guarantee that you policy will remain active.
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: Metrics.mediumMargin * Metrics.screenHeight * 0.001 }}>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                      <Flb name='check' size={Metrics.icons.large * Metrics.screenWidth * 0.002}
                        color={Colors.flBlue.anvil} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                      <Text allowFontScaling={false}
                        style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                          color: Colors.flBlue.anvil,
                        }}>
                        Please contact Florida Blue for questions about the premium due or the status of your account, as sales associates cannot look up your account.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
            <View style={{
              flex: 1, margin: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.001, justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                  color: Colors.flBlue.anvil,
                }}>
                By accepting or using this barcode to make a payment, you agree to the full terms and conditions available at  <Text allowFontScaling={false}
                  style={{
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                    color: Colors.flBlue.ocean,
                    textDecorationColor: Colors.flBlue.ocean,
                    textDecorationLine: 'underline'
                  }}
                  onPress={() => Alert.alert('test')}>
                  www.cashtie.com/terms.
              </Text> </Text>
            </View>
            <View style={{
              marginLeft: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002,
              marginRight: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002,
              height: 1,
              margin: 10,
              backgroundColor: 'black'
            }} />
            <View style={{
              flex: 1, margin: Metrics.mediumMargin * Metrics.screenHeight * 0.001, justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                  color: Colors.flBlue.anvil,
                }}>
                After payment is processed successfully, you can get a detailed receipt at      <Text allowFontScaling={false}
                  style={{
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                    color: Colors.flBlue.ocean,
                    textDecorationColor: Colors.flBlue.ocean,
                    textDecorationLine: 'underline'
                  }}
                  onPress={() => Alert.alert('test')}>
                  www.cashtie/receipt.
              </Text> </Text>
            </View>
            <View style={{
              marginLeft: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002,
              marginRight: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002,
              height: 1,
              margin: 10,
              backgroundColor: 'black'
            }} />
            <View style={{
              flex: 1, margin: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.001, justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text allowFontScaling={false}
                style={{
                  fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0028,
                  color: Colors.flBlue.anvil,
                  textAlign: 'justify'
                }}>
                Retailers are independent companies assiting in the collection of premium payment
                on behalf of Florida Blue/Florida Blue HMO/Florida Combined Life Insurance Company, Inc.
                Florida Blue is the trade name of Blue Cross Blue Shield of Florid, Inc., an Independent Licence of Blur Cross and Blue Shield Association 85583 1115.
              </Text>
            </View>
            <View style={{ flex: 1, marginTop: 40, alignItems: 'flex-end' }}>

            </View>
          </ScrollView>

          <View style={{ flex: 0.1 }}>
            {this.state.floatClicked ? <View style={styles.urgentCareCircle}>
              <TouchableOpacity onPress={this._toggleFloat}>
                <Flb name='rd-brand-phone'
                  style={{ backgroundColor: Colors.transparent }}
                  color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth * 0.003} />
              </TouchableOpacity>
            </View> : null}

            {!this.state.floatClicked ?

              <Card style={{
                width: Metrics.screenWidth * 0.8,
                height: Metrics.screenWidth * 0.78,
                flex: 1,
                // zIndex: -1,
                // backgroundColor:'red',
                borderWidth: 1,
                borderRadius: Metrics.screenWidth * 1,
                borderColor: Colors.flBlue.grey1,
                position: 'absolute',
                bottom: -Metrics.textHeight1 * Metrics.screenWidth * 0.006,
                right: -Metrics.textHeight2 * Metrics.screenWidth * 0.0035
              }}>

                <Flb name='close-delete' style={styles.dismissPayByPhone}
                  color={Colors.flBlue.grey4} size={Metrics.icons.small * Metrics.screenWidth * 0.0035}
                  onPress={this._toggleFloat} />
                {this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent.payByPhone ?
                  <Text allowFontScaling={false} style={styles.payByPhoneText}>
                    {this.props.paymentdata.paymentContent.payByPhone.headerText_en}
                  </Text> : null}
                {this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent.payByPhone ?
                  <Text allowFontScaling={false} style={styles.payByPhoneMessage}>
                    {this.props.paymentdata.paymentContent.payByPhone.descrption_en}
                  </Text> : null}
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <TouchableOpacity style={{
                      marginLeft: (Platform.OS === 'ios') ? Metrics.searchBarHeight * Metrics.screenWidth * 0.002 : Metrics.searchBarHeight * Metrics.screenWidth * 0.002,
                      marginTop: (Platform.OS === 'ios') ? Metrics.baseMargin * Metrics.screenHeight * 0.001 : Metrics.baseMargin * Metrics.screenHeight * 0.001
                    }} onPress={() => this.handleCall(this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent.payByPhone ? this.props.paymentdata.paymentContent.payByPhone.teleNumber : '')}>
                      <Image style={styles.CallButton} source={Images.callNowButton} />
                    </TouchableOpacity>
                  </View>
                  <View style={{
                    marginTop: (Platform.OS === 'ios') ? Metrics.baseMargin * Metrics.screenHeight * 0.001 : Metrics.smallMargin * Metrics.screenHeight * 0.0016,
                    marginLeft: (Platform.OS === 'ios') ? Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0035 : Metrics.smallMargin * Metrics.screenWidth * 0.0038
                  }}>
                    <Flb name='rd-brand-phone' onPress={this._toggleFloat} color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth * 0.0033}
                    />
                  </View>
                </View>
              </Card>


              : null}
          </View>
        </View>
      </View>
    )
  }
}

PaymentDetails.propTypes = {

  data: PropTypes.object,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    paymentdata: state.payment.paymentslist,
    error: state.payment.error,
    fetching: state.payment.fetching,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPayment: () => dispatch(PaymentActions.paymentsRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails)
