
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
import Swipeout from 'react-native-swipeout'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'
import NotificationActions from '../../Redux/NotificationRedux'

const theme = getTheme()
let gaTracker = new GoogleAnalyticsTracker('UA-43067611-3')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class NotificationsView extends Component {
  constructor (props) {
    super(props)
    this.deleteRow = this.deleteRow.bind(this)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      listViewData: {},
      secId: null,
      rowId: null,
      messageId: null

    }
  }

  componentDidMount () {
    gaTracker.trackScreenView('Notifications')
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
    this.props.onLocalNotification(false)
    this.props.onOpenedFromTray(false)
    FCM.setBadgeNumber(0)
    this.props.markAllRead(true)
    this.props.postArchive({
      'messageId': '',
      'markAllRead': true
    })
  }

  deleteRow (secId, rowId) {
    console.log(secId, rowId)
   // rowMap[`${secId}${rowId}`].closeRow()
    const newData = [...this.props.notification]
    newData.splice(rowId, 1)
    /*
    this.props.postArchive({
      'messageId': messageId,
      'markAllRead': false
    })
    */
    console.log('newData', newData)
    if (newData) {
      this.props.deleteNotification(newData)
    }
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
    } else if (this.props.notification && Object(this.props.notification).length > 0) {
      var that = this
      return (
        <ListView style={{flex: 1}}
          scrollEnabled
          dataSource={this.props.notification && Object(this.props.notification).length > 0 ? this.ds.cloneWithRows(this.props.notification) : {}}
          enableEmptySections
          disableRightSwipe
          renderRow={(data, secId, rowId, rowMap) => (

            <Swipeout
              style={{
                margin: 10
              }}
              close={!(this.state.secId === secId && this.state.rowId === rowId)}
              right={
                [{
                  text: 'Delete',
                  onPress: function () {
                    const newData = [...that.props.notification]
                    newData.splice(that.state.rowId, 1)
                    that.props.postArchive({
                      'messageId': that.props.notification[that.state.rowId].messageId,
                      'markAllRead': false
                    })
                    if (newData) {
                      that.props.deleteNotification(newData)
                    }
                  },
                  type: 'default',
                  backgroundColor: Colors.flBlue.grass
                }]}
              rowID={rowId}
              sectionID={secId}
              autoClose
              backgroundColor={Colors.bg2}
              onOpen={(secId, rowId) => {
                console.log('secId,rowId', secId, rowId)
                this.setState({
                  secId,
                  rowId
                })
              }}
              onClose={() => console.log('===close')}
              scroll={event => console.log('scroll event', event)}
      >
              <View style={styles.rowFront}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', marginLeft: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002, marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002, alignItems: 'center', flex: 1 }}>
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
                      paddingTop: Metrics.baseMargin * Metrics.screenHeight * 0.002,
                      flexDirection: 'row',
                      marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.001,
                      flex: 1
                    }}>
                      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002, paddingTop: 5, flex: 0.2 }}>
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
                            marginRight: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002
                          }}>{data.title}</Text>
                        </View>
                        <View style={{ flex: 0.4, marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.002 }}>
                          <Text style={{
                            marginBottom: 2,
                            color: Colors.flBlue.anvil,
                            fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0022
                          }} >
                            {data.cardContent}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity onPress={() => {
                      if (data.link) {
                        if (data.link.type === 'webview') {
                          var webview = 'MyView'
                          NavigationActions[webview]({ responseURL: data.link.name })
                        } else if (data.link.type === 'native') {
                          var routerName = data.link.name
                          NavigationActions[routerName]()
                        } else if (data.link.type === 'href') {
                          Linking.openURL(data.link.name)
                        }
                      }
                    }}
                      style={{
                        flex: 1,
                        borderBottomLeftRadius: Metrics.baseMargin * Metrics.screenWidth * 0.002,
                        borderBottomRightRadius: Metrics.baseMargin * Metrics.screenWidth * 0.002,
                        justifyContent: 'center',
                   // alignItems:'center',
                        marginTop: Metrics.smallMargin * Metrics.screenWidth * 0.002,
                      // marginBottom:10,
                        backgroundColor: Colors.flBlue[data.style.barColor]
                      }}>
                      <View style={{
                        flex: 1,
                        borderBottomLeftRadius: Metrics.baseMargin * Metrics.screenWidth * 0.002,
                        borderBottomRightRadius: Metrics.baseMargin * Metrics.screenWidth * 0.002,
                        justifyContent: 'center',
                   // alignItems:'center',
                        marginTop: Metrics.smallMargin * Metrics.screenWidth * 0.002,
                      // marginBottom:10,
                        backgroundColor: Colors.flBlue[data.style.barColor]
                      }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                              <Text allowFontScaling={false} style={{
                                color: Colors.flBlue[data.style.color],
                                marginLeft: Metrics.doubleBaseMargin * Metrics.screenWidth * 0.002,
                                fontSize: Fonts.size.regular,
                                marginBottom: Metrics.smallMargin * Metrics.screenWidth * 0.002
                              }}>{data && data.link ? data.link.desc : null }</Text>
                              {data && data.link
                            ? <Flb name='chevron-right' style={{marginBottom: Metrics.smallMargin * Metrics.screenWidth * 0.002, marginLeft: Metrics.smallMargin * Metrics.screenWidth * 0.003, color: Colors.flBlue[data.style.color] }}
                              size={Metrics.icons.small * Metrics.screenWidth * 0.002} /> : <View />}
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </Swipeout>
            )}

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
    markAllRead: (allRead) => dispatch(NotificationActions.markAllRead(allRead)),
    deleteNotification: (newData) => dispatch(NotificationActions.deleteNotification(newData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsView)
