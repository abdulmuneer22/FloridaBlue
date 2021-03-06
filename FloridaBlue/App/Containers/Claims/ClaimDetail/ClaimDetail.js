import React, { Component, PropTypes } from 'react'

import { AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
    TouchableWithoutFeedback,
    ScrollView,
    Linking
} from 'react-native'

import styles from './ClaimDetailStyle'
import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import ClaimsActions from '../../../Redux/ClaimsRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import formatNumber from 'format-number'
let moment = require('moment')
const window = Dimensions.get('window')
let urlConfig = require('../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimDetail extends Component {
  constructor (props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  // formatDate (date) {
  //   date = new Date(date)
  //   let day = ('0' + date.getDate()).slice(-2)
  //   let month = ('0' + (date.getMonth() + 1)).slice(-2)
  //   let year = date.getFullYear()
  //   return month + '/' + day + '/' + year
  // }
   formatDate (date) {
    return moment(date).format('MM-DD-YYYY')
  }

   formatTo2DecimalNumber (number) {
     if(number != undefined )
     {
       var myFormat = formatNumber({prefix: '', suffix: '',round:2,truncate: 2,padRight:2});
      return myFormat(number);
     }else{
       return '';
     }

  }
  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
         Claim Overview
      </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.tron.log('im claims detail screen ')
  }
  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.claimdetaildata && this.props.claimdetaildata.claimNumber && this.props.claimdetaildata.claimNumber.length != 0) {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{flex: 1.5, width: Metrics.screenWidth, alignItems: 'center', justifyContent: 'center'}} source={Images.claimdetailheaderblue}>
              <View style={{flex: 1.5, flexDirection: 'row', justifyContent: 'center'}}>
                {this.props.claimdetaildata
                  ? <View style={{flex: 0.5, alignItems: 'center', backgroundColor: Colors.transparent, marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001, justifyContent: 'center'}}>
                    <Text allowFontScaling={false} style={{color: Colors.snow,
                      fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0024,
                      fontWeight:'bold'}}>

                      {this.formatDate(this.props.claimdetaildata.dateOfService)}
                    </Text>
                  </View> : null}
                {this.props.claimdetaildata
                  ? <View style={{flex: 0.5, backgroundColor: Colors.transparent, alignItems: 'center', justifyContent: 'center'}}>
                    <Text allowFontScaling={false} style={{color: Colors.snow,
                      fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0024,
                      fontWeight:'bold'}}>
                      {this.props.claimdetaildata.memberFirstName}
                    </Text>
                  </View> : null}
                {this.props.claimdetaildata
                  ? <View style={{flex: 0.5,
                    alignItems: 'center',
                    marginBottom:5,
                    backgroundColor: Colors.transparent,
                    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.001,
                    justifyContent: 'center'}}>
                    <Text allowFontScaling={false} style={{color: Colors.snow,
                      fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0024,
                      fontWeight:'bold'}}>
                      {this.props.claimdetaildata.providerLastName}
                    </Text>
                  </View> : null}
              </View>
            </Image>
          </View>
          {this.props.claimdetaildata
            ? <View style={{flex: 2, marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
              <View style={{flex: 0.7, flexDirection: 'row', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.002 }}>
                <View style={{flex: 0.25,alignItems:'flex-end', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Type:
            </Text>
                </View>
                <View style={{flex: 0.45}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
                    {this.props.claimdetaildata.claimType}
                  </Text>
                </View>
              </View>
              {this.props.claimdetaildata
                ? <View style={{flex: 0.6,
                  flexDirection: 'row',
                  marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002,
                 // marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001
                 }}>
                  <View style={{flex: 0.2,alignItems:'flex-end', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                    <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Status:
            </Text>
                  </View>
                  <View style={{flex: 0.4}}>
                    <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
                     Processed on {this.formatDate(this.props.claimdetaildata.dateReceived)}
                    </Text>
                  </View>
                </View> : null}

              {this.props.claimdetaildata
                ? <View style={{flex: 0.7, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002, marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.002}}>
                  <View style={{flex: 0.25,alignItems:'center', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                    <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Number:
            </Text>
                  </View>
                  <View style={{flex: 0.45, marginLeft:-Metrics.baseMargin*Metrics.screenWidth*0.003}}>
                    <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
                      {this.props.claimdetaildata.claimNumber}
                    </Text>
                  </View>
                </View> : null}

            </View> : null}
          <View style={{borderWidth: 0.5,
            borderColor: Colors.flBlue.grey3,
            backgroundColor: Colors.bg2,
            marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.001,
            marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}} />
          <View style={{flex: 2.5, margin: 15, backgroundColor: Colors.bg2}}>
            <View style={{flex: 0.5}}>
              <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                fontWeight: '500',
                fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027}}>
            Claim Details:
            </Text>
            </View>
            { this.props.claimdetaildata
              ? <View style={{flex: 0.5, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                    fontWeight:'500'}}>
            Total Billed
            </Text>
                </View>
                <View style={{flex: 0.25, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.0018}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                    fontWeight:'500'}}>
             ${this.formatTo2DecimalNumber(this.props.claimdetaildata.totalBilledAllowed)}
                  </Text>
                </View>
              </View> : null}

            {this.props.claimdetaildata
              ? <View style={{flex: 0.5, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            Your Responsibility*
            </Text>
                </View>
                <View style={{flex: 0.25, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.formatTo2DecimalNumber(this.props.claimdetaildata.totalPatientRespAmt)}
                  </Text>
                </View>
              </View> : null}
            {this.props.claimdetaildata
              ? <View style={{flex: 0.5, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            Florida Blue paid
            </Text>
                </View>
                <View style={{flex: 0.25, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.formatTo2DecimalNumber(this.props.claimdetaildata.totalNetAmt)}
                  </Text>
                </View>
              </View> : null}

            {this.props.claimdetaildata
              ? <View style={{flex: 0.5, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            MemberDiscount
            </Text>
                </View>
                <View style={{flex: 0.25, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text allowFontScaling={false} style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.formatTo2DecimalNumber(this.props.claimdetaildata.memberDiscount)}
                  </Text>
                </View>
              </View> : null}
          </View>

          {this.props.claimdetaildata
            ? <View style={{flex: 0.8, alignItems: 'center', backgroundColor: Colors.flBlue.grey4, flexDirection: 'row'}}>
              <View style={{flex: 0.4, alignItems: 'flex-end'}}>
                <Text allowFontScaling={false} style={{color: Colors.snow,
                  fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
                  }}>
            You've Saved:
            </Text>
              </View>
              <View style={{flex: 0.4, marginLeft:Metrics.smallMargin*Metrics.screenWidth*0.003}}>
                <Text allowFontScaling={false} style={{color: Colors.snow,
                  fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028,
                  fontWeight:'500'}}>
             ${this.formatTo2DecimalNumber(this.props.claimdetaildata.totalSavings)}
                </Text>
              </View>
            </View> : null}

          <View style={{flex: 1, justifyContent: 'center', backgroundColor: Colors.snow, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => NavigationActions.pop()} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={styles.claimListButton} source={Images.cliamlistbutton} />
            </TouchableOpacity>
          </View>

        </View>)
    } else if (this.props && this.props.claimdetaildata && this.props.claimdetaildata.claimNumber && this.props.claimdetaildata.claimNumber.length == 0) {
      Alert.alert(
                  'Claim Detail',
                   'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK' }

        ]
                )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Claim Detail',
                   'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK' }

        ]
                )
    }
  }

  render () {
    console.tron.log('im claims detail page', this.props.claimdetaildata)
    console.log('im claims detail page', this.props.claimdetaildata)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>

        <View style={{flex: 1}}>
          {this._displayCondition()}
        </View>
      </View>
    )
  }
}

ClaimDetail.propTypes = {
  data: PropTypes.object,
  attemptClaimDetail: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  console.tron.log(state)
  return {
    fetching: state.claims.fetching,
    claimdetaildata: state.claims.claimdetail,
    error: state.claims.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimDetail: (data) => dispatch(ClaimsActions.claimDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetail)
