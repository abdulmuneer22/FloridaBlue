// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, TextInput, TouchableHighlight, ScrollView, TouchableOpacity } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import SettingActions from '../../Redux/SettingRedux'
import { connect } from 'react-redux'
import {Metrics, Images, Colors} from '../../Themes/'
import styles from './GroupStyle'
import Flb from '../../Themes/FlbIcon'
import GroupItem from './Components/GroupItem'
import { MKProgress } from 'react-native-material-kit'
import ModalDropdown from 'react-native-modal-dropdown'

const Divider = () => { return <View style={styles.divider} /> }
let groups = require('./groups.json')

class Group extends Component {
  constructor () {
    super()
    this.state = {
      groupFilters: ['owner'],
      showFilterOptions: false
    }
  }

  componentDidMount () {

  }

  _addFilter (filterType) {
    console.tron.log(filterType)
    var newGroupFilters = this.state.groupFilters
    newGroupFilters.push(filterType)
    this.setState({groupFilters: newGroupFilters})
    this.setState({showFilterOptions: false})
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

  _renderDropdownRow (rowData, rowID, highlighted) {
    return (
      <TouchableHighlight underlayColor={Colors.snow}>
        <Text style={styles.groupDateDropdownItem}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  _renderFilterDropdown (filterType) {
    return (
      <View style={styles.filterDropdownContainer}>
        <ModalDropdown options={_.map(groups, filterType)} onSelect={this.filterByEffectiveDate} dropdownStyle={styles.groupDateDropdown} renderRow={this._renderDropdownRow.bind(this)}>
          <View style={styles.groupTypeContainer}>
            <Text style={styles.groupTypeTitle}>{filterType}</Text>
            <Flb name='caret-down-two' size={15} color={Colors.flBlue.anvil} style={{ marginTop: 5 }} />
          </View>
        </ModalDropdown>
      </View>
    )
  }

  _renderGroupItem (group, index) {
    return (
      <TouchableOpacity>
        <GroupItem data={group} />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View>
        {this._renderHeader()}

        <View style={styles.groupHeaderContainer}>
          <Text allowFontScaling={false} style={styles.groupTitle}>Groups</Text>
          <Text allowFontScaling={false} style={styles.groupName}>@ TDG of Jacksonville</Text>
        </View>
        <MKProgress ref='groupBar' style={styles.groupBar} progress={0.18} progressColor={Colors.flBlue.ocean} bufferColor={Colors.flBlue.grey2} />

        <TextInput style={styles.searchInput}>
          <Flb name='search-find' size={20} color={Colors.flBlue.anvil} style={styles.searchIcon} />
        </TextInput>

        <Divider />

        <ScrollView horizontal style={styles.filterContainer}>
          {this.state.groupFilters.map((filterType, index) => this._renderFilterDropdown(filterType, index))}
          <TouchableOpacity style={styles.addFilterContainer} onPress={() => this.setState({showFilterOptions: true})}>
            <Flb name='plus' size={20} color={Colors.flBlue.anvil} style={styles.addFilterIcon} />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.groupListHeaderContainer}>
          <Text allowFontScaling={false} style={styles.groupNameTitle}>Group</Text>
          <ModalDropdown options={_.map(groups, 'owner')} onSelect={this.filterByEffectiveDate} dropdownStyle={styles.groupDateDropdown} renderRow={this._renderDropdownRow.bind(this)}>
            <View style={styles.groupTypeContainer}>
              <Text allowFontScaling={false} style={styles.groupTypeTitle}>Eff. Date</Text>
              <Flb name='caret-down-two' size={15} color={Colors.flBlue.anvil} style={{ marginTop: 5 }} />
            </View>
          </ModalDropdown>
        </View>

        <ScrollView>
          {groups.map((group, index) => this._renderGroupItem(group, index))}
        </ScrollView>

        {this.state.showFilterOptions ?
          <View style={{backgroundColor: Colors.flBlue.snow}}>
            <TouchableOpacity onPress={() => this._addFilter('quoting')}>
              <Text allowFontScaling={false}>Quoting</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._addFilter('type')}>
              <Text allowFontScaling={false}>Type</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._addFilter('owner')}>
              <Text allowFontScaling={false}>Owner</Text>
            </TouchableOpacity>
          </View>
          :
            null
        }

      </View>
    )
  }
}

Group.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Group)
