import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions as NavigationActions} from 'react-native-router-flux'

class Card extends Component{

  _handleCardClick(){
    switch(this.props.title){
      case 'Benefits':
      NavigationActions.myplanbenefits()
      break;
      default :
      return null
    }
  }
  render(){
    return(
      <View style={{
        backgroundColor : this.props.bg,
        width : window.width * 0.5,
        height : 170,
        alignItems : 'center',
        justifyContent : 'center'

      }}>
      <TouchableWithoutFeedback
      onPress = {()=>{this._handleCardClick()}}
      >
      <View style={{alignItems : 'center'}}>
      <Icon name={this.props.icon} size={40} color="black" />
      <Text style={{
        marginTop : 20,
        fontSize : 14,
        fontWeight : '300',
        width : 120,
        textAlign : 'center'
      }}>
      {this.props.title}
      </Text>

      </View>

      </TouchableWithoutFeedback>
      </View>
    );
  }
}



export default Card
