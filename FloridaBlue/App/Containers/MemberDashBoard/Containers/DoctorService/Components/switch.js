import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {Colors,Metrics,Fonts} from '../../../../../Themes'

class Switch extends Component{
    handleClickLeft(){
      this.props.attemptHandleLeft();
    }
    handleClickRight(){
      this.props.attemptHandleRight() ;
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
                    backgroundColor : this.props.leftActive ? 'darkgrey' : 'grey',
                    borderLeftWidth : 1,
                    borderColor : 'grey',
                    borderTopLeftRadius : 3,
                    borderBottomLeftRadius : 3,
                    padding : 5

                }} onPress = {()=>{this.handleClickLeft()}}>
                <Text style={{
                    color : this.props.leftActive ? 'white' : 'darkgrey',
                    fontWeight : 'bold'

                }}>In Network</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    // width : 80,
                    // height : 20,
                    backgroundColor : this.props.rightActive ? 'darkgrey' : 'grey',
                    borderLeftWidth : 1,
                    borderColor : 'darkgrey',
                    borderTopRightRadius : 3,
                    borderBottomRightRadius : 3,
                    padding : 5

                }}  onPress = {()=>{this.handleClickRight()}}>
                <Text style={{
                    color : this.props.rightActive ? 'white' : 'darkgrey',
                    fontWeight : '600'
                }}>Out Of Network</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    // width : 80,
                    // height : 20,
                    backgroundColor : this.props.leftActive ? 'darkgrey' : 'grey',
                    borderLeftWidth : 1,
                    borderColor : 'grey',
                    borderTopLeftRadius : 3,
                    borderBottomLeftRadius : 3,
                    padding : 5

                }}
                onPress = {()=>{this.handleClickLeft()}}>
                <Text style={{
                    color : this.props.leftActive ? 'white' : 'darkgrey',
                    fontWeight : 'bold'

                }}>Preferred Network</Text>
                </TouchableOpacity>


            </View>
        );
    }
}



export default Switch
