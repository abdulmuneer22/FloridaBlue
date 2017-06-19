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
  ART,
  Alert,
  Platform
} from 'react-native'

import styles from './ClaimsSummaryStyle'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ClaimsActions from '../../../Redux/ClaimsRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { connect } from 'react-redux'
import Pie from '../../../Components/Pie'
import ClaimsSummaryCard from './Components/ClaimsSummaryCard'
import I18n from 'react-native-i18n'
import { Button } from 'native-base'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()
class ClaimsSummary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
    // Move these below 2 calls to Claims Card in MyPlanScreen
    // this.props.attemptClaimsSummary()
    // this.props.attemptClaimsList()
    this.viewCliamsList = this.viewCliamsList.bind(this)
  }

  viewCliamsList () {
    // this.props.attemptClaimsList()
    NavigationActions.ClaimsList()
  }

  _renderHeader () {
    return (
      <Image source={Images.newHeaderImage} style={styles.headerContainer}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
          {NavItems.backButton()}
        </View>
        <Text style={styles.headerTextStyle}>
          Claims
        </Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  componentDidMount () {
    console.tron.log('I am in Claims Summary screen')
    console.tron.log(this.props)
  }

  _displayCondition () {
    const height = Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.65) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)
    const width = Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.65) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)

    if (this.props.fetching) {
      return (
        <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>)
    } else if (this.props.claimsSummaryData && this.props.claimsSummaryData.claimsBreakDown && this.props.claimsSummaryData.claimsBreakDown.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.6, justifyContent: 'center' }} >
            <Text style={styles.chart_title}>Year-to-Date Claims Breakdown</Text>
          </View>
          <View style={{ flex: 4.5, alignItems: 'center' }}>
            <Pie
              pieWidth={Metrics.screenWidth - Metrics.screenWidth * 0.7}
              pieHeight={Metrics.screenWidth - Metrics.screenWidth * 0.69}
              colors={['#1f77b4', '#ff7f0e', '#d62728']}
              width={width}
              height={height}
              data={this.props.claimsSummaryData.claimsBreakDown}
            />
          </View>

               <View style={{flex: 3.5, backgroundColor: Colors.flBlue.grey1}} >
              <View style={{flex: 0.5, justifyContent:'center', marginLeft: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.001, marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <Text style={styles.recentClaimsText} >Recent Claims</Text>
              </View>
                { this.props.claimsdata ?
                            <View style={{flex: 3}}>
                              <ClaimsSummaryCard data={this.props.claimsdata.data && this.props.claimsdata.data.length > 3 ? this.props.claimsdata.data.slice(0, 3) : this.props.claimsdata.data} />
                            </View>
                          :
                            <View style={{flex:2,justifyContent:'center', alignItems: 'center'}}>
                              <Text> No Recent Claims found </Text>
                            </View>
                }
            </View>
            {
                    this.props.claimsdata && this.props.claimsdata.count > 0
                    ?
                      <View style={{flex: 1.5}} >
                        <View style={{flex: 0.75, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={styles.totalClaimsText}>You have </Text>
                          <Text style={styles.totalClaimsTextCount}>{this.props.claimsdata && this.props.claimsdata.count}</Text>
                          <Text style={styles.totalClaimsText}> Claims</Text>
                        </View>
                        <View style={{flex: 0.75}}>
                          <Button rounded style={{flex: 0.6, backgroundColor: Colors.flBlue.grass, alignSelf: 'center'}} onPress={this.viewCliamsList}>
                            <Text style={{color: Colors.snow, fontWeight: '500', width: Metrics.textHeight2 * Metrics.screenWidth * 0.01, textAlign: 'center'}}>View Claims List</Text>
                          </Button>
                        </View>
                        <View style={{flex: 0.15}} />

                      </View>
                    : null
                  }
        </View>
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
    console.tron.log('im claims summary page', this.props.claimsdata)
    console.log('im claims summary page===>', this.props.claimsdata)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>

        <View style={{ flex: 1 }}>
          {this._displayCondition()}
        </View>
      </View>
    )
  }
}

ClaimsSummary.propTypes = {
  data: PropTypes.object,
  attemptClaimsSummary: PropTypes.func,
  attemptClaimsList: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claims.fetching,
    claimsSummaryData: state.claims.claimsSummary,
    claimsdata: state.claims.claimslist,
    error: state.claims.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsSummary: () => dispatch(ClaimsActions.claimsSummaryRequest()),
    attemptClaimsList: () => dispatch(ClaimsActions.claimsListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsSummary)
