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

import { Card } from 'native-base'
import { Actions as NavigationActions } from 'react-native-router-flux'
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
  constructor (props) {
    super(props)
  }

  openDetails() {
    NavigationActions.ClaimDetail()
  }

  render () {
    return (
    <View style={{flex: 1}}>
      <View style={{}}>
        <View style={{flex: .1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, margin: 10}}>
          <Text style={{fontSize: 20, paddingLeft: 15}}>Claims List</Text>
          <TouchableOpacity style={{}}>
            <Text style={{color: 'black', fontWeight: '500', textAlign: 'center', marginRight: 40}}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin:10, marginBottom:20}}>
         <View style={{flex:1,flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
              <View style={{flex:0.33, alignItems:'center'}}>
              <Text style={{fontWeight: 'bold'}}> Date</Text>
              </View>
              <View style={{flex:0.33, alignItems:'center'}}>
              <Text style={{fontWeight: 'bold'}}> Member</Text>
              </View>
              <View style={{flex:0.34, alignItems:'center'}}>
              <Text style={{fontWeight: 'bold'}}> Provider</Text>
              </View>
            </View>
            </View>

        <ScrollView >
          <View style={{flex: 1}}>

            {this.props.data !=undefined ? this.props.data.map((value, i)=>{

                return(
                  <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => { this.openDetails() }}>
                      <Card style={{flex:1, flexDirection: 'row', justifyContent: 'center', padding: 10, margin: 10}} key={i}>

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
                    </TouchableOpacity>
                  </View>
                  )

              }) : null}

            </View>
        </ScrollView>
        </View>

    </View>

    )
  }
}



export default ClaimsCard
