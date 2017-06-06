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
   this.state = {
      listLimit: 10,
      totalNumberofCardPerScreen: 10,
      isFetchingMore: false,
      loadingMore: true,
      initialCount: 0,
      finalCount: 0,
      displayBannerInfo: false
    }
    this.loadMore = this.loadMore.bind(this)
  }

  componentWillReceiveProps (newProps) {
     if (this.state.isFetchingMore) {
        //this.props.attemptProviderSearch(newProps)
        this.claimsSearchList(newProps);
        this.setState({
          isFetchingMore: false
        });
     }
     if (this.props.claimsListCount && this.props.claimsdata.data.length > 0) {
        if (newProps.provider && newProps.provider.data && newProps.provider.data.originLatitude != '' && newProps.provider.data.originLongitude != '') {
          this.props.changeLatitude(newProps.provider.data.originLatitude)
          this.props.changeLongitude(newProps.provider.data.originLongitude)
        }
    }
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

  loadMore () {
    var currentLimit = this.state.listLimit
    var newLimit = currentLimit
    var numberOfCardsPerscreen = this.state.totalNumberOfCardPerScreen
    this.setState({
      listLimit: newLimit + 10
    })
    this.props.changeListLimit(newLimit+10)
    if(this.state.totalNumberOfCardPerScreen == newLimit) {
           this.props.changeEnd(this.state.totalNumberOfCardPerScreen + 10)
           this.state.isFetchingMore = true
           this.setState({isFetchingMore : true});
           this.setState({totalNumberOfCardPerScreen : this.state.totalNumberOfCardPerScreen + 10});
    }
  }

  componentDidMount () {
    console.tron.log('I am Claims List screen')
   this.props.attemptClaimsList(this.props)
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait</Text>
      </View>)
    } else if (this.props.claimsdata && this.props.claimsdata.data) {
      return (
        <View style={styles.container}>

                <View style={{flex: 1, marginTop: -20}}>

                  {
                     this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length > 0 ?
                       <ClaimsCard
                         cardLimit={this.state.listLimit}
                         data={this.props.claimslist.data}
                      />
                  :

                         <View style={{flex: 1, margin: 15}}>
                           <Card style={{flex: 1, borderRadius: 20, justifyContent: 'center'}}>
                             <View style={{flex: 1, margin: 15}}>
                               <Text style={{fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                 color: Colors.flBlue.anvil
                               }}>Oops! We did not find an exact match for your search. Try a new Search.</Text>
                             </View>
                           </Card>
                         </View>

                    }

                </View>

                 {/*{
                          this.props.asyncfetching ?
                          <View style={{flex: 1,alignSelf: 'center',}}>
                            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                          </View> : null
                }*/}

                {this.props.claimsdata && this.props.claimsdata.data && this.props.claimsdata.data.length >= 10
                  && !(this.state.listLimit > this.props.claimsdata.data.length)
                  && !(this.props.claimsdata.data.length == 300 && this.props.claimslist.data.length == this.state.listLimit)
                  ?
                    <View style={{flex: 1, marginBottom: 10}}>
                      <TouchableOpacity
                        onPress={this.loadMore}
                        style={{
                          backgroundColor: Colors.flBlue.ocean,
                          paddingLeft: 14,
                          paddingRight: 14,
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: window.width * 0.4,
                          alignSelf: 'center',
                          margin: window.height * 0.02,
                          alignItems: 'center',
                          borderRadius: 5
                        }}>
                        <Text style={{
                          color: 'white'
                        }}>Show More</Text>
                      </TouchableOpacity>
                    </View> : null
                }

          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
          }
        </View>
      )

    } else if ((this.props.error != null) ||
     ( this.props.claimsdata ==null ||
     (this.props.claimsdata != null &&
     (this.props.claimsdata.data == null || this.props.claimsdata.data.length ==0 )
      ) ) ) {
      Alert.alert(
        'Claims List',
       'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
          { text: 'OK' }
        ])
    }
  }

  render () {
     console.log("claims list data" +this.props.claimsdata.data)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>

         <View style={{flex:1}}>
           {/*{
             this._displayCondition()
           }*/}

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
    error: state.claimslist.error,
    claimsListCount: state.claimslist.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimsList: () => dispatch(ClaimsListActions.claimsListRequest()),
    changeListLimit: (listLimit) => dispatch(ClaimsListActions.changeListLimit(listLimit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimsList)
