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
import { connect } from 'react-redux'
import { Colors, Fonts, Images, Metrics } from '../../../../../../Themes'
import NavItems from '../../../../../../Navigation/NavItems.js'
import DoctorCard from './DoctorCard'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './ProviderTypeStyle'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
import HideableView from 'react-native-hideable-view'

class ProviderTypeInfo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mailOrderState: false,
      specialityState: false
    }
  }

  componentWillMount() {
    console.tron.log(this.props.subCategoryCode)
    if (this.props.subCategoryCode == "999") {
      this.setState({mailOrderState: true})
    } else if (this.props.subCategoryCode == "701") {
      this.setState({specialityState: true})
    }
  }

  handleLink(url) {
    console.tron.log(url)
    NavigationActions.MyView({
      responseURL: url + '?channel=mobile'
    })
  }

  _renderHeader () {
    return (
      <Image style={styles.headerContainer} source={Images.newHeaderImage}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
          {NavItems.backButton()}
        </View>
        <Text style={styles.headerTextStyle}>Find Care</Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  render () {
    return (
      <View style={styles.container}>
      {this._renderHeader()}
        <ScrollView>
          <View>

            <HideableView visible={this.state.mailOrderState} removeWhenHidden={true}>
              <View style={styles.row}>
                <Text style={styles.heading}>{I18n.t('providerTypeMailOrderTitle')}</Text>
              </View>
              <TouchableOpacity style={styles.row} onPress={() => this.handleLink("https://mws8-stga.bcbsfl.com/wps/wcm/myconnect/mbs/mwe_publiccontent/SI_MWEPublic/SA_Doc_Library/CT_PrimeMailBrochure")}>
                <Text style={styles.linkText}>{I18n.t('mailOrderLearnLink')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => this.handleLink("https://mws8-stga.bcbsfl.com/wps/myportal/mbs/mwe/myaccount/Disclaimer?param1Name=mailOrder&sk=1&nw=1")}>
                <Text style={styles.linkText}>{I18n.t('primeMailOrderLink')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => this.handleLink("")}>
                <Text style={styles.linkText}>{I18n.t('medicarePlansLink')}</Text>
              </TouchableOpacity>
              <View style={styles.row}>
                <Text style={styles.text}>{I18n.t('mailOrderNote')}</Text>
              </View>
            </HideableView>

            <HideableView visible={this.state.specialityState} removeWhenHidden={true}>
              <View style={styles.row}>
                <Text style={styles.heading}>{I18n.t('providerTypeSpecialityTitle')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{I18n.t('providerTypeSpecility1')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{I18n.t('providerTypeSpecility2')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{I18n.t('providerTypeSpecility3')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.heading}>{I18n.t('providerTypeParticipationTitle')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>{I18n.t('providerTypeSpecialityParticipationBody')}</Text>
              </View>

              <DoctorCard />

            </HideableView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    subCategoryCode: state.provider.subCategoryCode
  }
}


export default connect(mapStateToProps)(ProviderTypeInfo)
