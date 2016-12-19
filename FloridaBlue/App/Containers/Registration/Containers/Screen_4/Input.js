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

const window = Dimensions.get('window');



class Input extends Component{
  constructor(){
    super();
    this.state = {
      text : ""
    }
  }




  render(){
    return(
      <View>
      <View style={{
        borderBottomColor :'grey',
        borderBottomWidth :1,
        marginLeft : 10,
        marginRight : 20,
        marginTop : 10
      }}>
      <TextInput
      style={Styles.textInput}
      onChangeText={(text) => this.setState({text : text})}
      value={this.state.text}
      placeholder= {this.props.placeholder}
      underlineColorAndroid='white'
      placeholderTextColor="rgba(181, 188, 192  , 0.7)"
      keyboardType = {this.props.keyboardType}

      />
      </View>


      </View>
    );
  }
}


const Styles = StyleSheet.create({
  memberErrormessage : {
    color : 'red'


  },
  textInput:{
    height: 20,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize : 12,
    marginTop : 10


  }
});
export default Input
