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

  render () {
    var cards = []
    var that = this
    var card
    var temp = this.props.data
    var objectName = this.props.objectName
    var temp1 = temp[objectName]

    if (this.props.leftActive) {
      card = temp1.inNetwork
    } else {
      card = temp1.outNetwork
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
<<<<<<< HEAD
          speciality.map(specialities=>{
            const{speciality_text, speciality_value}=specialities
            return (<View style={{marginBottom:20, flexDirection:'row'}}>

            {speciality_text['en'] ?
                <Text style={styles.h2} >
                  {speciality_text['en']} :
                </Text>
              : <View></View>

            }

            {

              speciality_value.map(value=>{
                return( <View style={{flex:1}}><Text style={styles.h4}>
                {value['en']} </Text></View>)
=======
          speciality.map(specialities => {
            const {speciality_text, speciality_value} = specialities
            return (
              <View style={{marginBottom: 20}}>
                {speciality_text['en'] ?
                  <Text style={styles.h2} >
                    {speciality_text['en']}
                  </Text>
              : <View />

            }

                {
              speciality_value.map(value => {
                return (<Text style={styles.h4}>
                  {value['en']}</Text>)
>>>>>>> 4b72f7eade18d3410ee30bb2699df8b565a143e1
              })

            }
<<<<<<< HEAD

            </View>)
=======
              </View>)
>>>>>>> 4b72f7eade18d3410ee30bb2699df8b565a143e1
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
