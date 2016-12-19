import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'

class TermsofUse extends Component{
  constructor(){
    super();
    this.state = {
      clicked : false
    }
  }
  render(){
    return(
      <View>
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

          <View style={[Styles.progressBoxStyle,{backgroundColor : 'rgb(125, 135, 139)'}]}>
          <Text>
          5
          </Text>
          </View>
        </View>
      }
      <ScrollView>
      <View style={{
        flex : 1 ,
        backgroundColor : 'white'
      }}>
      <Text style={{
        marginLeft : 20,
        marginTop : 20,
        fontSize : 16,
        fontWeight : '600'
      }}>
      Termsof Use
      </Text>
      <Text style={{
        margin : 20,
        textAlign : 'justify'
      }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      <Text style={{
        margin : 20,
        textAlign : 'justify'

      }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      <Text style={{
        margin : 20,
        textAlign : 'justify'

      }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
      </View>
      <View style={{
        height : 100,
        //backgroundColor : 'green',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        borderTopColor : 'grey',
        borderTopWidth : 1
      }}>
        <View style={{
          flex : 1,
          //backgroundColor : 'yellow',
          alignItems : 'center'

        }}>
          <TouchableOpacity style={{
            borderColor : 'grey',
            width : 25,
            height : 25,
            borderRadius : 25/2,
            borderWidth : 1,
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : this.state.clicked ? 'grey' : 'white'

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
            <Icon name="check" size={12} color="black" />
          : null
          }

          </TouchableOpacity>
        </View>

        <View style={{
          flex : 4,
          //backgroundColor : 'purple'
        }}>
        <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit{"\n"}
        ipsum dolor sit amet
        </Text>
        </View>
      </View>

      {
        this.state.clicked ?
        <TouchableOpacity style={{
          alignSelf : 'center',
          backgroundColor : 'grey',
          paddingLeft : 30,
          paddingRight : 30,
          padding : 10,
          marginBottom : 20,
          borderRadius : 6
        }}
        onPress={()=>{NavigationActions.confirmation()}}
        >
        <Text style={{
          color : 'white'
        }}>
        Continue
        </Text>
        </TouchableOpacity>
        :
        null
      }
      </ScrollView>


      </View>

    );
  }
}

const Styles = StyleSheet.create({
  progressBoxStyle : {
    flex : 1,
    alignItems :'center',
    justifyContent : 'center',
  }
});
export default TermsofUse
