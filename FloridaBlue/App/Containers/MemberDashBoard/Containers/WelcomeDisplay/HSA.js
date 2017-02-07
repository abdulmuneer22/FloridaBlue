import React, { Component } from 'react';
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
} from 'react-native';
const window = Dimensions.get('window');

import {Colors,Metrics,Fonts,Images} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux';
import Flb from '../../../../Themes/FlbIcon'


type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  visibilityRules : object,
  attemptMember: () => void
}

class HSA extends Component {


  _renderHeader(){
  return( <Image style={styles.hsaHeader} source={Images.hsaHeader}>
      {NavItems.backButton()}
    {NavItems.settingsButton()}
  </Image>)
  }

        render(){
            return(
                <View style ={styles.container}>
                {this._renderHeader()}
                <Text style={styles.hsaText}>
                Health Savings Account
                </Text>

                <View style={styles.container}>
                    <View style={styles.row_1}>
                        <View style={styles.col_1}>
                        <Text style={styles.textStyle1}>Current</Text>
                        <Text style={styles.textStyle1}>Balance</Text>
                        <Text style={styles.textStyle1}>$3,125</Text>
                        </View>

                        <View style={styles.col_1}>
                            <Text style={styles.textStyle1}>YTD</Text>
                            <Text style={styles.textStyle1}>Contributiont</Text>
                            <Text style={styles.textStyle1}>$2,250</Text>

                        </View>
                  </View>

                    <View style={styles.row_2}>
                        <Text style={styles.textStyle1}>YTD</Text>
                        <Text style={styles.textStyle1}>Distribution</Text>
                        <Text style={styles.textStyle1}>-$2.250</Text>
                    </View>




                </View>
                <Image style={styles.hsaBg} source={Images.hsaBg}>

                </Image>
                </View>
            )
        }
    }


    export default HSA
