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
const window = Dimensions.get('window');



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
import Flb from './FlbIcon'


type LoginScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  userName : string ,
  visibilityRules : object,
  attemptMember: () => void
}

class Resources extends Component {


  _renderHeader(){
  return( <View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,alignSelf:'center'}]}>Resources</Text>
    {NavItems.settingsButton()}

  </View>)
}

  render(){
    console.log("root testing"+this.props.userName);
    return(
      <View style={styles.container}>
      {this._renderHeader()}
      <ScrollView>

      <View style={{
        flexWrap : 'wrap',
        flexDirection:'row'

      }}>
        {this.props.visibilityRules.additionalTiles.map(function(tile){

          onItemPress =function() {
          var action ;
          if (tile.tileType =='webview'){
            action = NavigationActions.MyView();
          } else if(tile.tileType == 'native'){
            action = NavigationActions.Resources();
          }
        }

        return(

<TouchableOpacity style={{

  width : window.width * 0.5,
  backgroundColor : 'white',
  height : 150,
  alignItems : 'center',
  justifyContent : 'center',
  borderColor : 'red',
  borderWidth : 1
}} onPress={onItemPress.bind(this)}>
          <View>

          <Flb name="cc-card" size={40}/>
          <Text style={{
            marginTop : 20,
            fontSize : 14,
            fontWeight : '600'
          }}>
          {tile.tileName}
          </Text>

          </View>
</TouchableOpacity>

      )
      })}
      </View>
      <View>
      </View>

      </ScrollView>

      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    visibilityRules : state.member.visibilityRules
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptMember:() => dispatch(MemberActions.memberRequest())
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Resources)
