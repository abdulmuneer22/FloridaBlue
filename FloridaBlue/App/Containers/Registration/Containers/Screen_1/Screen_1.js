import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Modal
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Actions as NavigationActions} from 'react-native-router-flux'
import {connect} from 'react-redux'
import RegistrationActions from '../../../../Redux/RegistrationRedux'
import RegistrationToolBar from '../RegistrationToolBar'
import Input from './Input'
import Button from '../Button'

const window = Dimensions.get('window');

class Screen_1 extends Component{

  constructor(props) {
    super(props);
    this._handleRegistration = this._handleRegistration.bind(this);
    this.state = {
      contractnumber : "",
      firstname : "",
      lastname : "",
      dob : "",
      zip : ""
    }
  }

  _handleRegistration(){
    var contactnumber = this.state.contractnumber
    var firstname = this.state.firstname
    var lastname = this.state.lastname
    var dob = this.state.dob
    var zip = this.state.zip
    Alert.alert("details"+contactnumber+firstname+lastname+dob+zip);
    //Alert.alert("Hey I am coming from registration")
    /*
    var contactnumber = this.props.contactnumber
    var firstname = this.props.firstname
    var lastname = this.props.lastname
    var dob = this.props.dob
    var zip = this.props.zip
    */
    if (!this.state.contractnumber) {
      alert("Please enter user name and password!")
    } else {
      this.props.verifyIdentification(contactnumber, firstname,lastname,dob,zip)
    }

  };



  componentWillReceiveProps (newProps) {
      this.forceUpdate()
      // Did the first page perfect
      console.log("I am receving new props")
      if (!newProps.fetching && newProps.error === null) {
         console.log("I am from reg success "+newProps.error);
          NavigationActions.screen_2()
      }
    }
  render(){
    return(
        <View style={Styles.wrapper}>
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

        <View style={Styles.form}>
        <KeyboardAwareScrollView>

        <Text>
        Please complete all the fields below.
        </Text>

        <TextInput
        style={
           {
            width : window.width - 80,
            height: 40,
            borderColor: 'rgba(213, 211, 200 , 0.9)',
            borderWidth: 1,
            marginLeft : 40,
            marginRight : 40,
            marginBottom : 10,
            marginTop : 20,
            borderRadius : 3,
            padding : 6
          }
        }
        onChangeText={(text) => this.setState({contractnumber : text})}
        value={this.state.contractnumber}
        placeholder="Member Id "
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardType='default'
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        />



        <View style={{
          flexDirection : 'row',
          paddingTop : 10,
          alignItems : 'center',
          marginRight : 10,
          marginTop : 15,
          marginBottom : 10
        }}>
          <Text style={Styles.errormessage}>
          Cant find your member ID ?
          </Text>
          <Button title="FIND IT HERE" color ={'rgb(26, 147, 216 )'} target="memberid"/>
        </View>
        <TextInput
        style={
           {
            width : window.width - 80,
            height: 40,
            borderColor: 'rgba(213, 211, 200 , 0.9)',
            borderWidth: 1,
            marginLeft : 40,
            marginRight : 40,
            marginBottom : 10,
            marginTop : 20,
            borderRadius : 3,
            padding : 6
          }
        }
        onChangeText={(text) => this.setState({firstname : text})}
        value={this.state.firstname}
        placeholder="First Name"
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardType='default'
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        />
        <TextInput
        style={
           {
            width : window.width - 80,
            height: 40,
            borderColor: 'rgba(213, 211, 200 , 0.9)',
            borderWidth: 1,
            marginLeft : 40,
            marginRight : 40,
            marginBottom : 10,
            marginTop : 20,
            borderRadius : 3,
            padding : 6
          }
        }
        onChangeText={(text) => this.setState({lastname : text})}
        value={this.state.lastname}
        placeholder="Last Name "
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardType='default'
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        />
        <TextInput
        style={
           {
            width : window.width - 80,
            height: 40,
            borderColor: 'rgba(213, 211, 200 , 0.9)',
            borderWidth: 1,
            marginLeft : 40,
            marginRight : 40,
            marginBottom : 10,
            marginTop : 20,
            borderRadius : 3,
            padding : 6
          }
        }
        onChangeText={(text) => this.setState({dob : text})}
        value={this.state.dob}
        placeholder="Date of Birth"
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardType='default'
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        />
        <TextInput
        style={
           {
            width : window.width - 80,
            height: 40,
            borderColor: 'rgba(213, 211, 200 , 0.9)',
            borderWidth: 1,
            marginLeft : 40,
            marginRight : 40,
            marginBottom : 10,
            marginTop : 20,
            borderRadius : 3,
            padding : 6
          }
        }
        onChangeText={(text) => this.setState({zip : text})}
        value={this.state.zip}
        placeholder="Enter ZIP code"
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        keyboardType='default'
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor="rgba(213, 211, 200 , 0.7)"
        />
        </KeyboardAwareScrollView>
        </View>
        <View style={{
          bottom : 30,
          flexDirection : 'row',
          position : 'absolute',
          marginLeft : 25,
          marginRight : 25
        }}>
        <View style={{flex : 1}}>
        <TouchableOpacity style={{
          backgroundColor : 'rgba(17, 147, 203,0.9)',
          width : 100,
          padding : 9,
          borderColor : 'rgba(17, 147, 203,0.9)',
          borderRadius : 7,
          alignItems : 'center',
          justifyContent : 'center',
          marginTop : 40,
          marginBottom : 40
        }
        }
        onPress={()=>{
          this._handleRegistration()


        }}>

        <Text style={{
          color : 'rgba(242, 246, 247   ,0.9)',
          fontWeight : 'bold'
        }}>
        Log-in
        </Text>
        </TouchableOpacity>

        </View>
        </View>
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
  }
});

Screen_1.propTypes = {
  verifyIdentification: PropTypes.func,
  fetching: PropTypes.bool,
  contactnumber : PropTypes.string,
  firstname :PropTypes.string,
  lastname : PropTypes.string,
  dob : PropTypes.string,
  zip : PropTypes.string,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.registration.fetching,
    contactnumber: state.registration.contactnumber,
    firstname: state.registration.firstname,
    lastname: state.registration.lastname,
    dob:state.registration.dob,
    zip:state.registration.zip,
    error: state.registration.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyIdentification:(contactnumber,firstname,lastname,dob,zip) => dispatch(RegistrationActions.registrationRequest(contactnumber,firstname,lastname,dob,zip))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Screen_1)
