import React, { Component } from 'react'
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
  Platform
} from 'react-native'
const window = Dimensions.get('window')

import {Colors, Metrics, Fonts, Images} from '../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import Card from './Components/Card'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import SupportActions from '../../Redux/SupportRedux'

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')
import SettingActions from '../../Redux/SettingRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

type PaymentsDashboardProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string,
  visibilityRules : object,
  attemptMember: () => void
}

class PaymentsDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      floatClicked: false
    }
    this._toggleFloat = this._toggleFloat.bind(this)
//  this.handleNeedHelp = this.handleNeedHelp.bind(this)
    // this.dismissNeedHelp = this.dismissNeedHelp.bind(this)
  }

  componentDidMount () {
    gaTracker.trackScreenView('Resources')
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={Images.newHeaderImage}>
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
    } else if (this.props.visibilityRules != undefined) {
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
            //  marginLeft: window.width * 0.04,
             // marginRight: window.width * 0.03,
             // marginTop: window.width * 0.03

            }}>
              { this.props.visibilityRules != undefined && this.props.visibilityRules.additionalTiles != undefined && this.props.visibilityRules.additionalTiles.length > 0
              ? this.props.visibilityRules.additionalTiles.map((tile, i) => {
                const index = i + 1
                const TileCount = this.props.visibilityRules.additionalTiles.length

                console.tron.log(tile)
                return (
                  <Card
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
          <View style={{flex: 1}}>
            {this.state.floatClicked ? <View style={styles.urgentCareCircle}>
              <TouchableOpacity onPress={this._toggleFloat}>
                <Flb name='rd-brand-phone'
                  style={{backgroundColor: Colors.transparent}}
                  color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth * 0.0035} />
              </TouchableOpacity>
            </View> : null}

            {!this.state.floatClicked ? <View style={styles.payByPhoneContainer}>

              <Flb name='close-delete' style={styles.dismissPayByPhone}
                color={Colors.flBlue.grey4} size={Metrics.icons.small * Metrics.screenWidth * 0.0035}
                onPress={this._toggleFloat} />

              <TouchableOpacity><Text allowFontScaling={false} style={styles.payByPhoneText}>Pay by Phone</Text></TouchableOpacity>
              <Text allowFontScaling={false} style={styles.payByPhoneMessage}>Have your member ID ready</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: (Platform.OS === 'ios') ? Metrics.section * Metrics.screenHeight * 0.0014 : Metrics.section * Metrics.screenHeight * 0.0016,
                  marginLeft: (Platform.OS === 'ios') ? Metrics.smallMargin * Metrics.screenWidth * 0.0035 : Metrics.smallMargin * Metrics.screenWidth * 0.0038}}>
                  <TouchableOpacity style={{left: 206, top: 15.5}}><Flb name='rd-brand-phone' onPress={this._toggleFloat}
                    color={Colors.flBlue.ocean} size={Metrics.icons.large * Metrics.screenWidth * 0.0035} style={{right: 10}} /></TouchableOpacity>
                </View>
              </View>
            </View> : null}

          </View>
        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Resources',

                   'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK'}

        ]
                )
    }
  }

  render () {
    console.tron.log('root testing')

    var i = 0
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        {this._displayCondition()}

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    visibilityRules: state.member.visibilityRules,
    data: state.support.data,

    error: state.member.error,
    fetching: state.member.fetching,
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest()),

    attemptMember: () => dispatch(MemberActions.memberRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsDashboard)
