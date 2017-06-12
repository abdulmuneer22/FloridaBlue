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
    Platform
  } from 'react-native'

import styles from './ClaimsSummaryStyle'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import ClaimsSummaryActions from '../../../Redux/ClaimsSummaryRedux'
import ClaimsListActions from '../../../Redux/ClaimsListRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { connect } from 'react-redux'
import Pie from '../../../Components/Pie'
import ClaimsCard from './Components/ClaimsCard'
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
    //Move these below 2 calls to Claims Card in MyPlanScreen
    this.props.attemptClaimsSummary()
    this.props.attemptClaimsList()
    this.viewCliamsList = this.viewCliamsList.bind(this)
  }

  viewCliamsList () {
    // this.props.attemptClaimsList()
    NavigationActions.ClaimsList()
  }

  _renderHeader () {
    return (
      <Image source={Images.newHeaderImage} style={styles.headerContainer}>
        <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
          {NavItems.backButton()}
        </View>
        <Text style={styles.headerTextStyle}>
            Claims
        </Text>
        <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
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
    const height = Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.60) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)
    const width = Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.60) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.60)
    console.tron.log(this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length + ' this.props.claimsdata.data' + JSON.stringify(this.props.claimsdata))
    console.tron.log('this.props.fetching' + this.props.fetching)
    if (this.props.fetching) {
      return (
        <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>)
    } else if (this.props.claimsSummaryData && this.props.claimsSummaryData && this.props.claimsSummaryData.claimsBreakDown && this.props.claimsSummaryData.claimsBreakDown.length != 0) {
      return (
        <View style={styles.container}>
          <View style={{flex: 1}} >
            <View style={{flex: 0.5}} >
              <Text style={styles.chart_title}>Year-to-Date Claims Breakdown</Text>
            </View>
            <View style={{flex: 5, alignItems: 'center'}}>
              <Pie
                pieWidth={Metrics.screenWidth - Metrics.screenWidth * 0.7}
                pieHeight={Metrics.screenWidth - Metrics.screenWidth * 0.69}
                colors={['#1f77b4', '#ff7f0e', '#d62728']}
                width={width}
                height={height}
                data={this.props.claimsSummaryData.claimsBreakDown}
                    />
            </View>

            <View style={styles.recentClaimsView} >
              <View style={{flex: 1, marginLeft: Metrics.doubleBaseMargin * Metrics.screenHeight * 0.001, marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}}>
                <Text style={styles.recentClaimsText} >Recent Claims</Text>
              </View>
              {
                          this.props.claimsdata ?
                            <View style={{flex: 8}}>
                              <ClaimsCard data={this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 3 ? this.props.claimsdata.data.slice(0, 3) : this.props.claimsdata.data} />
                            </View>
                          :
                            <View style={{flex: 2, alignItems: 'center'}}>
                              <Text> No Recent Claims found </Text>
                            </View>
                        }
            </View>
            {
                    this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.count > 0
                    ?
                      <View style={{flex: 1.5}} >
                        <View style={{flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                          <Text style={styles.totalClaimsText}>You have </Text>
                          <Text style={styles.totalClaimsTextCount}>{this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.count}</Text>
                          <Text style={styles.totalClaimsText}> Claims</Text>
                        </View>
                        <View style={{flex: 0.4}}>
                          <Button rounded style={{flex: 0.3, backgroundColor: Colors.flBlue.grass, alignSelf: 'center'}} onPress={this.viewCliamsList}>
                            <Text style={{color: Colors.snow, fontWeight: '500', width: Metrics.textHeight2 * Metrics.screenWidth * 0.01, textAlign: 'center'}}>View Claims List</Text>
                          </Button>
                        </View>
                        <View style={{flex: 0.1}} />

                      </View>
                    : null
                  }
          </View>
        </View> // Main View

        )
    }
  }
  render () {
    console.tron.log('im claims summary page', this.props.claimsSummaryData)
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

ClaimsSummary.propTypes = {
  data: PropTypes.object,
  attemptClaimsSummary: PropTypes.func,
  attemptClaimsList: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claims.fetching,
    claimsSummaryData: state.claims.data,
    claimsdata: state.claimslist.data,
    error: state.claims.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsSummary: () => dispatch(ClaimsSummaryActions.claimsSummaryRequest()),
    attemptClaimsList: () => dispatch(ClaimsListActions.claimsListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsSummary)
