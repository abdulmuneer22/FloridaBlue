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

  componentDidMount () {

  }

  render () {
    return (
      <View>
        <Divider />

        <View style={styles.agentItemContainer}>
          <View style={styles.agentColumnContainer}>
            <Text allowFontScaling={false} style={styles.topText}>TDG of Jacksonville</Text>
            <Text allowFontScaling={false} style={styles.bottomText}><Flb name="single" size={13} color={Colors.flBlue.anvil} style={styles.agentIcon} />  Agent</Text>
          </View>

          <View style={styles.agentColumnContainer}>
            <Text allowFontScaling={false} style={styles.topText}>Blue Direct</Text>
            <Text allowFontScaling={false} style={styles.bottomText}>Blue Diamond</Text>
          </View>

          <View style={styles.agentColumnContainer}>
            <Flb name="chevron-right" size={10} color={Colors.flBlue.anvil} style={styles.itemChevron} />
          </View>
        </View>

        <Divider />
      </View>
    )
  }
}

AgencyItem.propTypes = {

}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AgencyItem)
