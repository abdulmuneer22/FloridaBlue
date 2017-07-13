import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import axios from 'axios'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors, Metrics, Fonts} from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import styles from '../DashBoardStyle'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'

var messageCount = ''
const theme = getTheme()

class Greeting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      greetText: ''
    }
  }

  _getTimeText () {
    var currentDate = new Date()
    var hours = currentDate.getHours()
    // alert(hours)
    if (hours < 12) {
      // alert("Good Morning")
      this.setState({ greetText: 'Good Morning,' })
    } else {
      if (hours >= 12) {
        if (hours < 17) {
          // alert("Good Afternoon")
          this.setState({ greetText: 'Good Afternoon,' })
        } else {
          // alert("Good evening")
          this.setState({ greetText: 'Good Evening,' })
        }
      }
    }
  }

/*  _getUserData(){
    axios.get('http://localhost:9000/members')
    .then((response)=>{
      console.tron.log(response.data.firstName + " " + response.data.lastName);
      this.setState({
        userName : response.data.firstName + " " + response.data.lastName
      });

    })
  }
*/

  componentDidMount () {
    this._getTimeText()
    console.log('I am getting mounted')
    FCM.getBadgeNumber().then(number => console.log('badge', number))
  }

  render () {
    return (
      <View style={this.props.isPortrait ? styles.greetingView : styles.greetingViewLandscape}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}
            onPress={() => NavigationActions.PushNotifications()}>
            <View style={{flex: 6, alignItems: 'flex-end', justifyContent: 'center'}}>
               <Text allowFontScaling={false} style={styles.greetingText}>
              {this.state.greetText} {this.props.userName ? this.props.userName : ''}!
          </Text>
            </View>
            <View style={{flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>
              <View style={{flex: 2, alignItems: 'flex-start', justifyContent: 'center'}}>
                { this.props.unreadNotification && this.props.unreadNotification > 0 && !this.props.allRead
                ? <Flb name={this.props.unreadNotification > 10 ? '10-plus-filled'
                : this.props.unreadNotification + '-filled'}
                  size={Metrics.icons.small}
                  color={Colors.flBlue.orange}
                  style={{margin: 10}} />
               : <Flb name='email-envelope' size={Metrics.icons.small} color={Colors.flBlue.orange} style={{margin: 10}} /> }
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Greeting