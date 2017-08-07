import React, { Component, PropTypes} from 'react'
import {
StyleSheet,
Text,
View,
Navigator,
ScrollView,
TouchableOpacity,
Dimensions,
Image,
Alert
} from 'react-native'

import { Card } from 'native-base'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors, Metrics, Fonts, Images} from '../../Themes'
import ToolBar from './Components/toolBar'
import axios from 'axios'
import SelectBox from './Components/SelectBox'
import CCard from './Components/Card'
import NavItems from '../../../Navigation/NavItems.js'
import styles from './MyPlanScreenStyle'
import MyPlanSwiper from './Components/MyPlanSwiper'
import { connect } from 'react-redux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import _ from 'lodash'
import MemberActions from '../../Redux/MemberRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import DeviceInfo from 'react-native-device-info'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

import SettingActions from '../../Redux/SettingRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class MyPlanScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={this.props.isPortrait ? DeviceInfo.isTablet() ? Images.landscapeHeaderImage :Images.newHeaderImage : Images.landscapeHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.backButton()}
      </View>

      <Text allowFontScaling={false} style={styles.headerTextStyle}>My Plan Overview</Text>

      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  componentDidMount () {
    gaTracker.trackScreenView('My Plan')
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.data && this.props.visibilityRules.planOverViewTiles != null && this.props.visibilityRules.planOverViewTiles.length > 0) {
      console.tron.log('message', this.props.data.errorMessage)
      var message = this.props.data.errorMessage
      return (
        <View style={styles.container}>
 
          <Card style={styles.planNameView}>

            { this.props.data.annualDeductible || this.props.data.oop
              ? <Text allowFontScaling={false} style={styles.planNameText}>
                {this.props.planName}
              </Text>

             : <Text />
           }
          </Card> 

          <View style={this.props.isPortrait ? styles.chartWrapper : styles.chartWrapperLandscape}>
            {this.props.data.annualDeductible || this.props.data.oop ? <MyPlanSwiper data={this.props.data} isPortrait={this.props.isPortrait}/>

              : Alert.alert(
        'My Plan Overview',
       'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
                [
          { text: 'OK' }

                ])
              }
          </View>

          <View style={styles.myplanTilesStyle}>
            {this.props.visibilityRules != undefined && this.props.visibilityRules.planOverViewTiles != undefined
              ? this.props.visibilityRules.planOverViewTiles.map((tile, i) => {
                const index = i + 1
                const TileCount = this.props.visibilityRules.planOverViewTiles.length

                console.tron.log(tile)
                return (
                  <CCard
                    i={i}
                    key={index}
                    title={tile.tileName['en']}
                    tileType={tile.tileType}
                    icon={tile.tileIcon}
                    gradientImage={tile.gradientImage}
                    gradientColor={tile.gradientColor}
                    CardCount={TileCount}
                    image={tile.backgroundImage}
                    webURL={tile.tileType !== 'native' ? tile.tileUrl : null}
                    routerName={tile.tileType === 'native' ? tile.routerName : null}

                  />
                )
              }
              )
              : <Text />
            }
          </View>

        </View>

      )
    } else if (this.props.error != null) {
      console.tron.log('message', this.props.data.errorMessage)
      var message = this.props.data.errorMessage
      Alert.alert(
        'My Plan Overview',
       'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }

        ])
    }else{
        Alert.alert(
        'My Plan Overview',
       'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }
        ])
    }
  }

  render () {
    console.tron.log(this.props.data)
    if (this.props.isPortrait) {
      return (

        <View style={styles.container}>

          <View>
            {this._renderHeader()}
          </View>
          {this._displayCondition()}

        </View>

      )
    } else {
      return (

        <ScrollView style={styles.container}>

          <View>
            {this._renderHeader()}
          </View>

          {this._displayCondition()}

        </ScrollView>

      )
    }
  }
}

MyPlanScreen.propTypes = {
  data: PropTypes.object,
  attemptMyPlan: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  console.tron.log('state is', state)
  return {
    fetching: state.myplan.fetching,
    data: state.myplan.data,
    visibilityRules: state.member.visibilityRules,
    error: state.myplan.error,
    planName: _.get(state, 'member.defaultContract.planName', ''),
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlanScreen)
