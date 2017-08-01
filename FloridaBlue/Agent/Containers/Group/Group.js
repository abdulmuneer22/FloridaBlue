// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, TextInput, TouchableHighlight, ScrollView, TouchableOpacity, Button } from 'react-native'
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
      searchText: ''
    }
  }

  componentDidMount () {

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
        <Text style={styles.groupDropdownText}>{rowData}</Text>
      </TouchableHighlight>
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

        <TextInput style={styles.searchInput} onChangeText={(searchText) => this.setState({searchText})} value={this.state.searchText} />

        <Divider />

        <ModalDropdown options={_.map(groups, 'owner')} onSelect={this.filterByEffectiveDate} style={styles.groupDropdown} dropdownStyle={styles.groupDropdownItem} renderRow={this._renderDropdownRow.bind(this)}>
          <View style={styles.groupDropdownContainer}>
            <Text style={styles.groupDropdownTitle}>By Type:  Any </Text>
            <Flb name='caret-down-two' size={15} color={Colors.flBlue.anvil} />
          </View>
        </ModalDropdown>

        <View style={styles.groupListHeaderContainer}>
          <Text allowFontScaling={false} style={styles.groupNameTitle}>Group</Text>
          <ModalDropdown options={_.map(groups, 'owner')} onSelect={this.filterByEffectiveDate} dropdownStyle={styles.groupDateDropdown} renderRow={this._renderDropdownRow.bind(this)}>
            <View style={styles.groupTypeContainer}>
              <Text allowFontScaling={false} style={styles.groupTypeTitle}>Eff. Date</Text>
              <Flb name='caret-down-two' size={15} color={Colors.flBlue.anvil} />
            </View>
          </ModalDropdown>
        </View>

        <ScrollView>
          {groups.map((group, index) => this._renderGroupItem(group, index))}
        </ScrollView>

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
