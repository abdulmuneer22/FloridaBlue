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
      text : "",
      errorMemberID : ""
    }
  }




  render(){
    return(
      <View>
      <View style={{
        borderBottomColor :'grey',
        borderBottomWidth :1,
        marginLeft : 10,
        marginRight : 20
      }}>
      <TextInput
      style={Styles.textInput}
      onChangeText={(text) => this.setState({text : text})}
      value={this.state.text}
      placeholder= {this.props.placeholder}
      underlineColorAndroid='white'
      placeholderTextColor="rgb(134, 144, 147)"
      keyboardType = {this.props.keyboardType}

      />
      </View>
      <Text style={Styles.memberErrormessage}>{this.state.errorMemberID}</Text>

      </View>
    );
  }
}


const Styles = StyleSheet.create({

  textInput:{
    height: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    fontSize : 12,
    color : 'grey'


  }
});
export default Input
