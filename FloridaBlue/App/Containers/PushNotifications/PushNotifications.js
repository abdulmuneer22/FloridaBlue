
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
  ScrollView,
  Alert,
  Platform,
  ListView,
  BackAndroid
} from 'react-native'


import { Card } from 'native-base'
//import NotificationCard from './Components/NotificationCard'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import styles from './PushNotificationsStyle'
import NavItems from '../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const window = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';


const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class PushNotifications extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: Array(1).fill('').map((_, i) => `item #${i}`),
      messageInfo: {
        type: 'message',
        count: '3',
        time: '3',
        message: 'Time for Your Annual Wellness Exam',
        description: 'You earned 10 points',
        saved: true
      }
    };
  }


  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  _renderHeader() {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      {NavItems.backButton()}
      <Text style={styles.headerTextStyle}>Notifications</Text>
      {NavItems.settingsButton()}

    </Image>)
  }


  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={styles.container}>

          <SwipeListView style={{ marginTop: 10, margin: 10, flex: 1 }}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data => (
              <View style={styles.rowFront}>
                <View style={{ flex: 1, marginTop: 10 }}>
                  <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, alignItems: 'center', flex: 1 }}>

                    <Flb name="talk-chat" size={Metrics.icons.small * Metrics.screenWidth * 0.002} />

                    <Text style={{
                      color: Colors.flBlue.anvil,
                      marginLeft: 10,
                      fontSize: Fonts.size.screenWidth * 0.0025
                    }}>
                      Message
                      </Text>

                    <Text style={{
                      color: Colors.flBlue.anvil,
                      marginLeft: 5,
                      fontSize: Fonts.size.creenWidth * 0.0025
                    }}>· {this.state.messageInfo.time} min. ago
                      </Text>

                    <Flb name="chevron-down" style={{ marginLeft: 10 }} size={Metrics.icons.small * Metrics.screenWidth * 0.002} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{
                      paddingTop:
                      10, flexDirection: 'row',
                      marginRight: 10, flex: 1
                    }}>


                      <View style={{ marginLeft: 10, paddingTop: 5, flex: 0.2 }}>
                        <Flb name="doctor-coin" size={Metrics.icons.large * Metrics.screenWidth * 0.0025} />
                      </View>

                      <View style={{ flex: 0.8, marginRight: 10 }}>
                        <View style={{ flex: 0.4 }}>
                          <Text style={{
                            fontSize: 18,
                            fontWeight: '500', marginBottom: 1, paddingTop: 5, marginLeft: 1,
                            marginRight: 20
                          }}>{this.state.messageInfo.message}!</Text>
                        </View>
                        <View style={{ flex: 0.4, marginTop: 10 }}>
                          <Text style={{
                            marginBottom: 2,
                            color: Colors.flBlue.anvil,
                            fontSize: Fonts.size.regular
                          }} >
                            {this.state.messageInfo.description}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{
                      flex: 1, borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      justifyContent: 'center',
                      marginTop: 5,
                      // marginBottom:10,
                      backgroundColor: Colors.flBlue.sky
                    }}  >

                      <TouchableOpacity onPress={() => alert('Hello')}
                        style={{
                          flex: 1,
                          borderBottomLeftRadius: 10,
                          marginBottom: 15,
                          // borderBottomRightRadi
                          //height:35
                        }}>

                        <View style={{ flex: 1, marginTop: 10 }}>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                              <Text style={{
                                color: Colors.flBlue.anvil,
                                marginLeft: 20,
                                fontSize: Fonts.size.regular
                              }}>Save your rewards !</Text>

                            </View>
                            <View style={{ flex: 1 }}>
                              <Flb name="chevron-right" style={{ marginLeft: 20 }}
                                size={Metrics.icons.small * Metrics.screenWidth * 0.002} />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>

                    </View>

                  </View>


                </View>
              </View>
            )}
            renderHiddenRow={(data, secId, rowId, rowMap) => (
              <View style={{
                alignItems: 'center', flex: 1, marginTop: 5, flexDirection: 'row',
                borderRadius: 20
              }}>

                <TouchableOpacity style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  flex: 1,
                  borderRadius: 20,
                  backgroundColor: 'green',
                  right: 0,
                }} onPress={_ => this.deleteRow(secId, rowId, rowMap)} >
                  <View style={{
                    flex: 1, alignItems: 'flex-end',
                    //bottom: 0,
                    justifyContent: 'center',
                  }}>
                    <Text style={{
                      color: Colors.snow,
                      marginRight: 30,
                      fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025
                    }}>Clear</Text >

                  </View>
                </TouchableOpacity>
              </View>)}
            rightOpenValue={-90}
          />
        </View>
      </View>
    )
  }
}
export default PushNotifications