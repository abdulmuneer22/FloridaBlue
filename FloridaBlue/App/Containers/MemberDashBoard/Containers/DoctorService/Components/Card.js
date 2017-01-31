import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text
} from 'react-native'


const window = Dimensions.get('window');
import { connect } from 'react-redux'

class Card extends Component{

  render(){
    var cards = [];
    var card ;
    var that = this ;
    if(this.props.leftActive){
		    card =this.props.data.officeServices.outNetwork
      }else {
        card = this.props.data.officeServices.inNetwork
      }

    console.log("card of innetwork"+JSON.stringify(this.props.leftActive));
		// looping through cards to create the view
     card.map(function(network){
      var speciality =[] ;
      speciality = network['speciality'] ;
      console.log("speciality"+JSON.stringify(that.props.leftActive))
			cards.push(
        <View>
        <Text style={Style.h1}>{network.header_text.en}</Text>
          <View >
            <Text style={Style.h4}>
            {speciality[0].speciality_text.en}
            </Text>

            {
              that.props.leftActive?
              <Text style={Style.h2}>
          { speciality[0].speciality_value.en}
              </Text>
              :
              <Text style={Style.h2}>
              Pay 40%
              </Text>

            }
          </View>

          <View >
            <Text style={Style.h4}>
          {speciality[1].speciality_text.en}
            </Text>
            {
              that.props.leftActive ?
              <Text style={Style.h2}>
            {speciality[1].speciality_value.en}
              </Text>
              :
              <Text style={Style.h2}>
              Pay 40%
              </Text>

            }
          </View>
        </View>
      )
      return cards
		});

		return (

<ScrollView>
			<View style={Style.cardStyle}>
      				{cards}
			</View>
</ScrollView>

		);
  }
}



const Style = StyleSheet.create({
  cardStyle : {
    width : window.width,
    backgroundColor : 'rgba(167, 187, 193,0.7)',
    //height : 200,
    alignSelf : 'center',
  //  padding : 10,
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


export default Card
