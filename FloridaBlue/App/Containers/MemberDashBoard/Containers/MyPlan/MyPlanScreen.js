import React, { Component, PropTypes} from 'react'
import {
StyleSheet,
Text,
View,
Navigator,
ScrollView,
TouchableOpacity,
Dimensions,
Image
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
      {NavItems.backButton()}
      <Text style={styles.headerTextStyle}>My Plan</Text>

      {NavItems.settingsButton()}

    </Image>)
  }
  componentDidMount () {
    console.log('I am my plan screen')
  //   this.props.attemptMyPlan()
  }

  render () {
    console.log(this.props.data);
    return (

      <View style={styles.container}>

        <View>
          {this._renderHeader()}
        </View>

        {
        this.props.data

          ? <View style={styles.container}>
            <View style={styles.planNameView}>
              <Text style={styles.planNameText}>
              {this.props.planName}
        </Text>
            </View>

            <View style={styles.chartWrapper}>
              {this.props.data.annualDeductible ? <MyPlanSwiper data={this.props.data} />
        : <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>}
            </View>

            <View style={styles.myplanTilesStyle}>
              {this.props.data && this.props.data.planOverViewTiles
            ? this.props.data.planOverViewTiles.map((tile, i) => {
              const index = i + 1
              const TileCount = this.props.data.planOverViewTiles.length

              console.log(tile)
              return (
                <Card
                  i={i}
                  key={index}
                  title={tile.tileName['en']}
                  tileType={tile.tileType}
                  icon={tile.tileIcon}
                  CardCount={TileCount}
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

        : <View style={styles.spinnerView}>
          <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
          <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>
        }

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
  console.log("state is", state);
  return {
    fetching: state.login.fetching,
    data: state.myplan.data,
    error: state.myplan.error,
    planName: _.get(state, 'member.defaultContract.planName','')
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
      attemptMember: () => dispatch(MemberActions.memberRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlanScreen)
