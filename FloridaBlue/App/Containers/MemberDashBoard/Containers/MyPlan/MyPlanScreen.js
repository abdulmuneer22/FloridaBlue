import React, { Component ,PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {Actions as NavigationActions} from 'react-native-router-flux'

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics, Fonts} from '../../../../Themes'
import ToolBar from './Components/toolBar'
import axios from 'axios'
import SelectBox from './Components/SelectBox'
import Card from './Components/Card'
import NavItems from '../../../../Navigation/NavItems.js'
import styles from './MyPlanScreenStyle'
import MyPlanSwiper from './Components/MyPlanSwiper'
import { connect } from 'react-redux';
import MyPlanActions from '../../../../Redux/MyPlanRedux'
var {height, width} = Dimensions.get('window');
/*
type MyPlanScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  data: object,
  attemptMyPlan: () => void
}
*/
/*const options=[
  {
    key:'Family',
    value:0
  },
  {
    key:'Member 1',
    value:1
  },
  {
    key:'Member 2',
    value:2
  },
  {
    key:'Member 3',
    value:3
  }
];*/
class MyPlanScreen extends Component{

  constructor(props) {
    super(props);
    this.state={
      selectedPlan:{}
    }
    this._onPlanChange=this._onPlanChange.bind(this);
  }


  _renderHeader(){
  return (<View style={styles.headerContainer}>
  {NavItems.backButton()}
  <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,marginLeft:10}]}>My Plan</Text>
  {NavItems.settingsButton()}

  </View>)
  }

_onPlanChange(selected){
  this.setState({
    selectedPlan:selected
  })
}
  componentDidMount(){
       console.log("I am my plan screen")
        this.props.attemptMyPlan();
  }

  componentWillReceiveProps (newProps) {
      this.forceUpdate()
      console.log("I am receving new props from My plan scree "+JSON.stringify(newProps))
      console.log("error message "+newProps.error);
      if (!newProps.fetching && newProps.error == "WRONG") {
          console.log("Hey going to login "+newProps.error);
          NavigationActions.login()
      }
    }


  render(){
    const { selectedPlan } =this.state;

        return(

      <View style={{
          flex : 1 ,
          backgroundColor : 'white'
      }}>
          {this._renderHeader()}

      <View style={Styles.PlanName}>
      <Text style={{fontSize:Fonts.size.h6}}>
      Blue Options
      </Text>
      </View>
      
      <View style={Styles.chartWrapper}>
       {this.props.data.annualDeductible ? <MyPlanSwiper data={this.props.data} /> :<Text>Loading</Text>}
             </View>


      <View style={{
      flexWrap : 'wrap',
      flexDirection : 'row',
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
                </View>




          );
        }

      }
      const Styles = StyleSheet.create({
        PlanName : {
          alignItems  : 'center',
          justifyContent : 'center',
          height:40
        },

        chartWrapper : {
          //   backgroundColor : 'yellow',
            flex : 2,
            marginBottom : 20
        },


      });

      MyPlanScreen.propTypes = {
        data: PropTypes.object,
        attemptMyPlan: PropTypes.func,
        error: PropTypes.string
      }

      const mapStateToProps = (state) => {

        return {
          fetching: state.login.fetching,
          data : state.myplan.data,
          error: state.myplan.error
        }
      }
      const mapDispatchToProps = (dispatch) => {
        return {
          attemptMyPlan:() => dispatch(MyPlanActions.myplanRequest())
        }
      }

      export default connect(mapStateToProps, mapDispatchToProps) (MyPlanScreen)
