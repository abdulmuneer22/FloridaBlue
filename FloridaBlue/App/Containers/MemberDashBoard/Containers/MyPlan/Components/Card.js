import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native'

//import SafariView from  'react-native-safari-view'

const window = Dimensions.get('window');
import {Colors, Metrics, Fonts, Images} from '../../../../../Themes'
import styles from '../MyPlanScreenStyle.js'
import NavItems from '../../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MyPlanActions from '../../../../../Redux/MyPlanRedux'
import { connect } from 'react-redux'
import Flb from '../../../../../Themes/FlbIcon'

var image = [
    Images.dashboardGradient ,
    Images.dashboardGradient2 ,
    Images.dashboardGradient3 ,
    Images.dashboardGradient4,
    Images.dashboardGradient ,
    Images.dashboardGradient2 ,
    Images.dashboardGradient3 ,
    Images.dashboardGradient4,
    Images.dashboardGradient ,
    Images.dashboardGradient2 ,
    Images.dashboardGradient3 ,
    Images.dashboardGradient4
]


class Card extends Component{

  constructor(props){
    super(props);
    this.state = {
      CardWidth : (window.width * 0.88) / 2
    }
  }



  componentWillMount(){
    // console.log(this.props.i)
    // console.log(this.props.CardCount)
    const index = this.props.i + 1
    const count = this.props.CardCount
    if(count % 2 !== 0){
      //console.log("odd number cards !!")

      if(index === count){
      // console.log("index" ,index)
      // console.log("count" , count)
      this.setState({
        CardWidth : (window.width * 0.92)
      })
      }
    }
  }

  customNavigation(){
    console.log(this.props);
    var action
    if (this.props.tileType == 'webview') {
      action = NavigationActions.MyView({responseURL: this.props.webURL})

    }else if (this.props.tileType == 'native') {
      var routerName = this.props.routerName
      action = NavigationActions[routerName]()
    }

}

  render(){
    return(

      <TouchableOpacity
      onPress = {()=>{
        this.customNavigation()
      }}
      style={{
        //backgroundColor : "red",
        //width : this.props.i === this.props.CardCount ? (window.width * 0.85) : null,
        width : this.state.CardWidth,
        height : Metrics.screenHeight - (Metrics.screenHeight * 0.75),
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : this.props.i % 2 !== 0 ? window.width * 0.04 : null,
        //marginRight :
        //marginTop : 10,

        marginBottom : window.width * 0.03

      }}>
      <View style={{alignItems : 'center'}}>
      <Image style={{
        width : this.state.CardWidth,
        height : Metrics.screenHeight - (Metrics.screenHeight * 0.75),
        alignItems : 'center',
        justifyContent : 'center'
      }}
      source = {image[this.props.i]}
      >

      <Flb name={this.props.icon} style={{backgroundColor:Colors.transparent, marginTop:Metrics.baseMargin}} size={Metrics.icons.large * Metrics.screenWidth * 0.0025} color={Colors.snow} />
      <Text style={{
        marginTop : Metrics.mediumMargin,
        fontSize : Fonts.size.regular *Metrics.screenWidth * 0.0030,
        fontWeight : '600',
        color : Colors.snow,
        backgroundColor:Colors.transparent
      }}>
      {this.props.title}
      </Text>
      </Image>
      </View>

      </TouchableOpacity>


    );
  }
}



export default Card
