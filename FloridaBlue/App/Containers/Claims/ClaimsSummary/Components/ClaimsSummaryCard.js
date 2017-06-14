import React, { Component, PropTypes } from 'react'
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
import ClaimsActions from '../../../../Redux/ClaimsRedux'
import { Colors, Metrics, Fonts } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../ClaimsSummaryStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../Themes/FlbIcon'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

const window = Dimensions.get('window')

class ClaimsSummaryCard extends Component {

  constructor (props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
    this.viewCliamsDetails = this.viewCliamsDetails.bind(this)
  }

  formatDate (date) {
    date = new Date(date)
    let day = ('0' + date.getDate()).slice(-2)
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let year = date.getFullYear()
    return month + '-' + day + '-' + year
  }

  viewCliamsDetails (claimNumber) {
    console.tron.log('claimNumber' + claimNumber)
    this.props.attemptClaimDetail(claimNumber)
    NavigationActions.ClaimDetail()
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {

            this.props.data != undefined ? this.props.data.map((value, i) => {
            let color = Colors.flBlue.ocean;
            if(value.claimType === 'Professional'){
                color = Colors.flBlue.ocean;
            }else if(value.claimType === 'Institutional'){
                color = Colors.flBlue.red;
            }else{
              color = Colors.flBlue.grass;
            }

            return (
              <TouchableOpacity style={{flex: 1}} key={i} onPress={() => this.viewCliamsDetails(value.claimNumber)}>
                <Card key={i} style={{flex: 1, justifyContent: 'center', margin: 10}} key={i}>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flex:0.01,backgroundColor:color}}>
                        
                    </View>
                    <View style={{flex: 0.29, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={styles.textStyle}>
                        {this.formatDate(value.dateOfService)}
                      </Text>
                    </View>
                    <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={styles.textStyle}>
                        {value.providerName}
                      </Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={styles.textStyle}>
                        {value.claimType}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            )
          }) : null}
        </View>
      </View>
    )
  }
}

ClaimsSummaryCard.propTypes = {
  data: PropTypes.array,
  attemptClaimDetail: PropTypes.func,
  error: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claims.fetching,
    claimdetaildata: state.claims.claimdetail,
    error: state.claims.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimDetail: (data) => dispatch(ClaimsActions.claimDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsSummaryCard)
