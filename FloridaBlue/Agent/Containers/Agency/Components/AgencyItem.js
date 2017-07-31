// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, FlatList, TouchableHighlight } from 'react-native'
import NavigationRouter from '../../../../Navigation/NavigationRouter'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './AgencyItemStyle'
import {Metrics, Images, Colors} from '../../../Themes/'
import Flb from '../../../Themes/FlbIcon'
import ModalDropdown from 'react-native-modal-dropdown'

const Divider = () => { return <View style={styles.divider} /> }

class AgencyItem extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <View>

        <View style={styles.agentItemContainer}>
          <View style={styles.agentColumnContainer}>
            <Text allowFontScaling={false} style={styles.topText}>{this.props.data.name}
              <Text allowFontScaling={false} style={styles.bottomText}>  - {this.props.data.code}</Text>
            </Text>
            <Text allowFontScaling={false} style={styles.bottomText}><Flb name='single' size={13} color={Colors.flBlue.anvil} style={styles.agentIcon} />            {this.props.data.role}</Text>
          </View>

          <View style={styles.agentColumnContainer}>
            <Text allowFontScaling={false} style={styles.topText}>{this.props.data.typePrime}</Text>
            <Text allowFontScaling={false} style={styles.bottomText}>{this.props.data.type}</Text>
          </View>

          <View style={styles.agentColumnContainer}>
            <Flb name='chevron-right' size={10} color={Colors.flBlue.anvil} style={styles.itemChevron} />
          </View>
        </View>

        <Divider />
      </View>
    )
  }
}

export default AgencyItem
