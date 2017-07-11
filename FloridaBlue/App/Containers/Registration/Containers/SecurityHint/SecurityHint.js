// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './SecurityHintStyle'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import HTMLView from 'react-native-htmlview'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

const HtMLstyles = StyleSheet.create({
  p: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025

  },
  a: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium * Metrics.screenWidth * 0.0025,
    fontWeight: '300',
    textDecorationLine: 'underline'
  }
})

class SecurityHint extends React.Component {
  componentDidMount() {
    gaTracker.trackScreenView('Registration Security Hint')
  }

  _handleClose () {
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={Images.registrationStep4Hdr} style={styles.headerImage}>
            <Text allowFontScaling={false} style={styles.headerTextStyle}>{I18n.t('securityHintTitle')}</Text>

          </Image>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('securityHintDescription1')}</Text>
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('securityHintDescription2')}</Text>
          </View>
          <View style={styles.row1}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('securityHintDescription3')}</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => { this._handleClose() }}>
              <Image source={Images.closeButtonGray}
                style={{width: Metrics.screenWidth * 0.35,
                  borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                  height: Metrics.screenHeight * 0.055}} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

SecurityHint.propTypes = {
  fetching: PropTypes.bool,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.registration.fetching,
    error: state.registration.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityHint)
