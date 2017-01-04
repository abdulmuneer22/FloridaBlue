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
        <Input placeholder="Member ID" keyboardType="default"/>

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
        <Input placeholder="First Name" keyboardType="default"/>
        <Input placeholder="Last Name" keyboardType="default"/>
        <Input placeholder="Date of Birth" keyboardType="numbers-and-punctuation"/>
        <Text style={{
          alignSelf : 'flex-end',
          color : 'grey',
          marginRight : 15
        }}>
        mm/dd/yyyy
        </Text>
        <Input placeholder="Zip Code" keyboardType="numeric"/>
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
        <Button title="Back" color ={'rgb(211, 215, 218)'}  target="Back"/>
        </View>
        <View style={{flex : 1}}>
        </View>
        <View style={{flex : 1}}>
        <Button title = "Next" color ={'rgb(88, 96, 100 )'} target="screen_2"/>
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
  fetching: PropTypes.string,
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
