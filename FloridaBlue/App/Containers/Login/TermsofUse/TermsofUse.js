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
  TouchableWithoutFeedback,
  Alert

} from 'react-native'

import LoginActions from '../../../Redux/LoginRedux'
import I18n from 'react-native-i18n'
import styles from './TermsStyle'
import { Colors, Fonts, Images, Metrics } from '../../../Themes'
import NavItems from '../../../Navigation/NavItems.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MKTextField, MKColor, MKCheckbox, setTheme, MKSpinner } from 'react-native-material-kit'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

  setTheme({checkboxStyle: {
      fillColor: Colors.flBlue.ocean,
      borderOnColor: Colors.flBlue.ocean,
      borderOffColor: Colors.flBlue.ocean
  }})

const webScript = `
<script>
	window.location.hash = 1;
    var calculator = document.createElement("div");
    calculator.id = "height-calculator";
    while (document.body.firstChild) {
        calculator.appendChild(document.body.firstChild);
    }
	document.body.appendChild(calculator);
    document.title = calculator.scrollHeight;
</script>
`
const webStyle = `
<style>
body, html, #height-calculator {
    margin: 0;
    padding: 0;
}
#height-calculator {
    position: absolute;
    top: 0;
    left: 2;
    right: 2;
}
</style>
`

class TermsofUse extends Component {
  constructor () {
    super()

    this.state = {
      clicked: true,
      webHeight: 0,
      showCheckbox: false
    }
  }

  _handleAgreeTermsOfUse () {
    if (!this.props.agreeTermsOfUse) {
      alert('Please accept Terms of Use')
    }
    if (this.props.agreeTermsOfUse) {
      if (this.props.origin == 'registration') {
        this.props.sendConfirm()
        NavigationActions.confirmation()
      } else {
        this.props.sendConfirm()
        NavigationActions.WelcomeDashBoard({'tou': 'nonregistration'})
      }
    }
  }

  componentDidMount () {
    this.props.handleGetTOU()
  }

  onNavigationStateChange (event) {
    if (event.title) {
      const htmlHeight = Number(event.title) // convert to number
      this.setState({webHeight: htmlHeight})
    }
  }

  onLoadEnd(event) {
    this.state.showCheckbox = true
  }

  _displayCheckbox() {
    return (
      <View>
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
            <Text style={styles.checkText}>Accept terms of use and continue.</Text>
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

  _displayHeader() {
    <Image style={styles.headerContainer} source={Images.themeHeader}>
      <Text style={styles.headerTextStyle}>Terms of Use</Text>
    </Image>
  }

  _displayCondition() {
    var webHtml = this.props.getTou

    if (this.props.fetching) {
      return (
        <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>
      )
    } else if (this.props.getTou) {
      return (
          <ScrollView style={{flex: 1}}>
            <WebView
            style={{height: this.state.webHeight}}
            source={{html: this.props.getTou + webStyle + webScript}}
            scrollEnabled={false}
            javaScriptEnabled={true}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            onLoadEnd={this.onLoadEnd.bind(this)} />

            {this.state.showCheckbox && this._displayCheckbox()}
          </ScrollView>
      )
    } else if (this.props.error != null) {
      Alert.alert( 'TOU', 'Oops! Looks like we\'re having trouble with your request. Click Support for help.', [{ text: 'OK', onPress: () => NavigationActions.login() }], { cancelable: false } )
      return(<View></View>)
    }
  }

  render () {
    return(
      <View style={styles.container}>
        {this._displayHeader()}
        {this._displayCondition()}
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
