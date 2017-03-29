import React, { Component, PropTypes} from 'react'
import {
StyleSheet,
Text,
View,
Navigator,
ScrollView,
TouchableOpacity,
Dimensions,
Image,
Alert
} from 'react-native'

import {Actions as NavigationActions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import ToolBar from './Components/toolBar'
import axios from 'axios'
import SelectBox from './Components/SelectBox'
import Card from './Components/Card'
import NavItems from '../../../../Navigation/NavItems.js'
import styles from './MyPlanScreenStyle'
import MyPlanSwiper from './Components/MyPlanSwiper'
import { connect } from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
import _ from 'lodash'
import MemberActions from '../../../../Redux/MemberRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class MyPlanScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.backButton()}
      </View>

      <Text style={styles.headerTextStyle}>My Plan Overview</Text>

      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  componentDidMount () {
    console.log('I am my plan screen')
  //   this.props.attemptMyPlan()
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.data && this.props.visibilityRules.planOverViewTiles != null && this.props.visibilityRules.planOverViewTiles.length > 0) {
      return (
        <View style={styles.container}>

          <View style={styles.planNameView}>

            { this.props.data.annualDeductible || this.props.data.oop
              ? <Text style={styles.planNameText}>
                {this.props.planName}
              </Text>

             : <Text />
           }
          </View>

          <View style={styles.chartWrapper}>
            {this.props.data.annualDeductible || this.props.data.oop ? <MyPlanSwiper data={this.props.data} />

              : Alert.alert(
        'My Plan Overview',
        'Oops! Looks like we\'re having trouble with your request. Click Support for help.',
                [
          { text: 'OK', onPress: () => NavigationActions.WelcomeDashBoard() }

                ],
        { cancelable: false }
      )

              }
          </View>

          <View style={styles.myplanTilesStyle}>
            {this.props.visibilityRules != undefined && this.props.visibilityRules.planOverViewTiles != undefined
              ? this.props.visibilityRules.planOverViewTiles.map((tile, i) => {
                const index = i + 1
                const TileCount = this.props.visibilityRules.planOverViewTiles.length

                console.log(tile)
                return (
                  <Card
                    i={i}
                    key={index}
                    title={tile.tileName['en']}
                    tileType={tile.tileType}
                    icon={tile.tileIcon}
                    CardCount={TileCount}
                    image={tile.backgroundImage}
                    webURL={tile.tileType !== 'native' ? tile.tileUrl : null}
                    routerName={tile.tileType === 'native' ? tile.routerName : null}

                  />
                )
              }
              )
              : <Text />
            }
          </View>

        </View>

      )
    } else if (this.props.error != null) {
      Alert.alert(
        'My Plan Overview',
        'Oops! Looks like we\'re having trouble with your request. Click Support for help.',
        [
          { text: 'OK', onPress: () => NavigationActions.WelcomeDashBoard() }

        ],
        { cancelable: false }
      )
    }
  }

  render () {
    console.log(this.props.data)
    return (

      <View style={styles.container}>

        <View>
          {this._renderHeader()}
        </View>
        {this._displayCondition()}

      </View>

    )
  }
}

MyPlanScreen.propTypes = {
  data: PropTypes.object,
  attemptMyPlan: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  console.log('state is', state)
  return {
    fetching: state.myplan.fetching,
    data: state.myplan.data,
    visibilityRules: state.member.visibilityRules,
    error: state.myplan.error,
    planName: _.get(state, 'member.defaultContract.planName', '')
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptMember: () => dispatch(MemberActions.memberRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlanScreen)
