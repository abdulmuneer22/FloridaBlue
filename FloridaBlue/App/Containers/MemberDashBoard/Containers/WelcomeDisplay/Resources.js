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
  ScrollView
} from 'react-native'
const window = Dimensions.get('window')

import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Flb from '../../../../Themes/FlbIcon'
import Card from './Components/Card'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string,
  visibilityRules : object,
  attemptMember: () => void
}

class Resources extends Component {
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginLeft: Metrics.screenWidth * 0.025}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
        Resources</Text>
      <View style={{marginRight: Metrics.screenWidth * 0.035}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  render () {
    console.log('root testing')

    var i = 0
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>

          <View style={{
            flexDirection: 'row',
                  // backgroundColor : 'red',
            flexWrap: 'wrap',
            flex: 1,
            marginLeft: window.width * 0.04,
            marginRight: window.width * 0.03,
            marginTop: window.width * 0.03

          }}>
            {
              this.props.visibilityRules.additionalTiles.map((tile, i) => {
                const index = i + 1
                const TileCount = this.props.visibilityRules.additionalTiles.length

                console.log(tile)
                return (
                  <Card
                    i={i}
                    key={index}
                    title={tile.tileName['en']}
                    tileType={tile.tileType}
                    icon={tile.tileIcon}
                    CardCount={TileCount}
                    webURL={tile.tileType !== 'native' ? tile.tileUrl : null}
                    routerName={tile.tileType === 'native' ? tile.routerName : null}

                      />
                )
              }
          )
        }
          </View>
          <Image source={Images.tagLine} style={{width: window.screenWidth}} />
        </ScrollView>

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    visibilityRules: state.member.visibilityRules
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember: () => dispatch(MemberActions.memberRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
