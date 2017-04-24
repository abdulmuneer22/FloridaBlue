import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './DashBoardStyle'

import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import SupportActions from '../../../../Redux/SupportRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications';

const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class SupportScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image source={Images.themeHeader} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Contact Us
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.tron.log('I am Support screen')
    console.tron.log(this.props)
  //  this.props.attemptSupportScreen()
  }

  _handleCall (phone) {
    console.log(phone)
    const url = `tel:${phone}`

    Linking.canOpenURL('tel:1-800-841-2900').then(supported => {
      if (supported) {
         Linking.openURL('tel:1-800-841-2900');
      } else {
        console.log('Don\'t know how to open URI: ')
      }
    })
  }

  render () {
    var texts = []
    var i = 0
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
        <View style={styles.textBackground2}>
          <ScrollView showsVerticalScrollIndicator={false} >
            {this.props.data
             ? <View >
               {this.props.data && this.props.data.support
                    ? <View>
                      <View>{this.props.data.support.map(function (support, i) {
                        return (<View style={styles.textBackground} key={i}>
                          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            <View style={{flex: 0.6 }}>
                              <Text style={styles.textStyle}>
                                {support.contactType}
                              </Text>
                            </View>
                            <TouchableOpacity onPress={ () => Communications.phonecall(support.contactNumber, true) }>
                              <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.textStyle1}>
                                  {support.contactNumber}
                                </Text>
                                <Flb name='call-phone' size={Metrics.icons.xm} color={Colors.flBlue.ocean} />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>)
                        i += 1
                      }

                    )}</View>
                      <View style={styles.textBackground}>
                        {this.props.data.shoping.map(function (support, i) {
                          return (<View style={{margin: 1}} key={i}>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', flexWrap: 'wrap', borderBottomWidth: 0.2}}>
                              <View style={i == 0 ? {flex: 1, flexDirection: 'row', padding: 16, justifyContent: 'center', backgroundColor: Colors.snow} : {flex: 0.6,
                                backgroundColor: Colors.snow }}>
                                <Text style={styles.textStyle}>
                                  {support.contactType}
                                </Text>
                              </View>
                              {support.contactNumber ? <TouchableOpacity onPress={() => Communications.phonecall(support.contactNumber, true)}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.snow}}>
                                  <Text style={styles.textStyle1}>
                                    {support.contactNumber}
                                  </Text>
                                  {support.contactNumber ? <Flb name='call-phone' size={Metrics.icons.xm} color={Colors.flBlue.ocean} /> : <View />}
                                </View>
                              </TouchableOpacity> : <View />}
                            </View>
                          </View>)
                          i += 1
                        }

                    )}
                      </View>

                    </View>

                    : <Text>
                           Loading ..
                         </Text>}
             </View>
             : <View style={{alignItems: 'center', justifyContent: 'center'}}>
               <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
               <Text style={styles.spinnerText}>
                   Loading Please Wait
                 </Text>
             </View>}
          </ScrollView>
        </View>
      </View>
    )
  }
}

SupportScreen.propTypes = {
  data: PropTypes.object,
  attemptSupportScreen: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.support.fetching,
    data: state.support.data,
    error: state.support.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSupportScreen: () => dispatch(SupportActions.supportRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen)