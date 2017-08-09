// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './AgencyStyle'
import SettingActions from '../../Redux/SettingRedux'
import {Metrics, Images, Colors} from '../../Themes/'
import Flb from '../../Themes/FlbIcon'
import ModalDropdown from 'react-native-modal-dropdown'
import AgencyItem from './Components/AgencyItem'
import { MKProgress } from 'react-native-material-kit'

const Divider = () => { return <View style={styles.divider} /> }
let agencies = require('./agencies.json')

class Agency extends Component {
  constructor () {
    super()
    this._filterByType = this._filterByType.bind(this)
    this._openGroup = this._openGroup.bind(this)
  }

  componentDidMount () {

  }

  _openGroup (selectedAgent) {
    console.tron.log(selectedAgent)
    NavigationActions.Group()
  }

  _filterByType (index, value: string) {
    console.tron.log(value)
  }

  _renderHeader () {
    return (
      <Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={Images.newHeaderImage}>
        <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
          {NavItems.backButton()}
        </View>
        <Text allowFontScaling={false} style={styles.headerTextStyle}>Florida Blue</Text>
        <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  _renderDropdownRow(rowData, rowID, highlighted) {
   return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text style={styles.filterDropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }
  _renderAgentItem (agent, index) {
    return (
      <TouchableOpacity onPress={() => this._openGroup(agent)}>
        <AgencyItem data={agent} />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View>
        {this._renderHeader()}
        <Text style={styles.agencyTitle}>Your Agencies</Text>
        <MKProgress ref="agencyBar" style={styles.agencyBar} progress={0.45} progressColor={Colors.flBlue.ocean} bufferColor={Colors.flBlue.grey2} />

        <Divider />
        <View style={styles.filterContainer}>
          <Text style={styles.filterNameTitle}>Name</Text>
          <TouchableOpacity style={styles.filterTypeContainer}>
            <Text style={styles.filterTypeTitle}>Type</Text>
            <Flb name="caret-down-two" size={15} color={Colors.flBlue.anvil} style={{ marginTop: 5 }} />
          </TouchableOpacity>
        </View>
        <Divider />

        <ScrollView style={{marginBottom: Metrics.baseMargin * Metrics.screenHeight * 0.0085}}>
          {agencies.map((agency) => this._renderAgentItem(agency))}
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
