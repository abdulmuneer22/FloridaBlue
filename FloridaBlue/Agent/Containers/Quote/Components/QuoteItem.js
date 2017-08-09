// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, FlatList, TouchableHighlight } from 'react-native'
import NavigationRouter from '../../../../Navigation/NavigationRouter'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from './QuoteItemStyle'
import {Metrics, Images, Colors} from '../../../Themes/'
import Flb from '../../../Themes/FlbIcon'
import ModalDropdown from 'react-native-modal-dropdown'

const Divider = () => { return <View style={styles.divider} /> }
const Status = () => {return <View style={styles.status} /> }

class QuoteItem extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <View>

        <View style={styles.quoteItemContainer}>
          <Status />

          <View style={styles.quoteColumnContainer}>
            <Text allowFontScaling={false} style={styles.topText}>{this.props.data.quoteId}</Text>
            <Text allowFontScaling={false} style={styles.bottomText}><Flb name='single' size={13} color={Colors.flBlue.anvil} style={styles.quoteIcon} />  {this.props.data.owner}</Text>
          </View>

          <View style={styles.quoteColumnContainer}>
            <Text allowFontScaling={false} style={styles.updateDateText}>{this.props.data.updateDate}</Text>
          </View>

          <View style={styles.quoteColumnContainer}>
            <Flb name='chevron-right' size={10} color={Colors.flBlue.anvil} style={styles.itemChevron} />
          </View>
        </View>

        <Divider />
      </View>
    )
  }
}

export default QuoteItem
