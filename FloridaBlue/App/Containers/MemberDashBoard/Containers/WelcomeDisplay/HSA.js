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
  ScrollView
} from 'react-native'
const window = Dimensions.get('window')

import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux'
import HsaActions from '../../../../Redux/HsaRedux'
import Flb from '../../../../Themes/FlbIcon'

class Hsa extends Component {
  _renderHeader () {
    return (<Image style={styles.hsaHeader} source={Images.themeHeader}>
     <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.hsaheaderTextStyle}>
          Health Savings Account
        </Text>
      <View style={{marginRight: Metrics.baseMargin  * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  componentDidMount () {
    console.log('I am HSA screen')
    console.tron.log(this.props)
  //  this.props.attemptSupportScreen()
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {
          this.props.data.currentBalance

            ? <View style={{flex: 1}}>

              <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: Metrics.textHeight}}>

                <View style={{marginTop: 3}}>
                  <Text style={styles.hsaTextStyle1}>{this.props.data.currentBalance.text['en']} :</Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.hsaTextStyle2}>${this.props.data.currentBalance.value}</Text>
                </View>
              </View>
              <View style={styles.row_1}>
                <View style={styles.col_1}>
                  <Text style={styles.hsaTextStyle1}>{this.props.data.contribution.text['en']}</Text>
                  <Text style={styles.hsaTextStyle2}>${this.props.data.contribution.value}</Text>
                </View>

                <View style={styles.col_1}>
                  <Text style={styles.hsaTextStyle1}>{this.props.data.distribution.text['en']}</Text>
                  <Text style={styles.hsaTextStyle2}>${this.props.data.distribution.value}</Text>
                </View>
              </View>

              <Image style={styles.hsaBg} source={Images.hsaBg} />

            </View>
        : <View />
      }
      </View>
    )
  }
    }

Hsa.propTypes = {

  data: PropTypes.object,
  attemptHsa: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    data: state.hsa.data,
    error: state.hsa.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptHsa: () => dispatch(HsaActions.memberRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hsa)
