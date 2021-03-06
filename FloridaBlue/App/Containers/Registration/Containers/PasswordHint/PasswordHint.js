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
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './PasswordHintStyle'

import Flb from '../../../../Themes/FlbIcon'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'

class PasswordHint extends React.Component {
  _handleClose () {
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={Images.registrationStep2Hdr} style={styles.headerImage} >
            <Text allowFontScaling={false} style={styles.headerTextStyle}>{I18n.t('passwordHint')}</Text>
          </Image>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('passwordHintDescription1')}</Text>
          </View>
          <View style={styles.row}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('passwordHintDescription2')}</Text>
          </View>
          <View style={styles.row1}>
            <Text allowFontScaling={false} style={styles.description}>{I18n.t('passwordHintDescription3')}</Text>
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

PasswordHint.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordHint)
