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
  Alert
} from 'react-native'
const window = Dimensions.get('window')

import {Colors, Metrics, Fonts, Images} from '../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import Card from './Components/Card'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge';

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')
import SettingActions from '../../Redux/SettingRedux'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string,
  visibilityRules : object,
  attemptMember: () => void
}

class Resources extends Component {

  componentDidMount() {
    gaTracker.trackScreenView('Resources')
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>
        Resources</Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
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
    } else if (this.props.visibilityRules != undefined) {
      return (
        <View style={{flex: 1}}>
          <ScrollView>

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
    error: state.member.error,
    fetching: state.member.fetching,
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember: () => dispatch(MemberActions.memberRequest()),
    changeOrientation: (isPortrait) => dispatch(SettingActions.changeOrientation(isPortrait))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
