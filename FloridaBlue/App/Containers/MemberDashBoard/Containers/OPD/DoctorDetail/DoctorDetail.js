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

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

const card = {
    card: {
        width: Metrics.screenWidth * 0.92,
        alignItems: 'flex-start', marginBottom: 10, flex: 1,
        marginLeft: 15, backgroundColor: 'purple', borderRadius: 10
    }
};
const cardTitle = { cardTitle: { fontSize: 40 } }


import DoctorLocation from './Components/DoctorLocation'
//import Panel from './Components/Panel'
import DoctorCard from './Components/DoctorCard'
import AcceptOptions from './Components/AcceptOptions'
import Clickables from './Components/Clickables'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorDetailStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab } from 'native-base';
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
    { name: "History / Credentials" },
    { name: "Board Certifications / Eligibility" },
    { name: "Institutional Affiliations" },
    { name: "Plans Accepted" },
    { name: "Programs" },
    { name: "Hospital Options - Applicable to BlueOptions Plan" }
]

class DoctorDetail extends Component {

    constructor(props) {
        super(props);
        this.saveProvider = this.saveProvider.bind(this);
        this.removeProvider = this.removeProvider.bind(this);
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
        this.props.attemptDoctorDetail()
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
                         
                        <DoctorLocation
                         data={this.props.doctordetail}
                          />
                       
                       <View>

                
                  <DoctorCard
                    savedproviders={this.props.saveProvider}
                    saveProvider={this.saveProvider}
                    removeProvider={this.removeProvider}
                    data={this.props.doctordetail}
                    leftActive={this.props.leftActive}
                    rightActive={this.props.rightActive}

                  />
                  
              </View>
                        <AcceptOptions />
                        {
                            ClickablesOptions.map((clickable, i) => {
                                return (
                                    <Clickables key={i} label={clickable.name} count={clickable.count} />
                                )
                            })
                        }

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
        doctordetail: state.provider.doctordetail

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptDoctorDetail: () => dispatch(ProviderActions.sendDoctorDetailRequest()),
        addProviderRequest: (data) => dispatch(SaveProviderActions.addProviderRequest(data)),
        removeProviderRequest: (savedProviderKey) => dispatch(SaveProviderActions.removeProviderRequest(savedProviderKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)