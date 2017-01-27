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
import {Colors,Metrics,Fonts} from '../../../../../Themes'

const window = Dimensions.get('window');

class MyPlanCard extends Component{
  render(){
    return(
      <TouchableOpacity onPress={()=>NavigationActions.Myplan()}>
      <View style={Styles.myPlanWrapper}>
      <Text style={{
        fontSize : Fonts.size.h4,
        fontWeight : 'bold',
        textAlign : 'center'
      }}>
      My Health Plan
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
              <Text style={{marginRight:20}}>
              Find information about deductibles, claims, your savings, and more.
              </Text>
              <View>
              <Text style={{marginTop:10}}>
               * Dental & Vision are in the menu</Text>
               </View>
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
    padding : 10
  }
});
export default MyPlanCard
