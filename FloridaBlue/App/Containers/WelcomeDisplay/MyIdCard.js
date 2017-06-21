import React, { Component, PropTypes } from 'react'

import { AppRegistry, Alert, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

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
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()
class MyIdCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idCardHeaderVisible: true
    }
    this.toggle = this.toggle.bind(this)
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
          ID Card
      </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.tron.log('I am Id Card screen')
  }

  toggle () {
    this.setState({
      idCardHeaderVisible: !this.state.idCardHeaderVisible
    })
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: Colors.snow}]}>
        <HideableView visible={this.state.idCardHeaderVisible} removeWhenHidden>
          {this._renderHeader()}
        </HideableView>
        <View style={{margin: 5, flex: 1, alignItems: 'center', opacity: 0.9}}>
        {
          
          (this.props && !this.props.error ? 
          <TouchableOpacity onPress={this.toggle}>
            <Image source={{uri: 'data:image/jpeg;base64,' + this.props.data.IdCardImage}} style={{
              flex: 1,
              transform: [{rotate: '270deg'}],
              resizeMode: 'contain',
              width: this.state.idCardHeaderVisible ? (Metrics.screenHeight - Metrics.screenHeight * 0.15) : Metrics.screenHeight
            }} >
              <View style={{flex: 1 }}>

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>

                  <View style={{flex: 0.5,marginLeft: this.state.idCardHeaderVisible ? Metrics.smallMargin*Metrics.screenWidth * 0.02:Metrics.smallMargin*Metrics.screenWidth * 0.025, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.77)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.73)), alignItems: 'flex-start'}}>
                    
                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> {this.props.data.MemberFirstName} {this.props.data.MemberLastName}</Text>
                    </View>

                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> Member Number </Text>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> {this.props.data.MemberNumber}</Text>
                    </View>

                    <View style={{flex: 0.1}} />
                    
                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>  Group Number {this.props.data.GroupNumber} </Text>
                    </View>

                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}} />
                    </View>

                  </View>

                  <View style={{flex: 0.5, marginLeft: this.state.idCardHeaderVisible ? Metrics.smallMargin*Metrics.screenWidth * 0.02:Metrics.smallMargin*Metrics.screenWidth * 0.025, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.77)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.73)), alignItems: 'flex-start'}}>
                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> ???? </Text>
                    </View>
                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> {this.props.data.RXBIN}</Text>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> {this.props.data.RXPCN}</Text>
                    </View>
                    <View style={{flex: 0.1}} />
                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> Plan Number: {this.props.data.PlanNumber} </Text>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}> Plan Name: {this.props.data.PlanName}</Text>
                    </View>
                    <View style={{flex: 0.1}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025}}>  </Text>
                    </View>
                  </View>
                </View>

              </View>

            </Image>

          </TouchableOpacity>
          : 
              Alert.alert(
              'ID Card',
              'Oops! Looks like this service is not available right now or Id Card not available. Click OK to go back to the last page you visited.',
              [
                  { text: 'OK' }
              ])
          )}
        </View>

      </View>
    )
  }
}

MyIdCard.propTypes = {
  data: PropTypes.object,
  attemptMyIdCard: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.myidcard.fetching,
    data: state.myidcard.data,
    error: state.myidcard.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyIdCard: () => dispatch(MyIdCardActions.myIdCardRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyIdCard)
