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

import {Colors,Metrics,Fonts} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux';
import Flb from './FlbIcon'


type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  visibilityRules : object,
  attemptMember: () => void
}

class HSA extends Component {


  _renderHeader(){
  return( <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,marginLeft:10}]}>My Plan Overview</Text>
    {NavItems.settingsButton()}

    </View>)
    }

        render(){
            return(
                <View style ={Style.wrapper}>
                {this._renderHeader()}

                <Text style={Style.hsaText}>
                Health Savings Account
                </Text>

                <View style={Style.content}>
                    <View style={Style.row_1}>
                        <View style={Style.col_1}>
                        <Text style={Style.textStyle}>Current</Text>
                        <Text style={Style.textStyle}>Balance</Text>
                        <Text style={Style.textStyle}>$3,125</Text>

                        </View>

                        <View style={Style.col_2}>
                            <Text style={Style.textStyle}>YTD</Text>
                            <Text style={Style.textStyle}>Contributiont</Text>
                            <Text style={Style.textStyle}>$2,250</Text>

                        </View>





                    </View>

                    <View style={Style.row_2}>
                        <Text style={Style.textStyle}>YTD</Text>
                        <Text style={Style.textStyle}>Distribution</Text>
                        <Text style={Style.textStyle}>-$2.250</Text>

                    </View>



                </View>
                </View>
            )
        }
    }

    const Style = StyleSheet.create({
        wrapper : {
            flex : 1 ,
            // backgroundColor : 'red',

        },
        hsaText : {
            fontSize : 16,
            fontWeight : '600',
            textAlign : 'center',
            padding : 15
        },
        content : {
            flex : 1,
            // backgroundColor : 'green'
        },
        row_1 : {
            flexDirection : 'row',
            justifyContent : 'center',
            paddingTop : 30,
            paddingBottom : 30
        },
        col_1 : {
            flex : 1,
            // backgroundColor : 'yellow',
            alignItems : 'center'
        },
        col_2 : {
            flex : 1,
            // backgroundColor : 'purple',
            alignItems : 'center'


        },
        row_2 : {
            alignItems : 'center',
            paddingTop : 15
        },
        textStyle : {
            fontSize : 16,
            fontWeight : '500'
        }
    });
    export default HSA
