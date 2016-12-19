import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'


class ReadMore extends Component{
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

      <ScrollView>
      <Text style={{
        fontSize : 18,
        textAlign : 'center',
        marginTop : 40

      }}>
      Lorem ipsum dolor sit amet,{"\n"} consectetur adipisicing elit.
      </Text>

      <Text style={Styles.paragraph}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      <Text style={Styles.paragraph}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>

      <Text style={Styles.paragraph}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>


      </ScrollView>

      <TouchableHighlight style={{
        backgroundColor :'grey',
        alignSelf : 'center',
        paddingTop : 8,
        paddingBottom : 8,
        paddingLeft : 40,
        paddingRight : 40,
        alignItems : 'center',
        justifyContent : 'center',
        borderColor : 'grey',
        borderRadius : 6,
        margin : 20
      }}
      onPress={()=>{this.props.navigator.pop()}}
      >
      <Text style={{
        color : 'white'
      }}>
      Close
      </Text>
      </TouchableHighlight>

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
  },
  paragraph : {
    marginLeft : 40,
    marginRight : 40,
    marginTop : 20,
    fontSize : 14,
    textAlign : 'justify'

  }
});
export default ReadMore
