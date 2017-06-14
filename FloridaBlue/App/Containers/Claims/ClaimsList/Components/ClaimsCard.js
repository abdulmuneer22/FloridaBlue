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
      // Header
      /* List View */

      <ScrollView>
        <View>

          {this.props.data != undefined ? this.props.data.map((value, i) => {
            let color = Colors.flBlue.ocean
            if (value.claimType === 'Professional') {
              color = Colors.flBlue.ocean
            } else if (value.claimType === 'Institutional') {
              color = Colors.flBlue.red
            } else {
              color = Colors.flBlue.grass
            }
            if (i < this.state.cardLimit) {
              return (

                <View key={i} style={{ flex: 1 }}>
                  <TouchableOpacity key={i} style={{ flex: 1 }} onPress={() => this.viewClaimsDetails(value.claimNumber)}>
                    <Card style={styles.claimsListCard} key={i} >
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 0.01, backgroundColor: color, height: 37 }} />
                        <View style={{ flex: 0.29, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={styles.claimsCardText}>
                            {this.formatDate(value.dateOfService)}
                          </Text>
                        </View>

                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={styles.claimsCardText}>
                            {this.formatName(value.providerName)}
                          </Text>
                        </View>

                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={styles.claimsCardText}>
                            {value.claimType}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>

                </View>

              )
            }
          }) : null}

          <View style={{ flex: 0, margin: 14 }}>
            <Text style={{ textAlign: 'center', opacity: 0.6 }}>Showing {this.props.cardLimit} out of {this.props.claimsCount} Claims</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.props.viewMore} style={{ flexDirection: 'row' }}>
                <Text style={styles.claimsViewMore}>View More </Text><Flb name='chevron-down' size={20} color={Colors.flBlue.teal} style={{ marginTop: 3 }} />
              </TouchableOpacity>
              <TouchableOpacity><Image source={Images.infoIcon} style={{ marginLeft: 80 }} /></TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>

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
