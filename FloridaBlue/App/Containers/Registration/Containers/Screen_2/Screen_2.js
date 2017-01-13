import React, { Component ,PropTypes} from 'react';
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
import {Actions as NavigationActions} from 'react-native-router-flux'
import Button from '../Button'
import {connect} from 'react-redux'
import RegistrationToolBar from '../RegistrationToolBar'
import Input from './Input'
import PasswordMeter from './PasswordMeter'




class Screen_2 extends Component{
  constructor(){
    super();
    this.state = {
      clicked : false
    }
  }
  render(){
    return(
      <View style={{
          backgroundColor : 'white',
        flex : 1
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
      }


      <View style={{
        alignItems : 'center',
        justifyContent : 'center',
        padding : 22
      }}>
      <Text style={{
        fontSize : 16,
        color : 'grey'
      }}>
      Create a User ID and Password
      </Text>
      </View>


      <View style={{margin : 10}}>
      <Text style={{
        fontSize : 12,
        fontWeight : '600'
      }}>
      NOTE:
      {
      <Text style={{
        fontSize : 12,
        fontWeight : '300'
      }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
      </Text>
      }
      </Text>
      </View>

      <View style={{
        margin : 10
      }}>

      <Input placeholder="Email" keyboardType="default"/>
      <Input placeholder="Confirm Email" keyboardType="default"/>
      <Input placeholder="Create User ID" keyboardType="default"/>
      <View style={{
        flexDirection : 'row'
      }}>

      <View style={{
        flex  : 4,

      }}>
      <Input placeholder="Password" keyboardType="default"/>
      </View>

      <View style={{
        width : 110,
        marginTop : 35
      }}>
      <PasswordMeter/>
      </View>


      </View>
      <Input placeholder="Confirm Password" keyboardType="default"/>




      </View>

      {
        <View style={{
          alignItems : 'center',
          justifyContent : 'center',
          flexDirection : 'row'
        }}>

        <TouchableOpacity style={{
          borderColor : this.state.clicked ? 'rgb(8, 160, 211)' : 'grey',
          width : 25,
          height : 25,
          borderRadius : 25/2,
          borderWidth : 1,
          alignItems : 'center',
          justifyContent : 'center',
          backgroundColor : this.state.clicked ? 'rgb(8, 160, 211)' : 'white'

        }}
        onPress={()=>{
          if(this.state.clicked){
          this.setState({clicked : false})
        }else {
          this.setState({clicked : true})

        }

        }}
        >
        {
          this.state.clicked ?
          <Icon name="check" size={12} color="white" />
        : null
        }

        </TouchableOpacity>
        <Text style={{
          fontSize : 10,
          paddingLeft : 5
        }}>Yes, I want to receive all communications electronically.</Text>
        <TouchableOpacity
        style={{
          borderBottomColor : 'blue',
          borderBottomWidth : 1
        }}
        onPress={()=>{NavigationActions.ReadMore()}}
        >
        <Text style={{
          fontSize : 10
        }}
        textDecorationLine = 'underline'
        >
        Read More
        </Text>
        </TouchableOpacity>
        </View>
      }

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
      <Button title = "Next" color ={'rgb(88, 96, 100 )'}  target="screen_3"/>
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


Screen_2.propTypes = {
  verifyUniqueId: PropTypes.func,
  fetching : PropTypes.bool,
  email: PropTypes.string,
  confirmemail : PropTypes.string,
  uniqueuserid :PropTypes.string,
  password: PropTypes.string,
  confirmpassword : PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching : state.registration.fetching,
    email: state.registration.email,
    confirmemail : state.registration.confirmemail,
    uniqueuserid : state.registration.uniqueuserid,
    password: state.registration.password,
    confirmpassword : state.registration.confirmpassword,
    error: state.registration.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyUniqueId:(email,confirmemail,uniqueuserid,password,confirmpassword) => dispatch(RegistrationActions.sendregistrationRequest(email,confirmemail,uniqueuserid,password,confirmpassword))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Screen_2)
