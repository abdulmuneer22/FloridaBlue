import React, {Component} from 'react'
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text
} from 'react-native'

import {Colors, Metrics, Fonts} from '../../../../../Themes'
const window = Dimensions.get('window')
import {connect} from 'react-redux'
import styles from '../DoctorServiceStyle.js'

const Card=(style, header, specialities, lang) => {
  return <View style={style}>

        <Text style={styles.h1}>
          {header}
        </Text>
        {
          speciality.map(specialities=>{
            const{speciality_text, speciality_value}=specialities
            return <View>
            <Text style = {styles.h4} >
            {speciality_text['en']}
            </Text>
            {
              speciality_value.map(value=>{
                return <Text style={styles.h2}>
                {value['en']}</Text>
              })
            }
            </View>
          })
        }


      </View>
    }

  class specialityList extends Component {

        render () {
          var cards = []

          var that = this
          if (this.props.leftActive) {
            var card = this.props.data.officeServices.inNetwork
          } else {
            var card = this.props.data.officeServices.outNetwork
          }

          console.log('card of innetwork' + JSON.stringify(this.props.leftActive))
          // looping through cards to create the view
          var i = 0
          return(
      <ScrollView>
        <View>
          <Card header={card.header_text['en']} specialities={card.speciality} lang="en" style={styles.cardStyle} />
        </View>
      </ScrollView>
    )
  }
}

export default specialityList
