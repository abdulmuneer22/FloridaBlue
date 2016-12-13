import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView
  } from 'react-native';

const window=Dimensions.get('window')

class Screen_1 extends Component {
          constructor(){
            super();
            this.state=
            {
            Question : "",
            Answer : ""
            }

          }



  render() {
    return (
    <View style={{flex : 1,backgroundColor : 'white' }}>
    <View style={{backgroundColor:'grey', marginTop:30}}>

<View>
    <Text style={{fontWeight : 'bold', margin:10, fontSize:20,color:'white' }}>
    NewUser Registration
    </Text>
    </View>

    <View>
    <Text style={{margin:10, fontSize:15,color:'white'}}>
    Set up your Security Questions/ Hints and answers
    </Text>
    </View>

    </View>

 <ScrollView>
    <View style={Styles.wrapper}>
    <Text style={Styles.topText}>
      Please create three different questions or hints below and type your
      answers in the fields provided. If you ever forgrt your password, you
      will be presented with the hints/questions you create and you will need
      to provide the answers exactly as you created them.
      </Text>




      <Text style={Styles.regularText}>
      Security Hint 1
      </Text>



      <TextInput
      style={Styles.textInput}
      onChangeText={(text) => this.setState({Question : text})}
      value={this.state.Question}
      placeholder="create a Hint or Question"
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholderTextColor="rgba(213, 211, 200 , 0.7)"
      />
      <TextInput
      style={Styles.textInput}
      onChangeText={(text) => this.setState({Answer : text})}
      value={this.state.Answer}
      placeholder="Enter your Answer"
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholderTextColor="rgba(213, 211, 200 , 0.7)"
      />


      <Text style={Styles.regularText}>
      Security Hint 2
      </Text>



      <TextInput
      style={Styles.textInput}
      onChangeText={(text) => this.setState({Question : text})}
      value={this.state.Question}
      placeholder="Enter your Question"
      placeholderTextColor="rgba(213, 211, 200 , 0.7)"
      underlineColorAndroid='black'
      keyboardType={this.props.keyboardType}
      />
      <TextInput
      style={Styles.textInput}
      onChangeText={(text) => this.setState({Answer : text})}
      value={this.state.Answer}
      placeholder="Enter your Answer"
      placeholderTextColor="rgba(213, 211, 200 , 0.7)"
      underlineColorAndroid='rgba(0,0,0,0)'
      />


      <Text style={Styles.regularText}>
        Security Hint 3
        </Text>

        <TextInput
        style={Styles.textInput}
        onChangeText={(text) => this.setState({Question : text})}
        value={this.state.Question}
        placeholder="Enter your Question"
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        underlineColorAndroid='rgba(0,0,0,0)'
        />
        <TextInput
        style={Styles.textInput}
        onChangeText={(text) => this.setState({Answer : text})}
        value={this.state.Answer}
        placeholder="Enter your Answer"
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        underlineColorAndroid='rgba(0,0,0,0)'
        />

        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={Styles.button}
        >

        <Text style={Styles.buttonText}>
        Back
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button1}
        >

        <Text style={Styles.buttonText}>
        Next
        </Text>
        </TouchableOpacity>


</View>


  </View>
   </ScrollView>


      </View>

    );
  }
}

const Styles = StyleSheet.create(
  {
    wrapper : {

      //borderColor : 'black',
      //borderWidth : 1,
    //  justifyContent : 'top',
    //  alignItems :'center',
      margin:10,

    //  paddingTop : 10,
      paddingBottom : 40
    },

    topText :{
      marginTop : 5,
      color :'black',
    //  alignItems:'center'
  },
  textInput : {
  //  width : window.width - 70,
    height: 40,
    borderColor: 'rgba(213, 211, 200 , 0.9)',
    borderWidth: 1,
    marginLeft:20,
    marginRight : 20,
  //  margin:20,
    //marginTop :5,
    marginBottom:10,
    borderRadius : 3,
    padding : 3

  },
  security : {
    margin : 10,

    //alignSelf : "flex-end",
    //marginRight : 30
  },
  regularText : {
    color : 'black',

    fontWeight:'bold',
    margin:20,
    marginTop:10
  },
  button : {
    backgroundColor : 'grey',
    width : 100,
    padding : 10,
    borderColor : 'rgba(17, 147, 203,0.9)',
    borderRadius : 7,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 30,
    marginBottom : 20,
        marginLeft : 20
  },
  button1 : {
    backgroundColor : 'grey',
    width : 100,
    padding : 10,
    borderColor : 'rgba(17, 147, 203,0.9)',
    borderRadius : 7,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 30,
    marginLeft:110,
    marginBottom : 20,

  },
  buttonText : {
    color : 'rgba(242, 246, 247   ,0.9)',
    fontWeight : 'bold'
  },
  })

export default Screen_1
