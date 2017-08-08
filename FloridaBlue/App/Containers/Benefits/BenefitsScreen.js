import React, { Component, PropTypes } from 'react'
import {
View,
Text,
StyleSheet,
Dimensions,
ScrollView,
TouchableOpacity,
Image,
Alert
} from 'react-native'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavItems from '../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts, Images} from '../../Themes'
import Flb from '../../Themes/FlbIcon'
import styles from './BenefitsStyle'
import MyPlanActions from '../../Redux/MyPlanRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Card from './Components/BenefitCard'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import DeviceInfo from 'react-native-device-info'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)
import SettingActions from '../../Redux/SettingRedux'
import Orientation from 'react-native-orientation'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class PlanBenefits extends Component {
  constructor (props) {
    super(props)
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }
  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? (DeviceInfo.isTablet() ? Images.landscapeHeaderImage: Images.newHeaderImage) : Images.landscapeHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={[styles.headerTextStyle]}>Plan Benefits</Text>
      <View style={{marginRight: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.baseMargin * Metrics.screenWidth * 0.002 : Metrics.baseMargin * Metrics.screenWidth * 0.002) : null}}>
        {NavItems.settingsButton()}
      </View>

    </Image>)
  }

  _orientationDidChange (orientation) {
    if (orientation === 'LANDSCAPE') {
      this.props.changeOrientation(false)
      console.log('Hey, Im in landscape mode')
    } else {
      this.props.changeOrientation(true)
      console.log('Hey, Im in portrait mode')
    }
  }

  componentDidMount () {
    gaTracker.trackScreenView('Benefits')
// this.props.attemptMyPlan()
    Orientation.addOrientationListener(this._orientationDidChange)
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.data && this.props.data.tiles != null && this.props.data.tiles.length > 0) {
      return (
        <ScrollView>

          <View style={{
           // flexDirection: 'row',
            backgroundColor: Colors.bg2,
            flexWrap: 'wrap',
            flex: 1
          //  marginLeft: window.width * 0.04,
          //  marginRight: window.width * 0.03,
          //  marginTop: window.width * 0.03

          }}>

            {this.props.data && this.props.data.tiles ? this.props.data.tiles.map((tile, i) => {
              const index = i + 1
              const TileCount = this.props.data.tiles.length

              return (
                <Card
                  i={i}
                  key={index}
                  title={tile.tileName['en']}
                  tileType={tile.tileType}
                  icon={tile.tileIcon}
                  image={tile.backgroundImage}
                  CardCount={TileCount}
                  webURL={tile.tileType !== 'native' ? tile.tileUrl : null}
                  routerName={tile.tileType === 'native' ? tile.routerName : null}
                  objectName={tile.tileId}
                      />
              )
            }
          ) : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
          </View> }

          </View>
        </ScrollView>)
    } else if (this.props.data && this.props.data.tiles != null && this.props.data.tiles.length == 0) {
      Alert.alert(
                  'Plan Benefits',
                   'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK' }

        ]
                )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Plan Benefits',
                   'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
                    { text: 'OK' }

        ]
                )
    }
  }

  render () {
    var objectName = this.props.objectName
    console.tron.log('root testing')
    var i = 0
    var tileCard = []
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._displayCondition()}

      </View>
    )
  }
}

PlanBenefits.propTypes = {

  data: PropTypes.object,
  attemptMyPlan: PropTypes.func,
  error: PropTypes.string,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func,
  attemptHandlePreferred: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    data: state.myplan.data,
    fetching: state.myplan.fetching,
    error: state.myplan.error,
    leftActive: state.myplan.leftActive,
    rightActive: state.myplan.rightActive,
    preferredActive: state.myplan.preferredActive,
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptHandleLeft: () => dispatch(MyPlanActions.myplanClickleft()),
    attemptHandleRight: () => dispatch(MyPlanActions.myplanClickright()),
    attemptHandlePreferred: () => dispatch(MyPlanActions.myplanClickpreferred()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanBenefits)
