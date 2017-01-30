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
      <View style={Styles.summary}>
      <View style={[Styles.center,{flex:0.3}]}>
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

      <View style={{flex:0.7,alignItems:'center', padding:20}}>
      <Text style={{
        fontSize : Fonts.size.h4,
        fontWeight : 'bold',
        alignSelf : 'stretch',
        alignItems:'center',
        justifyContent:'center',
        height:40
      }}>
      My Health Plan
      </Text>
        <Text style={{fontSize:13,marginTop:20}}>
              Find information about deductibles, claims, your savings, and more.
              </Text>

              <Text style={{fontSize:13,marginTop:20}}>
               * Dental & Vision are in the menu</Text>
               </View>

    <View style={{marginTop:80,marginRight:15}}>
<Icon name="chevron-right" size={30} color="black"/>
</View>


      </View>
      </TouchableOpacity>
    );
  }
}

const Styles = StyleSheet.create({
  summary:{
    flexDirection:'row',
    height:200,
    backgroundColor:'#E8E8E8'
  },
  features:{
    flexDirection:'row',
    height:150,
    margin:0
  },
  titleView:{
    marginTop:10
  },
  center:{
    alignItems:'center',
    justifyContent:'center'
  }
});
export default MyPlanCard
