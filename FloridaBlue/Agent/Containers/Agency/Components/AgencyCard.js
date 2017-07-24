// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './AgencyCardStyle'
import SettingActions from '../../../Redux/SettingRedux'
import {Metrics, Images} from '../../../Themes/'

class AgencyCard extends Component {
  constructor () {
    super()
  }

  componentDidMount () {

  }

  render () {
    return (
      <View>
        <View style={styles.agencyDetailContainer}>
          <Text allowFontScaling={false} style={styles.agencyTitle}>ACME Agency</Text>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.agencyAddress}>1234 Anywhere St.{"\n"}Jacksonville, FL 32246</Text>
            <Text allowFontScaling={false} style={styles.agencyType}>Type: Wholeseller</Text>
          </View>
        </View>

        <View style={styles.agencyStatusContainer}>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={[styles.statusType, {paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.006}]}>Sold</Text>
            <Text allowFontScaling={false} style={styles.statusType}>Quoted</Text>
            <Text allowFontScaling={false} style={styles.statusType}>New</Text>
            <Text allowFontScaling={false} style={[styles.statusType, {paddingRight: Metrics.baseMargin * Metrics.screenWidth * 0.006}]}>Renew</Text>
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={[styles.statusNumber, {paddingLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0085}]}>6</Text>
            <Text allowFontScaling={false} style={styles.statusNumber}>21</Text>
            <Text allowFontScaling={false} style={styles.statusNumber}>3</Text>
            <Text allowFontScaling={false} style={[styles.statusNumber, {paddingRight: Metrics.baseMargin * Metrics.screenWidth * 0.0085}]}>38</Text>
          </View>
        </View>
      </View>
    )
  }
}

AgencyCard.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isPortrait: state.setting.isPortrait
  }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AgencyCard)
