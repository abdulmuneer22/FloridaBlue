import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors, Metrics, Fonts} from '../../../Themes'
import Flb from '../../../Themes/FlbIcon'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import styles from '../DashBoardStyle'

var messageCount = ''
const theme = getTheme()

class Greeting extends Component {
  constructor () {
    super()
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
  }

  render () {
    return (
      <View >
        <View style={styles.greetingView}>
          <Text style={styles.greetingText}>
            {this.state.greetText} {this.props.userName ? this.props.userName : ''}!
          </Text>

        </View>

        {
        messageCount
          ? <View style={styles.messageCountStyle}>

            <Flb name='email-envelope' size={Metrics.icons.small} />
            <Text style={styles.messageTextStyle}> You have {messageCount} new messages. </Text>

          </View>
        : null
      }
      </View>

    )
  }
}

export default Greeting
