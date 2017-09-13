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
import SettingActions from '../../Redux/SettingRedux'
import _ from 'lodash'
import DeviceInfo from 'react-native-device-info'
import MemberActions from '../../Redux/MemberRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import Orientation from 'react-native-orientation'

const window = Dimensions.get('window')
let urlConfig = require('../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class MyPlanScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPortrait: true
    }
    this._orientationDidChange = this._orientationDidChange.bind(this)
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : [styles.headerContainerLandscape, {width: DeviceInfo.isTablet() ? (this.props.isPortrait ? Metrics.screenWidth : Metrics.screenWidth * 1.335) : (this.props.isPortrait ? Metrics.screenHeight : Metrics.screenWidth * 1.78)}]} source={this.props.isPortrait ? DeviceInfo.isTablet() ? Images.landscapeHeaderImage : Images.newHeaderImage : Images.landscapeHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.backButton()}
      </View>

      <Text allowFontScaling={false} style={styles.headerTextStyle}>My Plan Overview</Text>

      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

componentWillMount () {
    if (DeviceInfo.getManufacturer() === 'samsung') {
      console.log('hey samsung!')
      console.log(DeviceInfo.isTablet())
    } else if (DeviceInfo.getManufacturer() === 'ios') {
      console.log('yo apple!')
    }

    console.log('is it a tablet bro?', DeviceInfo.isTablet())
    const initial = Orientation.getInitialOrientation()

    if (initial === 'PORTRAIT') {
      console.log('Hey, Im going to mount in P mode on myplan')
    } else {
      console.log('Hey, Im going to mount in L mode on myplan')
    }
  }

  componentDidMount () {
    gaTracker.trackScreenView('My Plan')
    Orientation.addOrientationListener(this._orientationDidChange)
    /*
    BackHandler.addEventListener('hardwareBackPress', function () {
         console.log('inside back handler',component.props.currentSceneValue)

          if(  component.props.currentSceneValue && component.props.currentSceneValue ==='login'){
                         if(component.props.currentSceneValue =='drawer' || component.props.currentSceneValue =='WelcomeDashBoard'){
            console.log('currentscence',component.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
              ]
            );
          }else {

            console.log('currentscence',component.props.currentSceneValue)
                Alert.alert(
              'Exit',
              'Are you sure you want to exit this app',
              [
                { text: 'Cancel', onPress: () => {} },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
              ]
            );
          }
          }

      return true
     })
  */
  }

   _orientationDidChange (orientation) {
    if (orientation === 'LANDSCAPE') {
      this.setState({isPortrait: false})
      console.log('Hey, Im in landscape mode on login')
    } else {
      this.setState({isPortrait: true})
      console.log('Hey, Im in portrait mode on login')
    }
  }

  componentWillUnmount () {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`)
    })

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange)
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
          {this.props.isPortrait ? <View style={styles.container}>
            <Card style={{flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -0,
    marginRight : -0,
    marginTop: -0,
     
    }}>

            { this.props.data.annualDeductible || this.props.data.oop
              ? <Text allowFontScaling={false} style={styles.planNameText}>
                {this.props.planName}
              </Text>

             : <Text />
           }
          </Card>

          <View style={styles.chartWrapper}>
            {this.props.data.annualDeductible || this.props.data.oop ? <MyPlanSwiper data={this.props.data} isPortrait={this.state.isPortrait}/>

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
        
        : 
        
        <ScrollView>
            <Card style={{flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -0,
    marginRight : -0,
    marginTop: -0,
     
    }}>

            { this.props.data.annualDeductible || this.props.data.oop
              ? <Text allowFontScaling={false} style={styles.planNameText}>
                {this.props.planName}
              </Text>

             : <Text />
           }
          </Card>

          <View style={styles.chartWrapperLandscape}>
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
        </ScrollView>}
          
          

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
    return (

      <View style={styles.container}>

        <View>
          {this._renderHeader()}
        </View>
        {this._displayCondition()}

      </View>

    )
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
