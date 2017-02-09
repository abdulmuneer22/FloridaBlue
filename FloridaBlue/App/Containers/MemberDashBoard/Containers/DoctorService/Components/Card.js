import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text
} from 'react-native'

import {Colors, Metrics, Fonts} from '../../../../../Themes'
const window = Dimensions.get('window');
import {connect} from 'react-redux'
import styles from '../DoctorServiceStyle.js'

class Card extends Component {

  render() {
    var cards = [];

    var that = this;
    if (this.props.leftActive) {
      var card = this.props.data.officeServices.inNetwork
    } else {
      var card = this.props.data.officeServices.outNetwork
    }

    console.log("card of innetwork" + JSON.stringify(this.props.leftActive));
    // looping through cards to create the view
    var i = 0;
    card.map(function(network, i) {
        var speciality = [];
        speciality = network['speciality'];
        console.log("speciality" + JSON.stringify(card))
        cards.push( <View style = {i % 2 == 0 ? styles.cardStyle : styles.cardStyle1} >
          <Text style = {styles.h1}>
          {network.header_text.en}
           </Text>
          <View>
          <Text style = {styles.h4} >
          {speciality[0].speciality_text.en}
          </Text>

          </View>
          <View>
          <Text style = {styles.h4} >
          {speciality[1].speciality_text.en}
          </Text>

          <Text style = {styles.h2} >
          {speciality[1].speciality_value[0].en}
          </Text>
          <Text style = { styles.h2} >
          {speciality[1].speciality_value[0].en}
          </Text>
          </View >
          </View>
        )
        i += 1
        return cards

      }

    );
    return (

      <ScrollView >
      <View >
      {cards}
      </View>
      </ScrollView >

    );
  }
}




export default Card
