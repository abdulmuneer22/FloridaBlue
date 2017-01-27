import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import {Actions as NavigationActions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors,Fonts,Metrics} from '../../../../../Themes'
const window = Dimensions.get('window');

class MyPlanCard extends Component{
  render(){
    return(
        <TouchableOpacity onPress={()=>NavigationActions.Myplan()}>
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
            backgroundColor : Colors.flBlue.ocean,
            width : 60,
            height : 60,
            borderRadius : 60/2,
            alignItems :'center',
            justifyContent : 'center'
        }}
         onPress={()=>NavigationActions.Myplan()}>
        <Icon name="heartbeat" size={40} color="white" />

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
    <View style={{marginTop:10}}>

<Icon name="chevron-right" size={30} color="black"/>

    </View>
      </View>

      </View>
      </TouchableOpacity>
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
