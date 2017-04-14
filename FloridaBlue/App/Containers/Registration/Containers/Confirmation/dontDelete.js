import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'

var Modal = require('react-native-modalbox')

import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import styles from './ConfirmationStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor } from 'react-native-material-kit'

const window = Dimensions.get('window')
const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withPlaceholderTextColor(Colors.steel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200'
  })
  .build()

class Confirmation extends Component {
  constructor () {
    super()
    this.state = {
      isPopupVisible: false

    }
  }
  _showPopup () {
    // alert(this.state.isPopupVisible)
    var isPopupVisible = this.state.isPopupVisible
    if (isPopupVisible) {
      this.setState({isPopupVisible: false})
    } else {
      this.setState({isPopupVisible: true})
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.headerContainer} source={Images.regCompletion} />

        <Text style={styles.header}>Thank You!</Text>
        <Text style={styles.subheading}>You have successfully completed the registration process.</Text>

        <View style={styles.userStyle}>

          <View style={{
            backgroundColor: Colors.snow,
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          // marginTop:0,
            marginLeft: Metrics.doubleBaseMargin
          }}>
            <Flb name='user' size={Metrics.icons.medium} color={Colors.flBlue.grass} />
          </View>

          <View style={styles.center}>
            <Text style={{
              fontSize: Fonts.size.h6,
              fontWeight: '500',
              color: Colors.snow
        // alignSelf : 'stretch',
      //  alignItems:'center',
      //  justifyContent:'center',
      //  height:40,
        // marginLeft:5
            }}>
      Your User ID is:
      </Text>
            <Text style={{fontSize: Fonts.size.regular, color: Colors.snow}}>
            something long here
              </Text>
          </View>

        </View>

        <View style={{
          height: window.height * 0.3,
          backgroundColor: Colors.transparent,
          position: 'absolute',
          top: window.height * 0.545,
          width: window.width
        }}>

          <View style={styles.container}>

            <Text style={styles.subheading1}>
                 You can select your default log-in, please select one of the following
                 </Text>

            <TouchableWithoutFeedback onPress={() => { this.refs.modal4.open() }}>

              <Image source={Images.setupTouchButtonGray} style={styles.buttonStyle} />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => { this.refs.modal4.open() }}>

              <Image source={Images.setupPinButtonGray} style={styles.buttonStyle} />
            </TouchableWithoutFeedback>

            <Text style={styles.orStyle}>- OR -</Text>

            <TouchableWithoutFeedback onPress={NavigationActions.login}>
              <Image source={Images.loginNowButton} style={styles.buttonStyle} />

            </TouchableWithoutFeedback>

            <View style={styles.row}>
              <View>
                <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
              </View>
            </View>

          </View>

          <Modal style={{
            backgroundColor: Colors.snow,
            width: window.width,
            height: window.height * 0.6,
            padding: 20
          }}
            position={'bottom'} ref={'modal4'}
            zindex='99'>

            <TouchableWithoutFeedback onPress={() => {
              this.refs.modal4.close()
            }}>
              <Image source={Images.closeIconBlue}
                style={{justifyContent: 'flex-start', alignSelf: 'flex-end'}} />

            </TouchableWithoutFeedback>

            <View style={{

            }}>
              <Text style={{textAlign: 'center',
                fontSize: Fonts.size.h4,
                color: Colors.flBlue.grey6}}>Touch ID</Text>

              <Text style={{
                     // textAlign : 'center',
                marginTop: 10,
                fontSize: Fonts.size.regular,
                color: Colors.flBlue.grey5

              }}>
                   Authenticate is needed to setup Touch ID as your default log in screen.
                     </Text>

            </View>

            <View style={{paddingHorizontal: 15}}>
              <TextfieldWithFloatingLabel
                ref='contractNumber'
                style={styles.textfieldWithFloatingLabel}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(text) => this.setState({text})}
                underlineColorAndroid={Colors.coal}
                value={this.state.text}
                placeholder={I18n.t('password')}
                     />
            </View>

            <TouchableWithoutFeedback>
              <Image source={Images.setupTouchButtonBlue}
                style={styles.modalbuttonStyle} />

            </TouchableWithoutFeedback>

          </Modal>
        </View>

      </ScrollView>

    )
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.flBlue.lightBlue,
    flex: 1
  },
  SecurityHintTitle: {
    fontWeight: 'bold',
    margin: 10,
    fontSize: 12
  },
  SecurityHintWrapper: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5
    // borderColor : 'red',
    // borderWidth : 1
  },
  form: {
    width: window.width - 30,
    // borderColor : 'red',
    // borderWidth : 1,
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20

  },
  click: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 200
  },
  textInput: {
    height: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1

  }

})

export default Confirmation
