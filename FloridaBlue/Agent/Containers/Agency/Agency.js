// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, ScrollView } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './AgencyStyle'
import SettingActions from '../../Redux/SettingRedux'
import {Metrics, Images} from '../../Themes/'
import AgencyCard from './Components/AgencyCard'

var agencies = ['Agency 1', 'Agency 2', 'Agency 3']

class Agency extends Component {
  constructor () {
    super()
  }

  componentDidMount () {

  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>Your Agencies</Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>

    </Image>)
  }

  _renderAgencyCard(agency) {
    return (
      <View style={styles.agencyCardContainer}>
        <AgencyCard />
      </View>
    )
  }

  render () {
    return (
      <View>
        {this._renderHeader()}
        <ScrollView style={{marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0085}}>
          {agencies.map((agency) => this._renderAgencyCard(agency))}
        </ScrollView>
      </View>
    )
  }
}

Agency.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Agency)
