import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

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
    //this.props.attemptMyIdCard()
    console.tron.log('I am Id Card screen')
    console.tron.log(this.props)
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
        <View style={{margin: 5, flex: 1, alignItems: 'center', opacity: 0.9
        }}

        >
          <TouchableOpacity onPress={this.toggle}>
            <Image source={{uri: 'data:image/jpeg;base64,'+this.props.data.IdCardImage}} style={{
              flex: 1,
              transform: [{rotate: '270deg'}],
              resizeMode: 'contain',
              width: this.state.idCardHeaderVisible ? (Metrics.screenHeight - Metrics.screenHeight * 0.15) : Metrics.screenHeight

            }} >
              <View style={{flex: 1 }}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 0.45, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.73)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.7)), marginLeft: Metrics.screenWidth * 0.1, alignItems: 'flex-start', marginTop: 20}}>
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> JASON LAITNER</Text>
                    </View>
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> Member Number </Text>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> VMYH5192569001</Text>
                    </View>
                    <View style={{flex: 0.2, marginTop: 5}} />
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}>  Group Number 9999 </Text>
                    </View>
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}} />
                    </View>
                  </View>

                  <View style={{flex: 0.55, marginLeft: Metrics.screenWidth * 0.3, height: this.state.idCardHeaderVisible ? (Metrics.screenHeight - (Metrics.screenHeight * 0.73)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.7)), alignItems: 'flex-start', marginTop: 20}}>
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> BC 090 BS 590 </Text>
                    </View>
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0015}}> RX BIN 012833 </Text>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> PCN FLBC</Text>
                    </View>
                    <View style={{flex: 0.2, marginTop: 5}} />
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> Plan Number: 1711S </Text>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> Plan Name: myBlue </Text>
                    </View>
                    <View style={{flex: 0.2, marginTop: 5}}>
                      <Text style={{color: 'white', backgroundColor: Colors.transparent, fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002}}> Bronze </Text>
                    </View>
                  </View>
                </View>

              </View>

            </Image>

          </TouchableOpacity>

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
    attemptMyIdCard: (data) => dispatch(MyIdCardActions.myIdCardRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyIdCard)
