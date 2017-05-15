import React, { Component, PropTypes } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    Alert,
    Platform,
    Linking,
    BackAndroid
} from 'react-native'

import HideableView from 'react-native-hideable-view'
import DoctorLocation from './Components/DoctorLocation'
// import Panel from './Components/Panel'
import DoctorCard from './Components/DoctorCard'
//import Clickables from './Components/Clickables'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorDetailStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Card } from 'native-base'
import SaveProviderActions from '../../../../../Redux/SaveProviderRedux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
var urlConfig = require('../../../../../UrlConfig');
const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()

class DoctorDetail extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7:false
    }
    this.toggle = this.toggle.bind(this)
    this.toggle1 = this.toggle1.bind(this)
    this.toggle2 = this.toggle2.bind(this)
    this.toggle3 = this.toggle3.bind(this)
    this.toggle4 = this.toggle4.bind(this)
    this.toggle5 = this.toggle5.bind(this)
    this.toggle6 = this.toggle6.bind(this)
    this.toggle7 = this.toggle7.bind(this)
  }

  toggle () {
    this.setState({
      visible: !this.state.visible
    })
  }
  toggle1 () {
    this.setState({
      visible1: !this.state.visible1
    })
  }

  toggle2 () {
    this.setState({
      visible2: !this.state.visible2
    })
  }

  toggle3 () {
    this.setState({
      visible3: !this.state.visible3
    })
  }

  toggle4 () {
    this.setState({
      visible4: !this.state.visible4
    })
  }

  toggle5 () {
    this.setState({
      visible5: !this.state.visible5
    })
  }

  toggle6 () {
    this.setState({
      visible6: !this.state.visible6
    })
  }

   toggle7 () {
    this.setState({
      visible7: !this.state.visible7
    })
  }

 handleMaps (latitude, longitude) {
    console.tron.log(latitude, longitude)
    const url = `http://maps.apple.com/?ll=${latitude},${longitude}`

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.tron.log('Don\'t know how to go')
      }
    })
  }
  componentDidMount () {
    this.props.attemptDoctorDetail(this.props)
     this.props.attemptConfigData()
    
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Find Care
            </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  _displayCondition () {
    if (this.props.fetching) {
      
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.doctordetail) {
      return (
        <View style={styles.container}>

          {this.props.doctordetail ?
            <ScrollView>

              <View style={{
                flex: 1,
                marginBottom: 20,
                
              }}>
                {this.props.doctordetail ?
                  <View style={{ flex: 1 }}>
                  <DoctorLocation
                      data={this.props.doctordetail} />
                </View>
                    : null
                }

                <View style={{ flex: 1 }}>
                  {this.props.doctordetail ?
                  <DoctorCard
                      data={this.props.doctordetail}
                        />
                        : null}
                </View>

                <View style={{ flex: 1 }}>
                  {this.props.doctordetail.otherAddressList.length > 0 ?
                  <View style={{ flex: 1 }}>
                      <TouchableOpacity onPress={this.toggle1}>
                        <Card style={this.state.visible1 ? styles.cardStyle : styles.cardStyle1} >
                          <View style={this.state.visible1 ? styles.plusView1 : styles.plusView}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                            <Flb name={this.state.visible1 ? 'minus' : 'plus'} color={this.state.visible1 ? Colors.snow : Colors.flBlue.ocean}
                            size={Metrics.icons.medium} />
                          </View>
                            <View style={{ flex: 7 }}>
                            <Text style={this.state.visible1 ? styles.plusText1 : styles.plusText}>
                                            Other Locations
                                        </Text>
                          </View>
                            {this.props.doctordetail && this.props.doctordetail.otherAddressList ?
                            <View style={this.state.visible1 ? styles.addressView1 : styles.addressView}>
                            <Text style={styles.addressText}>
                                {this.props.doctordetail.otherAddressList.length}
                              </Text>
                          </View>
                                    : null}
                          </View>
                        </Card>
                      </TouchableOpacity>

                      {this.state.visible1 ? <HideableView visible={this.state.visible1}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                          <View style={{ flex: 1 }}>
                            {this.props.doctordetail && this.props.doctordetail.otherAddressList ? this.props.doctordetail.otherAddressList.map((value, i) => {
                            return (

                            <Card key={i} style={{flex: 1, margin: 15, backgroundColor: Colors.ricePaper}}>
                                <View style={{flex: 1, margin: 15 }}>
                                    {value ?
                                        <Text style={styles.h5}>{value.addressLine1}, {value.addressLine2}</Text> : null}
                                    {value ?
                                        <Text style={styles.h5_2}>{value.city}, {value.state}, {value.zipCode}</Text> : null}
                                   
                                    {value ?
                                        <Text style={styles.h5_2}>{value.county} </Text> : null}
                                    {value ?
                                        <Text style={styles.h5_2}>{value.telephoneNumber}</Text> : null}
                                    {/*<TouchableOpacity style={{ flex:1}} onPress={() => this.handleMaps(this.props.data.latitude, this.props.data.longitude)}>
                                  <Text style={styles.directionText1}>Map Location</Text>
                                    </TouchableOpacity>*/}
                                  
                                  </View>
                                 
                              </Card>
                          )
                          })
                                            : null}
                          </View>
                        </View>
                      </HideableView> : null}
                    </View>

                        : null
                        }
                        
                  <View style={{ flex: 1 }}>

                    {this.props.doctordetail && this.props.doctordetail.address[0] && this.props.doctordetail.address[0].officeHoursList && this.props.doctordetail.address[0].officeHoursList.length > 0 ?
                      <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.toggle4}>
                          <Card style={this.state.visible4 ? styles.cardStyle : styles.cardStyle1} >
                            <View style={this.state.visible4 ? styles.plusView1 : styles.plusView}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                            <Flb name={this.state.visible4 ? 'minus' : 'plus'} color={this.state.visible4 ? Colors.snow : Colors.flBlue.ocean}
                                size={Metrics.icons.medium} />
                          </View>
                            <View style={{ flex: 9 }}>
                            <Text style={this.state.visible4 ? styles.plusText1 : styles.plusText}>
                                                Office Hours
                                            </Text>
                          </View>
                          </View>
                          </Card>
                        </TouchableOpacity>

                        {this.state.visible4 ? <HideableView visible={this.state.visible4}>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                           
                            <View style={{ flex:1, margin:5 }}>
                              {this.props.doctordetail && this.props.doctordetail.address ?
                                <View style={{Flex:1}}>
                            {this.props.doctordetail.address[0].officeHoursList.map((value, i) => {
                              return(

                                <View key={i} style={{flex: 1, flexDirection:'row'}}>
                                  <View style={{flex:1}}>
                                <Text style={{
                                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                    color: Colors.flBlue.ocean,
                                    margin:5
                                  }}>
                                    {value.dayOfWeek}
                                  </Text>
                                  </View>
                                  <View style={{flex:1}}>
                                   <Text style={{
                                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                    color: Colors.flBlue.grey5,
                                    margin:5
                                  }}>
                                    {value.beginHour}
                                  </Text>
                                  </View>

                                 
                                   <Text style={{
                                    fontSize: Fonts.size.regular * Metrics.screenWidth * 0.00258,
                                    color: Colors.flBlue.grey5,
                                    margin:5
                                  }}>
                                    -
                                  </Text>
                                
                                  <View style={{flex:1}}>
                                   <Text style={{
                                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                    color: Colors.flBlue.grey5,
                                    margin:5
                                  }}>
                                    {value.endHour}
                                  </Text>
                                  </View>
                              </View>
                              )
                            })}
                          </View>
                          : null }
                          </View>
                          </View>
                        </HideableView> : null}
                      </View>
                            :
                      null
                            }


                


                      { this.props.doctordetail.contractedSpecialties ||  this.props.doctordetail.servicesOffered ?
                      <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.toggle2}>
                          <Card style={this.state.visible2 ? styles.cardStyle : styles.cardStyle1} >
                            <View style={this.state.visible2 ? styles.plusView1 : styles.plusView}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                            <Flb name={this.state.visible2 ? 'minus' : 'plus'} color={this.state.visible2 ? Colors.snow : Colors.flBlue.ocean}
                                size={Metrics.icons.medium} />
                          </View>
                            <View style={{ flex: 9 }}>
                            <Text style={this.state.visible2 ? styles.plusText1 : styles.plusText}>
                                                History / Credentials
                                            </Text>
                          </View>
                          </View>
                          </Card>
                        </TouchableOpacity>

                        {this.state.visible2 ? <HideableView visible={this.state.visible2}>
                          
                           {this.props.doctordetail && this.props.doctordetail.contractedSpecialties && this.props.doctordetail.contractedSpecialties.length > 0 ?
                          <View style={{flex:1}}>
                           <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 3 }} />
                          <View style={{ flex:9 }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.ocean
                          }}>
                           Contracted Specialties:
                          </Text>
                          </View>
                          </View>
                          <View style={{ flex: 1, flexDirection: 'row', margin:5 }}>
                            <View style={{ flex: 3 }} />
                            
                            <View style={{ flex: 7 }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.grey5
                          }}>
                            {this.props.doctordetail.contractedSpecialties[0].contractedSpecialtyDesc}
                          </Text>
                          </View>
                          </View>
                          </View>
                          :null}


                           {this.props.doctordetail && this.props.doctordetail.servicesOffered && this.props.doctordetail.servicesOffered.length > 0 ?
                           <View style={{flex:1}}>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 3 }} />
                          <View style={{ flex:9 }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.ocean
                          }}>
                           Services Offered:
                          </Text>
                          </View>
                          </View>
                           {this.props.doctordetail && this.props.doctordetail.servicesOffered ? this.props.doctordetail.servicesOffered.map((value, i) => {
                          return( <View key={i} style={{ flex: 1, flexDirection: 'row', margin:5 }}>
                            
                            <View style={{ flex: 3 }} />                            
                            <View style={{ flex: 7 }}>             
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.grey5
                          }}>
                            {value.service}
                          </Text>
                          </View>
                          </View>
                          )}) : null }
                          </View>
                          : null }


                        </HideableView> : null}
                      </View>
                            :
                      null
                            }


                

      
                </View>

                <View style={{ flex: 1 }}>
                  {this.props.doctordetail && this.props.doctordetail.programList && this.props.doctordetail.programList.length > 0 ?
                      <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.toggle5}>
                          <Card style={this.state.visible5 ? styles.cardStyle : styles.cardStyle1} >
                            <View style={this.state.visible5 ? styles.plusView1 : styles.plusView}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                            <Flb name={this.state.visible5 ? 'minus' : 'plus'} color={this.state.visible5 ? Colors.snow : Colors.flBlue.ocean}
                                size={Metrics.icons.medium} />
                          </View>
                            <View style={{ flex: 9 }}>
                            <Text style={this.state.visible5 ? styles.plusText1 : styles.plusText}>
                                                Programs
                                            </Text>
                          </View>
                          </View>
                          </Card>
                        </TouchableOpacity>

                        {this.state.visible5 ? <HideableView visible={this.state.visible5}>
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 3 }} />
                            <View style={{ flex: 9 }}>
                            {this.props.doctordetail && this.props.doctordetail.programList ? this.props.doctordetail.programList.map((value, i) => {
                            return (<View key={i} style={{flex: 1}}>
                                <Text style={{
                                    fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                    color: Colors.flBlue.grey5
                                  }}>
                                    {value.programName}
                                  </Text>
                              </View>
                              )
                          })
                                            : null}
                          </View>
                          </View>
                        </HideableView> : null}
                      </View>
                            :
                     null
                            }
                </View>

                  { this.props.doctordetail.bcbsfProviderID ||  this.props.doctordetail.nationalProviderNumber ?
                      <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.toggle7}>
                          <Card style={this.state.visible7 ? styles.cardStyle : styles.cardStyle1} >
                            <View style={this.state.visible7 ? styles.plusView1 : styles.plusView}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                            <Flb name={this.state.visible7 ? 'minus' : 'plus'} color={this.state.visible7 ? Colors.snow : Colors.flBlue.ocean}
                                size={Metrics.icons.medium} />
                          </View>
                            <View style={{ flex: 9 }}>
                            <Text style={this.state.visible7 ? styles.plusText1 : styles.plusText}>
                             More Info                  
                            </Text>
                          </View>
                          </View>
                          </Card>
                        </TouchableOpacity>

                        {this.state.visible7 ? <HideableView visible={this.state.visible7}>
                          
                           {this.props.doctordetail && this.props.doctordetail.bcbsfProviderID ?
                          <View style={{flex:1}}>
                           <View style={{ flex: 1, flexDirection: 'row', margin:10 }}>
                      
                          <View style={{ flex:1, alignItems:'center' }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.ocean
                          }}>
                           Provider # 
                          </Text>
                          </View>
                    
                            <View style={{ flex: 1 }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.grey5
                          }}>
                            {this.props.doctordetail.bcbsfProviderID}
                          </Text>
                          </View>
                          </View>
                          </View>
                          :null}


                            {this.props.doctordetail && this.props.doctordetail.nationalProviderNumber ?
                          <View style={{flex:1}}>
                           <View style={{ flex: 1, flexDirection: 'row' }}>
                           
                          <View style={{ flex:1, alignItems:'center' }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.ocean
                          }}>
                           NPI #
                          </Text>
                          </View>
                           
                            <View style={{ flex: 1 }}>
                            <Text style={{
                            fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                            color: Colors.flBlue.grey5
                          }}>
                            {this.props.doctordetail.nationalProviderNumber}
                          </Text>
                          </View>
                          </View>
                          </View>
                          :null}

                          <View style={{flex:1}}>
                           {
                             this.props.configData && this.props.configData.links && this.props.configData.links.providerInfoList && this.props.configData.links.providerInfoList.length > 0 ?
                            this.props.configData.links.providerInfoList.map((value, i) => {
                               console.log('urlsss' +value.url)
                              return(
                               
                                <View key={i} style={{flex:1}}>
                                  <TouchableOpacity onPress={() => NavigationActions.MyView({responseURL: value ? value.url:''})}>
                                  <Text style={styles.h7_1}>
                                    {value.title}
                                  </Text>
                                  </TouchableOpacity>
                                </View>
                              )

                            }): null }
                             
                          
                            <Text style={styles.h7}>
                            Provider information contained in this directory is refreshed nightly.
                            </Text>

                            <Text style={styles.h7}>
                              Note: Please refer to your benefit booklet for details, as not all searches may be applicable to your plan.
                            </Text>

                            </View>

                        </HideableView> : null}
                      </View>
                            :
                      null
                            }


                </View>

              </View>
            </ScrollView>
        : <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>}

        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
        'Doctor Detail',
        'Oops! Looks like we`re having trouble with your request. Please try again later.',
        [
          { text: 'OK' }

        ])
    }
  }

  render () {
    console.tron.log(this.props.doctordetail)
    return (

      <View style={styles.container} >
        
            {this._renderHeader()}
            <View style={{flex:1}}>
              {this._displayCondition()}
              </View>

            
      </View>
    )
  }
}

DoctorDetail.propTypes = {
  data: PropTypes.object,
  provider: PropTypes.object,
  attemptDoctorDetail: PropTypes.func,
  attemptConfigData: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    fetching: state.provider.fetching,
    error: state.provider.error,
    leftActive: state.provider.leftActive,
    rightActive: state.provider.rightActive,
    saveProvider: state.saveprovider.data,
    doctordetail: state.provider.doctordetail,
    providerKey: state.provider.providerKey,
    addressKey: state.provider.addressKey,
    configData: state.provider.configData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptConfigData: () => dispatch(ProviderActions.sendConfigTypeRequest()),
    attemptDoctorDetail: (data) => dispatch(ProviderActions.sendDoctorDetailRequest(data)),
    addProviderRequest: (data) => dispatch(SaveProviderActions.addProviderRequest(data)),
    removeProviderRequest: (savedProviderKey) => dispatch(SaveProviderActions.removeProviderRequest(savedProviderKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)
