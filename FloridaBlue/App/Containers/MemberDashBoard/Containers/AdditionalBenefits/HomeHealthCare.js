import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'


class HomeHealthCare extends Component{
    render(){
        return(
            <View style = {Style.wrapper}>
                <Text style={{
                    fontWeight : '600',
                    textAlign : 'center',
                    marginBottom : 10
                }}>Home Health Care</Text>

                <Text>
                You can also use this component to make more specific components like MyAppHeaderText for other kinds of text.
                </Text>
            </View>
        );
    }
}

const Style = StyleSheet.create({
    wrapper : {
        padding : 30
    }

});
export default HomeHealthCare
