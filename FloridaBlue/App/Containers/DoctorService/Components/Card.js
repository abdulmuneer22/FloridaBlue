import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from 'react-native'

import { Images, Colors, Metrics, Fonts } from '../../../Themes'
const window = Dimensions.get('window')
import { connect } from 'react-redux'
import styles from '../DoctorServiceStyle.js'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../Themes/FlbIcon'
import HTMLView from 'react-native-htmlview'
import Panel from './Panel'
import { Card } from 'native-base'

const theme = getTheme()

const HtMLstyles = StyleSheet.create({
  p: {
    fontWeight: '300',
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0015,
    color: Colors.flBlue.grey5

  },
  a: {
    fontWeight: '300',
    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.0025,
    color: Colors.flBlue.ocean,
    textDecorationLine: 'underline'
  }
})

class CCard extends Component {
  constructor () {
    super()
  }

  render () {
    var cards = []
    var that = this
    var card
    var temp = this.props.data
    var objectName = this.props.objectName
    var temp1 = temp[objectName]
    console.tron.log('cardImage' + this.props.cardImage)
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

    // looping through cards to create the view
    // don't generate any markup if card object is null
    if (card) {
 //  var { notesVisible } = this.state

      var i = 0
      card.map((network, i) => {
        var speciality = []
        speciality = network['speciality']
        var htmvalue = '<p>' + _.get(network, 'footer_note.en', '') + '</p>'
        var notesVisible = true
        if (this.props.cardImage) {
          var cardImage = this.props.cardImage
          if (cardImage == 'urgent-care' || cardImage == 'heart-hand') {
            var ImageInput = cardImage.replace('-', '')
          } else {
            var ImageInput = this.props.cardImage
          }
        }

        cards.push(

          <Card style={styles.cardStyle} key={i} >
            <View style={{flex: 1,
              marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.001,
              marginRight: Metrics.mediumMargin * Metrics.screenWidth * 0.001,
              marginTop: Metrics.baseMargin * Metrics.screenHeight * 0.001}} >
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'

              // justifyContent: 'center'

              }}>
                <View style={{
                //  marginRight: 10,
                // marginLeft: 10,
                  flex: 1
                 // backgroundColor:'red'

                 // margin: 10
                //    alignItems: 'center',
                // justifyContent:'center'
                }}>

                  {
                network != undefined && network.footer_note != undefined && network.footer_note != null && network.footer_note.en != undefined && network.footer_note.en != null
                  ? <View style={{ margin: 0}} >
                    <Panel title={_.get(network, 'header_text.en', '')} >
                      <View style={{ borderTopWidth: 0.2, bottom: 10 }} />
                      <View style={{bottom: 10}}>
                        <HTMLView value={htmvalue}
                          stylesheet={HtMLstyles} />
                      </View>
                      <View style={{ marginTop: 10 }} />

                    </Panel>
                    <View style={{borderBottomWidth: 0.3, marginTop: -10, margin: 10}} />
                  </View>
                    : <View style={{margin: 5, marginTop: -3, padding: 8}}>

                      <Text style={styles.h1}>
                        {_.get(network, 'header_text.en', 'Benefit Details')}

                      </Text>

                      <View style={{borderBottomWidth: 0.3, margin: 2}} />

                    </View>
                  }

                </View >

              </View>
              <View />
            </View>

            <View style={{flex: 1,
              flexDirection: 'row',
              margin: 0.1,
              marginBottom: 0

            }}>

              <View style={{flex: 0.5, marginBottom: 20, marginLeft: Metrics.mediumMargin * Metrics.screenWidth * 0.001}}>
                {
            speciality.map(specialities => {
              const { speciality_text, speciality_value } = specialities
              const style1 = { marginTop: 5, width: Metrics.screenWidth * 0.5 }
              const style2 = { marginTop: 5 }
              return (
                <View style={{ marginBottom: 5 }}>
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
                            {value['en']}
                          </Text>
                        )
                      })
                    }
                  </View>
                </View>)
            })

          }

              </View>
              <Image source={Images[ImageInput]} style={styles.backgroundImage} resizeMode={(Platform.OS === 'ios') ? '' : 'cover'} />
            </View>

          </Card>

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

export default CCard
