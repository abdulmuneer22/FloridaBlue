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
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';

var Modal   = require('react-native-modalbox');

import {Colors,Metrics,Fonts,Images} from '../../../../Themes'
import styles from './ConfirmationStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'

const window = Dimensions.get('window');



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
    <ScrollView style ={styles.container}>
      <Image  style={styles.headerContainer} source={Images.regCompletion} />

      <Text style={styles.header}>Thank You!</Text>
      <Text style={styles.subheading}>You have successfully completed the registration process.</Text>

      <View style={styles.userStyle}>

      <View style={{
          backgroundColor : Colors.snow,
          width : 50,
          height : 50,
          borderRadius : 50/2,
          alignItems :'center',
          justifyContent : 'center',
          //marginTop:0,
          marginLeft:Metrics.doubleBaseMargin
      }}>
      <Flb name="user"  size={Metrics.icons.medium} color={Colors.flBlue.grass} />
      </View>

      <View style={styles.center}>
      <Text style={{
        fontSize : Fonts.size.h6,
        fontWeight:'500',
        color:Colors.snow
        //alignSelf : 'stretch',
      //  alignItems:'center',
      //  justifyContent:'center',
      //  height:40,
        //marginLeft:5
      }}>
      Your User ID is:
      </Text>
        <Text style={{fontSize:Fonts.size.regular,color:Colors.snow}}>
            something long here
              </Text>
              </View>

               </View>



               <View style={{
                   height : window.height *0.5,
                   //backgroundColor : 'red',
                   position : 'absolute',
                   top : window.height * 0.545,
                   width : window.width
                 }}>

                 <View style={{
                   flex : 1 ,
                   backgroundColor :'black'
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
                 onPress = {NavigationActions.login}>
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
                   zindex = "99">

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
                     fontSize : 16,
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


</ScrollView>

    )
  }
}

const Styles = StyleSheet.create({
  wrapper : {
    backgroundColor : Colors.flBlue.lightBlue,
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

export default Confirmation
