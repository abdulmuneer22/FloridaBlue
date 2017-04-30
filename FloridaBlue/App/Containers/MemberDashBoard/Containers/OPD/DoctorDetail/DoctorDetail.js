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
const ClickablesOptions = [
    { name: "Other Locations", count: 22 },
    { name: "History / Credentials" }
]

class DoctorDetail extends Component {

    constructor(props) {
        super(props);
        this.saveProvider = this.saveProvider.bind(this);
        this.removeProvider = this.removeProvider.bind(this);
        this.state = {
            visible: false,
            visible1:false
        };
        this.toggle1 = this.toggle1.bind(this);
         this.toggle = this.toggle.bind(this);
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

    saveProvider(data) {
        this.props.addProviderRequest(data)
    }

    removeProvider(savedProviderKey) {
        this.props.removeProviderRequest(savedProviderKey)
    }

    componentDidMount() {
        console.tron.log('I am DoctorList screen')
        console.tron.log(this.props.doctordetail)
        this.props.attemptDoctorDetail(this.props)
        //this.props.attemptProviderSearch(this.props)
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

    render() {
        console.log(this.props.doctordetail)
        return (

            <View style={styles.container} >
                <View>
                    {this._renderHeader()}
                </View>
                {this.props.doctordetail != undefined ?
                    <ScrollView>
                        <View style={{
                            flex: 1
                        }}>
                        <View style={{flex:1}}>
                            <DoctorLocation 
                            data={this.props.doctordetail}/>
                            </View>
                            
                            <View style={{ flex: 1 }}>
                                { this.props.doctordetail.displayName  ? 
                                <DoctorCard
                                    savedproviders={this.props.saveProvider}
                                    saveProvider={this.saveProvider}
                                    removeProvider={this.removeProvider}
                                    data={this.props.doctordetail}
                                    leftActive={this.props.leftActive}
                                    rightActive={this.props.rightActive}

                                />
                                :null}
                            </View>
                            
                    
                             
                 <View style={{flex:1}}> 
                {this.props.doctordetail.certifications.length > 0 ?   
                <View style={{flex:1}}>                         
                <TouchableOpacity onPress={this.toggle1}>
                    <Card style={this.state.visible1 ? styles.plusView1 : styles.plusView}>
                    <Flb name={this.state.visible1 ? 'minus' : 'plus'} color={this.state.visible1 ? Colors.snow : Colors.flBlue.ocean} 
                    style={{marginLeft:20}} size={Metrics.icons.medium} />
                
                <Text style={this.state.visible1 ? styles.plusText1 : styles.plusText}>
                    Other Locations
                </Text>
                </Card>
                </TouchableOpacity> 

                { this.state.visible1 ? <HideableView visible={this.state.visible1}>
                    <View style={{flex:1, marginLeft:80}}>
                    <Text style={{fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                    color:Colors.flBlue.grey5,
                                    }}>
                     {this.props.doctordetail.certifications[0].certificationDescription}
                    </Text>
                    </View>
                </HideableView> : null}
                </View>  
                : null }    

                 
                <View style={{flex:1}}>  
                     {this.props.doctordetail.certifications.length > 0 ? 
                     <View style={{flex:1}}>                       
                <TouchableOpacity onPress={this.toggle}>
                    <Card style={this.state.visible ? styles.plusView1 : styles.plusView}>
                    <Flb name={this.state.visible ? 'minus' : 'plus'} color={this.state.visible ? Colors.snow : Colors.flBlue.ocean } 
                    style={{marginLeft:20}} size={Metrics.icons.medium} />
                
                <Text style={this.state.visible ? styles.plusText1 : styles.plusText}>
                    Board Certifications / Eligibility
                </Text>
                </Card>
                </TouchableOpacity> 

                { this.state.visible ? <HideableView visible={this.state.visible}>
                    <View style={{flex:1, marginLeft:80}}>
                    <Text style={{fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                    color:Colors.flBlue.grey5,
                                    }}>
                     {this.props.doctordetail.certifications[0].certificationDescription}
                    </Text>
                    </View>
                </HideableView> : null}
               </View>
                : null }    
                 </View>  

                 </View>

                        </View>
                    </ScrollView>
                    : <View style={styles.spinnerView}>
                        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
                        <Text style={styles.spinnerText}>Loading Please Wait </Text>
                    </View>}
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
