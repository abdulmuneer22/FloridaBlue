import React, { Component, PropTypes } from 'react'
import {
  Alert,
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
  Platform
} from 'react-native'

import {Colors, Metrics, Fonts, Images} from '../../Themes'
import styles from './PaymentStyle'
import NavItems from '../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import {Card} from 'native-base'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class PaymentContent extends Component {

   constructor (props) {
    super(props)
    this.handleCall = this.handleCall.bind(this)
    this.state = {
      floatClicked: true,
       modalVisible: false
    }
    this._toggleFloat = this._toggleFloat.bind(this)

  }
    
   handleCall (phone) {
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

    _toggleFloat () {
    if (!this.state.floatClicked) {
      this.setState({floatClicked: true})
    } else if (this.state.floatClicked) {
      this.setState({floatClicked: false})
    }
  }

  _renderHeader () {
    return (<Image style={styles.hsaHeader} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.hsaheaderTextStyle}>
         Payment Content
        </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.log('keyName',this.props.keyName)
      console.tron.log("coming from payment content")
    gaTracker.trackScreenView('Payment Content')
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props && this.props.paymentdata) {
     
        return (<View style={{flex: 1}}>
        { this.props && this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent[this.props.keyName]
          ? <View style={styles.paybymailView}>
            <View style={{flex:0.7, alignItems:'center',justifyContent:'center'}}>
              <Text allowFontScaling={false} style={styles.hsaTextStyle1}>{this.props.paymentdata.paymentContent[this.props.keyName].headerText_en}</Text>
            </View>
            <View style={{flex:0.3}}>
              <Flb name='stamp-mail' color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth*0.002} />
            </View>
          </View>
        : null
        }

        {this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent[this.props.keyName] && this.props.paymentdata.paymentContent[this.props.keyName].content && this.props.paymentdata.paymentContent[this.props.keyName].content.length > 0
            ? this.props.paymentdata.paymentContent[this.props.keyName].content.map((tile, i) => {
            return(
            <View key= {i} style={styles.content}>
            <Text allowFontScaling={false} style={styles.hsaTextStyle1}>
            {tile.descrption_en}
            </Text>
            </View>)})
            : null
         }
         { this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent[this.props.keyName] && this.props.paymentdata.paymentContent[this.props.keyName].link
            ? <View style={styles.linkView}>
              <Text allowFontScaling={false} 
              style={styles.linkText} onPress={() => { NavigationActions.MyView({responseURL: this.props.paymentdata.paymentContent[this.props.keyName].link.url}) }}>
                  {this.props.paymentdata.paymentContent[this.props.keyName].link.name}
                  </Text>
             
            </View>
           : null
        }

          <View style={{flex:0.1}}>      
              {this.state.floatClicked ?  <View style={styles.urgentCareCircle}>
                <TouchableOpacity onPress={this._toggleFloat}>
                  <Flb name='rd-brand-phone'
                    style={{backgroundColor: Colors.transparent}}
                    color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth * 0.0035} />
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
                 </Text>:null}
                {this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent.payByPhone ?
              <Text allowFontScaling={false} style={styles.payByPhoneMessage}>
                {this.props.paymentdata.paymentContent.payByPhone.descrption_en}
              </Text>:null}
            <View style={{flexDirection: 'row'}}>
              <View>
                <TouchableOpacity style={{marginLeft: (Platform.OS === 'ios') ? Metrics.searchBarHeight*Metrics.screenWidth*0.002 : Metrics.searchBarHeight*Metrics.screenWidth*0.002,
               marginTop: (Platform.OS === 'ios') ? Metrics.baseMargin*Metrics.screenHeight*0.001 : Metrics.baseMargin*Metrics.screenHeight*0.001}} onPress={() => this.handleCall(this.props.paymentdata && this.props.paymentdata.paymentContent && this.props.paymentdata.paymentContent.payByPhone ? this.props.paymentdata.paymentContent.payByPhone.teleNumber : '')}>
                  <Image style={styles.CallButton} source={Images.callNowButton} />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: (Platform.OS === 'ios') ? Metrics.baseMargin * Metrics.screenHeight * 0.001 : Metrics.smallMargin * Metrics.screenHeight * 0.0016,
                marginLeft: (Platform.OS === 'ios') ? Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0035 : Metrics.smallMargin * Metrics.screenWidth * 0.0038}}>
                <Flb name='rd-brand-phone' onPress={this._toggleFloat} color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth * 0.0035} 
                        />
              </View>
            </View>
          </Card>


            : null}         
         </View>
          </View>
        )
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

  render () {
    // console.tron.log(this.props.error)
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <View style={{flex:1}}>
        {this._displayCondition()}
        </View>
      </View>
    )
  }
    }

PaymentContent.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContent)
