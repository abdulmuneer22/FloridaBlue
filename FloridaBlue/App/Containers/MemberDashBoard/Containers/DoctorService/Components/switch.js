import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'


class Switch extends Component{
    constructor(){
        super();
        this.state = {
            leftActive : true,
            rightActive : false
        }
    }

    handleClickLeft(){
      if(this.state.leftActive === false){
        this.setState({
          leftActive : true,
          rightActive : false
        })

      }
    }

    handleClickRight(){
      if(this.state.rightActive === false){
        this.setState({
          leftActive : false,
          rightActive : true
        })

      }
    }

    render(){

        return(
            <View style={{
              flexDirection : 'row',
              marginTop : 15
            }}>

                <TouchableOpacity style={{
                    // width : 80,
                    // height : 20,
                    backgroundColor : this.state.leftActive ? 'darkgrey' : 'grey',
                    borderLeftWidth : 1,
                    borderColor : 'grey',
                    borderTopLeftRadius : 3,
                    borderBottomLeftRadius : 3,
                    padding : 5

                }}
                onPress = {()=>{this.handleClickLeft()}}
                >
                <Text style={{
                    color : this.state.leftActive ? 'white' : 'darkgrey',
                    fontWeight : '500'

                }}>In Network</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    // width : 80,
                    // height : 20,
                    backgroundColor : this.state.rightActive ? 'darkgrey' : 'grey',
                    borderLeftWidth : 1,
                    borderColor : 'darkgrey',
                    borderTopRightRadius : 3,
                    borderBottomRightRadius : 3,
                    padding : 5

                }}
                onPress = {()=>{this.handleClickRight()}}
                >
                <Text
                style={{
                    color : this.state.rightActive ? 'white' : 'darkgrey',
                    fontWeight : '600'
                }}
                >Out Of Network</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


const Style = StyleSheet.create({

});


export default Switch
