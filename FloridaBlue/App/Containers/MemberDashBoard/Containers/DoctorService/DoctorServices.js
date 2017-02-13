
import React, { Component, PropTypes } from 'react'
import {Actions as NavigationActions} from 'react-native-router-flux'
import {Text, View, ScrollView} from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './DoctorServiceStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../../../Themes'
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
    return (<View style={styles.headerContainer}>
      {NavItems.backButton()}
      <Text style={[{color: Colors.snow, fontSize: Fonts.size.h4, marginLeft: 10}]}>Plan Benefits</Text>
      {NavItems.settingsButton()}

    </View>)
  }
  render () {
    return (

      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
        {this._renderHeader()}

        <ScrollView>
          {
              this.props.data ?


          <View style={{flex : 1}}>
          <View style={{
          alignItems : 'center',
          marginTop : 10
          }}>
          <Flb name="doctor" size={60} color="black" />
          <Text style={{
          marginTop : 5,
          fontSize : 13
        }}>{this.props.data.officeServices.text['en']}</Text>
          <Switch leftActive = {this.props.leftActive} rightActive={this.props.rightActive} attemptHandleLeft={this.props.attemptHandleLeft} attemptHandleRight={this.props.attemptHandleRight}></Switch>
          </View>
          <View>
          <Card data= {this.props.data} leftActive = {this.props.leftActive} rightActive={this.props.rightActive}/>
          </View>


          </View>
          :
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
