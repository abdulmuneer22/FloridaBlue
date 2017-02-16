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
      {NavItems.backButton()}
      <Text style={styles.headerTextStyle}>
        Resources</Text>
      {NavItems.settingsButton()}

    </Image>)
  }

  render () {
    console.log('root testing')
    var color = new Array('#005b80', '#00aec7', '#0091cc', '#005b80', '#005b80', '#00aec7')
    var i = 0
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>

          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row'

          }}>
            {this.props.visibilityRules.additionalTiles.map(function (tile, i) {
              onItemPress = function () {
                var action
                if (tile.tileType == 'webview') {
                  action = NavigationActions.MyView({responseURL: tile.tileUrl})
                } else if (tile.tileType == 'native') {
                  action = NavigationActions.Resources()
                }
              }

              return (

                <TouchableOpacity style={{
                  width: window.width * 0.5,
                  backgroundColor: color[i],
                  height: Metrics.screenHeight-(Metrics.screenHeight*0.80),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: Colors.flBlue.lightBlue,
                  borderWidth: 1
                }} onPress={onItemPress.bind(this)} key={i}>
                  <View style={{alignItems: 'center'}}>

                    <Flb name='cc-card' size={Metrics.icons.regular} color='white' />
                    <Text style={{
                      marginTop: Metrics.doubleBaseMargin,
                      fontSize: Fonts.size.regular,
                      fontWeight: '600',
                      color: 'white'
                    }}>
                      {tile.tileName['en']}
                    </Text>

                  </View>
                </TouchableOpacity>

              )
              i += 1
            })}
          </View>
          <View />

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
