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

// Styles
import styles from './ReadMoreStyle'

// I18n
import I18n from 'react-native-i18n'

class ReadMore extends Component {
  _handleClose () {
    NavigationActions.pop()
  }
  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.registrationStep2Hdr} style={styles.headerImage} />

        <ScrollView>
          <Text style={styles.paragraph}>{I18n.t('privacyNoticeOne')}</Text>
          <Text style={styles.paragraph}>{I18n.t('privacyNoticeTwo')}</Text>
          <Text style={styles.paragraph}>{I18n.t('privacyNoticeThree')}</Text>

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
