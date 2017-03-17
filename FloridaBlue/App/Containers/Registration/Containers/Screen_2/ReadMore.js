import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native'

import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'

// Styles
import styles from './ReadMoreStyle'

// I18n
import I18n from 'react-native-i18n'

class ReadMore extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image source={Images.registrationStep2Hdr} style={styles.headerImage} />

        <ScrollView>
          <Text style={styles.paragraph}>{I18n.t('privacyNoticeOne')}</Text>
          <Text style={styles.paragraph}>{I18n.t('privacyNoticeTwo')}</Text>
          <Text style={styles.paragraph}>{I18n.t('privacyNoticeThree')}</Text>
        </ScrollView>

        <TouchableHighlight style={styles.closeButton} onPress={() => { NavigationActions.pop() }}>
          <Text style={{color: 'white'}}> Close </Text>
        </TouchableHighlight>

      </View>
    )
  }
}
export default ReadMore
