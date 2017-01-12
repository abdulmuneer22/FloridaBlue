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
  Modal,
  ScrollView
} from 'react-native';

import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions as NavigationActions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginActions from '../../Redux/LoginRedux'
import styles from './LoginStyle'
import FlbIcon from './FlbIcon'
import {Images} from '../../Themes'
import {
  MKTextField,
  MKColor,
  mdl,
} from 'react-native-material-kit';
const appStyles = require('./styles');


const mdlstyles = Object.assign({}, appStyles, StyleSheet.create({
  col: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center', // this will prevent TFs from stretching horizontal
    marginLeft: 7, marginRight: 7,
    // backgroundColor: MKColor.Lime,
  },
  textfield: {
    height: 28,  // have to do it on iOS
    marginTop: 32,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 5,
  },
}));

const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withPlaceholder('UserId..')
  .withStyle(mdlstyles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .withKeyboardType('numeric')
  .build();

  const PasswordTextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
    .withPlaceholder('Password..')
    .withStyle(mdlstyles.textfieldWithFloatingLabel)
    .withTextInputStyle({flex: 1})
    .withFloatingLabelFont({
      fontSize: 10,
      fontStyle: 'italic',
      fontWeight: '200',
    })
    .withKeyboardType('numeric')
    .build();


  const PasswordInput = mdl.Textfield.textfieldWithFloatingLabel()
  .withPassword(true)
  .withPlaceholder('Password')
  .withDefaultValue('!123')
  .withHighlightColor(MKColor.Lime)
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withOnFocus(() => console.log('Focus'))
  .withOnBlur(() => console.log('Blur'))
  .withOnEndEditing((e) => console.log('EndEditing', e.nativeEvent.text))
  .withOnSubmitEditing((e) => console.log('SubmitEditing', e.nativeEvent.text))
  .withOnTextChange((e) => console.log('TextChange', e))
  .withOnChangeText((e) => console.log('ChangeText', e))
  .build();

var logo =require('./logo.png')
const window = Dimensions.get('window');

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  attemptLogin: () => void
}



class Login extends Component{
   props: LoginScreenProps
   isAttempting : boolean

  constructor(){
    super();
    this.state = {
      username : "",
      password : "",
      modalVisible : false
    }

      this.isAttempting = false
  }

  _handleLogin(){

    console.log("input"+this.refs.defaultInput)
    console.log("input"+this.refs.defaultInputForPassword)

  var username = this.state.username
  var password = this.state.password

if(!this.state.username | !this.state.password){
       alert("Please enter user name and password!")
 }else{
   //const { username, password } = this.state
 this.isAttempting = true
 // attempt a login - a saga is listening to pick it up from here.
 this.props.attemptLogin(username, password)
}

}




componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    console.log("I am receving new props")
    if (this.isAttempting && !newProps.fetching && newProps.error === null) {
    //  NavigationActions.WelcomeDashBoard()
    console.log("HERRREEE: "+newProps.error);
        NavigationActions.WelcomeDashBoard()
    }
  }


  _moreInfo(){
    if(this.state.modalVisible === true){
      return(
        <View style={{
          backgroundColor : 'rgba(179, 189, 188, 0.3)',
          //margin : 5,
          width : window.width -10,
          height : 140,
          padding : 5,
          borderRadius : 6 ,
          flexWrap : 'wrap',
          flexDirection : 'row',
          paddingBottom : 10
        }}>

        <View style={styles.popupchild}>

        <Icon name="chevron-right" size={12} color="black" />

        <TouchableOpacity>
        <Text style={styles.popupchildText}>
         Terms of Use
        </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Privacy Policy
        </Text>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Accessibility
        </Text>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Need Help?
        </Text>
        </View>

        <View style={styles.popupchild}>
        <Icon name="chevron-right" size={12} color="black" />
        <Text style={styles.popupchildText}>
         Meaningful Access
        </Text>
        </View>

        </View>
      );
    }else{
      return(
        <View >
        </View>
      );
    }
  }
  render(){
    return(
      <Image source={Images.background} resizeMode='stretch' style={{flex :1,
        alignSelf: 'stretch',
       width: null,
      }}>
    <View style={{flex : 1, justifyContent : 'center' }}>

      <View style={styles.wrapper}>

      <Image
        style={{
          width: 250,
          height: 100,
          marginBottom : 30
        }}
        source={Images.clouds}
        resizeMode="stretch"
      >
      <Image
        style={{
          width: 250,
          height: 100,
          marginBottom : 30
        }}
        source={Images.logInlog}
        resizeMode="stretch"
      />
</Image>
</View>
      <View style={styles.logincard}>
      <View style={{margin : 10  }}>
      <View style={{margin : 10}}>
      <TextfieldWithFloatingLabel ref="defaultInput"/>
      </View>
      <View style={{margin : 10}}>
      <PasswordTextfieldWithFloatingLabel ref="defaultInputForPassword"/>
      </View>
      </View>
       </View>
       <View style={{flex : 1 , alignSelf:'center'}}>
       <Text>Forgot UserID / Password</Text>
       </View>


        <View style={{flex : 1, justifyContent : 'center' ,backgroundColor:'white'}}>
        <View style={{
          justifyContent : 'center',
          alignItems :'center'
        }}>
        <TouchableOpacity
        onPress={()=>{
          this._handleLogin()
        }}>
        <Image
        source={Images.loginIn}
        resizeMode="cover"
        style={styles.button}
        />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>NavigationActions.screen_1()}
        >
        <Text style={styles.regularTex}>
        I'm new.Sign-up
        </Text>
        </TouchableOpacity>

        </View>
        </View>
        <View style={{flex : 1, justifyContent : 'center' ,backgroundColor:'white'}}>
        <View style={styles.wrapper}>
        {
          this._moreInfo()
        }
        </View>
        </View>
        <View style={{flex : 1, justifyContent : 'center' ,backgroundColor:'white'}}>
        <View style={styles.wrapper}>

        <TouchableOpacity
        onPress={()=>{
          if(this.state.modalVisible === true){
          this.setState({modalVisible : false})
        }else{
          this.setState({modalVisible : true})
        }
        }}
        >
        <Image source={Images.infoIcon} resizeMode='stretch' />
        </TouchableOpacity>
        </View>
      </View>


      </View>
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
