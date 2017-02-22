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
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'
const window = Dimensions.get('window')

import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux'
import Flb from '../../../../Themes/FlbIcon'

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string,
  visibilityRules : object,
  attemptMember: () => void
}

class HSA extends Component {

  _renderHeader () {
    return (<Image style={styles.hsaHeader} source={Images.hsaHeader}>

      <View style={{marginLeft:Metrics.screenWidth*0.025}}>
      {NavItems.backButton()}
      </View>
      <View style={{marginRight:Metrics.screenWidth*0.035}}>
    {NavItems.settingsButton()}
    </View>
    </Image>)
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <View style={{flex:1}}>

            <Text style={styles.hsaText}>
                Health Savings Account
                </Text>

            <View style={{flexDirection:'row', justifyContent:'center', marginTop:5}}>
            <View>
              <Text style={styles.hsaTextStyle1}>Current Balance :</Text>
              </View>
              <View style={{marginLeft:10}}>
              <Text style={styles.hsaTextStyle2}>$3,125</Text>
            </View>
            </View>
            <View style={styles.row_1}>
            <View style={styles.col_1}>
              <Text style={styles.hsaTextStyle1}>YTD</Text>
              <Text style={styles.hsaTextStyle1}>Contribution</Text>
              <Text style={styles.hsaTextStyle2}>$2,250</Text>
            </View>

          <View style={styles.col_1}>
            <Text style={styles.hsaTextStyle1}>YTD</Text>
            <Text style={styles.hsaTextStyle1}>Distribution</Text>
            <Text style={styles.hsaTextStyle2}>-$2,250</Text>
          </View>
          </View>


        <Image style={styles.hsaBg} source={Images.hsaBg} />
        </View>
      </View>
    )
  }
    }

export default HSA
