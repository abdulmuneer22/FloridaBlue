
import React, { Component, PropTypes } from 'react';
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


import styles from './DashBoardStyle'
import axios from 'axios'
import {Colors,Metrics,Fonts, Images} from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import {connect} from 'react-redux'
import SupportActions from '../../../../Redux/SupportRedux'


const window = Dimensions.get('window');

class SupportScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
    }

  }

_renderHeader(){
return( <View style={styles.headerContainer}>
  {NavItems.backButton()}
  <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,marginLeft:10}]}>Support</Text>
  {NavItems.settingsButton()}

  </View>)
  }


  componentDidMount(){
       console.log("I am Support screen")
        this.props.attemptSupportScreen();
  }


      render(){

        var texts = [];
        var text=this.props.data
          var i=0;

        text.map(function(network, i) {
          var support  = network['support'];

            console.log("support" + JSON.stringify(text))
            texts.push( <View style = {i % 2 == 0 ? styles.textBackground : styles.textBackground1} >

              <View>
              <Text style = {styles.textStyle} >
              {network.contactType}
              </Text>
              <Text style = {styles.textStyle} >
              {network.contactNumber}
              </Text>

              </View>
              <View>
              <Text style = {styles.textStyle1} >
              {network.accessibilityType}
              </Text>

              <Text style = {styles.textStyle1} >
              {network.accessibilitynumber}
              </Text>

              </View >
              </View>
            )
            i += 1
            return texts

          }

        );
        return (

          <ScrollView >
          <View >
            <Text>Hi 
            </Text>
          </View>
          </ScrollView >

        );
      }
    }


    SupportScreen.propTypes = {

      data: PropTypes.object,
      attemptSupportScreen: PropTypes.func,
      error: PropTypes.string
    }

    const mapStateToProps = (state) => {
    return {
      fetching: state.login.fetching,
      data : state.support.data,
      error: state.support.error
  }
    }

    const mapDispatchToProps = (dispatch) => {
    return {
    attemptSupportScreen:() => dispatch(SupportActions.supportRequest()),
    }
    }

export default connect(mapStateToProps,mapDispatchToProps)(SupportScreen)
