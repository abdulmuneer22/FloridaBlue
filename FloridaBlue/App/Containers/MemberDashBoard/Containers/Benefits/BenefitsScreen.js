import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const window = Dimensions.get('window')
// toolbar => 60
//grid => window - 60 -> 70%
//footer => window-60 -> 30%
const windowheight = window.height - 60

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../../../Themes'
import styles from './BenefitsStyle'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Card from './BenefitCard'

class PlanBenefits extends Component{


  _renderHeader(){
  return <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Plan Benefits</Text>
    {NavItems.settingsButton()}

  </View>
}

    render(){
        return(
            <View style={{flex : 1}}>
              {this._renderHeader()}

            <View style={{
                height : windowheight*0.8,
                backgroundColor : 'white'}}>
                <View style={{
            flexWrap : 'wrap',
            flexDirection : 'row'
            }}>

            <Card
            title = "Doctor Office Services"
            bg="rgb(204, 211, 214)"
            icon = "user-md"

            />
            <Card
            title = "Emergency Services"
            bg="rgb(114, 154, 160)"
            icon = "ambulance"

            />

            <Card
            title = "Hospital/Surgical"
            bg="rgb(226, 233, 235)"
            icon = "hospital-o"


            />

            <Card
            title = "Laboratory and Radiology Service"
            bg="rgb(76, 82, 83)"
            icon = "flask"


            />

            <Card
            title = "Mental Health"
            bg="rgb(190, 193, 194)"
            icon = "plus-square"
            />
            <Card
            title = "Pahrmacy"
            bg="rgb(82, 111, 115)"
            icon = "plus"
            />


            </View>
            </View>

            <View style={{
                height : windowheight*0.2,
                backgroundColor : 'white',
                alignItems : 'center',
                justifyContent : 'center',
                padding : 20
            }}>

            <View style={Styles.footerWrapper}>
                <View style={Styles.icon}>
                <Icon name="pencil" size={25} color="black" />
                </View>

                <View style={Styles.textWrapepr}>
                <Text>Your pan pays for free flu shots a year</Text>
                </View>

            </View>
            </View>



            </View>
        );
    }

}

var Styles = StyleSheet.create({
    footerWrapper : {
        flexDirection : 'row',
        bottom : 0
    },
    icon  : {
        flex : 0.6,
        // width : window.width,
        // backgroundColor : 'red'
    },
    textWrapepr : {
        // backgroundColor : 'green',
        flex : 3
    }
});
export default PlanBenefits
