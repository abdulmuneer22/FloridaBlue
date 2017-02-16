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

import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'
const window = Dimensions.get('window')

// import Loader from '../../../../Components/Loader'
/*
type MyPlanScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  data: object,
  attemptMyPlan: () => void
}
*/

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
    this.props.attemptMyPlan()
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
    return (

      <View style={styles.container}>

        <View>
          {this._renderHeader()}
        </View>

        {
            this.props.data ?

              <View style={{flex: 1}}>
                <View style={styles.PlanName}>
                  <Text style={{fontSize: Fonts.size.h6 }}>

          Blue Options
          </Text>
                </View>

                <View style={styles.chartWrapper}>
                  {this.props.data.annualDeductible ? <MyPlanSwiper data={this.props.data} />
          : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>}
                </View>

                <View style={styles.cardStyle}>
                  <Card
                    title='Benefits'
                    bg='rgb(204, 211, 214)'
                    icon='briefcase'
          />

                  <Card
                    title='Claims'
                    bg='rgb(151, 198, 207)'
                    icon='book'
          />
                </View>
              </View>

          : <View style={{alignItems: 'center', justifyContent: 'center'}}>
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
