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
  Linking,
  Alert
} from 'react-native'

import { Button, Card } from 'native-base'
import ClaimsActions from '../../../../Redux/ClaimsRedux'
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../ClaimsStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../Themes/FlbIcon'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

const window = Dimensions.get('window')

class ClaimsCard extends Component {
  constructor (props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
    this.viewClaimsDetails = this.viewClaimsDetails.bind(this)
    this.state = {
      cardLimit: this.props.cardLimit
    }
  }

  formatDate (date) {
    date = new Date(date)
    let day = ('0' + date.getDate()).slice(-2)
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    return month + '-' + day + '-' + year
  }

  formatName (name) {
    var firstName = name.split(' ').slice(-2, -1).join(' ')
    return firstName
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.cardLimit) {
      this.setState({ cardLimit: nextProps.cardLimit })
    }
  }

  viewClaimsDetails (claimNumber) {
    console.tron.log('claimNumber' + claimNumber)
    this.props.attemptClaimDetail(claimNumber)
    NavigationActions.ClaimDetail()
  }

  render () {
    return (
        <View style={{flex:1}}>
          {this.props.data != undefined ? this.props.data.map((value, i) => {
            {/*let color = Colors.flBlue.ocean
            if (value.claimType === 'Professional') {
              color = Colors.flBlue.ocean
            } else if (value.claimType === 'Institutional') {
              color = Colors.flBlue.red
            } else {
              color = Colors.flBlue.grass
            }*/}
            if (i < this.state.cardLimit) {
              return (
                <View key={i} style={{ flex: 1 }}>
                  <TouchableOpacity key={i} style={{ flex: 1 }} onPress={() => this.viewClaimsDetails(value.claimNumber)}>
                    <Card style={styles.claimsListCard} key={i} >
                      <View style={{ flex: 1, flexDirection: 'row',marginTop:Metrics.baseMargin*Metrics.screenHeight*0.002,marginBottom:Metrics.baseMargin*Metrics.screenHeight*0.002, justifyContent: 'center' }}>
                      { /*  <View style={{flex: 0.01,marginTop:-Metrics.baseMargin*Metrics.screenHeight*0.002,marginBottom:-Metrics.baseMargin*Metrics.screenHeight*0.002, backgroundColor: color}} />*/}
                        <View style={{ flex: 0.27, alignItems: 'center', justifyContent: 'center' }}>
                          <Text allowFontScaling={false} style={styles.claimsCardText}>
                            {this.formatDate(value.dateOfService)}
                          </Text>
                        </View>
                        <View style={{ flex: 0.33, justifyContent: 'center',alignItems:'center' }}>
                          <Text allowFontScaling={false} style={styles.claimsCardText}>
                            {value.memberName}
                          </Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'center',alignItems:'center',marginRight:10 }}>
                          <Text allowFontScaling={false} style={styles.providerName}>{value.providerName}</Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            }
          }) : null}
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claims.fetching,
    claimdetaildata: state.claims.data,
    error: state.claims.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimDetail: (data) => dispatch(ClaimsActions.claimDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsCard)
