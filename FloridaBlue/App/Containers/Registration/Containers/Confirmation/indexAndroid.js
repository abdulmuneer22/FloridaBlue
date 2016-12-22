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
  TouchableWithoutFeedback
} from 'react-native';
var Modal   = require('react-native-modalbox');
//var Slider  = require('react-native-slider');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';


const window = Dimensions.get('window');
var modalHeight = window.height*0.4

import ToolBar from '../ToolBar'

import Button from '../Button'
class androidPin extends Component{

  constructor(){
    super();
    this.state = {
      isPopupVisible : false

    }
  }


  _showPopup(){
    //alert(this.state.isPopupVisible)
    var isPopupVisible = this.state.isPopupVisible
    if(isPopupVisible){
      this.setState({isPopupVisible : false})
    }else{
      this.setState({isPopupVisible : true})

    }
  }

  render(){
    return(
      <View style={Styles.wrapper}>
        <ToolBar target="Screen_4"/>
        <View style={{
          backgroundColor :'rgb(220, 235, 243)',
          flex : 1
        }}>
        <View style={{
          backgroundColor :'rgb(220, 235, 243)',
          paddingTop : 10,
          paddingBottom : 10
        }}>
        <Text style={{
          padding : 10,
          fontSize : 18
        }}>Your Registration is Complete</Text>

        <Text style={{
          padding : 5,
          fontSize : 12
        }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use</Text>
        </View>

        <View style={{

          //height : 40,
          paddingTop : 20,
          backgroundColor : 'rgb(225, 230, 232)',
          alignItems : 'center',
          justifyContent : 'center',
          padding : 20
        }}>
        <Text style={{
          color : 'rgb(50, 151, 226)',
          fontSize : 16
        }}>Your User ID is 12345H</Text>
        </View>

        </View>

        <View style={{
          height : window.height *0.5,
          backgroundColor : 'red',
          position : 'absolute',
          top : window.height * 0.45,
          width : window.width
        }}>

        <View style={{
          flex : 1 ,
          height : 600,
          backgroundColor :'rgb(220, 235, 243)'
        }}>

        <Text style={{
          margin : 10,
          marginTop : 20,
          color : 'rgb(136, 146, 149)'
        }}>
        You can select your default log-in, please select {"\n"} one of the following
        </Text>

        <TouchableOpacity style={{
          width : 180,
          height : 40,
          borderRadius : 4,
          borderColor : 'rgb(80, 88, 90)',
          borderWidth : 1,
          backgroundColor : 'rgb(80, 88, 90)',
          alignItems : 'center',
          justifyContent : 'center',
          alignSelf : 'center',
          marginTop : 40
        }}
        onPress={()=>{
          //alert("Open Modal")
          this.refs.modal4.open()
        }}
        >

        <Text style={{
          color : 'white',
          fontSize : 14
        }}>Set-up your pin number</Text>

        </TouchableOpacity>

        <Text style={{
          alignSelf : 'center',
          margin : 20
        }}>Or</Text>
         <TouchableOpacity style={{
          width : 180,
          height : 40,
          borderRadius : 4,
          borderColor : 'rgb(8, 175, 233)',
          borderWidth : 1,
          backgroundColor : 'rgb(8, 175, 233)',
          alignItems : 'center',
          justifyContent : 'center',
          alignSelf : 'center',
          //marginTop : 14
        }}
        onPress = {()=>{this.props.navigator.push({name:'login'})}}
        >
        <Text style={{
          color : 'white',
          fontSize : 14
        }}>Log-in Now</Text>

        </TouchableOpacity>

        </View>




        <Modal style={{
          backgroundColor : 'rgb(231, 237, 240)',
          width : window.width,
          height : window.height * 0.6,
          padding : 20

        }
          }
          position={"bottom"} ref={"modal4"}
          zindex = "99"
          >

          <Text style={{
            textAlign : 'right',
            fontWeight : '600',
            fontSize : 18,
            color : 'grey'
          }}
           onPress={()=>{this.props.navigator.pop()}}>X</Text>

          <View style={{
            alignItems : 'center'
          }}>
          <Text style={{
            fontSize : 20,
            fontWeight : 'bold'
          }}>
          Set your 4 Digit Pin
          </Text>

          <Text style={{
            textAlign : 'center',
            marginTop:20,
            margin:20

          }}>
          Enter your 4 Digit Pin as your default login screen
          </Text>



          </View>

          <View style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginTop : 10
          }}>
          <TextInput
          style={{
            height: 40,
            fontSize : 12

            }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Password"
          />
          </View>

          <TouchableWithoutFeedback>
          <View style={{
            alignSelf : 'center',
            paddingTop : 10,
            paddingBottom : 10,
            paddingLeft : 15,
            paddingRight : 15,
            margin : 20,
            backgroundColor : 'rgb(80, 88, 90)',
            borderColor : 'rgb(179, 192, 199 )',
            borderRadius : 6,
            borderWidth : 1,
            marginTop:60
          }}>
          <Text style={{
            color : 'rgb(233, 239, 241 )'
          }}>
          Setup Touch ID
          </Text>
          </View>
          </TouchableWithoutFeedback>


        </Modal>
        </View>


      </View>
    );
  }

}


const Styles = StyleSheet.create({
  wrapper : {
    backgroundColor : 'white',
    flex : 1
  },
  SecurityHintTitle:{
    fontWeight : 'bold',
    margin : 10,
    fontSize : 12
  },
  SecurityHintWrapper : {
    flexDirection : 'row',
    marginLeft : 15,
    marginRight : 15,
    marginTop : 5,
    //borderColor : 'red',
    //borderWidth : 1
  },
  form : {
    width : window.width - 30,
    //borderColor : 'red',
    //borderWidth : 1,
    alignSelf : 'center',
    marginLeft : 20,
    marginRight : 20


  },
  click : {
    width: 25,
    height: 25,
    borderRadius: 25/2,
    backgroundColor: 'black',
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 5
  },
  modal: {
   justifyContent: 'center',
   alignItems: 'center'
 },
 modal4: {
    height: 200
  },
  textInput:{
    height: 30,
    borderBottomColor: '#000000',
    borderBottomWidth: 1


  }

});

export default androidPin
