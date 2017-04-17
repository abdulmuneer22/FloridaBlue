import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Metrics, Fonts } from '../../../../../Themes'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../../Themes/FlbIcon'
import styles from '../DoctorList/DoctorListStyle'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'


class BottomCard extends Component{
    render(){
        return(
            <View style={{
                    flexDirection : 'row',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:Colors.snow
            }}>

                
                <View style={{
                        backgroundColor : Colors.flBlue.grass,
                        width:Metrics.screenWidth*0.5,
                        justifyContent : 'center',
                        alignItems : 'center',
                        // marginRight : 1,
                        borderRightWidth:1 ,
                        borderColor:Colors.snow,
                        //  flex:1,
                        height: Metrics.textHeight2 * Metrics.screenHeight * 0.002,
                        flexDirection : 'row'
                }}> 
               
                <Flb 
                name='search-find'  
                size={Metrics.icons.medium} 
                style = {{
                    marginRight : 0
                }}
                color={Colors.snow} />
               
                <Text style={{
                    color : Colors.snow,
                    fontSize : Fonts.size.input * Metrics.screenWidth * 0.0026,
                    //marginLeft : 10,
                    textAlign:'center',
                    fontWeight:'400'
                }}>Advanced Results</Text>
              
            </View>


            <TouchableOpacity
            onPress={NavigationActions.mapview}
            >
            <View style={{
                    backgroundColor : Colors.flBlue.grass,
                    width:Metrics.screenWidth*0.5,
                    justifyContent : 'center',
                    alignItems : 'center',
                    borderLeftWidth:1 ,
                    borderColor:Colors.snow,
                    // flex:1,
                    height: Metrics.textHeight2 * Metrics.screenHeight * 0.002,
                    flexDirection : 'row'
                }}> 

                <Icon 
                name='map'  
                size={Metrics.icons.medium} 
                style = {{
                    marginRight : 0
                }}
                color={Colors.snow} />

                <Text style={{
                    color : 'white',
                    fontSize : Fonts.size.input * Metrics.screenWidth * 0.0026,
                    marginLeft : Metrics.baseMargin,
                    fontWeight:'400'
                }}>Map View</Text>
            </View>
            </TouchableOpacity>
                
            </View>
        );
    }
}


export default BottomCard