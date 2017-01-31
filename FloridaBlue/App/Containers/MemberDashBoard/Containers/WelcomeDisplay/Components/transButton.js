import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native'

const window = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';

class TransButton extends Component{
  render(){
    return(



              <View style={{
              height : 120,
              marginBottom:0,
                backgroundColor : 'rgba(48, 48, 40,0.8)',
                alignItems : 'center',
                justifyContent : 'center',
                flexDirection : 'row'
              }}>

              <Icon name="search" size={24} color="white" />


              <Text style={{
                color : 'white',
                fontWeight : '300',
                fontSize : 16,
                paddingLeft : 10
              }}>
              Find Care
              </Text>


              </View>



    );
  }
}


export default TransButton
