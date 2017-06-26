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
  BackAndroid
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Card } from 'native-base'

const card = {
  card: {
    alignItems: 'flex-start',
    margin: 15,
    flex: 1,
    backgroundColor: 'purple',
    borderRadius: 10
  }
}
const cardTitle = { cardTitle: { fontSize: 40 } }

import DoctorCard from './Components/DoctorCard'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorListStyle'
import NavItems from '../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab } from 'native-base'
import SaveProviderActions from '../../../Redux/SaveProviderRedux'
import ProviderActions from '../../../Redux/ProviderRedux'
import _ from 'lodash'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()
const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listLimit: 10,
      totalNumberOfCardPerScreen: 30,
      isFetchingMore: false,
      loadingMore: true,
      initialCount: 0,
      finalCount: 0,
      asynCall: true,
      displayBannerInfo: false

    }
    this.loadMore = this.loadMore.bind(this)
  }

  _advancedSearch () {
    NavigationActions.AdvancedSearch({navigatingFrom: 'doctorsListPage'})
  }

  _mapView () {
    if (this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0) {
      NavigationActions.ProviderMap()
    }
  }

  async providerSearchList (newProps) {
    if (newProps.networkCodeList && newProps.networkCodeList.length > 0) {
      if (newProps.error == undefined || newProps.error == null) {
        if (newProps.showUrgentCareBanner) {
          newProps.attemptAsyncUrgentSearch(newProps)
        } else {
          if (newProps.categoryCode == '07' && newProps.subCategoryCode == '700') {
            newProps.attemptAsyncPharmacySearch(newProps)
          } else {
            newProps.attemptAsyncProviderSearch(newProps)
          }
        }
      }
    }
  }

  componentDidMount () {
      // Call asynchronously to get more data
    // this.props.changeEnd(300)
    // this.setState({isFetchingMore : true});
  }

  componentWillReceiveProps (newProps) {
    if (this.state.isFetchingMore) {
        // this.props.attemptProviderSearch(newProps)
      this.providerSearchList(newProps)
      this.setState({
        isFetchingMore: false
      })
    }
    if (this.props.networkCodeList && this.props.networkCodeList.length > 0) {
      if (newProps.provider && newProps.provider.data && newProps.provider.data.originLatitude != '' && newProps.provider.data.originLongitude != '') {
        this.props.changeLatitude(newProps.provider.data.originLatitude)
        this.props.changeLongitude(newProps.provider.data.originLongitude)
      }
    }
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        Find Care
      </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  loadMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    var numberOfCardsPerscreen = this.state.totalNumberOfCardPerScreen
    this.setState({
      listLimit: newLimit + 10
    })
    this.props.changeListLimit(newLimit + 10)
    if (this.state.totalNumberOfCardPerScreen == newLimit) {
      this.props.changeEnd(this.state.totalNumberOfCardPerScreen + 30)
      this.state.isFetchingMore = true
      this.setState({isFetchingMore: true})
      this.setState({totalNumberOfCardPerScreen: this.state.totalNumberOfCardPerScreen + 30})
    }
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait</Text>
      </View>)
    } else if (this.props.provider && this.props.provider.data) {
      return (
        <View style={styles.container}>
          {this.props.provider && this.props.provider.data
            ? <View style={{flex: 9}}>
              <ScrollView >
                {this.props.showUrgentCareBanner
                  ? <View style={{flex: 1, margin: 15, marginTop: -5 }}>
                    <Card style={{flex: 1, borderRadius: 15, backgroundColor: Colors.flBlue.red, paddingLeft: 10}} >
                      <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flex: 0.15, marginRight: 10 }}>
                          <Flb name='accident' size={Metrics.icons.large} color={Colors.snow} />
                        </View>
                        <View style={{ flex: 0.85 }}>
                          <Text allowFontScaling={false} style={{
                            fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
                            color: Colors.snow
                          }}>If this is an emergency, please call 911.</Text>
                        </View>
                      </View>
                    </Card>
                  </View>
              : null}
                {
                  this.props.provider && this.props.provider.data && this.props.provider.data && this.props.provider.data.totalCount >= 300
                    ? <View style={{flex: 1, margin: 15, marginTop: -5 }}>
                      <Card style={{flex: 1, borderRadius: 15, backgroundColor: Colors.flBlue.deepBlue, paddingLeft: 10}} >
                        <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                          <View style={{ flex: 0.15 }}>
                            <Flb name='flag' size={Metrics.icons.medium} color={Colors.snow} />
                          </View>
                          <View style={{ flex: 0.85 }}>
                            <Text allowFontScaling={false} style={{
                              fontSize: Fonts.size.input * Metrics.screenWidth * 0.0015,
                              color: Colors.snow
                            }}>
                              <Text allowFontScaling={false} style={{
                                fontSize: Fonts.size.input * Metrics.screenWidth * 0.0015,
                                color: Colors.snow,
                                fontWeight: '700'
                              }}>Please Note: </Text>Your inquiry resulted in a very large list of providers. For now, we have limited your display to only the first 300 providers.</Text>
                          </View>
                        </View>
                      </Card>
                    </View>
                  : null
                }

                <View style={{flex: 1, marginTop: -20}}>
                  {
                     this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0
                       ? <DoctorCard
                         cardLimit={this.state.listLimit}
                         data={this.props.provider.data.providerList}
                      />
                  : <View style={{flex: 1, margin: 15}}>
                    <Card style={{flex: 1, borderRadius: 20, justifyContent: 'center'}}>
                      <View style={{flex: 1, margin: 15}}>
                        <Text allowFontScaling={false} style={{fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                          color: Colors.flBlue.anvil
                        }}>Oops! We did not find an exact match for your search. Try a new Search.</Text>
                      </View>
                    </Card>
                  </View>

                    }

                </View>
                {
                          this.props.asyncfetching
                            ? <View style={{flex: 1, alignSelf: 'center' }}>
                              <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                            </View> : null
                }

                {this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length >= 10 &&
                  !(this.state.listLimit > this.props.provider.data.providerList.length) &&
                  !(this.props.provider.data.providerList.length == 300 && this.props.provider.data.providerList.length == this.state.listLimit)
                  ? <View style={{flex: 1, marginBottom: 10}}>
                    <TouchableOpacity
                      onPress={this.loadMore}
                      style={{
                        backgroundColor: Colors.flBlue.ocean,
                        paddingLeft: 14,
                        paddingRight: 14,
                        paddingTop: 10,
                        paddingBottom: 10,
                        width: window.width * 0.4,
                        alignSelf: 'center',
                        margin: window.height * 0.02,
                        alignItems: 'center',
                        borderRadius: 5
                      }}>
                      <Text allowFontScaling={false} style={{
                        color: 'white'
                      }}>Show More</Text>
                    </TouchableOpacity>
                  </View> : null
                }

              </ScrollView>
            </View>
          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
          }
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => this._advancedSearch()}>
                  <View style={styles.refinesearch}>
                    <View style={{flex: 0.25, alignItems: 'flex-end', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                      <Flb
                        name='search-find'
                        size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                        color={Colors.snow} />
                    </View>
                    <View style={{flex: 0.75, alignItems: 'flex-start'}}>
                      <Text allowFontScaling={false} style={styles.footerText}>Refine Search</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={
                  this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0
                  ? {flex: 1, backgroundColor: Colors.flBlue.grass} : {flex: 1, backgroundColor: Colors.flBlue.grey3}
                }
                  onPress={() => this._mapView()}>
                  <View style={styles.footerView}>

                    <View style={{flex: 0.35, alignItems: 'flex-end', marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                      <Flb
                        name='map'
                        size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                        color={Colors.snow} />
                    </View>

                    <View style={{flex: 0.65,
                      alignItems: 'flex-start'}}>

                      <Text allowFontScaling={false} style={styles.footerText}>Map View</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>

        </View>
      )
    } else if ((this.props.error != null) ||
     (this.props.provider == null ||
     (this.props.provider != null &&
     (this.props.provider.data == null || this.props.provider.data.length == 0)
      ))) {
      Alert.alert(
        'Find care',
       'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }
        ])
    }
  }

  render () {
    // alert(this.props.data)
    return (
      <View style={styles.container}>
        <View >
          {this._renderHeader()}
        </View>

        <View style={{flex: 7, marginTop: 10}}>
          {
         this._displayCondition()
       }
        </View>
      </View>

    )
  }
}

DoctorList.propTypes = {
  data: PropTypes.string,
  provider: PropTypes.object,
  attemptAsyncProviderSearch: PropTypes.func,
  attemptAsyncPharmacySearch: PropTypes.func,
  attemptAsyncUrgentSearch: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func

}

const mapStateToProps = (state) => {
  return {
    fetching: state.provider.fetching,
    asyncfetching: state.provider.asyncfetching,
    error: state.provider.error,
    provider: state.provider.data,
    latitude: state.provider.latitude,
    longitude: state.provider.longitude,
    searchRange: state.provider.searchRange,
    start: state.provider.start,
    end: state.provider.end,
    networkCodeList: state.provider.networkCodeList,
    showUrgentCareBanner: state.provider.showUrgentCareBanner,
    planCategoryList: state.provider.planCategoryList,
    planSubCategoryList: state.provider.planSubCategoryList,
    categoryCode: state.provider.categoryCode,
    subCategoryCode: state.provider.subCategoryCode,
    providerName: state.provider.providerName,
    careType: state.provider.careType,
    specialityType: state.provider.specialityType,
    knownCareState: state.provider.knownCareState,
    unknownCareState: state.provider.unknownCareState,
    specialityState: state.provider.specialityState,
    changeLocaleState: state.provider.changeLocaleState,
    customLocationState: state.provider.customLocationState,
    currentLocation: state.provider.currentLocation,
    address: state.provider.address,
    homeAddress: state.provider.homeAddress,
    member: state.member,
    urgentCareState: state.urgentCareState,
    locationStatus: state.provider.locationStatus,
    acceptingPatientsIndicator: state.provider.acceptingPatientsIndicator,
    providerLanguage: state.provider.providerLanguage,
    providerLanguages: state.provider.providerLanguages,
    staffLanguage: state.provider.staffLanguage,
    staffLanguages: state.provider.staffLanguages,
    configData: state.provider.configData,
    newLocationState: state.provider.newLocationState,
    gender: state.provider.gender,
    programsList: state.provider.programsList,
    officeHours: state.provider.officeHours
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptAsyncProviderSearch: (data) => dispatch(ProviderActions.sendAsyncProviderSearchRequest(data)),
    attemptAsyncPharmacySearch: (data) => dispatch(ProviderActions.sendAsyncPharmacySearchRequest(data)),
    attemptAsyncUrgentSearch: (data) => dispatch(ProviderActions.sendAsyncUrgentSearchRequest(data)),
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeEnd: (end) => dispatch(ProviderActions.changeEnd(end)),
    changeListLimit: (listLimit) => dispatch(ProviderActions.changeListLimit(listLimit)),
    attemptNetworkList: () => dispatch(ProviderActions.sendNetworkListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
