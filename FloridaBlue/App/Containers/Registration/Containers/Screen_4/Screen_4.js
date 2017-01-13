import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const window = Dimensions.get('window');
import Input from './Input'
import Button from '../Button'




class Screen_4 extends Component{

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
      <View style={{
        flex : 1 ,
        backgroundColor : 'white'
      }}>
      <RegistrationToolBar/>
      {
        <View style={{
          flexDirection : 'row',
          height : 35,


        }}
        zindex = "-1"
        >
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

          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
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
        <KeyboardAwareScrollView>
        <View style={{
          marginTop : 20,
          borderBottomWidth : 1 ,
          borderBottomColor : 'grey',
          paddingBottom : 10
        }}>
        <Text style={{

          textAlign : 'center'
        }}>
        Set Up your Security Question & Answers
        </Text>
        </View>

        <View>
        <Text style={{
          marginLeft : 10,
          marginRight :10,
          marginTop : 10,
          fontSize : 12
        }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt adipisicing elit, sed do eiusmod tempor incididunt adipisicing elit, sed do eiusmod tempor incididunt
        </Text>
        {
          this.state.isPopupVisible ?
          <View
          style={{

            //marginLeft : 40,
            marginRight : 40,
            marginTop : 10,
            position : "absolute",
            top : -55,
            left : 30,
            backgroundColor : 'white',
            borderRadius : 6,
            borderColor : 'rgb(178, 178, 178)',
            borderWidth : 1,
            padding : 10,
            height : 110,
            width : 220,



          }}
          zindex = "999"

          >

          <Text style={{color : 'black'}}>
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          </Text>



          </View>

          :
          <View>

          </View>
        }


        <View style={Styles.SecurityHintWrapper}>
          <Text style={Styles.SecurityHintTitle}>
          Security Hint 1
          </Text>

          <TouchableOpacity style={Styles.click}
          onPress={()=>{this._showPopup()}}

          >
          <Text style={{
            color : 'white'
          }}
          >
          ?
          </Text>
          </TouchableOpacity>
        </View>

        </View>

        <View style={Styles.form}>
        <Input placeholder="Choose a Hint or Question" keyboardType="default"/>
        <Input placeholder="Enter your answer" keyboardType="default"/>


        </View>

        <View style={Styles.SecurityHintWrapper}>
          <Text style={Styles.SecurityHintTitle}>
          Security Hint 2
          </Text>
        </View>

        <View style={Styles.form}>
        <Input placeholder="Choose a Hint or Question" keyboardType="default"/>
        <Input placeholder="Enter your answer" keyboardType="default"/>


        </View>

        <View style={Styles.SecurityHintWrapper}>
          <Text style={Styles.SecurityHintTitle}>
          Security Hint 3
          </Text>
        </View>

       <View style={Styles.form}>
       <Input placeholder="Choose a Hint or Question" keyboardType="default"/>
       <Input placeholder="Enter your answer" keyboardType="default"/>


       </View>


        </KeyboardAwareScrollView>

        <View style={{
          bottom : 30,
          flexDirection : 'row',
          position : 'absolute',
          marginLeft : 25,
          marginRight : 25

        }}>
        <View style={{flex : 1}}>
        <Button title="Back" color ={'rgb(211, 215, 218)'}  target="Back"/>
        </View>

        <View style={{flex : 1}}>
        </View>
        <View style={{flex : 1}}>
        <Button title = "Next" color ={'rgb(88, 96, 100 )'}  target="Termsofuse"/>
        </View>
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
    //marginTop : 5,

    //borderColor : 'red',
    //borderWidth : 1
  },
  form : {
    width : window.width - 30,
    //borderColor : 'red',
    //borderWidth : 1,
    alignSelf : 'center',
    marginLeft : 20,
    marginRight : 20,




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
  progressBoxStyle : {
    flex : 1,
    alignItems :'center',
    justifyContent : 'center',

  }

});


Screen_4.propTypes = {
  postRegistrationAnswers: PropTypes.func,
  fetching: PropTypes.bool,
  questionone : PropTypes.string,
  questiontwo :PropTypes.string,
  questionthree : PropTypes.string,
  answerone : PropTypes.string,
  answertwo : PropTypes.string,
  answerthree : PropTypes.string,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.registration.fetching,
    questionone : state.registration.questionone,
    questiontwo : state.registration.questiontwo,
    questionthree : state.registration.questionthree,
    answerone : state.registration.answerone,
    answertwo : state.registration.answertwo,
    answerthree : state.registration.answerthree,
    error: state.registration.error
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    postRegistrationAnswers:(questionone,questiontwo,questionthree,answerone,answertwo,answerthree) => dispatch(RegistrationActions.sendregistrationAnswers(questionone,questiontwo,questionthree,answerone,answertwo,answerthree))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_4)
