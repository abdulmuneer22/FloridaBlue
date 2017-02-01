import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors,Metrics,Fonts} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'


var messageCount="10"

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
      <Text style={{fontSize:18, color:Colors.snow}}>
      Good Morning {this.props.userName ? this.props.userName :""}
      </Text>
      </View>

      {
        messageCount ?
        <View style={{
          alignItems:'center',
          justifyContent:'center',
          height:40,
          backgroundColor:Colors.flBlue.grey1,
            flexDirection : 'row'
        }}>

        <Flb name="email-envelope" size={20}  />
        <Text style={{color:Colors.flBlue.night,fontSize:Fonts.size.h6,marginLeft : 10}}> You have {messageCount} new messages. </Text>

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
    height : 40,
    //padding:5,
    backgroundColor: Colors.flBlue.grey6
  }
});

export default Greeting
