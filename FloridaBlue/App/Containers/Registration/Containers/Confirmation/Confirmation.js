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
import {Actions as NavigationActions} from 'react-native-router-flux'


const window = Dimensions.get('window');


import ToolBar from '../ToolBar'

import Button from '../Button'
class Confirmation extends Component{

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
          marginTop : 25,
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
          top : window.height * 0.5,
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
          marginTop : 20
        }}
        onPress={()=>{
          //alert("Open Modal")
          this.refs.modal4.open()
        }}
        >

        <Text style={{
          color : 'white',
          fontSize : 14
        }}>Set-up your TouchID</Text>

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
          onPress={()=>{
          this.refs.modal4.close()
          }}
          >X</Text>

          <View style={{
            alignItems : 'center'
          }}>
          <Text style={{
            fontSize : 20,
            fontWeight : 'bold'
          }}>
          Touch ID
          </Text>

          <Text style={{
            textAlign : 'center'
          }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing{"\n"} Lorem ipsum dolor sit amet
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
            fontSize : 12,
            paddingLeft : 10
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
            backgroundColor : 'rgb(179, 192, 199)',
            borderColor : 'rgb(179, 192, 199 )',
            borderRadius : 6,
            borderWidth : 1
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




export default Confirmation
