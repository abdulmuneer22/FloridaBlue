
import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ListView,
  Alert,
  Linking
} from 'react-native'
// import NotificationCard from './Components/NotificationCard'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import styles from './NotificationsViewStyle'
import NavItems from '../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Flb from '../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
const window = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PushController from './PushController'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'

import NotificationActions from '../../Redux/NotificationRedux'
const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class NotificationsView extends Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      listViewData: {}
    }
  }

  componentDidMount () {
   // this.props.getNotification()
    this.props.onLocalNotification(false)
    this.props.onOpenedFromTray(false)
    FCM.setBadgeNumber(0)
    this.props.markAllRead(true)
    this.props.postArchive({
      'messageId': '',
      'markAllRead': true
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.notification && nextProps.notification.messages && Object(nextProps.notification.messages).length > 0) {
      const newData = Array(Object(nextProps.notification.messages).length).fill('').map((_, i) => nextProps.notification.messages[i])
      this.setState({ listViewData: newData })
    }

    FCM.setBadgeNumber(0)
  }

  deleteRow (secId, rowId, rowMap, messageId) {
    console.log(secId, rowId, rowMap, messageId)
    rowMap[`${secId}${rowId}`].closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.props.postArchive({
      'messageId': messageId,
      'markAllRead': false
    })
    this.setState({ listViewData: newData })
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      {NavItems.backButton()}
      <Text allowFontScaling={false} style={styles.headerTextStyle}>Notifications</Text>
      {NavItems.settingsButton()}

    </Image>)
  }
  _displayCondiition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.notification && this.props.notification.messages && Object(this.props.notification.messages).length > 0) {
      return (
        <SwipeListView style={{ marginTop: 10, margin: 10, flex: 1 }}
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          enableEmptySections
          disableRightSwipe
          renderRow={data => (
            <View style={styles.rowFront}>
              <View style={{ flex: 1, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, alignItems: 'center', flex: 1 }}>
                  <Text allowFontScaling={false} style={{
                    color: Colors.flBlue.anvil,
                    marginLeft: 10,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.002
                  }}>
                    {data.sendDate}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    marginRight: 10,
                    flex: 1
                  }}>
                    <View style={{ marginLeft: 10, paddingTop: 5, flex: 0.2 }}>
                      <Flb name={data.style.icon} size={Metrics.icons.large * Metrics.screenWidth * 0.0025} color={Colors.flBlue[data.style.color]} />
                    </View>
                    <View style={{ flex: 0.8, marginRight: 10 }}>
                      <View style={{ flex: 0.4 }}>
                        <Text allowFontScaling={false} style={{
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
                          color: Colors.flBlue.anvil,
                          fontWeight: '500',
                          marginBottom: 1,
                          paddingTop: 5,
                          marginLeft: 1,
                          marginRight: 20
                        }}>{data.title}!</Text>
                      </View>
                      <View style={{ flex: 0.4, marginTop: 10 }}>
                        <Text style={{
                          marginBottom: 2,
                          color: Colors.flBlue.anvil,
                          fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0022
                        }} >
                          {data.body}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{
                    flex: 1,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    justifyContent: 'center',
                    marginTop: 5,
                      // marginBottom:10,
                    backgroundColor: Colors.flBlue[data.style.barColor]
                  }}>
                    <TouchableOpacity onPress={() => {
                      if (data.link.type === 'webview') {
                        var webview = 'MyView'
                        NavigationActions[webview]({ responseURL: data.link.name })
                      } else if (data.link.type === 'native') {
                        var routerName = data.link.name
                        NavigationActions[routerName]()
                      } else if (data.link.type === 'href') {
                        Linking.openURL(data.link.name)
                      }
                    }}
                      style={{
                        flex: 1,
                        borderBottomLeftRadius: 10,
                        marginBottom: 15
                          // borderBottomRightRadi
                          // height:35
                      }}>
                      <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Text allowFontScaling={false} style={{
                              color: Colors.flBlue[data.style.color],
                              marginLeft: 20,
                              fontSize: Fonts.size.regular
                            }}>{data && data.link ? data.link.desc : null }</Text>
                            {data && data.link
                            ? <Flb name='chevron-right' style={{ marginLeft: 20, color: Colors.flBlue[data.style.color] }}
                              size={Metrics.icons.small * Metrics.screenWidth * 0.002} /> : <View />}
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
              alignItems: 'center',
              flex: 1,
              marginTop: 5,
              flexDirection: 'row',
              borderRadius: 20
            }}>
              <TouchableOpacity style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                flex: 1,
                borderRadius: 20,
                backgroundColor: 'green',
                right: 0
              }} onPress={_ => this.deleteRow(secId, rowId, rowMap, data.messageId)} >
                <View style={{
                  flex: 1,
                  alignItems: 'flex-end',
                    // bottom: 0,
                  justifyContent: 'center'
                }}>
                  <Text allowFontScaling={false} style={{
                    color: Colors.snow,
                    marginRight: 30,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025
                  }}>Clear</Text >
                </View>
              </TouchableOpacity>
            </View>)}
          rightOpenValue={-90}
          />)
    } else if (this.props.error != null) {
      Alert.alert(
        'Notification',
       'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [{
          text: 'OK'
        }])
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <View style={styles.container}>
          {this._displayCondiition()}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.Notification.fetching,
    notification: state.Notification.notification,
    error: state.Notification.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: () => dispatch(NotificationActions.getNotification()),
    onOpenedFromTray: (openedFromTray) => dispatch(NotificationActions.onOpenedFromTray(openedFromTray)),
    onLocalNotification: (localNotification) => dispatch(NotificationActions.onLocalNotification(localNotification)),
    postArchive: (archiveObject) => dispatch(NotificationActions.postArchive(archiveObject)),
    markAllRead: (allRead) => dispatch(NotificationActions.markAllRead(allRead))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView)
