import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback
} from 'react-native';


import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import {Colors,Metrics,Fonts} from '../../../../Themes'
import SeeDetailsCard from './Components/SeeDetailsCard'
import TransButton from './Components/transButton'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux';

type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  attemptMember: () => void
}

class LandingScreen extends Component {

  props: LoginScreenProps
  isAttempting : boolean


  _renderHeader(){
  return <View style={styles.headerContainer}>
    {NavItems.hamburgerButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Florida Blue</Text>
    {NavItems.settingsButton()}

  </View>
}


componentDidMount(){
  console.log("mount on dashboadr"+this.props.smToken);

     this.props.attemptMember(this.props.smToken)
}

  render(){
    console.log("root testing"+this.props.userName);
    return(
      <View style={styles.container}>
      {this._renderHeader()}
      <Greeting userName={this.props.userName}/>
      <MyPlanCard/>
      {
        <View style={{

          flexWrap : 'wrap',
          flexDirection : 'row'
        }}>

        <Card
        title = "Payment"
        bg="rgb(204, 211, 214)"
        icon = "usd"
        />

      <Card
        title = "ID Card"
        bg="rgb(220, 230, 234 )"
        icon = "credit-card"
        />

        <SeeDetailsCard
        title = "Promotions"
        bg="rgb(220, 230, 234 )"
        icon = "paperclip"
        />

        <SeeDetailsCard
        title = "Session"
        bg="rgb(234, 234, 220)"
        icon = "apple"
        />

        </View>
      }

      <TransButton/>

      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    userName: state.member.username,
    smToken: state.login.smToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember:(smToken) => dispatch(MemberActions.memberRequest(smToken))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LandingScreen)
