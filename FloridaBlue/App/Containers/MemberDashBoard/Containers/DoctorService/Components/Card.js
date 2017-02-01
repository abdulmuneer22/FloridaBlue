import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text
} from 'react-native'

import {Colors,Metrics,Fonts} from '../../../../../Themes'
const window = Dimensions.get('window');
import { connect } from 'react-redux'

class Card extends Component{

  render(){
    var cards = [];

    var that = this ;
    if(this.props.leftActive){
		  var  card =this.props.data.officeServices.inNetwork
      }else {
      var  card = this.props.data.officeServices.outNetwork
      }

    console.log("card of innetwork"+JSON.stringify(this.props.leftActive));
		// looping through cards to create the view
    var i =0 ;
     card.map(function(network ,i){
      var speciality =[] ;
      speciality = network['speciality'] ;
      console.log("speciality"+JSON.stringify(card))
			cards.push(
        <View style={ i%2 == 0 ? Style.cardStyle : Style.cardStyle1}>
        <Text style={Style.h1}>{network.header_text.en}</Text>
          <View >
            <Text style={Style.h4}>
            {speciality[0].speciality_text.en}
            </Text>
              <Text style={Style.h2}>
          { speciality[0].speciality_value.en}
              </Text>
          </View>
          <View >
            <Text style={Style.h4}>
          {speciality[1].speciality_text.en}
            </Text>

              <Text style={Style.h2}>
            {speciality[1].speciality_value.en}
              </Text>
          </View>
        </View>


      )
      i+=1
      return cards



    }

  );

		return (

<ScrollView>
			<View >
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
  cardStyle1 : {
    width : window.width,
    backgroundColor : Colors.snow,
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
