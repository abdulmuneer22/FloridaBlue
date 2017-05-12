import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './DashBoardStyle'
import HideableView from 'react-native-hideable-view'
import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import MyIdCardActions from '../../../../Redux/MyIdCardRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Card } from 'native-base'
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()
class MyIdCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idCardHeaderVisible: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
          ID Card
      </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    this.props.attemptMyIdCard()
    console.tron.log('I am Id Card screen')
    console.tron.log(this.props)
  }

  toggle () {
    this.setState({
      idCardHeaderVisible: !this.state.idCardHeaderVisible
    })
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: Colors.snow}]}>
        <HideableView visible={this.state.idCardHeaderVisible} removeWhenHidden>
          {this._renderHeader()}
        </HideableView>
        <View style={{margin: 5, flex: 1, alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={this.toggle}>
            <Image source={{uri: this.props.data.srcData}} style={{
              flex: 1,
              transform: [{rotate: '270 deg'}],
              width: Metrics.screenWidth * 1.5,
              resizeMode: 'contain'
            }} />
          </TouchableWithoutFeedback>
        </View>

      </View>
    )
  }
}

MyIdCard.propTypes = {
  data: PropTypes.object,
  attemptMyIdCard: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.myidcard.fetching,
    data: state.myidcard.data,
    error: state.myidcard.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyIdCard: () => dispatch(MyIdCardActions.myIdCardRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyIdCard)
