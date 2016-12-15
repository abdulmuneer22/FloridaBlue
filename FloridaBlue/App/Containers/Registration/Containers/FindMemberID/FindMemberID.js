import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'


var logo1=require('./download.png')
var logo2=require('./FloridaBlue.png')

const window = Dimensions.get('window');

class FindMemberID extends Component{
  constructor(){
    super();
    this.state = {
      viewStyle1 : {
        flex : 1

      },
      viewStyle2 : {
        flex : 0
      },
      button1 : 'blue',
      button2 : 'white'


    }
  }

  animateView(view){

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)

    switch (view) {
      case '1':

      this.setState({
        viewStyle1 : {
          flex : 0,

        },
        viewStyle2 : {
          flex : 1,
        },
        button1 : 'white',
        button2 : 'blue'
      });

      break;

      case 2:
      this.setState({
        viewStyle1 : {
          flex : 1
        },
        viewStyle2 : {
          flex : 0
        },
        button1 : 'blue',
        button2 : 'white'
      });
        break;

      break;


    }

  }

  render(){

    let Style1 = [Styles.view1,this.state.viewStyle1]
    let Style2 = [Styles.view2,this.state.viewStyle2]
    return(
      <View style={{flex : 1 , backgroundColor : 'white' }}>
    <RegistrationToolBar/>

    <View style={{
      flexDirection : 'row',
      height : 35
    }}>
      <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
      <Text>
      1
      </Text>
      </View>

      <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
      <Text>
      2
      </Text>
      </View>

      <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(206, 214, 217)'}]}>
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

       <View style={Styles.crossStyle}>
       <Text style={Styles.crossText}
       onPress={()=>{this.props.navigator.pop()}}
       >x</Text>

       <Text style={Styles.imageId}>
       Find your member ID
       </Text>
       <Text style={Styles.imageText}>
       Optional function where you can configure scene animations and gestures.
       </Text>

       <Text style={{

           paddingBottom : 20,
       }}>Optional function where you can configure scene animations and gestures. Will be invoked with route and </Text>

       </View>
      <View style={{flexDirection : 'row'}}>

        <View style={Style1}>
        <Image
          style={{
            width: window.width,
            height: 200,
            flex : 0
          }}
          source={logo1}
        />
        </View>

        <View style={Style2}>
        <Image
          style={{
            width: window.width,
            height: 200,
            flex : 0
          }}
          source={logo2}

        />
        </View>




      </View>

      <View style={{flexDirection : 'row', backgroundColor : 'rgb(212, 215, 218 )',padding : 5}}>
      <TouchableOpacity
      onPress={()=>{this.animateView('1')}}
      style={{flex : 1,alignItems : 'flex-end',paddingRight : 20}}
      >
      <Icon name="circle" size={18} color={this.state.button1} />
      </TouchableOpacity>

      <TouchableOpacity
      style={{flex : 1,alignItems : 'flex-start',paddingLeft : 20}}
      onPress={this.animateView.bind(this,2)}
      >
      <Icon name="circle" size={18} color={this.state.button2} />
      </TouchableOpacity>


      </View>

      <View style={Styles.backgroundClose}>
         <TouchableOpacity style={Styles.closeButton}
         onPress={()=>{this.props.navigator.pop()}}
         >
             <Text style={Styles.closeText}>Close</Text>
         </TouchableOpacity>
      </View>


      </View>

    );
  }
}

const Styles = StyleSheet.create({
  view1 : {
    backgroundColor : 'red',
    height : 200,

  },
  view2 : {
    backgroundColor : 'yellow',
    height : 200,

  },
  wrapper : {

    backgroundColor : 'rgb(78, 85, 87 )',
    alignItems : 'center',
    justifyContent : 'center',
    padding : 10,
    marginTop: 20
  },
  headerText : {
    color : 'white',
    fontSize : 30,
    padding : 10
  },
  crossText:{
     alignSelf : 'flex-end',
     color : 'rgb(145, 149, 150)',
     fontSize : 25,
     fontWeight : '600',
     marginTop : 10

  },
  imageId:{
      fontSize : 16,
      fontWeight : '600'
  },
  crossStyle:{
      backgroundColor : 'rgb(248, 250, 250)',
      //height : 120,
      paddingLeft : 20,
      paddingRight : 20


  },
  imageText:{
      paddingTop : 20,
      paddingBottom : 10,

  },
  closeButton:{
      backgroundColor : 'grey',
      borderRadius : 6,
      borderColor : 'grey',
      borderWidth : 1,
      //width : 60,
      alignItems : 'center',
      paddingRight : 20,
      paddingLeft : 20,
      padding : 5
  },
closeText:{
    color : 'white',
    fontSize : 16,
    fontWeight : '600'
},
backgroundClose:{
    padding : 40,
    alignItems : 'center',
    justifyContent : 'center'
},
progressBoxStyle : {
  flex : 1,
  alignItems :'center',
  justifyContent : 'center'
}

});

export default FindMemberID
