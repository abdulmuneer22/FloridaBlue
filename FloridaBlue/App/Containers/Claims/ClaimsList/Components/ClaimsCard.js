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

  constructor(props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.viewClaimsDetails = this.viewClaimsDetails.bind(this);
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

    viewClaimsDetails(claimNumber){
    console.tron.log('claimNumber'+ claimNumber)
    this.props.attemptClaimDetail(claimNumber);
    NavigationActions.ClaimDetail()
  }

  render(){
    return (
      // Header
      /*List View*/

          <ScrollView>
            <View>


                {this.props.data !=undefined ? this.props.data
                                                              //.filter((value, i) => (i < 7))
                                                              .map((value, i)=>{
                  if (i < this.state.cardLimit) {
                    return(
                      <View>
                        <TouchableOpacity onPress={() => this.viewClaimsDetails(this.props.claimNumber)}>
                        <Card style={styles.claimsListCard} key={i} >
                          
                          <View style={styles.claimsCardRow2}>
                            <Text style={styles.claimsCardText}>
                             {this.formatDate(value.dateOfService)}
                            </Text>
                          </View>

                          <View style={styles.claimsCardRow2}>
                            <Text style={styles.claimsCardText}>
                              {value.providerName}
                            </Text>
                          </View>

                          <View style={styles.claimsCardRow3}>
                            <Text style={styles.claimsCardText}>
                              {value.claimType}
                            </Text>
                          </View>
                        </Card>
                        </TouchableOpacity>
                       
                      </View>
                    
                      
                      )  }

                  }) : null}

              <View style={{flex: 0, margin: 14}}>
                <Text style={{textAlign: 'center', opacity: 0.6}}>Showing {this.props.cardLimit} out of {this.props.claimsCount} Claims</Text>
                <TouchableOpacity onPress={this.props.viewMore}>
                  <Text style={{textAlign: 'center', color: 'teal', fontSize: 20}}>View More <Icon name="chevron-down"></Icon></Text>
                </TouchableOpacity>
                </View> 
                    
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

