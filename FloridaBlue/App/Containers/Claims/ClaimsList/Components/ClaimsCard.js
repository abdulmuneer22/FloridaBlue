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
import ClaimDetailActions from '../../../../Redux/ClaimDetailRedux'
import { Colors, Metrics, Fonts } from '../../../../Themes'
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.cardLimit) {
      this.setState({cardLimit: nextProps.cardLimit})
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

          {this.props.data != undefined ? this.props.data
                                                              // .filter((value, i) => (i < 7))
                                                              .map((value, i) => {
                                                                if (i < this.state.cardLimit) {
                                                                  return (
                                                                    <View style={{}}>
                                                                      <TouchableOpacity onPress={() => this.viewClaimsDetails(this.props.claimNumber)}>
                                                                        <Card style={{flexDirection: 'row', justifyContent: 'center', padding: 10, margin: 10, marginBottom: 1}} key={i} >

                                                                          <View style={{flex: 0.33, alignItems: 'center'}}>
                                                                            <Text style={{color: Colors.flBlue.anvil}}>
                                                                              {this.formatDate(value.dateOfService)}
                                                                            </Text>
                                                                          </View>

                                                                          <View style={{flex: 0.33, alignItems: 'center'}}>
                                                                            <Text style={{color: Colors.flBlue.anvil}}>
                                                                              {value.providerName}
                                                                            </Text>
                                                                          </View>

                                                                          <View style={{flex: 0.34, alignItems: 'center'}}>
                                                                            <Text style={{color: Colors.flBlue.anvil}}>
                                                                              {value.claimType}
                                                                            </Text>
                                                                          </View>
                                                                        </Card>
                                                                      </TouchableOpacity>
                                                                    </View>
                                                                  )
                                                                }
                                                              }) : null}

        </View>

      </ScrollView>

      )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claimdetail.fetching,
    claimdetaildata: state.claimdetail.data,
    error: state.claimdetail.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimDetail: (data) => dispatch(ClaimDetailActions.claimDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsCard)

