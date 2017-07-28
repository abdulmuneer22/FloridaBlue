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

let agencies = require('./agencies.json')
const Divider = () => { return <View style={styles.divider} /> }

class Agency extends Component {
  constructor () {
    super()
    this.filterByType = this.filterByType.bind(this)
  }

  componentDidMount () {

  }

  filterByType(index, value: string) {
    console.tron.log(value)
  }

  _renderHeader () {
    return (<Image style={this.props.isPortrait ? styles.headerContainer : styles.headerContainerLandscape} source={Images.newHeaderImage}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.backButton()}
      </View>
      <Text allowFontScaling={false} style={styles.headerTextStyle}>Florida Blue</Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>

    </Image>)
  }

  _renderDropdownRow(rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text style={styles.filterDropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  _renderAgentItem(agent, index) {
    return(
      <TouchableOpacity>
        <AgencyItem data={agent} />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={{flex:1}}>

        {this._renderHeader()}

        <Text style={styles.agencyTitle}>Your Agencies</Text>
        <MKProgress ref="agencyBar" style={styles.agencyBar} progress={0.45} progressColor={Colors.flBlue.ocean} bufferColor={Colors.flBlue.grey2} />

        <Divider />
        <View style={styles.filterContainer}>
          <Text style={styles.filterNameTitle}>Name</Text>
          <ModalDropdown options={_.map(agencies, 'type')} onSelect={this.filterByType} dropdownStyle={styles.filterDropdown} renderRow={this._renderDropdownRow.bind(this)}>
            <View style={styles.filterTypeContainer}>
              <Text style={styles.filterTypeTitle}>Type</Text>
              <Flb name="caret-down-two" size={15} color={Colors.flBlue.anvil} style={{ marginTop: 5 }} />
            </View>
          </ModalDropdown>
        </View>
        <Divider />

        <ScrollView>
          {agencies.map((agent, index) => this._renderAgentItem(agent, index))}
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
