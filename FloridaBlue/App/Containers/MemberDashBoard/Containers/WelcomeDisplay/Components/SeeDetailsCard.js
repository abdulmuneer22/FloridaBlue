import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

class SeeDetailsCard extends Component{
  render(){
    return(
      <View style={{
        width : window.width * 0.5,
        backgroundColor : this.props.bg,
        height : 150,
        alignItems : 'center',
        justifyContent : 'center',
      }}>
      <View style={{
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row'
      }}>

      <View style={{
        flex : 1,
        //borderColor : 'red',
        //borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'center'
      }}>
      <Icon name={this.props.icon} size={20} color="black" />
      </View>


      <View style={{
        flex : 3
      }}>
      <Text style={{

        fontSize : 10,
        fontWeight : '600',
        padding : 10
      }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      </Text>
      </View>


      </View>
      <Text style={{
        textAlign : 'center',
        padding : 10,
        fontWeight : '600'
      }}>
      See Details
      </Text>
      </View>

    );
  }
}

export default SeeDetailsCard
