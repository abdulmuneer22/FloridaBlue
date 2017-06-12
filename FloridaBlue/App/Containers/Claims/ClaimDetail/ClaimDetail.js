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
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import ClaimDetailActions from '../../../Redux/ClaimDetailRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'

import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimDetail extends Component {
  constructor (props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  formatDate (date) {
    date = new Date(date)
    let day = ('0' + date.getDate()).slice(-2)
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    return month + '/' + day + '/' + year
  }
  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Claim Detail
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.tron.log('im claims screen ')
  }
  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.claimdetaildata && this.props.claimdetaildata.claimNumber && this.props.claimdetaildata.claimNumber.length != 0) {
      return (
        <View style={styles.container}>
          <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{flex: 2, width: Metrics.screenWidth, alignItems: 'center', justifyContent: 'center'}} source={Images.claimdetailheaderblue}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                {this.props.claimdetaildata ?
                  <View style={{flex: 0.33, alignItems: 'center', backgroundColor: Colors.transparent, marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001, justifyContent: 'center'}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0023}}>

                      {this.formatDate(this.props.claimdetaildata.dateReceived)}
                    </Text>
                  </View> : null}
                {this.props.claimdetaildata ?
                  <View style={{flex: 0.33, backgroundColor: Colors.transparent, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0023}}>
                      {this.props.claimdetaildata.memberFirstName}
                    </Text>
                  </View> : null}
                {this.props.claimdetaildata ?
                  <View style={{flex: 0.34, alignItems: 'center', backgroundColor: Colors.transparent,
                    marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.001,
                    justifyContent: 'center'}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0023}}>
                      {this.props.claimdetaildata.providerLastName}
                    </Text>
                  </View> : null}
              </View>
            </Image>
          </View>
          {this.props.claimdetaildata ?
            <View style={{flex: 2, marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
              <View style={{flex: 1, flexDirection: 'row', marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002 }}>
                <View style={{flex: 0.4}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0023}}>
             Claim Type:
            </Text>
                </View>
                <View style={{flex: 0.6}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0023}}>
                    {this.props.claimdetaildata.claimType}
                  </Text>
                </View>
              </View>
              {this.props.claimdetaildata ?
                <View style={{flex: 1, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002,
                  marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                  <View style={{flex: 0.4, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0023}}>
             Status:
            </Text>
                  </View>
                  <View style={{flex: 0.6}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0023}}>
                      {this.formatDate(this.props.claimdetaildata.serviceDateFrom)}
                    </Text>
                  </View>
                </View> : null}

              {this.props.claimdetaildata ?
                <View style={{flex: 1.2, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002, marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.002}}>
                  <View style={{flex: 0.4, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0023}}>
             Claim Number:
            </Text>
                  </View>
                  <View style={{flex: 0.6}}>
                    <Text style={{color: Colors.flBlue.anvil,
                      fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0023}}>
                      {this.props.claimdetaildata.claimNumber}
                    </Text>
                  </View>
                </View> : null}

            </View> : null}
          <View style={{borderWidth: 0.5, borderColor: Colors.flBlue.grey3, backgroundColor: Colors.bg2,
            marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.001, marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}} />
          <View style={{flex: 2.5, margin: 15, backgroundColor: Colors.bg2}}>
            <Text style={{color: Colors.flBlue.anvil,
              fontWeight: '400',
              fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0027}}>
            Overall Claims Breakdown:
            </Text>

            { this.props.claimdetaildata ?
              <View style={{flex: 1, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.6, alignItems: 'flex-end'}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            Total Billed
            </Text>
                </View>
                <View style={{flex: 0.4, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
                  </Text>
                </View>
              </View> : null}

            {this.props.claimdetaildata ?
              <View style={{flex: 1, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.6, alignItems: 'flex-end'}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            Your Responsibility*
            </Text>
                </View>
                <View style={{flex: 0.4, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
                  </Text>
                </View>
              </View> : null}
            {this.props.claimdetaildata ?
              <View style={{flex: 1, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.6, alignItems: 'flex-end'}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            Florida Blue paid
            </Text>
                </View>
                <View style={{flex: 0.4, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
                  </Text>
                </View>
              </View> : null}

            {this.props.claimdetaildata ?
              <View style={{flex: 1, flexDirection: 'row', marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <View style={{flex: 0.6, alignItems: 'flex-end'}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
            Your Discount
            </Text>
                </View>
                <View style={{flex: 0.4, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.002}}>
                  <Text style={{color: Colors.flBlue.anvil,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
                  </Text>
                </View>
              </View> : null}
          </View>

          {this.props.claimdetaildata ?
            <View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.flBlue.grey4, flexDirection: 'row'}}>
              <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                <Text style={{color: Colors.snow,
                  fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028}}>
            You've Saved:
            </Text>
              </View>
              <View style={{flex: 0.3, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                <Text style={{color: Colors.snow,
                  fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
                </Text>
              </View>
            </View> : null}

          <View style={{flex: 0.8, marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => NavigationActions.ClaimsList()} style={{flex: 0.8, alignItems: 'center'}}>
              <Image style={styles.claimListButton} source={Images.cliamlistbutton} />
            </TouchableOpacity>

          </View>

        </View>)
    } else if (this.props.data && this.props.data.tiles != null && this.props.data.tiles.length == 0) {
      Alert.alert(
                  'Claim Detail',
                   'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
                    { text: 'OK' }

        ]
                )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Claim Detail',
                   'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
                    { text: 'OK' }

        ]
                )
    }
  }

  render () {
    console.tron.log('im claims detail page', this.props.claimdetaildata)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>

        <View style={styles.container}>
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
    fetching: state.claimdetail.fetching,
    claimdetaildata: state.claims.data,
    error: state.claimdetail.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimDetail: (data) => dispatch(ClaimDetailActions.claimDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetail)