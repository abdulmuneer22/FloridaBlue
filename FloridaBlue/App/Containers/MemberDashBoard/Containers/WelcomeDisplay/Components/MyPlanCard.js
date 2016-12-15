import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

const window = Dimensions.get('window');

class MyPlanCard extends Component{
  render(){
    return(
      <View style={Styles.myPlanWrapper}>
      <Text style={{
        fontSize : 16,
        fontWeight : '600',
        textAlign : 'center'
      }}>
      My Plan
      </Text>

      <View style={{
        flexDirection : 'row',
        marginTop : 30
      }}>
        <View style={{
          flex : 1,
          //borderColor : 'green',
          //borderWidth : 1,
          alignItems : 'center'

        }}>
        <View style={{
            backgroundColor : 'rgb(174, 179, 182)',
            width : 50,
            height : 50,
            borderRadius : 50/2,
            alignItems :'center',
            justifyContent : 'center'
        }}>
        <Icon name="heartbeat" size={30} color="white" />
        </View>


        </View>

        <View style={{
          flex : 3,
          //borderColor : 'red',
          //borderWidth : 1,
          justifyContent : 'center',
          paddingLeft : 10

        }}>
              <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
        </View>


      </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  myPlanWrapper : {
    width : window.width,
    backgroundColor : 'rgb(228, 230, 231 )',
    height : 160,
    alignItems : 'center',
    //justifyContent : 'center',
    padding : 15
  }
});
export default MyPlanCard
