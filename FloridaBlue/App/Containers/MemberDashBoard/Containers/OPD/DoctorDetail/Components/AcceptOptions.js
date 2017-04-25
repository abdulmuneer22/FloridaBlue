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
const window = Dimensions.get('window')

const Options = [
    {
        name : "Blue Options"
    },
    {
        name : "Spanish"
    },
    {
        name : "Blue Options"
    }
    
]

export default class AcceptOptions extends Component{
    render(){
        return(
            <View style={{
                width : window.width * 0.8,
                alignSelf : 'center',
                marginTop : 15
            }}>
                {
                    Options.map((item,i)=>{
                        return(
                            <View style={{
                                flexDirection : 'row',
                                alignItems : 'center'
                            }} key={i}>
                            <Icon 
                                name="ios-checkmark" 
                                size={40} 
                                color="#3bb324" 
                                style={{
                                    marginRight : 10
                                }}
                            />
                            <Text style={{fontSize : 16}}>Accepts your {item.name} Plan</Text>
                            </View>
                        )
                    })
                }
                
            </View>
        );
    }
}