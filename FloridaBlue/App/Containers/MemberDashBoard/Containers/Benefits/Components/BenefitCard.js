import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native'

// import SafariView from  'react-native-safari-view'
import { Card as BCard} from 'native-base'
const window = Dimensions.get('window')
import {Colors, Metrics, Fonts, Images} from '../../../../../Themes'
import styles from '../BenefitsStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MyPlanActions from '../../../../../Redux/MyPlanRedux'
import { connect } from 'react-redux'
import Flb from '../../../../../Themes/FlbIcon'

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
    if (this.props.tileType == 'native') {
      var routerName = this.props.routerName
      action = NavigationActions[routerName]({objectName: this.props.objectName})
    }
  }

  // /onItemPress = function () {
  //         var action
  //         if (tile.tileType == 'native') {
  //           var routerName = tile.routerName
  //           var objectName = tile.tileId
  //           action = NavigationActions[routerName]({objectName: objectName})
  //         }
  //       //

  render () {
    return (

      <TouchableOpacity
        onPress={() => {
          this.customNavigation()
        }}
        style={{
        // backgroundColor : "red",
        // width : this.props.i === this.props.CardCount ? (window.width * 0.85) : null,
        //  width: this.state.CardWidth,
        //  height: Metrics.screenHeight - (Metrics.screenHeight * 0.75),
          alignItems: 'center',
          justifyContent: 'center',
          // marginLeft: this.props.i % 2 !== 0 ? window.width * 0.04 : null,
        // marginRight :
        // marginTop :-0,
          flex: 1
         // marginBottom: window.width * 0.03

        }}>

        <BCard style={{alignItems: 'center', flexDirection: 'row',
          flex: 1,
         //    width: this.state.CardWidth,
          height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)

           // justifyContent: 'center'

        }}>

          <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.transparent}}>
            <Flb name={this.props.icon} size={Metrics.icons.regular} color={Colors.flBlue.purple} />
          </View>
          <View style={{flex: 6, alignItems: 'flex-start'}}>
            <Text style={{
             // marginTop: Metrics.baseMargin,
              fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00265,
             // textAlign: 'center',
              fontWeight: '600',
              color: Colors.flBlue.grey3,
              backgroundColor: Colors.transparent,
              fontFamily: Fonts.type.subHeaderFont
            }}>
              {this.props.title}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: Colors.transparent}}>
            <Flb name='chevron-right' size={Metrics.icons.small} color={Colors.flBlue.purple} />
          </View>

        </BCard>

      </TouchableOpacity>

    )
  }
}

export default Card
