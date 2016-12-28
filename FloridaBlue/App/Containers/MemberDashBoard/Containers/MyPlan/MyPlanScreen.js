import React, { Component ,PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';

import {Actions as NavigationActions} from 'react-native-router-flux'

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics, Fonts} from '../../../../Themes'
import ToolBar from './Components/toolBar'
import axios from 'axios'
import Card from './Components/Card'
import NavItems from '../../../../Navigation/NavItems.js'
import styles from './MyPlanScreenStyle'
import MyPlanSwiper from './Components/MyPlanSwiper'
import { connect } from 'react-redux';
import MyPlanActions from '../../../../Redux/MyPlanRedux'
/*
type MyPlanScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  data: object,
  attemptMyPlan: () => void
}
*/
class MyPlanScreen extends Component{


  componentDidMount(){
       console.log("I am my plan screen")
        this.props.attemptMyPlan();
  }


  _renderHeader(){
  return <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>MyPlan</Text>
    {NavItems.settingsButton()}

  </View>
}

  render(){
    return(
        <View style={{
            flex : 1 ,
            backgroundColor : 'white'
        }}>
              {this._renderHeader()}

            <View style={Styles.PlanName}>
            <Text>
            Blue Options
            </Text>
            </View>

            <View style={Styles.chartWrapper}>
            <MyPlanSwiper data={this.props.data}/>
            </View>

            <View style={{

            flexWrap : 'wrap',
            flexDirection : 'row'
            }}>
            <Card
            title = "Benefits"
            bg="rgb(204, 211, 214)"
            icon = "briefcase"
            />

            <Card
            title = "Claims"
            bg="rgb(151, 198, 207)"
            icon = "book"
            />
            </View>


            <View style={Styles.footer}>
            <Text style={Styles.footerText}>Health Savings Account</Text>

            <View style={Styles.footerSecondTextWraper}>

            <View style={Styles.column}>
            <Text style={Styles.columnText}>Current Balance</Text>
            <Text>${this.props.data.hsaamount.currentBalance} </Text>
            </View>

            <View style={Styles.column}>
            <Text style={Styles.columnText}>YTD Contribute</Text>
            <Text>${this.props.data.hsaamount.yearToDateDistribution}</Text>
            </View>

            <View style={Styles.column}>
            <Text style={Styles.columnText}>YTD Distribute</Text>
            <Text>${this.props.data.hsaamount.yearToDateContribution} </Text>
            </View>


            </View>
            </View>



            </View>


    );
  }

}
const Styles = StyleSheet.create({
  PlanName : {
    alignItems  : 'center',
    justifyContent : 'center',
    margin : 10,
    padding : 5

  },

  chartWrapper : {
    //   backgroundColor : 'yellow',
      flex : 2,
      marginBottom : 20
  },
  footer: {
      flex : 1,
      backgroundColor : 'rgb(123, 136, 138)',

  },
  footerSecondTextWraper : {
      flexDirection : 'row',

      padding : 5
  },
  footerText : {
    padding : 20,
    textAlign : 'center',
    fontWeight : '500',
    fontSize : 12
  },
column : {
      alignItems : 'center',
      flex : 1
  },
  columnText : {
      fontSize : 13,
      fontWeight : '500'

  }

});

MyPlanScreen.propTypes = {
  data: PropTypes.object,
  attemptMyPlan: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    data: state.myplan.data
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyPlan:() => dispatch(MyPlanActions.myplanRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MyPlanScreen)
