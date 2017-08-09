// @flow

import React, { Component, PropTypes } from 'react'
import { View, StatusBar, AppState, Text, Image, TextInput, TouchableHighlight, ScrollView, TouchableOpacity, Button } from 'react-native'
import NavigationRouter from '../../../Navigation/NavigationRouter'
import NavItems from '../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SettingActions from '../../Redux/SettingRedux'
import {Metrics, Images, Colors} from '../../Themes/'
import styles from './QuoteStyle'
import { MKProgress } from 'react-native-material-kit'
import Flb from '../../Themes/FlbIcon'
import ModalDropdown from 'react-native-modal-dropdown'
import QuoteItem from './Components/QuoteItem'

const Divider = () => { return <View style={styles.divider} /> }
let quotes = require('./quotes.json')

class Quote extends Component {
  constructor () {
    super()
    this.state = {
      searchText: ''
    }
  }

  componentDidMount () {

  }

  _openQuoteDetail(selectedQuote) {
    console.tron.log(selectedQuote)
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
        <Text style={styles.quoteDropdownText}>{rowData}</Text>
      </TouchableHighlight>
    )
  }

  _renderQuoteItem (quote, index) {
    return (
      <TouchableOpacity onPress={() => this._openQuoteDetail(quote)}>
        <QuoteItem data={quote} />
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View>
        {this._renderHeader()}

        <View style={styles.groupInfoContainer}>
          
        </View>

        <View style={styles.quoteHeaderContainer}>
          <Text allowFontScaling={false} style={styles.quoteTitle}>Quotes</Text>
          <Text allowFontScaling={false} style={styles.quoteName}>@ TDG of Jacksonville</Text>
        </View>

        <MKProgress ref='quoteBar' style={styles.quoteBar} progress={0.18} progressColor={Colors.flBlue.ocean} bufferColor={Colors.flBlue.grey2} />
        <TextInput style={styles.searchInput} onChangeText={(searchText) => this.setState({searchText})} value={this.state.searchText} />

        <Divider />

        <ModalDropdown options={_.map(quotes, 'status')} onSelect={this.filterByStatus} style={styles.quoteDropdown} dropdownStyle={styles.quoteDropdownItem} renderRow={this._renderDropdownRow.bind(this)}>
          <View style={styles.quoteDropdownContainer}>
            <Text style={styles.quoteDropdownTitle}>By Status:  Any </Text>
            <Flb name='chevron-down' size={10} color={Colors.flBlue.anvil} style={styles.dropdownChevron} />
          </View>
        </ModalDropdown>

        <View style={styles.quoteListHeaderContainer}>
          <Text allowFontScaling={false} style={styles.quoteNameTitle}>Quote</Text>
          <TouchableOpacity style={styles.quoteTypeContainer}>
            <Text allowFontScaling={false} style={styles.quoteTypeTitle}>Updated</Text>
            <Flb name='caret-down-two' size={15} color={Colors.flBlue.anvil} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {quotes.map((quote, index) => this._renderQuoteItem(quote, index))}
        </ScrollView>

      </View>
    )
  }
}

Quote.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    isPortrait: state.setting.isPortrait
  }
}
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Quote)
