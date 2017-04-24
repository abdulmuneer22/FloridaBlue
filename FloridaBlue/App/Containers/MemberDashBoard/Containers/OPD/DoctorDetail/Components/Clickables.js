import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Linking,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';


export default class Clickables extends Component{

    constructor(){
        super();
        this.state = {
            isActive : false
        }
    }


    CountLabel(){
        return(
        <View style={{
            width : 50,
            marginLeft : 10,
            padding : 5,
            borderRadius : 10,
            backgroundColor : '#0093cc'
        }}>
            <Text style={{
                color : 'white',
                fontWeight : '600',
                padding : 5,
                textAlign : 'center'
            }}>{this.props.count}</Text>
        </View>
    )
    }


    ClickablesContent(){
        return(
            <View style={{
                paddingLeft : 20
            }}>
                <Text style={{
                    fontSize : 14,
                    justifyContent : 'space-around',
                    textAlign : 'justify',
                    margin : 5
                }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </Text>
            </View>
        )
    }


    render(){
        return(
            <View style={{
                marginTop : 5,
                marginBottom : 5,
                padding : 10,
                backgroundColor : '#f7f7f7',
                borderTopColor : '#e9e9e9',
                borderTopWidth : 1,
                borderBottomColor : '#e9e9e9',
                borderBottomWidth : 1
            }}>
            <TouchableOpacity 
            onPress = {()=>{
                this.setState({
                    isActive : !this.state.isActive
                })
            }}
            style={{
                flexDirection : 'row',
            }}>
                <View style={{
                    flex : 1,
                    alignItems : 'flex-end',
                    justifyContent : 'center'
                }}>
                    <Text style={{
                        fontSize : 30,
                        fontWeight : '600',
                        color : '#0391d0'
                    }}>
                    {
                        this.state.isActive ? "-" : "+"
                    }
                    </Text>
                </View>

                <View style={{
                    flex : 4,
                    justifyContent : 'center',
                    paddingLeft : 5 ,
                    flexDirection : 'row',
                    alignItems : 'center'
                }}>
                    <Text style={{
                        fontSize : 18,
                        color : '#2797d2',
                        fontWeight : '600',
                        flex : 1
                    }}>
                        Other locations
                    </Text>
                    {
                        this.props.count ?
                            <View style={{
                            flex : 1,
                            //backgroundColor : 'red'
                            }}>
                            {this.CountLabel()}
                            </View>
                        :
                        null
                    }
                    
                    
                </View>
                
                                
            </TouchableOpacity>

            {   
                this.state.isActive ?
                this.ClickablesContent()
                :
                null
            }

            </View>
        );
    }
}