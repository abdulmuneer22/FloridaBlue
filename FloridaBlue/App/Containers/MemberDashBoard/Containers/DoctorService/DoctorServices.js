import React, { Component, PropTypes } from 'react'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { Text, View, ScrollView, Image } from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './DoctorServiceStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import Flb from '../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

import Card from './Components/Card'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorServices extends Component {
  componentDidMount () {
    this.props.attemptHandleLeft()
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
              <View style={{marginLeft:Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
                {NavItems.backButton()}
                </View>
              <Text style={styles.headerTextStyle}>
                Plan Benefits
              </Text>
              <View style={{marginRight:Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
                {NavItems.settingsButton()}
                </View>
            </Image>)
  }

  render () {
    var temp = this.props.data
    var objectName = this.props.objectName
    var temp1 = temp[objectName]
    var tiles = this.props.data.tiles
    var tile = tiles.filter(function (tiles) { return (tiles.tileId == objectName) })

    console.log('tile' + JSON.stringify(tile))
    console.log('tiles' + JSON.stringify(tiles))
    // console.log("checking for switch options" , this.props.data.emergencyMedicalCareServices);
    const switchItems = this.props.data.emergencyMedicalCareServices
    console.log('checking for switch options', switchItems)
    return (

      <View style={styles.container}>
        {this._renderHeader()}
        <ScrollView>
          {this.props.data

             ? <View style={{flex: 1}}>
               <View style={styles.doctorCardStyle}>
                 <Flb name={tile[0].tileIcon} size={Metrics.icons.xl * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
                 <Text style={styles.doctorTextStyle}>
                   {temp1.text['en']}
                 </Text>
                 <Switch
                   leftActive={this.props.leftActive}
                   rightActive={this.props.rightActive}
                   preferredActive={this.props.preferredActive}
                   attemptHandleLeft={this.props.attemptHandleLeft}
                   attemptHandleRight={this.props.attemptHandleRight}
                   attemptHandlePreferred={this.props.attemptHandlePreferred} />
               </View>
               <View>
                 <Card
                   data={this.props.data}
                   objectName={this.props.objectName}
                   leftActive={this.props.leftActive}
                   rightActive={this.props.rightActive}
                   preferredActive={this.props.preferredActive} />
               </View>
             </View>
             : <View style={styles.spinnerView}>
               <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
               <Text style={styles.spinnerText}>
                   Loading Please Wait
                 </Text>
             </View>}
        </ScrollView>
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
