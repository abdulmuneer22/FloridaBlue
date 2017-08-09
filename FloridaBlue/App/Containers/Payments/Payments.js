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
  Alert,
  Platform,
  Linking
} from 'react-native'
const window = Dimensions.get('window')

import {Colors, Metrics, Fonts, Images} from '../../Themes'
import styles from './PaymentStyle'
import NavItems from '../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import PaymentActions from '../../Redux/PaymentRedux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import PaymentCard from './Components/PaymentCard'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import {Card} from 'native-base'

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')
import SettingActions from '../../Redux/SettingRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class Payments extends Component {
  constructor (props) {
    super(props)
    this.handleCall = this.handleCall.bind(this)
    this.state = {
      floatClicked: false
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

  componentDidMount () {
    gaTracker.trackScreenView('Payments')
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={this.props.isPortrait ? Images.newHeaderImage : Images.landscapeHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        Payments</Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _toggleFloat () {
    if (!this.state.floatClicked) {
      this.setState({floatClicked: true})
    } else if (this.state.floatClicked) {
      this.setState({floatClicked: false})
    }
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props && this.props.paymentdata && this.props.paymentdata.paymentTiles && this.props.paymentdata.paymentTiles.length > 0) {
      return (
        <View style={{flex: 1}}>
          <ScrollView>
            <TouchableOpacity style={{flex: 1, margin: 15 }}>
              <View style={{flex: 1, borderRadius: 15, backgroundColor: Colors.flBlue.orange, paddingLeft: 10}} >
                <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ flex: 0.15, marginRight: 10 }}>
                    <Flb name='cc-card' size={Metrics.icons.large} color={Colors.snow} />
                  </View>
                  <View style={{ flex: 0.85 }}>
                    <Text allowFontScaling={false} style={{
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0025,
                      color: Colors.snow
                    }}>Click to preview what your 2018 bill might look like.</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{
             // flexDirection: 'row',
              backgroundColor: Colors.flBlue.bg2,
              flexWrap: 'wrap',
              flex: 1

            }}>
              { this.props && this.props.paymentdata && this.props.paymentdata.paymentTiles && this.props.paymentdata.paymentTiles.length > 0
              ? this.props.paymentdata.paymentTiles.map((tile, i) => {
                const index = i + 1
                const TileCount = this.props.paymentdata.paymentTiles.length

                console.tron.log(tile)
                return (
                  <PaymentCard
                    i={i}
                    key={index}
                    title={tile.tileName['en']}
                    tileType={tile.tileType}
                    icon={tile.tileIcon}
                    CardCount={TileCount}
                    image={tile.backgroundImage}
                    webURL={tile.tileType !== 'native' ? tile.tileUrl : null}
                    routerName={tile.tileType === 'native' ? tile.routerName : null}

                      />
                )
              }
          ) : <Text />
        }
            </View>

          </ScrollView>
         { this.props.paymentdata && this.props.paymentdata.payByPhone ?
           <View style={{flex: 1}}>
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

          </View> : null}
        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Payments',

                   'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK'}

        ]
                )
    }
  }

render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        {this._displayCondition()}

      </View>
    )
  }
}

Payments.propTypes = {
  data: PropTypes.object,
  attemptPayment: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
