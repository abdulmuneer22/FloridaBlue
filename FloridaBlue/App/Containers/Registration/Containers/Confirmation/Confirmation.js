import React, { Component, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'

var Modal = require('react-native-modalbox')

import { connect } from 'react-redux'

import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import styles from './ConfirmationStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor } from 'react-native-material-kit'

const window = Dimensions.get('window')
const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200'
  })
  .build()

class Confirmation extends Component {
  constructor () {
    super()
    this.state = {
      isPopupVisible: false

    }
  }
  _showPopup () {
    // alert(this.state.isPopupVisible)
    var isPopupVisible = this.state.isPopupVisible
    if (isPopupVisible) {
      this.setState({isPopupVisible: false})
    } else {
      this.setState({isPopupVisible: true})
    }
  }

  _handleConfirm() {
    if (this.props.touchEnabled && !this.props.credentialStored) {
      NavigationActions.TouchTOU({'tou': 'nonregistration'})
    } else {
      NavigationActions.WelcomeDashBoard({'origin': 'registration'})
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.headerContainer} source={Images.regCompletion} >
          <Text allowFontScaling={false} style={styles.headerTextStyle}>Thank You!</Text>
        </Image>

        <View >
          <Text allowFontScaling={false} style={styles.subheading}>{'You\'re All Set'}</Text>
        </View>
        <View style={styles.userStyle}>

          <Image style={{
            // backgroundColor: Colors.transparent,
            marginTop: Metrics.baseMargin,
            marginLeft: Metrics.doubleBaseMargin,
            width: Metrics.images.xll,
            height: Metrics.images.xll
          }} source={Images.confirmationUser} />

          <View style={styles.center}>
            <Text allowFontScaling={false} style={{
              fontSize: Fonts.size.h5 * Metrics.screenWidth * 0.0025,
              fontWeight: '500',
              color: Colors.snow
        // alignSelf : 'stretch',
      //  alignItems:'center',
      //  justifyContent:'center',
      //  height:40,
        // marginLeft:5
            }}>
      Your User ID is:
      </Text>
            <Text allowFontScaling={false} style={{fontSize: Fonts.size.regular, color: Colors.snow}}>
              {this.props.createUserId}
            </Text>
          </View>

        </View>
        <View style={{alignItems: 'center', marginTop: Metrics.searchBarHeight}}>
          <Text allowFontScaling={false} style={{fontSize: Fonts.size.input * Metrics.screenWidth * 0.0030,
            color: Colors.flBlue.anvil}}>
                  Click Continue to start exploring
           </Text>
        </View>
        <View style={styles.wrapper}>

          <TouchableOpacity onPress={() => { this._handleConfirm() }}>
            <Image source={Images.confirmationLogin} style={styles.buttonStyle} />
          </TouchableOpacity>

          <View style={styles.row}>
            <View>
              <Text allowFontScaling={false} style={styles.footerText}>{I18n.t('footerText')}</Text>
            </View>
          </View>

        </View>

      </ScrollView>

    )
  }
}

Confirmation.propTypes = {
  createUserId: PropTypes.string,
  fetching: PropTypes.bool,
  error: PropTypes.string,
  password: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    createUserId: state.registration.createUserId,
    password: state.registration.password,
    fetching: state.registration.fetching,
    error: state.registration.error
  }
}

export default connect(mapStateToProps)(Confirmation)
