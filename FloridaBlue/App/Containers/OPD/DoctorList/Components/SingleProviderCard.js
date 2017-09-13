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
import { Colors, Metrics, Fonts } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import styles from '../DoctorListStyle'
import _ from 'lodash'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import Flb from '../../../../Themes/FlbIcon'
import ProviderActions from '../../../../Redux/ProviderRedux'
import { GoogleAnalyticsTracker, GoogleAnalyticsSettings } from 'react-native-google-analytics-bridge'

const window = Dimensions.get('window')
let urlConfig = require('../../../../UrlConfig')
let gaTracker = new GoogleAnalyticsTracker(urlConfig.gaTag)

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()


export default class SingleProviderCard extends Component {
    constructor(props){
        super(props);
        this.state ={
            isFavourite : false
        }
    }
render(){
    let {value} = this.props
    console.log("isSaved",this.props.isSaved)
    return(
        <Card style={{ flex: 1}}>
        
                            <View style={{ flex: 1, justifyContent: 'center', marginBottom: 10 }}>
        
                              <View style={{ flex: 1, paddingLeft: Metrics.doubleBaseMargin, paddingRight: 10}}>
        
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                  <Flb name='add-bookmark'
                                  onPress={() => {
                                      if(this.props.isSaved){
                                        this.setState({
                                          isFavourite : false
                                      },
                                      this.props.favouriteProvider(value,false)
                                      )
                                      } else {
                                        this.setState({
                                          isFavourite : !this.state.isFavourite
                                        }
                                        )
                                        this.props.favouriteProvider(value,!this.state.isFavourite)
                                      }
                                      
                                      }}
                                  size={Metrics.icons.large * Metrics.screenWidth * 0.002} 
                                  color={this.state.isFavourite ? 'orange' 
                                  :
                                  this.props.isSaved ? 'orange'
                                  :
                                  Colors.flBlue.grey2} />
                                {
        
                                   value ? [ value.categoryCode != '07'
                                     ? <TouchableOpacity onPress={() =>this.props._doctorPage(value)}>
                                       <Text allowFontScaling={false} style={styles.h1}>{value.displayName}</Text>
                                     </TouchableOpacity>
                                     : <Text allowFontScaling={false} style={styles.h1_1}>{value.displayName}</Text>] : null
                                 }
                                 </View>
                                <View style={{flex: 1, flexDirection: 'row'}}>
        
                                  {value
                                    ? <View style={{flex: 0.7}}>
                                      <Text allowFontScaling={false} style={styles.h2}>{value.primarySpecialty}</Text>
                                    </View> : null}
                                  {value && value.handicappedAccessIn && value.handicappedAccessIn == 'Y'
                                    ? <View style={{flex: 0.3, alignItems: 'center', marginTop: 10}}>
                                      <Flb name='accessibility' size={Metrics.icons.medium * Metrics.screenWidth * 0.002} color={Colors.flBlue.ocean} />
                                    </View> : null }
                                </View>
        
                                <Text allowFontScaling={false} style={styles.h4}>{value ? value.addressLine1 : null}, {value ? value.addressLine2 : null}</Text>
        
                                <Text allowFontScaling={false} style={styles.h4_2}>{value ? value.city : null}, {value ? value.state : null}</Text>
                                {value
                                  ? <Text allowFontScaling={false} style={styles.h4_2}>{value.zipCode}</Text> : null}
                                {value
                                  ? <Text allowFontScaling={false} style={styles.h4_2}>{value.telephoneNumber}</Text> : null}
                                {value
                                  ? <Text allowFontScaling={false} style={styles.h4_3}>{value.distance} miles</Text> : null}
                              </View>
                            </View>
        
                            <View style={{ flex: 1 }}>
                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} 
                                onPress={() => this.props.handleCall(value.telephoneNumber)}>
                                  <View style={styles.call}>
        
                                    <View style={{ flex: 0.45, alignItems: 'flex-end' }}>
                                      <Flb
                                        name='call-phone'
                                        size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                                        color={Colors.snow} />
                                    </View>
        
                                    <View style={{ flex: 0.55, alignItems: 'flex-start' }}>
        
                                      <Text allowFontScaling={false} style={styles.callText}>Call</Text>
                                    </View>
        
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, height: Metrics.textHeight * Metrics.screenHeight * 0.0018 }} 
                                onPress={() => this.props.handleMaps(value)}>
                                  <View style={styles.directions}>
        
                                    <View style={{ flex: 0.28, alignItems: 'flex-end' }}>
                                      <Flb
                                        name='directions'
                                        size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
                                        color={Colors.snow} />
                                    </View>
        
                                    <View style={{
                                      flex: 0.72,
                                      alignItems: 'flex-start'
                                    }}>
        
                                      <Text allowFontScaling={false} style={styles.directionText}>Directions</Text>
                                    </View>
        
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
        
                          </Card>
    )
}
}