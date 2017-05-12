import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    Platform
} from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import _ from 'lodash'
import BottomCard from './Components/BottomCard'
import Swiper from 'react-native-swiper'
import DoctorCard from './Components/DoctorCard'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './MapViewStyle'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import { Container, Content, Footer, FooterTab } from 'native-base'

const window = Dimensions.get('window')
// const marker_image = require('./marker.png')

const markerList = [
  {
    latitude: 37.78825,
    longitude: -122.4324,
    name: 'Bedros. Medhat G., MD',
    category: 'Family Practice',
    address_1: '71 Pilgrim Avenue ',
    address_2: 'Chevy Chase, MD 20815',
    id: '001'
  },
  {
    latitude: 37.773972,
    longitude: -122.431297,
    name: 'Dr Watson',
    category: 'Outpatient Practice',
    address_1: '733 Yukon Road',
    address_2: 'Hinesville, GA 31313',
    id: '002'
  }
]

class AnimatedView extends Component {

  constructor () {
    super()
    this.state = {
      selectedDoctor: ''
    }
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

  renderSelectedCard () {
    return (
      <View style={{
                    // position : 'absolute',
                    // bottom : 0,
        left: window.width * 0.05,
        right: window.width * 0.05,
        width: window.width * 0.9,
        backgroundColor: 'white',
        height: 250
                    // padding : 20
      }}>
        <Text style={{
          fontSize: 22,
          fontWeight: '500',
          color: '#1b6588'
        }}>
          {this.state.selectedDoctor.name}
        </Text>

        <View>
          <Text style={{
            fontWeight: '500',
            fontSize: 18
          }}>{this.state.selectedDoctor.category}</Text>

        </View>
      </View>
    )
  }

  selectDoctorFromMap (doctor_id) {
        // alert(doctor_id)
    var doctor = _.find(markerList, {id: doctor_id})
    if (doctor) {
      console.tron.log(doctor)
      this.setState({
        selectedDoctor: doctor
      })
    }
  }

  render () {
    return (
      <View style={{
        flex: 1
      }}>
        {this._renderHeader()}
        <MapView
          style={{
            flex: 1
                       // marginTop : 25

          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }} >

          {
                        markerList.map((coor, i) => {
                          return (
                            <MapView.Marker
                              key={i}
                              style={{
                                width: 10,
                                height: 10
                              }}

                              coordinate={{latitude: coor.latitude, longitude: coor.longitude}}
                              title={coor.title}
                              description='Test Desc'
                              onPress={() => { this.selectDoctorFromMap(coor.id) }}
                                />
                          )
                        })
                    }

          { this.state.selectedDoctor ?
                        this.renderSelectedCard()
                        :
                        null
                    }
        </MapView>

        <Swiper height={(Platform.OS === 'ios') ? (Metrics.screenHeight - (Metrics.screenHeight * 0.72)) : (Metrics.screenHeight - (Metrics.screenHeight * 0.44))} style={Style.wrapper} showsButtons>
          <View style={Style.slide1}>
            <Text style={Style.text}>Hello Swiper</Text>
          </View>
          <View style={Style.slide2}>
            <Text style={Style.text}>Beautiful</Text>
          </View>
          <View style={Style.slide3}>
            <Text style={Style.text}>And simple</Text>
          </View>
        </Swiper>

        <Footer style={{height: Metrics.textHeight2 * Metrics.screenHeight * 0.0019}}>
          <BottomCard />
        </Footer>

      </View>
    )
  }
}

const Style = StyleSheet.create({
  row_1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  address_block: {
    marginTop: 10,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: Colors.snow,
    marginLeft: 40,
    marginRight: 30
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
   // backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default AnimatedView
