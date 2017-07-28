// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, FlatList, TouchableHighlight } from 'react-native'
import NavigationRouter from '../../../../Navigation/NavigationRouter'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './GroupItemStyle'
import {Metrics, Images, Colors} from '../../../Themes/'
import Flb from '../../../Themes/FlbIcon'
import ModalDropdown from 'react-native-modal-dropdown'

const Divider = () => { return <View style={styles.divider} /> }

class GroupItem extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <View>

        <View style={styles.groupItemContainer}>
          <View style={styles.groupColumnContainer}>
            <Text allowFontScaling={false} style={styles.topText}>{this.props.data.name}
            </Text>
            <Text allowFontScaling={false} style={styles.bottomText}><Flb name="single" size={13} color={Colors.flBlue.anvil} style={styles.groupIcon} />  {this.props.data.owner}</Text>
          </View>

          <View style={styles.groupColumnContainer}>
            <Text allowFontScaling={false} style={styles.effectiveDateText}>{this.props.data.effectiveDate}</Text>
          </View>

          <View style={styles.groupColumnContainer}>
            <Flb name="chevron-right" size={10} color={Colors.flBlue.anvil} style={styles.itemChevron} />
          </View>
        </View>

        <Divider />
      </View>
    )
  }
}

export default GroupItem
