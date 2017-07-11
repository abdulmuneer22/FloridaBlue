import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from 'react-native'

import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
import styles from './ReadMoreStyle'
import I18n from 'react-native-i18n'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

class ReadMore extends Component {
  componentDidMount() {
    gaTracker.trackScreenView('Registration Read More')
  }

  _handleClose () {
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.registrationStep2Hdr} style={styles.headerImage} />

        <ScrollView>
          <Text allowFontScaling={false} style={styles.paragraph}>{I18n.t('privacyNoticeOne')}</Text>
          <Text allowFontScaling={false} style={styles.paragraph}>{I18n.t('privacyNoticeTwo')}</Text>
          <Text allowFontScaling={false} style={styles.paragraph}>{I18n.t('privacyNoticeThree')}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => { this._handleClose() }}>
              <Image style={{width: Metrics.screenWidth * 0.35,
                borderRadius: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.0020,
                height: Metrics.screenHeight * 0.055}} source={Images.closeButtonGray} />
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }
}
export default ReadMore
