import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

class Card extends Component{
  render(){
    return(
      <View style={{
        width : window.width * 0.5,
        backgroundColor : this.props.bg,
        height : 150,
        alignItems : 'center',
        justifyContent : 'center'
        //borderColor : 'red',
        //borderWidth : 1
      }}>

      <TouchableOpacity>
      <Icon name={this.props.icon} size={40} color="black" />

      <Text style={{
        marginTop : 20,
        fontSize : 14,
        fontWeight : '600'
      }}>
      {this.props.title}
      </Text>
      </TouchableOpacity>
      </View>
    );
  }
}

export default Card
