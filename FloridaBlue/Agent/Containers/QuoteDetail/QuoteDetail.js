// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, TextInput, TouchableHighlight, ScrollView, TouchableOpacity, Button } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SettingActions from '../../Redux/SettingRedux'
import {Metrics, Images, Colors} from '../../Themes/'
import styles from './QuoteDetailStyle'
import { MKProgress } from 'react-native-material-kit'
import Flb from '../../Themes/FlbIcon'
import ModalDropdown from 'react-native-modal-dropdown'

const Divider = () => { return <View style={styles.divider} /> }

class QuoteDetail extends Component {
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

  render () {
    return (
      <View>
        {this._renderHeader()}
      </View>
    )
  }
}

QuoteDetail.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(QuoteDetail)
