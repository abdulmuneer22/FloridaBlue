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
import Flb from '../../../../Themes/FlbIcon'
import SelectBox from './Components/SelectBox'
import Card from './Components/Card'
import NavItems from '../../../../Navigation/NavItems.js'
import styles from './MyPlanScreenStyle'
import MyPlanSwiper from './Components/MyPlanSwiper'
import { connect } from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
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

  componentWillReceiveProps (newProps) {
  this.forceUpdate()
  console.log('I am receving new props from My plan scree ' + JSON.stringify(newProps))
  console.log('error message ' + newProps.error)
  if (!newProps.fetching && newProps.error == 'WRONG') {
  console.log('Hey going to login ' + newProps.error)
  NavigationActions.login()
  }
  }

  render () {
    var color = new Array('#005b80', '#00aec7', '#0091cc', '#005b80', '#005b80', '#00aec7', '#005b80', '#0091cc')
    var i = 0
    var tileCard = []
  return (

    <View style={styles.container}>

        <View>
        {this._renderHeader()}
        </View>

        {
        this.props.data ?

        <View style={styles.container}>

        <View style={styles.planNameView}>
        <Text style={styles.planNameText}>
        Blue Options
        </Text>
        </View>

        <View style={styles.chartWrapper}>
        {
          this.props.data.annualDeductible ? <MyPlanSwiper data={this.props.data} />
        : <View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
        </View>
      }

        </View>

        <View style={styles.cardStyle}>
        {this.props.data && this.props.data.planOverViewTiles ?
  this.props.data.planOverViewTiles.map(function (tile, i) {
    console.log('tiles2'+JSON.stringify(tile))

    onItemPress = function () {
      var action
      if (tile.tileType == 'webview') {
        action = NavigationActions.MyView({responseURL: tile.tileUrl})
      } else if (tile.tileType == 'native') {
        var routerName = tile.routerName
        action = NavigationActions[routerName]()
      }
    }

    return (

      <TouchableOpacity style={[styles.tileView, {backgroundColor: color[i]}]} onPress={onItemPress.bind(this)} key={i}>

        <View style={{alignItems: 'center'}}>
          <Flb name={tile.tileIcon} size={Metrics.icons.regular * Metrics.screenWidth * 0.0035} color={Colors.snow} />
          <Text style={styles.tileText}>
            {tile.tileName['en']}
          </Text>
        </View>
      </TouchableOpacity>


    )
    i += 1

  }) : null
 }

        </View>
        </View>

        : <Text></Text>
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
return {
fetching: state.login.fetching,
data: state.myplan.data,
error: state.myplan.error
}
}
const mapDispatchToProps = (dispatch) => {
return {
attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlanScreen)
