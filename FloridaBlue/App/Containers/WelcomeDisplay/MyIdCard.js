import React, { Component, PropTypes } from 'react'

import { AppRegistry, Alert, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking, Platform } from 'react-native'

import styles from './DashBoardStyle'
import HideableView from 'react-native-hideable-view'
import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import NavItems from '../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import MyIdCardActions from '../../Redux/MyIdCardRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Card } from 'native-base'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()
class MyIdCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idCardHeaderVisible: true
    }
    this.toggle = this.toggle.bind(this)
  }

  _renderHeader() {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001 }}>
        {NavItems.backButton()}
      </View>
      <View style={{ marginRight: Metrics.textHeight * Metrics.screenWidth * 0.009, justifyContent: 'center', alignItems: 'center' }}>
        <Text allowFontScaling={false} style={styles.headerTextStyle}>
          ID Card
</Text>
      </View>
      {/*<View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
{NavItems.settingsButton()}
</View>*/}
    </Image>)
  }

  componentDidMount() {
    gaTracker.trackScreenView('ID Card')
  }

  toggle() {
    this.setState({
      idCardHeaderVisible: !this.state.idCardHeaderVisible
    })
  }

  _displayCondition() {

    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text allowFontScaling={false} style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props && this.props.data && this.props.data.IdCardImage && this.props.data.IdCardImage.length != 0) {
      var str = this.props.planName && this.props.planName.planName

      console.tron.log('str' + str.indexOf("MYBLUE"))
      return (
        <View style={{ margin: 5, flex: 1, alignItems: 'center', opacity: 0.9 }}>

          <TouchableOpacity onPress={this.toggle}>
            <Image source={{ uri: 'data:image/jpeg;base64,' + this.props.data.IdCardImage }} style={
              Platform.OS === 'ios' ? {
                flex: 1,
                transform: [{ rotate: '270deg' }],
                resizeMode: 'contain',
                marginLeft: this.state.idCardHeaderVisible ? 0 : Metrics.baseMargin * Metrics.screenWidth * 0.004,
                width: this.state.idCardHeaderVisible ? (Metrics.screenHeight - Metrics.screenHeight * 0.15) : Metrics.screenHeight
              } : {
                  flex: 1,
                  transform: [{ rotate: '270deg' }],
                  resizeMode: 'contain',
                  width: this.state.idCardHeaderVisible ? (Metrics.screenHeight - Metrics.screenHeight * 0.13) : Metrics.screenHeight - Metrics.screenHeight * 0.03
                }} >
              <View style={{ flex: 1 }}>
                {str.toUpperCase().indexOf("MYBLUE") > -1 ?
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                    <View style={{ flex: 0.5, marginLeft: this.state.idCardHeaderVisible ? Metrics.smallMargin * Metrics.screenWidth * 0.02 : Metrics.smallMargin * Metrics.screenWidth * 0.025, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.825)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.81)), alignItems: 'flex-start' }}>

                      <View style={{ flex: (Platform.OS === 'ios') ? 0.1 : 0.1, marginTop: (Platform.OS === 'ios') ? 3 : 0 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.MemberFirstName != undefined && this.props.data.MemberFirstName != null ? this.props.data.MemberFirstName : ''} {this.props.data && this.props.data.MemberLastName != undefined && this.props.data.MemberLastName != null ? this.props.data.MemberLastName : ''}</Text>
                      </View>

                      <View style={{ flex: 0.1 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> Member Number </Text>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.MemberNumber != undefined && this.props.data.MemberNumber != null ? this.props.data.MemberNumber : ''}</Text>
                      </View>

                      <View style={{ flex: 0.12 }} />

                      <View style={{ flex: 0.08 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}>  Group Number {this.props.data && this.props.data.GroupNumber != undefined && this.props.data.GroupNumber != null ? this.props.data.GroupNumber : ''} </Text>
                      </View>

                      <View style={{ flex: 0.05 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }} />
                      </View>

                    </View>

                    <View style={{ flex: 0.5, marginLeft: this.state.idCardHeaderVisible ? Metrics.smallMargin * Metrics.screenWidth * 0.02 : Metrics.smallMargin * Metrics.screenWidth * 0.025, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.825)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.81)), alignItems: 'flex-start' }}>
                      <View style={{ flex: (Platform.OS === 'ios') ? 0.1 : 0.1, marginTop: (Platform.OS === 'ios') ? 3 : 0 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.BCBSNumber != undefined && this.props.data.BCBSNumber != null ? this.props.data.BCBSNumber : ''} </Text>
                      </View>
                      <View style={{ flex: 0.125 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.RXBIN != undefined && this.props.data.RXBIN != null ? this.props.data.RXBIN : 'Rx BIN'}</Text>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.RXPCN != undefined && this.props.data.RXPCN != null ? this.props.data.RXPCN : 'PCN'}</Text>
                      </View>
                      <View style={{ flex: 0.15 }} />
                      <View style={{ flex: (Platform.OS === 'ios') ? 0.05 : 0.11 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}>Plan Number: {this.props.data && this.props.data.PlanNumber != undefined && this.props.data.PlanNumber != null ? this.props.data.PlanNumber : ''} </Text>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.006, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}>Plan Name: {this.props.data && this.props.data.PlanName != undefined && this.props.data.PlanName != null ? this.props.data.PlanName : ''}</Text>
                      </View>
                      <View style={{ flex: 0.1 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025, marginTop: 10 }}> </Text>
                      </View>
                    </View>
                  </View>
                  :
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.5, marginLeft: this.state.idCardHeaderVisible ? Metrics.smallMargin * Metrics.screenWidth * 0.02 : Metrics.smallMargin * Metrics.screenWidth * 0.025, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.77)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.745)), alignItems: 'flex-start' }}>

                      <View style={{ flex: (Platform.OS === 'ios') ? 0.1 : 0.1, marginTop: (Platform.OS === 'ios') ? 1 : 0 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.MemberFirstName != undefined && this.props.data.MemberFirstName != null ? this.props.data.MemberFirstName : ''} {this.props.data && this.props.data.MemberLastName != undefined && this.props.data.MemberLastName != null ? this.props.data.MemberLastName : ''}</Text>
                      </View>

                      <View style={{ flex: 0.1 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> Member Number </Text>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.MemberNumber != undefined && this.props.data.MemberNumber != null ? this.props.data.MemberNumber : ''}</Text>
                      </View>

                      <View style={{ flex: 0.12 }} />

                      <View style={{ flex: 0.08 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}>  Group Number {this.props.data && this.props.data.GroupNumber != undefined && this.props.data.GroupNumber != null ? this.props.data.GroupNumber : ''} </Text>
                      </View>

                      <View style={{ flex: 0.12 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }} />
                      </View>

                    </View>

                    <View style={{ flex: 0.5, marginLeft: this.state.idCardHeaderVisible ? Metrics.smallMargin * Metrics.screenWidth * 0.02 : Metrics.smallMargin * Metrics.screenWidth * 0.025, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.77)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.745)), alignItems: 'flex-start' }}>
                      <View style={{ flex: (Platform.OS === 'ios') ? 0.1 : 0.1, marginTop: (Platform.OS === 'ios') ? 1 : 1.5 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.BCBSNumber != undefined && this.props.data.BCBSNumber != null ? this.props.data.BCBSNumber : ''} </Text>
                      </View>
                      <View style={{ flex: 0.125 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.RXBIN != undefined && this.props.data.RXBIN != null ? this.props.data.RXBIN : 'Rx BIN'}</Text>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}> {this.props.data && this.props.data.RXPCN != undefined && this.props.data.RXPCN != null ? this.props.data.RXPCN : 'PCN'}</Text>
                      </View>
                      <View style={{ flex: 0.15 }} />
                      <View style={{ flex: (Platform.OS === 'ios') ? 0.15 : 0.2 }}>
                        {this.props.data && this.props.data.PlanNumber != undefined && this.props.data.PlanNumber != null ?
                          <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025 }}>Plan Number: {this.props.data.PlanNumber} </Text> : null}
                        {this.props.data && this.props.data.PlanName != undefined && this.props.data.PlanName != null ?
                          <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.004, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0022 }}>Plan Name: {this.props.data.PlanName}</Text> : null}
                      </View>
                      <View style={{ flex: 0.1 }}>
                        <Text allowFontScaling={false} style={{ color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025, marginTop: 10 }}> </Text>
                      </View>
                    </View>

                  </View>
                }

              </View>

            </Image>

          </TouchableOpacity>


        </View>)
    } else if (this.props.error != null && this.props.error.idCardWebviewURL != undefined) {

      NavigationActions.MyView({ responseURL: this.props.error.idCardWebviewURL })
    } else if (this.props.error != null) {
      Alert.alert(
        'ID Card',
        'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }

        ])
    }

  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: Colors.snow }]}>
        <HideableView visible={this.state.idCardHeaderVisible} removeWhenHidden>
          {this._renderHeader()}
        </HideableView>

        <View style={{ flex: 1 }}>
          {this._displayCondition()}
        </View>

      </View>
    )
  }
}

MyIdCard.propTypes = {
  data: PropTypes.object,
  attemptMyIdCard: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.myidcard.fetching,
    data: state.myidcard.data,
    error: state.myidcard.error,
    planName: state.member.defaultContract
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyIdCard: () => dispatch(MyIdCardActions.myIdCardRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyIdCard)
