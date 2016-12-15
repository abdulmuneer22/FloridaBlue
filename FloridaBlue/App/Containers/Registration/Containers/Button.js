import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux'


class Button extends Component{

  _handlePress(){

    switch (this.props.target) {
      case 'Back':
        NavigationActions.pop()
        break;
      case 'Screen_3':
        NavigationActions.screen_3()
        break;
      case 'Screen_4':
        NavigationActions.screen_4()
        break;
      case 'screen_2':
        NavigationActions.screen_2()
          break;
      case 'Termsofuse':
            NavigationActions.Termsofuse()
            break;


      case 'memberid':

        NavigationActions.MemberId()
        break;


      default:

    }
  }

  render(){

    return(
      <TouchableOpacity style={[Styles.button,{backgroundColor : this.props.color}]}
      onPress={()=>{this._handlePress()}}
      >
      <Text style={Styles.buttonText}>
      {this.props.title}
      </Text>
      </TouchableOpacity>
    );
  }
}


const Styles = StyleSheet.create({
  button : {

    padding : 10,
    borderColor : 'rgba(17, 147, 203,0.9)',
    borderRadius : 7,
    alignItems : 'center',
    justifyContent : 'center',
  },
  buttonText : {
    color : 'rgba(242, 246, 247   ,0.9)',
    fontWeight : 'bold',
    fontSize : 12
  }
});
export default Button
