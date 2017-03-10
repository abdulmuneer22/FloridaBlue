
import React, { Component, PropTypes } from 'react'
import {Actions as NavigationActions} from 'react-native-router-flux'
import {Text, View, ScrollView, Image} from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './DoctorServiceStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import Flb from '../../../../Themes/FlbIcon'
import {connect} from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'

import Card from './Components/Card'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class DoctorServices extends Component {
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      {NavItems.backButton()}
      <Text style={styles.headerTextStyle}>Plan Benefits</Text>
      {NavItems.settingsButton()}

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

    return (

      <View style={styles.container}>
        {this._renderHeader()}

        <ScrollView>
          {
              this.props.data

                ? <View style={{flex: 1}}>
                  <View style={styles.doctorCardStyle}>
                    <Flb name={tile[0].tileIcon}size={Metrics.icons.xl * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
                    <Text style={styles.doctorTextStyle}>{temp1.text['en']}</Text>
                    <Switch leftActive={this.props.leftActive} rightActive={this.props.rightActive} attemptHandleLeft={this.props.attemptHandleLeft} attemptHandleRight={this.props.attemptHandleRight} />
                  </View>
                  <View>
                    <Card data={this.props.data} objectName={this.props.objectName} leftActive={this.props.leftActive} rightActive={this.props.rightActive} />
                  </View>

                </View>
          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>
         }
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
