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
import {Colors,Metrics,Fonts} from '../../../../Themes'
import SeeDetailsCard from './Components/SeeDetailsCard'
import TransButton from './Components/transButton'
import styles from './DashBoardStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import MemberActions from '../../../../Redux/MemberRedux'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Flb from './FlbIcon'



const window = Dimensions.get('window');



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
    var color  = new Array( "#005b80", "#00aec7", "#0091cc","#005b80" )
    var i = 0
    return(
      <View style={styles.mainContainer}>
      {this._renderHeader()}
      <ScrollView>
      <Greeting userName={this.props.userName}/>
      <MyPlanCard/>

      <View style={{
        flexWrap : 'wrap',
        flexDirection:'row',
        justifyContent:'space-around',


      }}>
        {this.props.visibilityRules ? this.props.visibilityRules.coreTiles.map(function(tile,i){

          onItemPress =function() {
          var action ;
          if (tile.tileType =='webview'){
             var webview = 'MyView'
             action = NavigationActions[webview]({responseURL : tile.tileUrl});
          } else if(tile.tileType == 'native'){
            var routerName = tile.routerName ;
           action = NavigationActions[routerName]();
          }
        }
        return(

<TouchableOpacity style={{

  width : window.width * 0.5,
  backgroundColor : color[i],
  height : 150,
  alignItems : 'center',
  justifyContent : 'center',
//  borderColor : 'red',
 //borderWidth : 1,

}} onPress={onItemPress.bind(this)}>
          <View style={{alignItems:'center'}}>

          <Flb name={tile.tileIcon}  size={40}/>
          <Text style={{
            marginTop : 20,
            fontSize : 14,
            fontWeight : '600',
          }}>
          {tile.tileName}
          </Text>

          </View>
</TouchableOpacity>


      )

      i+=1
    })      : <Text></Text>}
      </View>
      <View>
      </View>

      <TransButton/>

</ScrollView>

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
