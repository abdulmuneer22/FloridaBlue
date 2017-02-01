import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native'

import {Colors,Metrics,Fonts} from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'

const window = Dimensions.get('window')

class OutOfPocket extends Component{
    render(){
        return(
            <View style = {Style.wrapper}>
                <Text style = {{
                    fontSize:Fonts.size.h6,
                    fontWeight:'bold'
                }}>Out of Pocket Maximum</Text>

                <View style={Style.row_1}>
                    <View style={Style.col_1}>
                        <Text style={{paddingBottom : Metrics.doubleBaseMargin, fontSize:Fonts.size.regular}}>Individual</Text>

                        <Text>You have met $0.00</Text>
                        <Text>of your $5,000.00</Text>
                        <Text>maximum</Text>


                    </View>

                    <View style={Style.col_2}>
                        <Text style={{paddingBottom : Metrics.doubleBaseMargin,fontSize:Fonts.size.regular}}>Family</Text>
                        <Text>You have met $0.00</Text>
                        <Text>of your $5,000.00</Text>
                        <Text>maximum</Text>
                    </View>

                </View>

                <View style={Style.row_2}>
                    <Text>Note : When the browser is trying to render a text node, it's going to go all the way up to the root element of the tree and find an element with a font-size attribute. An unexpected property of this system is that any node can have font-size attribute, including a This was designed for convenience, even though not really semantically correct</Text>
                </View>
            </View>
        );
    }
}

const Style = StyleSheet.create({
    wrapper : {
        backgroundColor : Colors.flBlue.grey2,
        width : window.width,
        padding : 15,
        alignItems : 'center',
        marginTop : 15
    },
    row_1 : {
        flexDirection: 'row',

    },
    col_1 : {
        flex : 1,
        alignItems : 'center',
        padding : 10,

    },
    col_2 : {
        flex : 1,
        alignItems : 'center',
        padding : 10


    },
    row_2 : {
        margin : 20
    }
});
export default OutOfPocket
