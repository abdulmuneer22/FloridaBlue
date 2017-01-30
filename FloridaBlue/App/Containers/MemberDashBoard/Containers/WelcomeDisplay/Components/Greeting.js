import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors,Metrics,Fonts} from '../../../../../Themes'


var messageCount="1"

class Greeting extends Component{

  constructor(){
    super();
    this.state = {
      userName : ""
    }
  }

/*  _getUserData(){
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
*/
  render(){

    return(
      <View>
      <View style={Styles.Greeting}>
      <Text style={{fontSize:15, color:Colors.snow}}>
      Good Morning {this.props.userName ? this.props.userName :""}
      </Text>
      </View>

      {
        messageCount ?
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          height:30,
          backgroundColor:'rgba(230,232,238,0.1)',
            flexDirection : 'row'
        }}>

        <Icon name="envelope" size={18} color="black" />
        <Text style={{marginLeft : 10}}> You have {messageCount} New Messages </Text>

        </View>
        : null
      }
      </View>


    );
  }
}


const Styles = StyleSheet.create({
  Greeting : {
    alignItems  : 'center',
    justifyContent : 'center',
    height : 60,
    backgroundColor: Colors.flBlue.grey3
  }
});

export default Greeting
