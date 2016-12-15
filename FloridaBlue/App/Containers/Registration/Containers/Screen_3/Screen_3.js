import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import RegistrationToolBar from '../RegistrationToolBar'
import Input from './Input'
import Button from '../Button'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions as NavigationActions} from 'react-native-router-flux'

class Screen_3 extends Component{
  constructor(){
    super();
    this.state = {
      code : "",
      verified : true,
      navigate : false
    }
  }
  render(){
    return(
      <View style={{
        flex : 1 ,
        backgroundColor : 'white'
      }}>
      <RegistrationToolBar/>
      {
        <View style={{
          flexDirection : 'row',
          height : 35
        }}>
          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
          <Text>
          1
          </Text>
          </View>

          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
          <Text>
          2
          </Text>
          </View>

          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
          <Text>
          3
          </Text>
          </View>

          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
          <Text>
          4
          </Text>
          </View>

          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
          <Text>
          5
          </Text>
          </View>
        </View>
      }

      <View style={{
        alignItems :'center',
        justifyContent : 'center',
        marginLeft : 20,
        marginRight : 20,
        marginTop : 25
        //borderColor : 'red',
        //borderWidth : 1
      }}>
      <Text style={{
        fontSize : 16,
        color : 'grey',
        marginBottom : 20
      }}>
      Verify your Device
      </Text>
      <Text style={{
        textAlign : 'justify'
      }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>






      </View>

      <View style={{
        flexDirection : 'row',
        marginLeft : 5,
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 20

      }}>
      {
        <View style={{
          borderBottomWidth : 1,
          borderBottomColor : 'grey',
          height : 40,
          marginLeft : 40,
          marginRight : 10,
          marginTop : 10,
          flex :1

        }}>
        <TextInput
          style={{
            height: 40,
            margin : 5,
            fontSize : 14,
            flex : 1
          }}
          placeholder="Enter Code"
          onChangeText={
            (text) => {
            this.setState({code : text})
            if(text==="1"){
              //alert("correct")
              this.setState({
                verified : true,
                navigate : true
              })
            }else {
              this.setState({
                verified : false
              })
            }
            }

          }
          value={this.state.code}
        />
        </View>
      }

      {
        !this.state.verified ?
        <TouchableOpacity style={{
          width : 25,
          height : 25,
          borderColor : 'red',
          borderWidth : 2,
          borderRadius : 25/2,
          alignItems : 'center',
          justifyContent : 'center',
          marginTop : 15
        }}
        onPress = {()=>{
          //alert("reset")
          this.setState({
            code : "",
            verified : true,
            navigate : false
          })
        }}
        >

        <Text style={{
          color : 'red',
          fontWeight : '600'
        }}>
        X
        </Text>
        </TouchableOpacity>

        : null
      }
      {
        this.state.verified && this.state.navigate ?
        <TouchableOpacity style={{
          borderColor : 'green',
          width : 25,
          height : 25,
          borderRadius : 25/2,
          borderWidth : 1,
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor : 'white',
          marginTop : 15

        }}
        >
        <Icon name="check" size={12} color="green" />
        </TouchableOpacity>
        : null

      }
      </View>

      {
        !this.state.verified ?
        <View style={{
          flexDirection : 'row',
          marginLeft : 10,
          marginRight : 10,
          justifyContent : 'center',
          alignItems : 'center',
          marginTop : 20

        }}>
        <Text style={{
          marginRight : 10
        }}>
        Please enter valid code or
        </Text>

        <TouchableWithoutFeedback>
        <View style={{
          backgroundColor : 'rgb(5, 128, 194 )',
          padding : 2,
          borderColor : 'rgb(5, 128, 194 )',
          borderRadius : 6
        }}>
        <Text style={{
          color : 'white',
          fontSize : 12,
          marginRight : 5,
          marginLeft : 5,
          marginTop : 2,
          marginBottom : 2
        }}>
        Resend Code
        </Text>
        </View>
        </TouchableWithoutFeedback>


        </View>
        :null
      }


      {
        <View style={{
          bottom : 30,
          flexDirection : 'row',
          position : 'absolute',
          marginLeft : 25,
          marginRight : 25

        }}>

        <View style={{flex : 1}}>
        <Button title="Back" color ={'rgb(211, 215, 218)'} navigator={this.props.navigator} target="Back"/>
        </View>

        <View style={{flex : 1}}>
        </View>

        <View style={{flex : 1}}>
        {
          this.state.verified && this.state.navigate ?
          <Button
          title = "Next"
          color ={'rgb(88, 96, 100 )'}
          navigator={this.props.navigator}
          target="Screen_4"
          />
          :
          <Button
          title = "Next"
          color ='rgb(211, 215, 218)'
          navigator={this.props.navigator}

          />
        }
        </View>
        </View>
      }
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper : {
    backgroundColor : 'white',
    flex : 1,

  },
  form:{
    backgroundColor : 'white',
    flex : 1,
    margin : 20,
  },
  errormessage : {
    color : 'red',
    flex : 1,
    marginLeft : 10
  },
  progressBoxStyle : {
    flex : 1,
    alignItems :'center',
    justifyContent : 'center'
  },
  textInput:{
    height: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1


  }
});
export default Screen_3
