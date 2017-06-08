import React, { Component } from 'react'
import {
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Linking,
    Alert
} from 'react-native'

import { Button, Card } from 'native-base'

import { Colors, Metrics, Fonts } from '../../../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import styles from '../ClaimsStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../../../Themes/FlbIcon'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

const window = Dimensions.get('window')

class ClaimsCard extends Component {

  
  render () {


  
    return (
      // Header
      /*List View*/

          <ScrollView>
            <View>

              
                {this.props.data !=undefined ? this.props.data
                                                              //.filter((value, i) => (i < 7))
                                                              .map((value, i)=>{
                    
                    return(
                      <View style={{}}>
                        <Card style={{flexDirection: 'row', justifyContent: 'center', padding: 10, margin: 10, marginBottom: 1}} key={i}>
                          
                          <View style={{flex: .33, alignItems: 'center'}}>
                            <Text style={styles.textStyle}>
                              {value.dateOfService}
                            </Text>
                          </View>

                          <View style={{flex: .33, alignItems: 'center'}}>
                            <Text style={styles.textStyle}>
                              {value.providerName}
                            </Text>
                          </View>

                          <View style={{flex: .34, alignItems: 'center'}}>
                            <Text style={styles.textStyle}>
                              {value.claimType}
                            </Text>
                          </View>
                        </Card>
                      </View>
                      ) 

                  }) : null}

               
                    
              </View>           

          </ScrollView>

         

      )
    }
  }


export default ClaimsCard


