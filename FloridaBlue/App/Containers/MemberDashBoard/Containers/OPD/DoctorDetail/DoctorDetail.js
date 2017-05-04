import React, { Component, PropTypes } from 'react';
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
    BackAndroid
} from 'react-native'



import HideableView from 'react-native-hideable-view';
import DoctorLocation from './Components/DoctorLocation'
//import Panel from './Components/Panel'
import DoctorCard from './Components/DoctorCard'
import Clickables from './Components/Clickables'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorDetailStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab, Card } from 'native-base';
import SaveProviderActions from '../../../../../Redux/SaveProviderRedux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
    .withStyle(styles.spinner)
    .build()


class DoctorDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1: false,
            visible2: false,
            visible3: false,
            visible4: false,
            visible5: false,
            visible6: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggle3 = this.toggle3.bind(this);
        this.toggle4 = this.toggle4.bind(this);
        this.toggle5 = this.toggle5.bind(this);
        this.toggle6 = this.toggle6.bind(this);
    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        });
    }
    toggle1() {
        this.setState({
            visible1: !this.state.visible1
        });
    }

    toggle2() {
        this.setState({
            visible2: !this.state.visible2
        });
    }

    toggle3() {
        this.setState({
            visible3: !this.state.visible3
        });
    }

    toggle4() {
        this.setState({
            visible4: !this.state.visible4
        });
    }

    toggle5() {
        this.setState({
            visible5: !this.state.visible5
        });
    }

    toggle6() {
        this.setState({
            visible6: !this.state.visible6
        });
    }


    componentDidMount() {
        this.props.attemptDoctorDetail(this.props)
    }

    _renderHeader() {
        return (<Image style={styles.headerContainer} source={Images.themeHeader}>
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
        console.tron.log("im fetching" +fetching)
        console.log("im fetching" +fetching)
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.doctordetail) {
      
      return (
        <View style={styles.container}>
        
        {this.props.doctordetail != undefined ?
        <ScrollView>

            <View style={{
                flex: 1,
                marginBottom: 20
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
                            <TouchableOpacity onPress={this.toggle1.bind(this)}>
                                <Card style={this.state.visible1 ? styles.cardStyle: styles.cardStyle1} >
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
                                        <Text style={ styles.addressText}>
                                            {this.props.doctordetail.otherAddressList.length}
                                        </Text>
                                    </View>
                                    :null}
                                    </View>
                                </Card>
                            </TouchableOpacity>

                            {this.state.visible1 ? <HideableView visible={this.state.visible1}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                   
                                    <View style={{ flex: 1 }}>
                                        {this.props.doctordetail && this.props.doctordetail.otherAddressList ? this.props.doctordetail.otherAddressList.map((value, i) => {
                                            return(
                                                
                                            <Card key={i} style={{flex:1, margin:15, backgroundColor:Colors.ricePaper}}>    
                                            <View  style={{flex:1, margin:15,}}>
                                            {value ?
                                                <Text style={styles.h5}>{value.addressLine1}, {value.addressLine2}</Text> : null}
                                            {value ?
                                                <Text style={styles.h5_2}>{value.city}, {value.state}</Text> : null}
                                            {value ?
                                                <Text style={styles.h5_2}>{value.zipCode}</Text> : null}
                                            {value ?
                                                <Text style={styles.h5_2}>{value.county} </Text> : null}
                                            {value ?
                                                <Text style={styles.h5_2}>{value.telephoneNumber}</Text> : null}
                                            
                                            </View>
                                            </Card>
                                            )
                                            })
                                            : null}
                                    </View>
                                </View>
                            </HideableView> : null}
                        </View>

                        :<Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                        }


                    <View style={{ flex: 1 }}>
                        {this.props.doctordetail.contractedSpecialties.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.toggle2.bind(this)}>
                                    <Card style={this.state.visible2 ? styles.cardStyle: styles.cardStyle1} >
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
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3 }}></View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={{
                                                fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                                color: Colors.flBlue.grey5,
                                            }}>
                                                {this.props.doctordetail.contractedSpecialties[0].contractedSpecialtyDesc}
                                            </Text>
                                        </View>
                                    </View>
                                </HideableView> : null}
                            </View>
                            : 
                            <Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                            }
                    </View>

                    <View style={{ flex: 1 }}>
                        {this.props.doctordetail.boardCertifications.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.toggle.bind(this)}>
                                 <Card style={this.state.visible ? styles.cardStyle: styles.cardStyle1} >
                                       <View style={this.state.visible ? styles.plusView1 : styles.plusView}>
                                        <View style={{ flex: 2, alignItems: 'center' }}>
                                            <Flb name={this.state.visible ? 'minus' : 'plus'} color={this.state.visible ? Colors.snow : Colors.flBlue.ocean}
                                                size={Metrics.icons.medium} />
                                        </View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={this.state.visible ? styles.plusText1 : styles.plusText}>
                                                Board Certifications / Eligibility
                                            </Text>
                                        </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>

                                {this.state.visible ? <HideableView visible={this.state.visible}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3 }}></View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={{
                                                fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                                color: Colors.flBlue.grey5,
                                            }}>
                                                {this.props.doctordetail.boardCertifications[0].boardName}
                                            </Text>
                                        </View>
                                    </View>
                                </HideableView> : null}
                            </View>
                            : 
                            <Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                            }
                    </View>


                    <View style={{ flex: 1 }}>
                        {this.props.doctordetail.certifications.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.toggle3.bind(this)}>
                                   <Card style={this.state.visible3 ? styles.cardStyle: styles.cardStyle1} >
                                       <View style={this.state.visible3 ? styles.plusView1 : styles.plusView}>
                                        <View style={{ flex: 2, alignItems: 'center' }}>
                                            <Flb name={this.state.visible3 ? 'minus' : 'plus'} color={this.state.visible3 ? Colors.snow : Colors.flBlue.ocean}
                                                size={Metrics.icons.medium} />
                                        </View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={this.state.visible3 ? styles.plusText1 : styles.plusText}>
                                                Institutional Affiliations
                                            </Text>
                                        </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>

                                {this.state.visible3 ? <HideableView visible={this.state.visible3}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3 }}></View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={{
                                                fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                                color: Colors.flBlue.grey5,
                                            }}>
                                                {this.props.doctordetail.certifications[0].certificationDescription}
                                            </Text>
                                        </View>
                                    </View>
                                </HideableView> : null}
                            </View>
                            : 
                            <Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                            }
                    </View>

                    <View style={{ flex: 1 }}>
                        {this.props.doctordetail.certifications.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.toggle4.bind(this)}>
                                  <Card style={this.state.visible4 ? styles.cardStyle: styles.cardStyle1} >
                                       <View style={this.state.visible4 ? styles.plusView1 : styles.plusView}>
                                        <View style={{ flex: 2, alignItems: 'center' }}>
                                            <Flb name={this.state.visible4 ? 'minus' : 'plus'} color={this.state.visible4 ? Colors.snow : Colors.flBlue.ocean}
                                                size={Metrics.icons.medium} />
                                        </View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={this.state.visible4 ? styles.plusText1 : styles.plusText}>
                                                Plans Accepted
                                            </Text>
                                        </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>

                                {this.state.visible4 ? <HideableView visible={this.state.visible4}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                       
                                        <View style={{ flex: 1 }}>
                                            {this.props.doctordetail && this.props.doctordetail.acceptedPlanList ? this.props.doctordetail.acceptedPlanList.map((value, i) => {
                                            return(
                                                
                                            <Card key={i} style={{flex:1, margin:15, backgroundColor:Colors.ricePaper}}>    
                                            <View  style={{flex:1, margin:15,flexDirection:'row'}}>
                                            <View style={{flex:8}}>
                                            {value ?
                                                <Text style={styles.h5}>
                                                    {value.planName}
                                                </Text>

                                             
                                                : 
                                                null
                                                }
                                                </View>
                                            <View style={{ flex: 1 }}>
                                    <Flb name="check" size={20} color="green" style={{margin:5}} />
                                </View>     
                                            
                                            </View>
                                            </Card>
                                            )
                                            })
                                            : null}
                                        </View>
                                    </View>
                                </HideableView> : null}
                            </View>
                            : 
                            <Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                            }
                    </View>


                    <View style={{ flex: 1 }}>
                        {this.props.doctordetail.programList.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.toggle5.bind(this)}>
                                  <Card style={this.state.visible5 ? styles.cardStyle: styles.cardStyle1} >
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
                                        <View style={{ flex: 3 }}></View>
                                        <View style={{ flex: 9 }}>
                                            {this.props.doctordetail && this.props.doctordetail.programList ? this.props.doctordetail.programList.map((value, i) => {
                                            return(<View key={i} style={{flex:1}}>
                                                    <Text style={{
                                                fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                                color: Colors.flBlue.grey5,
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
                            <Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                            }
                    </View>


                    <View style={{ flex: 1 }}>
                        {this.props.doctordetail.certifications.length > 0 ?
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity onPress={this.toggle6.bind(this)}>
                                   <Card style={this.state.visible6 ? styles.cardStyle: styles.cardStyle1} >
                                       <View style={this.state.visible6 ? styles.plusView1 : styles.plusView}>
                                        <View style={{ flex: 2, alignItems: 'center' }}>
                                            <Flb name={this.state.visible6 ? 'minus' : 'plus'} color={this.state.visible6 ? Colors.snow : Colors.flBlue.ocean}
                                                size={Metrics.icons.medium} />
                                        </View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={this.state.visible6 ? styles.plusText1 : styles.plusText}>
                                                Hospital Options - Applicable to BlueOptions
                                            </Text>
                                        </View>
                                       </View> 
                                    </Card>
                                </TouchableOpacity>

                                {this.state.visible6 ? <HideableView visible={this.state.visible6}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 3 }}></View>
                                        <View style={{ flex: 9 }}>
                                            <Text style={{
                                                fontSize: Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                                color: Colors.flBlue.grey5,
                                            }}>
                                                {this.props.doctordetail.certifications[0].certificationDescription}
                                            </Text>
                                        </View>
                                    </View>
                                </HideableView> : null}
                            </View>
                            : 
                            <Card> 
                            <View style={{flex:1, margin:15}}>
                            <Text style={{ color: Colors.flBlue.anvil,
                            fontSize:Fonts.size.input * Metrics.screenWidth * 0.0028,
                            textAlign:'center'
                                         }}>
                            No Record Found
                            </Text>
                            </View>
                        </Card>
                            }
                    </View>


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
       'Oops! Looks like we\'re having trouble with your request. Click Support for help.',
        [
          { text: 'OK' }

        ])
    }
  }

render() {
console.tron.log(this.props.doctordetail)
return (

<View style={styles.container} >
    <View>
        {this._renderHeader()}
    </View>
    {this._displayCondition()}
     </View>
        );
    }
}

DoctorDetail.propTypes = {
    data: PropTypes.object,
    provider: PropTypes.object,
    attemptDoctorDetail: PropTypes.func,
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
        addressKey: state.provider.addressKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptDoctorDetail: (data) => dispatch(ProviderActions.sendDoctorDetailRequest(data)),
        addProviderRequest: (data) => dispatch(SaveProviderActions.addProviderRequest(data)),
        removeProviderRequest: (savedProviderKey) => dispatch(SaveProviderActions.removeProviderRequest(savedProviderKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)
