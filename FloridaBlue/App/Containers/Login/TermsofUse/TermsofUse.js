import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  WebView,
  TouchableWithoutFeedback

} from 'react-native'

import LoginActions from '../../../Redux/LoginRedux'
import I18n from 'react-native-i18n'
import styles from './TermsStyle'
import { Colors, Fonts, Images, Metrics } from '../../../Themes'

import Icon from 'react-native-vector-icons/FontAwesome'
import { MKTextField, MKColor, MKCheckbox, setTheme } from 'react-native-material-kit'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'

  setTheme({checkboxStyle: {
      fillColor: Colors.flBlue.ocean,
      borderOnColor: Colors.flBlue.ocean,
      borderOffColor: Colors.flBlue.ocean
  }})

class TermsofUse extends Component {
  constructor () {
    super()

    this.state = {
      clicked: true
    }
  }

  _handleAgreeTermsOfUse () {
    console.log(this.props.agreeTermsOfUse)
    if (!this.props.agreeTermsOfUse) {
      alert('Please accept Terms of Use')
    } else {
      this.props.sendConfirm()
      NavigationActions.WelcomeDashBoard()
    }
  }

  componentDidMount () {
//    this.props.handleGetTOU()
  }

  render () {
    var HTML = this.props.getTou

    return (
      <View style={styles.container}>
        {this.props.getTou ?
          <WebView
          //  source={{html: HTML}}
          source={{
            uri:'https://mobapi-stga.bcbsfl.com/mob/api/v1/tou'
          }}
            style={{marginBottom: 30}} /> : <View />}
        <View style={styles.checkViewStyle}>
          <View style={styles.checkStyle}>
            <MKCheckbox
              ref='agreeTermsOfUse'
              onCheckedChange={() => {
                var checked = this.refs.agreeTermsOfUse.state.checked
                this.props.handleChangeAgreeTermsOfUse(checked)
              }} />
          </View>
          <View style={styles.checkTextView}>
            <Text style={styles.checkText}>
        Yes. I certified that I have read the above Terms of Use and agree with those terms in order
        to use this apllication.
        </Text>
          </View>
        </View>
        <View style={{marginTop: Metrics.doubleBaseMargin}}>
          <TouchableWithoutFeedback onPress={() => this._handleAgreeTermsOfUse()}>
            <Image style={styles.iAgree} source={Images.iAgree} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  progressBoxStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

TermsofUse.propTypes = {
  sendConfirm: PropTypes.func,
  fetching: PropTypes.bool,
  confirm: PropTypes.string,
  error: PropTypes.string,
  getTou: PropTypes.string,
  handleChangeAgreeTermsOfUse: PropTypes.func

}

const mapStateToProps = (state) => {
  return {

    fetching: state.login.fetching,
    confirm: state.login.confirm,
    error: state.login.error,
    agreeTermsOfUse: state.login.agreeTermsOfUse,
    getTou: state.login.getTou

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetTOU: () => dispatch(LoginActions.getTou()),
    handleChangeAgreeTermsOfUse: (agreeTermsOfUse) => dispatch(LoginActions.changeAgreeTermsOfUse(agreeTermsOfUse)),
    sendConfirm: () => dispatch(LoginActions.sendConfirm())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsofUse)
