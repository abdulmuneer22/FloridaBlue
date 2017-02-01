import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  Text
} from 'react-native'


const window = Dimensions.get('window');
import { connect } from 'react-redux'

class FirstCard extends Component{

  render(){
    
    return(
      <View
      style={Style.cardStyle}

      >
      <View>
      <Text style={Style.h1}>Physical Services</Text>
        <View >
          <Text style={Style.h4}>
          Family Physician
          </Text>

          {
            this.props.SelctedLeft ?
            <Text style={Style.h2}>
            $20 Copay
            </Text>
            :
            <Text style={Style.h2}>
            Pay 40%
            </Text>

          }

        </View>


        <View >
          <Text style={Style.h4}>
          Specialist
          </Text>

          {
            this.props.SelctedLeft ?
            <Text style={Style.h2}>
            $40 Copay
            </Text>
            :
            <Text style={Style.h2}>
            Pay 40%
            </Text>

          }
        </View>

      </View>







      </View>
    );
  }


}



const Style = StyleSheet.create({
  cardStyle : {
    width : window.width,
    backgroundColor : 'rgba(167, 187, 193,0.7)',
    height : 200,
    alignSelf : 'center',
    padding : 10,
    marginTop : 10,
    alignItems : 'center'

  },
  h1 : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'center'
  },

  h2 : {
    fontSize : 18 ,
    textAlign : 'center',
    paddingBottom : 10
  },
  h4 : {
    textAlign : 'center',
    paddingTop : 15

  }

});


export default FirstCard
