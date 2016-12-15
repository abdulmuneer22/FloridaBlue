import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';


class ToolBar extends Component{
  render(){
    return(
      <View style={{
        marginTop : 20,
        backgroundColor : 'grey',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        height : 40
      }}>
        <View style={Styles.left}>

        <TouchableOpacity>
        <Icon name="bars" size={20} color="black" />
        </TouchableOpacity>
        </View>

        <View style={Styles.middle}>
        <Text style={{fontSize:20}}>
        Florida Blue
        </Text>
        </View>


        <View style={Styles.right}>
        <TouchableOpacity>
        <Icon name="ellipsis-h" size={20} color="black" />
        </TouchableOpacity>

        </View>

      </View>
    );
  }
}


const Styles = StyleSheet.create({
  left : {
    //backgroundColor : 'red',
    flex : 1,
    padding : 10
  },
  right : {
    //backgroundColor : 'green',
    flex : 1,
    padding : 10,
    alignItems : 'flex-end'
  },
  middle : {
    //backgroundColor : 'purple',
    flex : 2,
    justifyContent : 'center',
    alignItems : 'center'
  }

});
export default ToolBar
