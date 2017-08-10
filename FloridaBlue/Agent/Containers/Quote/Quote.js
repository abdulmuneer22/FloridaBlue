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
import HideableView from 'react-native-hideable-view'

const Divider = () => { return <View style={styles.divider} /> }
let quotes = require('./quotes.json')

class Quote extends Component {
  constructor () {
    super()
    this.state = {
      searchText: '',
      showGroupInfo: false,
      groupInfoText: 'show'
    }

    this._handleGroupInfo = this._handleGroupInfo.bind(this)
  }

  componentDidMount () {

  }

  _openQuoteDetail(selectedQuote) {
    console.tron.log(selectedQuote)
    NavigationActions.QuoteDetail()
  }

  _handleGroupInfo() {
    if (this.state.showGroupInfo) {
      this.setState({showGroupInfo: false})
      this.setState({groupInfoText: 'show'})
    } else {
      this.setState({showGroupInfo: true})
      this.setState({groupInfoText: 'hide'})
    }
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

        <HideableView visible={this.state.showGroupInfo} removeWhenHidden={true} style={styles.groupContainer}>
          <View style={styles.groupDetailContainer}>
            <View style={styles.groupInfoContainer}>
              <Text style={styles.groupInfoTitle}>Address:</Text>
              <Text style={styles.groupAddress}>1401 Riverplace Blvd</Text>
              <Text style={styles.groupAddress}>Jacksonville, FL 32267</Text>
            </View>
            <View style={styles.groupInfoContainer}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.groupInfoTitle}>Tax ID: </Text>
                <Text style={styles.groupInfoText}>184-98-4888</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.groupInfoTitle}>DM: </Text>
                <Text style={styles.groupInfoText}>Bobimus Sagetus</Text>
              </View>
            </View>
          </View>
          <View style={styles.groupContactContainer}>
            <TouchableOpacity style={styles.mapButton}>
              <Flb name='pin-map' size={16} color={Colors.flBlue.grey6} style={styles.groupContactIcon} />
              <Text style={styles.mapButtonText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Flb name='call-phone' size={16} color={Colors.flBlue.grey6} style={styles.groupContactIcon} />
              <Text style={styles.callButtonText}>Call: 407-949-1656</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.emailButton}>
            <Flb name='mail' size={20} color={Colors.flBlue.snow} style={styles.groupContactIcon} />
            <Text style={styles.emailButtonText}>Email: bobimus.sagetus@publix.com</Text>
          </TouchableOpacity>
        </HideableView>

        <TouchableOpacity style={styles.groupInfoButton} onPress={this._handleGroupInfo}>
          { this.state.showGroupInfo ?
              <Flb name='caret-up-two' size={15} color={Colors.flBlue.grey3} />
            :
              null
          }
          <Text style={styles.groupButtonText}>{this.state.groupInfoText} group details</Text>
          { !this.state.showGroupInfo ?
              <Flb name='caret-down-two' size={15} color={Colors.flBlue.grey3} />
            :
              null
          }
        </TouchableOpacity>

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
