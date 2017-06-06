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
import { ClaimsListActions as NavigationActions } from 'react-native-router-flux'
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

  // sortBy(field) {
  //   this.setState({
  //     claims: _.sortBy(this.props.claimsdata.data, field)
  //   });
  // }

  
  
  render () {

  
  
    return (

      // Header

      <View style={{flex: 1}}>
        <View style={{flex: .2}}>
          <View style={{flex: .3, backgroundColor: 'white'}}>
            <View style={{flex: .1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, margin: 10}}>
              <Text style={{fontSize: 20, paddingLeft: 15}}>Claims List</Text>
              <Button rounded style={{backgroundColor: '#00003f', marginBottom: 20, justifyContent: 'center'}}>
                <Text style={{color: 'white', fontWeight: '500', marginLeft: 20, paddingRight: 20, paddingLeft: 5, alignItems: 'center'}}>Search</Text>
              </Button>
            </View>
        </View>
        <View style={{margin:10, marginBottom:15}}>
              <View style={{flex:0, flexDirection:'row', justifyContent:'flex-start', marginBottom: -15}}>
                    <View style={{flex:0.33, alignItems:'center'}}>
                      <TouchableOpacity><Text style={{fontWeight: 'bold'}}> Date</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:0.33, alignItems:'center'}}>
                      <TouchableOpacity><Text style={{fontWeight: 'bold'}}> Member</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:0.34, alignItems:'center'}}>
                      <TouchableOpacity><Text style={{fontWeight: 'bold'}}> Provider</Text></TouchableOpacity>
                    </View>
         </View>
        </View>

      </View>

      {/*List View*/}

        <View style={{flex: 1}}>   
          <ScrollView>
            <View>

              
                {this.props.data !=undefined ? this.props.data
                                                              .filter((value, i) => (i < 7))
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
                  
                    {/*{this.props.data !=undefined && this.props.data.length > 10 ? 

                      this.props.data.filter((value, i) => (i < 5)).map((value, i) => { 
                        return(
                        <View> 
                          <Text>Yo</Text>

                        </View>
                        )
                      

                      })  : null}*/}
                  
                    
                  
                </View>
               

            </ScrollView>

            {/*If 10+ Claims, Show More Button*/}

            {this.props.data.length > 10 ?
             <View style={{flex: 0, margin: 14}}>
               <Text style={{textAlign: 'center', opacity: 0.6}}>Showing 10 out of 20 Claims</Text>
               <TouchableOpacity>
                 <Text style={{textAlign: 'center', color: 'teal', fontSize: 20}}>View More <Icon name="chevron-down"></Icon></Text>
               </TouchableOpacity>
            </View> : null }
          
          </View>


      </View>

      )
    }
  }



export default ClaimsCard

