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

import {Actions as NavigationActions} from 'react-native-router-flux'
import { Colors, Fonts, Images, Metrics } from '../../../Themes'

// Styles
import styles from './TouchTOUStyle'

// I18n
import I18n from 'react-native-i18n'

class TouchTOU extends Component {
  _handleClose () {
    NavigationActions.pop()
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeOne')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeTwo')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeThree')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeFour')}</Text>
          <Text style={styles.paragraph}>{I18n.t('touchNoticeFive')}</Text>

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
export default TouchTOU
