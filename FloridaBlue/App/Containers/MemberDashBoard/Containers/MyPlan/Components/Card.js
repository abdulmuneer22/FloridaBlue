import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  Platform
} from 'react-native'

// import SafariView from  'react-native-safari-view'

const window = Dimensions.get('window')
import {Colors, Metrics, Fonts, Images} from '../../../../../Themes'
import styles from '../MyPlanScreenStyle.js'
import NavItems from '../../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MyPlanActions from '../../../../../Redux/MyPlanRedux'
import { connect } from 'react-redux'
import Flb from '../../../../../Themes/FlbIcon'
import LinearGradient from 'react-native-linear-gradient'

var image = [
  Images.dashboardGradient,
  Images.dashboardGradient2,
  Images.dashboardGradient3,
  Images.dashboardGradient4,
  Images.dashboardGradient,
  Images.dashboardGradient2,
  Images.dashboardGradient3,
  Images.dashboardGradient4,
  Images.dashboardGradient,
  Images.dashboardGradient2,
  Images.dashboardGradient3,
  Images.dashboardGradient4
]

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      CardWidth: (window.width * 0.88) / 2
    }
  }

  componentWillMount () {
    // console.tron.log(this.props.i)
    // console.tron.log(this.props.CardCount)
    const index = this.props.i + 1
    const count = this.props.CardCount
    if (count % 2 !== 0) {
      // console.tron.log("odd number cards !!")

      if (index === count) {
      // console.tron.log("index" ,index)
      // console.tron.log("count" , count)
        this.setState({
          CardWidth: (window.width * 0.92)
        })
      }
    }
  }

  customNavigation () {
    console.tron.log(this.props)
    var action
    if (this.props.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.webURL})
    } else if (this.props.tileType == 'native') {
      var routerName = this.props.routerName
      action = NavigationActions[routerName]()
    }
  }

  render () {
    console.tron.log(this.props.gradientImage)
    return (

      <TouchableOpacity
        onPress={() => {
          this.customNavigation()
        }}
        style={{
      //   backgroundColor : "red",
        // width : this.props.i === this.props.CardCount ? (window.width * 0.85) : null,
          width: this.state.CardWidth,
          height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: this.props.i % 2 !== 0 ? window.width * 0.04 : null,
        // marginRight :
        // marginTop : 10,

          marginBottom: window.width * 0.03

        }}>
        <View style={{flex:1}} >
          <LinearGradient colors={this.props.gradientColor}
            style={{
              width: this.state.CardWidth,
              height: (Platform.OS === 'ios') ? Metrics.screenHeight - (Metrics.screenHeight * 0.77) : Metrics.screenHeight - (Metrics.screenHeight * 0.79)
        //    alignItems: 'center',
        //    justifyContent: 'center'
            }}
           >

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={Images[this.props.gradientImage]}
                style={{flex: 1, justifyContent: 'center', alignItems: 'center',
                  width: Platform.OS == 'ios' ? (Metrics.screenWidth) - (Metrics.screenWidth * 0.55) : (Metrics.screenWidth) - (Metrics.screenWidth * 0.56)}} >

                <View style={{alignItems: 'center'}} >
                  <Text style={{
                  // marginTop: Metrics.mediumMargin,
                   // marginBottom: -15,
                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0030,
                    fontWeight: (Platform.OS === 'ios') ? '600' : '400',
                    color: Colors.snow,
                    backgroundColor: Colors.transparent
                  }}>
                    {this.props.title}
                  </Text>
                </View>

              </Image>
            </View>

          </LinearGradient>
        </View>

      </TouchableOpacity>

    )
  }
}

export default Card
