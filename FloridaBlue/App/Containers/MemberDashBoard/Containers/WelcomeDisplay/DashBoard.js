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
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';


import Greeting from './Components/Greeting'
import MyPlanCard from './Components/MyPlanCard'
import Card from './Components/Card'
import {FlbIcon,Colors,Metrics,Fonts} from '../../../../Themes'
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
  visibilityRules : object,
  attemptMember: () => void
}

class LandingScreen extends Component {

  props: LoginScreenProps
  isAttempting : boolean


  _renderHeader(){
  return( <View style={styles.headerContainer}>
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,alignSelf:'center'}]}>Florida Blue</Text>
    {NavItems.settingsButton()}

  </View>)
}


componentDidMount(){
  console.log("mount on dashboadr"+this.props.smToken);

     this.props.attemptMember()
}

  render(){
    console.log("root testing"+this.props.userName);

    var coreTiles = this.props.visibilityRules.coreTiles ;
    var id = coreTiles[0].tileId ;
    return(
      <View style={styles.container}>
      {this._renderHeader()}

      <Greeting userName={this.props.userName}/>
      <MyPlanCard/>

      <View style={{
        flexWrap : 'wrap',
        flexDirection : 'row'
      }}>
        {this.props.visibilityRules.coreTiles.map(function(tile){
        return(

          <TouchableOpacity onPress={()=>NavigationActions.Resources()}>
            <Card
        title = {tile.tileId}
        bg="rgb(204, 211, 214)"
        icon = "cc-card"
        />
          </TouchableOpacity>

      )
      })}
      </View>
      <View>
      </View>

      <TransButton/>



      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    userName: state.member.username,
    visibilityRules : state.member.visibilityRules
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember:() => dispatch(MemberActions.memberRequest())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LandingScreen)
