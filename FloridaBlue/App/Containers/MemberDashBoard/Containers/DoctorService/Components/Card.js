import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text
} from 'react-native'

import { Colors, Metrics, Fonts } from '../../../../../Themes'
const window = Dimensions.get('window')
import { connect } from 'react-redux'
import styles from '../DoctorServiceStyle.js'

class Card extends Component {

  render() {
    var cards = []
    var that = this
    var card;
    var temp = this.props.data;
    var objectName = this.props.objectName
    var temp1 = temp[objectName];

    if (this.props.leftActive) {
      card = temp1.inNetwork;
    } else {
      card = temp1.outNetwork;
    }

    console.log('card of innetwork' + JSON.stringify(this.props.leftActive))
    // looping through cards to create the view
    var i = 0
    card.map(function (network, i) {
      var speciality = []
      speciality = network['speciality']

      cards.push(<View style={i % 2 == 0 ? styles.cardStyle : styles.cardStyle1} key={i} >
        <Text style={styles.h1}>
          {network.header_text.en}
        </Text>

        {
          speciality.map(specialities=>{
            const{speciality_text, speciality_value}=specialities
<<<<<<< HEAD
            return (<View style={{marginBottom:20, flexDirection:'row'}}>

            {speciality_text['en'] ?
                <Text style={styles.h2} >
                  {speciality_text['en']} :
=======
            return (
            <View style={{marginBottom:20}}>
            {speciality_text['en'] ?
                <Text style={styles.h2} >
                  {speciality_text['en']}
>>>>>>> 2575481e69d47adde8b39968911202f326b037b5
                </Text>
              : <View></View>

            }

            {
<<<<<<< HEAD

              speciality_value.map(value=>{
                return( <View style={{flex:1}}><Text style={styles.h4}>
                {value['en']} </Text></View>)
=======
              speciality_value.map(value=>{
                return(<Text style={styles.h4}>
                {value['en']}</Text> )
>>>>>>> 2575481e69d47adde8b39968911202f326b037b5
              })

            }
<<<<<<< HEAD

=======
>>>>>>> 2575481e69d47adde8b39968911202f326b037b5
            </View>)
          })
        }



      </View>


      )
      i += 1
      return cards
    }

    )

    return (
      <ScrollView>
        <View>
          {cards}
        </View>
      </ScrollView>
    )
  }
}

export default Card
