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


import Switch from './Components/switch'
import DoctorCard from './Components/DoctorCard'
import BottomCard from './Components/BottomCard'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorListStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import { Container, Content, Footer, FooterTab } from 'native-base';
//import DoctorDetailActions from '../../../../../Redux/DoctorDetailRedux'
//import SearchDoctorActions from '../../../../../Redux/SearchDoctorRedux'
import SaveProviderActions from '../../../../../Redux/SaveProviderRedux'
import ProviderActions from '../../../../../Redux/ProviderRedux'
import _ from 'lodash'
import MemberActions from '../../../../../Redux/MemberRedux'

import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorList extends Component {
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
    console.tron.log(this.props.provider.data)
    this.props.attemptHandleLeft()
    //this.props.attemptProviderSearch(this.props)
    //  this.props.attemptDoctordetail()
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
    //   this.props.saveProvider &&  alert(this.props.saveProvider.length)
    console.log(this.props.provider)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>

        {this.props.provider.data ?

          <ScrollView style={{ flex: 1 }}>

            <Switch
              data={this.props.provider.data}
              leftActive={this.props.leftActive}
              rightActive={this.props.rightActive}
              attemptHandleLeft={this.props.attemptHandleLeft}
              attemptHandleRight={this.props.attemptHandleRight} />

            <View style={{ marginTop: Metrics.mediumMargin }}>
              <Card styles={card}>
                <View style={{ flexDirection: 'row', margin: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ flex: 0.15 }}>
                    <Flb name="accident" size={Metrics.icons.large} color={Colors.snow} />
                  </View>
                  <View style={{ flex: 0.85 }}>
                    <Text style={{
                      fontSize: Fonts.size.input * Metrics.screenWidth * 0.0028,
                      color: Colors.snow
                    }}> If this is an emergency, call 911.</Text>
                  </View>
                </View>
              </Card>
            </View>

            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: Metrics.baseMargin
            }}>

              <View style={{ marginTop: Metrics.baseMargin }}>

                {this.props.provider != undefined ?
                  <DoctorCard
                    savedproviders={this.props.saveProvider}
                    saveProvider={this.saveProvider}
                    removeProvider={this.removeProvider}
                    data={this.props.rightActive ? this.props.saveProvider : this.props.provider.data.providerList}
                    leftActive={this.props.leftActive}
                    rightActive={this.props.rightActive}

                  />
                  : null}
              </View>

            </View>

          </ScrollView>

          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>}

        <Footer style={{ height: Metrics.textHeight2 * Metrics.screenHeight * 0.0019 }}>
          <BottomCard />
        </Footer>
      </View>

    )
  }
}


DoctorList.propTypes = {
  data: PropTypes.object,
  // attemptSearchDoctor: PropTypes.func,
  attemptProviderSearch: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    fetching: state.searchdoctor.fetching,
    // data: state.searchdoctor.data,
    error: state.searchdoctor.error,
    leftActive: state.provider.leftActive,
    rightActive: state.provider.rightActive,
    saveProvider: state.saveprovider.data,
    provider: state.provider.data

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptProviderSearch: () => dispatch(ProviderActions.sendProviderSearchRequest()),
    // attemptSearchDoctor: () => dispatch(SearchDoctorActions.searchdoctorRequest()),
    attemptHandleLeft: () => dispatch(ProviderActions.providerClickleft()),
    attemptHandleRight: () => dispatch(ProviderActions.providerClickright()),
    addProviderRequest: (data) => dispatch(SaveProviderActions.addProviderRequest(data)),
    removeProviderRequest: (savedProviderKey) => dispatch(SaveProviderActions.removeProviderRequest(savedProviderKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
