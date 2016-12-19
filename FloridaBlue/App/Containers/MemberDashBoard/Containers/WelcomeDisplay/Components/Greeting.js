import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import axios from 'axios'

class Greeting extends Component{

  constructor(){
    super();
    this.state = {
      userName : ""
    }
  }

  _getUserData(){
    axios.get('http://localhost:9000/members')
    .then((response)=>{
      console.log(response.data.firstName + " " + response.data.lastName);
      this.setState({
        userName : response.data.firstName + " " + response.data.lastName
      });

    })
  }


  componentDidMount(){
    this._getUserData();
  }

  render(){
    return(
      <View style={Styles.Greeting}>
      <Text style={{fontSize:20}}>
      Good Morning {this.state.userName}
      </Text>
      </View>
    );
  }
}


const Styles = StyleSheet.create({
  Greeting : {
    alignItems  : 'center',
    justifyContent : 'center',
    margin : 10
  }
});

export default Greeting
