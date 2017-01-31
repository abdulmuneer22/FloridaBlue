import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'

import {Colors,Metrics,Fonts} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'

const window = Dimensions.get('window')


class HomeHealthCare extends Component{
    render(){
        return(
            <View style = {Style.wrapper}>
                <Text style={{
                  fontSize:Fonts.size.h6,
                  textAlign : 'center',
                  marginBottom : Metrics.baseMargin,
                  fontWeight:'bold'
                }}>Home Health Care</Text>

                    <Text style={{fontSize:Fonts.size.medium}}>
                You can also use this component to make more specific components like MyAppHeaderText for other kinds of text.
                </Text>
            </View>
        );
    }
}

const Style = StyleSheet.create({
    wrapper : {
        padding : 10
    }

});
export default HomeHealthCare
