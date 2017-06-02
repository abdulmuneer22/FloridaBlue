import React, { Component, PropTypes } from 'react'

import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, ScrollView, Linking} from 'react-native'

import styles from './ClaimsStyle'
import ClaimsCard from './Components/ClaimsCard'
import axios from 'axios'
import ClaimsListActions from '../../../../../Redux/ClaimsListRedux'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'

import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
import Communications from 'react-native-communications'
import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimsList extends Component {
  constructor (props) {
    super(props)
   // this.state = {
    //   listLimit: 10,
    //   totalNumberofCardPerScreen: 30,
    //   isFetchingMore: false,
    //   loadingMore: true,
    //   initialCount: 0,
    //   finalCount: 0,
    //   displayBannerInfo: false
    // }
    // this.loadMore = this.loadMore.bind(this)
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Plan Claims
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
    console.tron.log('I am Claims List screen')
   this.props.attemptClaimsList(this.props)
  }

  

  render () {
     console.log("claims list data" +this.props.claimsdata.data)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
      
         <View style={{flex:1}}>
          
         <ClaimsCard
         data={this.props.claimsdata.data} /> 
        </View>   
      </View>
    )
  }
}


ClaimsList.propTypes = {
  data: PropTypes.object,
  attemptClaimsList: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.claimslist.fetching,
    claimsdata: state.claimslist.data,
    error: state.claimslist.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: () => dispatch(ClaimsListActions.claimsListRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
