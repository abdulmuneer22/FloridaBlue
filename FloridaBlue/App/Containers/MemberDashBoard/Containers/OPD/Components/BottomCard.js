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
//import AnimatedViews from './AnimatedView'


class BottomCard extends Component{

     _advancedSearch() {
      NavigationActions.AdvancedSearch()
    }

    _mapView() {
      NavigationActions.MapView()
    }


    render(){
        return(
            <View style={{
                    flexDirection : 'row',
                    alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:Colors.snow
            }}>

                <TouchableOpacity onPress={()=> this._advancedSearch()}>
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
               <View style={{flex:0.3, alignItems:'center'}}>
                <Flb 
                name='search-find'  
                size={Metrics.icons.medium} 
                style = {{
                    marginRight : 0
                }}
                color={Colors.snow} />
               </View>
               <View style={{flex:0.7, alignItems:'flex-start'}}>
                <Text style={{
                    color : Colors.snow,
                    fontSize : Fonts.size.input * Metrics.screenWidth * 0.0026,
                    //marginLeft : 10,
                    textAlign:'center',
                    fontWeight:'400'
                }}>Advanced Search</Text>
              </View>
             
            </View>
         </TouchableOpacity >

            <TouchableOpacity onPress={()=> this._mapView()}  >
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

                <Flb 
                name='map'  
                size={Metrics.icons.medium} 
                style = {{
                    marginRight : 0
                }}
                color={Colors.snow} />

                <Text style={{
                    color : 'white',
                    fontSize : Fonts.size.h6 * Metrics.screenWidth * 0.0028,
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