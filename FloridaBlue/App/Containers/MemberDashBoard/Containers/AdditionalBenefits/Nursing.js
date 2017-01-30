import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'


class Nursing extends Component {
    render() {
        return (
            <View style={Style.wrapper}>
                <View style={Style.textWrapper}>
                    <Text style={{
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: 10
                    }}>Skilled Nursing Facility</Text>

                    <Text>
                        You can also use this component to make more specific components like MyAppHeaderText for other kinds of text.
                    </Text>

                    
                </View>
            </View>
        );
    }
}

const Style = StyleSheet.create({
    wrapper: {
        // padding: 30,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: 'rgb(194, 193, 193)',

    },
    textWrapper: {
        margin: 15
    }

});
export default Nursing