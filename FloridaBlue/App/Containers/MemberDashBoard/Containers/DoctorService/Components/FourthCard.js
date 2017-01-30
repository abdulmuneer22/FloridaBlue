import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window');
import { connect } from 'react-redux'

class FourthCard extends Component {
  render() {
    // console.log(this.props.SelctedLeft)
    return (
      <View style={Style.wrapper}>
        <View style={{
          flexDirection: 'row',
          marginTop: 15
        }}>

          {
            this.props.SelctedLeft ?
              <View style={{
                alignItems: 'center',
                // borderWidth : 1,
                // borderColor : 'black',
                flex: 1
              }}>
                <Text style={Style.h4}>
                  Family Physician
                </Text>
                <Text style={Style.h2}>$20 Copay</Text>

                <Text style={Style.h4}>
                  Specialist
                </Text>
                <Text style={Style.h2}>$20 Copay</Text>
                </View>

              :
              <View style={{
                alignItems: 'center',
                // borderWidth : 1,
                // borderColor : 'black',
                flex: 1
              }}>
                <Text style={Style.h4}>
                  Family Physician
                </Text>
                <Text style={Style.h2}>Pay 40%</Text>

                <Text style={Style.h4}>
                  Specialist
                </Text>
                <Text style={Style.h2}>Pay 40%</Text>
                </View>
          }








        </View>

      </View>
    );
  }


}



var Style = StyleSheet.create({
  wrapper: {
    width: window.width,
    alignItems: 'center',
    padding: 10,
    // marginTop: 10,

  },
  h4: {
    fontSize: 14,

  },
  h2: {
    fontSize: 18,
    marginBottom: 10
  }

});



export default FourthCard
