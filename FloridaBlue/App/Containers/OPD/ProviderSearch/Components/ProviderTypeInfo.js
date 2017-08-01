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
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
import NavItems from '../../../../../Navigation/NavItems.js'
import DoctorCard from './DoctorCard'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './ProviderTypeStyle'
// I18n
import I18n from 'react-native-i18n'

import { Actions as NavigationActions } from 'react-native-router-flux'
import HideableView from 'react-native-hideable-view'
var urlConfig = require('../../../../UrlConfig')

class ProviderTypeInfo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mailOrderState: false,
      specialityState: false
    }
  }

  componentWillMount () {
    console.tron.log(this.props.configData)
    if (this.props.subCategoryCode == '999') {
      this.setState({mailOrderState: true})
    } else if (this.props.subCategoryCode == '701') {
      this.setState({specialityState: true})
    }
  }

  handleLink (url) {
    NavigationActions.MyView({
      responseURL: url 
    })
  }

  _renderHeader () {
    return (
      <Image style={styles.headerContainer} source={Images.newHeaderImage}>
        <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
          {NavItems.backButton()}
        </View>
        <Text allowFontScaling={false} style={styles.headerTextStyle}>Find Care</Text>
        <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
          {NavItems.settingsButton()}
        </View>
      </Image>
    )
  }

  _renderMailLinks (mailOrderLink, index) {
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.handleLink(mailOrderLink.link)}>
        <Text allowFontScaling={false} style={styles.linkText}>{mailOrderLink.text}</Text>
      </TouchableOpacity>
    )
  }

  _renderProviderSpeciality (providerType, index) {
    return (
      <View style={styles.row}>
        <Text allowFontScaling={false} style={styles.text}>{providerType}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>
          <View>
            <HideableView visible={this.state.mailOrderState} removeWhenHidden>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.heading}>{this.props.configData.pharmacyMailOrder.title}</Text>
              </View>
              {this.props.configData.pharmacyMailOrder && this.props.configData.pharmacyMailOrder.mailOrderLinks.map((mailOrderLink, index) => this._renderMailLinks(mailOrderLink, index))}
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.text}>{this.props.configData.pharmacyMailOrder.note}</Text>
              </View>
            </HideableView>

            <HideableView visible={this.state.specialityState} removeWhenHidden>
              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.heading}>{this.props.configData.pharmacySpecialityType.providerTypeSpecilityDescList[0].title}</Text>
              </View>

              {this.props.configData.pharmacySpecialityType.providerTypeSpecilityDescList[0] &&
                this.props.configData.pharmacySpecialityType.providerTypeSpecilityDescList[0].description.map((providerType, index) => this._renderProviderSpeciality(providerType, index))}

              <View style={styles.row}>
                <Text allowFontScaling={false} style={styles.heading}>{this.props.configData.pharmacySpecialityType.providerTypeSpecilityDescList[1].title}</Text>
              </View>

              {this.props.configData.pharmacySpecialityType.providerTypeSpecilityDescList[1] &&
                this.props.configData.pharmacySpecialityType.providerTypeSpecilityDescList[1].description.map((providerType, index) => this._renderProviderSpeciality(providerType, index))}

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
    subCategoryCode: state.provider.subCategoryCode,
    configData: state.provider.configData
  }
}

export default connect(mapStateToProps)(ProviderTypeInfo)
