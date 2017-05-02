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

import { Card } from 'native-base'

const card = {
  card: {
    alignItems: 'flex-start', margin: 15, flex: 1,
    backgroundColor: 'purple', borderRadius: 10
  }
};
const cardTitle = { cardTitle: { fontSize: 40 } }

import DoctorCard from './Components/DoctorCard'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './DoctorListStyle'
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

class DoctorList extends Component {

 _advancedSearch() {
      NavigationActions.AdvancedSearch()
    }

_mapView() {
    NavigationActions.ProviderMap()
  }


  componentDidMount() {
    console.tron.log('I am DoctorList screen')
    console.tron.log(this.props)
   // this.props.attemptHandleLeft()
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
    //   this.props.saveProvider &&  alert(this.props.saveProvider.length)
    console.log(this.props.provider)
    return (
      <View style={styles.container}>
        <View >
          {this._renderHeader()}
        </View>

        {this.props.provider ?
          <View style={{flex:8}}>
          <ScrollView >

            <View style={{flex:1, margin:15  }}>
              <Card style={{flex:1, borderRadius:15, backgroundColor:'purple'}} >
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

            <View style={{flex:1}}>

                {this.props.provider && this.props.provider.data && this.props.provider.data.providerList && this.props.provider.data.providerList.length > 0 ?
                  <DoctorCard
                    savedproviders={this.props.saveProvider}
                    saveProvider={this.saveProvider}
                    removeProvider={this.removeProvider}
                    data={this.props.rightActive ? this.props.saveProvider : this.props.provider.data.providerList}
                    leftActive={this.props.leftActive}
                    rightActive={this.props.rightActive}

                  />
                  : <View style={{flex:1}}>
                    <Card style={{flex:1,margin:10,justifyContent:'center'}}>
                    <Text style={{fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028,
                                  color:Colors.flBlue.anvil,
                                  }}>No Results Found. Please Recheck the Provider Name. </Text>
                    </Card>
                    </View>
                    }

            </View>

          </ScrollView>
          </View>

          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>}
        <View style={{flex:1}}>
          <View style={{flex:1}}>
          <View style={{flex:1,flexDirection:'row'}}>
         <TouchableOpacity style={{flex:1}} onPress={()=> this._advancedSearch()}>
          <View style={styles.refinesearch}>

               <View style={{flex:0.3, alignItems:'center'}}>
                <Flb
                name='search-find'
                size={Metrics.icons.medium}
                color={Colors.snow} />
               </View>

            <View style={{flex:0.7, alignItems:'flex-start'}}>

                <Text style={styles.footerText}>Refine Search</Text>
              </View>

          </View>
          </TouchableOpacity>
         <TouchableOpacity style={{flex:1}} onPress={()=> this._mapView()}>
          <View style={styles.footerView}>

               <View style={{flex:0.4, alignItems:'center'}}>
                <Flb
                name='map'
                size={Metrics.icons.medium}
                color={Colors.snow} />
               </View>

            <View style={{flex:0.6,
            alignItems:'flex-start'}}>

                <Text style={styles.footerText}>Map View</Text>
              </View>

          </View>
          </TouchableOpacity>
        </View>


        </View>
        </View>
      </View>

    )
  }
}


DoctorList.propTypes = {
  data: PropTypes.object,
  provider:PropTypes.object,
  attemptProviderSearch: PropTypes.func,
  error: PropTypes.string,
  saveProvider: PropTypes.array,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    fetching: state.provider.fetching,
    // data: state.searchdoctor.data,
    error: state.provider.error,
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
