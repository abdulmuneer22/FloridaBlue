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
    alignItems: 'flex-start', margin: 15, flex: 1,
    backgroundColor: 'purple', borderRadius: 10
  }
}
const cardTitle = { cardTitle: { fontSize: 40 } }

import DoctorCard from './Components/DoctorCard'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorListStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab } from 'native-base'
import SaveProviderActions from '../../../../../Redux/SaveProviderRedux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorList extends Component {

  _advancedSearch () {
    NavigationActions.AdvancedSearch()
  }

  _mapView () {
    NavigationActions.ProviderMap()
  }
  componentDidMount () {

  }

  componentWillReceiveProps (newProps) {
    if (newProps.provider && newProps.provider.data && newProps.provider.data.originLatitude != '' && newProps.provider.data.originLongitude != '') {
      this.props.changeLatitude(newProps.provider.data.originLatitude)
      this.props.changeLongitude(newProps.provider.data.originLongitude)
    }

    // This math calculates the zoom level based on the user-set search range.. Fancy GIS math
    const milesOfLatAtEquator = 69
    this.props.changeLatDelta(this.props.searchRange / milesOfLatAtEquator)
    this.props.changeLongDelta(this.props.searchRange / (Math.cos(this.props.latitude) * milesOfLatAtEquator))
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
        Find Care
              </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.provider && this.props.provider.data) {
      return (
        <View style={styles.container}>
          {this.props.provider ?
            <View style={{flex: 9}}>

              <ScrollView >

              {this.props.showUrgentCareBanner ?
                <View style={{flex: 1, margin: 15 }}>
                  <Card style={{flex: 1, borderRadius: 15, backgroundColor: 'purple'}} >
                     <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                      <View style={{ flex: 0.15 }}>
                        <Flb name='accident' size={Metrics.icons.large} color={Colors.snow} />
                      </View>
                      <View style={{ flex: 0.85 }}>
                        <Text style={{
                          fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
                          color: Colors.snow
                        }}>If this is an emergency, please call 911.</Text>
                      </View>
                    </View>
                   </Card>
                </View>
              : null}

                <View style={{flex: 1}}>

                  {this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                     <DoctorCard
                      savedproviders={this.props.saveProvider}
                      saveProvider={this.saveProvider}
                      removeProvider={this.removeProvider}
                      data={this.props.provider.data.providerList}
                      leftActive={this.props.leftActive}
                      rightActive={this.props.rightActive}

                  />
                  :
                      <LinearGradient style={{flex: 1, margin: 15, borderRadius: 20}} colors={['#EECDA3', '#EF629F']}>
                        <View style={{flex: 1, margin: 15}}>

                          <Card style={{flex: 1, borderRadius: 20, justifyContent: 'center'}}>

                           <View style={{flex: 1, margin: 15}}>

                            <Text style={{fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.anvil
                          }}>Oops! We did not find an exact match for your search. Try a new Search.</Text>

                          </View>

                         </Card>

                        </View>
                      </LinearGradient>
                    }

                </View>

              </ScrollView>
            </View>

          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
          }
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1}} onPress={() => this._advancedSearch()}>
                  <View style={styles.refinesearch}>

                     <View style={{flex: 0.3, alignItems: 'center'}}>
                      <Flb
                        name='search-find'
                        size={Metrics.icons.medium}
                        color={Colors.snow} />
                    </View>

                     <View style={{flex: 0.7, alignItems: 'flex-start'}}>

                      <Text style={styles.footerText}>Refine Search</Text>
                    </View>

                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, backgroundColor:Colors.flBlue.grass}} onPress={() => this._mapView()}>
                  <View style={styles.footerView}>

                     <View style={{flex: 0.4, alignItems: 'center'}}>
                      <Flb
                        name='map'
                        size={Metrics.icons.medium}
                        color={Colors.snow} />
                    </View>

                     <View style={{flex: 0.6,
                      alignItems: 'flex-start'}}>

                      <Text style={styles.footerText}>Map View</Text>
                    </View>

                   </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>

        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
        'Find care',
       'Oops! Looks like we\'re having trouble with your request. Click Support for help.',
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

        <View style={{flex: 7}}>
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
  attemptProviderSearch: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    fetching: state.provider.fetching,
    error: state.provider.error,
    leftActive: state.provider.leftActive,
    rightActive: state.provider.rightActive,
    saveProvider: state.saveprovider.data,
    provider: state.provider.data,
    latitude: state.provider.latitude,
    longitude: state.provider.longitude,
    searchRange: state.provider.searchRange,
    latDelta: state.provider.latDelta,
    longDelta: state.provider.longDelta,
    showUrgentCareBanner: state.provider.showUrgentCareBanner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProviderSearch: () => dispatch(ProviderActions.sendProviderSearchRequest()),
    attemptHandleLeft: () => dispatch(ProviderActions.providerClickleft()),
    attemptHandleRight: () => dispatch(ProviderActions.providerClickright()),
    addProviderRequest: (data) => dispatch(SaveProviderActions.addProviderRequest(data)),
    removeProviderRequest: (savedProviderKey) => dispatch(SaveProviderActions.removeProviderRequest(savedProviderKey)),
    changeLatitude: (latitude) => dispatch(ProviderActions.changeLatitude(latitude)),
    changeLongitude: (longitude) => dispatch(ProviderActions.changeLongitude(longitude)),
    changeLatDelta: (latDelta) => dispatch(ProviderActions.changeLatDelta(latDelta)),
    changeLongDelta: (longDelta) => dispatch(ProviderActions.changeLongDelta(longDelta))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
