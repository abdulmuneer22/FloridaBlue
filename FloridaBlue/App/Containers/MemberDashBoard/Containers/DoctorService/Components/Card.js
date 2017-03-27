import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import { Colors, Metrics, Fonts } from '../../../../../Themes'
const window = Dimensions.get('window')
import { connect } from 'react-redux'
import styles from '../DoctorServiceStyle.js'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../../Themes/FlbIcon'

const theme = getTheme()

class Card extends Component {

  constructor() {
    super();
    this.state = {
      notesVisible: false
    }
  }

  render() {
    var cards = []
    var that = this
    var card
    var temp = this.props.data
    var objectName = this.props.objectName
    var temp1 = temp[objectName]

    if (this.props.leftActive) {
      if (temp1 != null && temp1.inNetwork != null && temp1.inNetwork.networkBenefits != null) {
        card = temp1.inNetwork.networkBenefits
      }
    } else if (this.props.rightActive) {
      if (temp1 != null && temp1.outNetwork != null && temp1.outNetwork.networkBenefits != null) {
        card = temp1.outNetwork.networkBenefits
      }
    } else if (this.props.preferredActive) {
      if (temp1 != null && temp1.preferredNetwork != null && temp1.preferredNetwork.networkBenefits != null) {
        card = temp1.preferredNetwork.networkBenefits
      }
    }

    console.log('card of innetwork' + JSON.stringify(this.props.leftActive))
    // looping through cards to create the view
    // don't generate any markup if card object is null
    if (card) {
      var { notesVisible } = this.state

      var i = 0
      card.map((network, i) => {
        var speciality = []
        speciality = network['speciality']

        cards.push(<View style={i % 2 == 0 ? styles.cardStyle : styles.cardStyle1} key={i} >

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{
              marginRight: 10,
              marginLeft: 10,
              flex: 0.7
            }}>
              <Text style={styles.h1}>
                {_.get(network, 'header_text.en', '')}
              </Text>
            </View>
            <View style={{ marginRight: 25 }}>
              {
                network !=undefined && network.footer_note !=undefined && network.footer_note !=null && network.footer_note.en !=undefined && network.footer_note.en !=null ?
                  <TouchableWithoutFeedback
                    onPress={() => { this.setState({ notesVisible: !notesVisible }) }} >
                    
                    <Flb name={!notesVisible ? 'rd-d-arrow' : 'rd-u-arrow'} size={Metrics.icons.xm} style={{ marginTop: 25 }} color={Colors.flBlue.anvil} />
                  </TouchableWithoutFeedback>
                  :
                  null
              }

            </View>
          </View>

          {
            notesVisible ?
              <Text style={styles.noteText}>
                {_.get(network, 'footer_note.en', '')}
              </Text>
              :
              null
          }

          {
            speciality.map(specialities => {
              const { speciality_text, speciality_value } = specialities
              const style1 = { marginTop: 5, width: Metrics.screenWidth }
              const style2 = { marginTop: 5, flex: 0.5 }
              return (
                <View style={{ marginBottom: 10 }}>
                  <View>

                    {speciality_text['en']
                      ? <Text style={styles.h2} >
                        {speciality_text['en']}
                      </Text>
                      : <View />

                    }
                  </View>

                  <View style={!speciality_text['en'] ? style1 : style2}>
                    {
                      speciality_value.map(value => {
                        return (
                          <Text style={styles.h4}>
                            {value['en']} </Text>

                        )
                      })
                    }
                  </View>
                </View>)
            })
          }

        </View>

        )
        i += 1
        return cards
      })
    }

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


