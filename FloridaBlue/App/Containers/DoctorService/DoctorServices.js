import React, { Component, PropTypes } from 'react'
import { Actions as NavigationActions } from 'react-native-router-flux'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform
} from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './DoctorServiceStyle'
import NavItems from '../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../Themes'
import Flb from '../../Themes/FlbIcon'
import { connect } from 'react-redux'
import MyPlanActions from '../../Redux/MyPlanRedux'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'
import { Card } from 'native-base'
const theme = getTheme()
import LinearGradient from 'react-native-linear-gradient'

import CCard from './Components/Card'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorServices extends Component {
  constructor () {
    super()
    this.state = {
      hpActive: false
    }
  }
  componentDidMount () {
    this.props.attemptHandleLeft()
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.newHeaderImage}>
      <View style={{ marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010 }}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
        Plan Benefits
              </Text>
      <View style={{ marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002 }}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  renderHeaderText () {
    let headerTextStr = ''
    if (this.props.leftActive) {
      var objectName = this.props.objectName
      // alert(objectName)
      if (objectName != null) {
        headerTextStr = this.props.data[objectName] != null && this.props.data[objectName].inNetwork != null && this.props.data[objectName].inNetwork.header_text != undefined ? this.props.data[objectName].inNetwork.header_text.en : ''
      }
      // console.tron.log(this.props.data[objectName].inNetwork.header_text.en)
    } else if (this.props.rightActive) {
      var objectName = this.props.objectName
      if (objectName != null) {
        headerTextStr = this.props.data[objectName] != null && this.props.data[objectName].outNetwork != null && this.props.data[objectName].outNetwork.header_text != undefined ? this.props.data[objectName].outNetwork.header_text.en : ''
      }
    } else if (this.props.preferredActive) {
      var objectName = this.props.objectName
      if (objectName != null) {
        headerTextStr = this.props.data[objectName] != null && this.props.data[objectName].preferredNetwork != null && this.props.data[objectName].preferredNetwork.header_text != undefined ? this.props.data[objectName].preferredNetwork.header_text.en : ''
      }
    }

    return headerTextStr
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>
          Loading Please Wait
        </Text>
      </View>)
    } else if (this.props.data) {
      var temp = this.props.data
      var objectName = this.props.objectName
      var temp1 = temp[objectName]
      var tiles = this.props.data.tiles
      var tile = tiles.filter(function (tiles) { return (tiles.tileId == objectName) })
      const switchItems = this.props.data.emergencyMedicalCareServices
      console.tron.log('checking for switch options', switchItems)

      return (
        <View style={styles.textBackground2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => { if(this.renderHeaderText() != '')
                {this.setState({ hpActive: !this.state.hpActive })} else {this.setState({ hpActive: this.state.hpActive })}
              }} >
                <Card style={{flex: 1, marginTop: -0}} >
                  <View style={{
              // backgroundColor: 'purple',
                    flex: 1,
                    flexDirection: 'row',
                    height: Metrics.screenHeight - (Metrics.screenHeight * 0.90)

                  }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10
                // backgroundColor:'yellow'
                    }}>
                      <Flb name={tile[0].tileIcon} size={Metrics.icons.regular * Metrics.screenWidth * 0.0025} color={Colors.flBlue.purple} />
                    </View>
                    <View style={{
                      flex: 3,
                // marginRight:5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10
               //    backgroundColor:'red'

                    }}>

                      <Text style={styles.doctorTextStyle}>
                        {temp1.text['en']}
                      </Text>

                    </View>

                    <View style={{flex: 1}}>
                      {this.renderHeaderText() != ''
                        ? <View style={{
                          flex: 1,
                          marginTop: 5
                       // marginLeft: -40,
                       // marginRight: Metrics.mediumMargin

                        }}>

                          <View style={{
                        // flexDirection: 'row',
                            flex: 1,
                         // marginTop: Metrics.baseMargin,
                            alignItems: 'center',
                            justifyContent: 'center'
                        // backgroundColor: Colors.flBlue.grey4,
                          }}>

                            <View >
                              {

                            !this.state.hpActive

                              ? <Flb name='chevron-down' size={Metrics.icons.tiny * Metrics.screenWidth * 0.0025} style={{ marginTop: 7 }} color={Colors.flBlue.purple} />
                              : <Flb name='chevron-up' size={Metrics.icons.tiny * Metrics.screenWidth * 0.0025} style={{ marginTop: 7 }} color={Colors.flBlue.purple} />

                          }
                            </View>
                          </View>

                        </View>
                  : <Text />
                }

                    </View>
                  </View>

                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}} />
                    {
                this.state.hpActive
                  ? <View style={{
                    flex: 12,
                   // width: Metrics.screenWidth * 0.88,
                    alignSelf: 'center',
                   // borderBottomWidth: 0.2,
                    marginBottom: 10
                    // borderWidth:1
                 //   height: Metrics.screenHeight - (Metrics.screenHeight * 0.76)
                  //  margin:10
                    //  marginLeft : (Metrics.screenWidth * 0.15)/2,
                    // marginRight : (Metrics.screenWidth * 0.15)/2,
                    //  backgroundColor : 'yellow',
                    // alignItems : 'center',
                  }}>
                    <View style={this.renderHeaderText() != '' ? {borderTopWidth: 0.2 } : {}} />
                    <Text style={{
                      fontSize: Fonts.size.xm * Metrics.screenWidth * 0.0015,
                      margin: 5,
                    //  textAlign: 'justify',
                      color: Colors.flBlue.grey5,
                      fontWeight: '300'

                    }}>{this.renderHeaderText()}</Text>
                  </View>
                  : null
              }
                    <View style={{flex: 1}} />
                  </View>

                </Card>
              </TouchableOpacity>
              <View style={{ alignItems: 'center', marginBottom: 15}}>
                <Switch
                  data={this.props.data}
                  objectName={this.props.objectName}
                  leftActive={this.props.leftActive}
                  rightActive={this.props.rightActive}
                  preferredActive={this.props.preferredActive}
                  attemptHandleLeft={this.props.attemptHandleLeft}
                  attemptHandleRight={this.props.attemptHandleRight}
                  attemptHandlePreferred={this.props.attemptHandlePreferred} />
              </View>

              <View >
                <CCard
                  data={this.props.data}
                  objectName={this.props.objectName}
                  leftActive={this.props.leftActive}
                  rightActive={this.props.rightActive}
                  preferredActive={this.props.preferredActive}
                  cardImage={tile[0].tileIcon}
                  />
              </View>
            </View>
          </ScrollView>
        </View>
      )
    } else if (this.props.error != null) {
      Alert.alert(
        'Plan Benefits',
         'Oops! Looks like this service is not available right now or it\'s not part of your plan.',
        [
          { text: 'OK' }

        ]
      )
    }
  }

  render () {
    return (

      <View style={styles.container}>
        {this._renderHeader()}
        {this._displayCondition()}
      </View>
    )
  }
}

DoctorServices.propTypes = {
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func,
  attemptHandlePreferred: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    data: state.myplan.data,
    fetching: state.myplan.fetching,
    leftActive: state.myplan.leftActive,
    rightActive: state.myplan.rightActive,
    preferredActive: state.myplan.preferredActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptHandleLeft: () => dispatch(MyPlanActions.myplanClickleft()),
    attemptHandleRight: () => dispatch(MyPlanActions.myplanClickright()),
    attemptHandlePreferred: () => dispatch(MyPlanActions.myplanClickpreferred())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorServices)
