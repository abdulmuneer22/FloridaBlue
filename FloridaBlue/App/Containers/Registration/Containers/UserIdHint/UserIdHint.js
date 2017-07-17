// @flow

import React, { PropTypes } from 'react'
import ReactNative, {
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
import styles from './UserIdHintStyle'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

class UserIdHint extends React.Component {
  componentDidMount () {
    gaTracker.trackScreenView('Registration User ID Hint')
  }

  _handleClose () {
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={Images.registrationStep2Hdr} style={styles.headerImage} >
            <Text allowFontScaling={false} style={styles.headerTextStyle}>{I18n.t('userIdHintTitle')}</Text>
          </Image>

          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('userIdHintDescription1')}</Text>
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('userIdHintDescription2')}</Text>
          </View>
          <View style={styles.row1}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('userIdHintDescription3')}</Text>
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

UserIdHint.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserIdHint)
