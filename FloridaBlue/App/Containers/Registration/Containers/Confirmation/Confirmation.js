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
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';

var Modal   = require('react-native-modalbox');

import {Colors,Metrics,Fonts,Images} from '../../../../Themes'
import styles from './ConfirmationStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Flb from '../../../../Themes/FlbIcon'
import I18n from 'react-native-i18n'
import { MKTextField, MKColor } from 'react-native-material-kit'

const window = Dimensions.get('window');
const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .build();



class Confirmation extends Component{

  constructor(){
    super();
    this.state = {
      isPopupVisible : false,


    }
  }
  _showPopup(){
    //alert(this.state.isPopupVisible)
    var isPopupVisible = this.state.isPopupVisible
    if(isPopupVisible){
      this.setState({isPopupVisible : false})
    }else{
      this.setState({isPopupVisible : true})

    }
  }

  render(){
    return(
    <ScrollView style ={styles.container}>
      <Image  style={styles.headerContainer} source={Images.regCompletion} />
      
      <Text style={styles.header}>Thank You!</Text>
      <Text style={styles.subheading}>You have successfully completed the registration process.</Text>

      <View style={styles.userStyle}>

      <View style={{
          backgroundColor : Colors.snow,
          width : 50,
          height : 50,
          borderRadius : 50/2,
          alignItems :'center',
          justifyContent : 'center',
          //marginTop:0,
          marginLeft:Metrics.doubleBaseMargin
      }}>
      <Flb name="user"  size={Metrics.icons.medium} color={Colors.flBlue.grass} />
      </View>

      <View style={styles.center}>
      <Text style={{
        fontSize : Fonts.size.h6,
        fontWeight:'500',
        color:Colors.snow
        //alignSelf : 'stretch',
      //  alignItems:'center',
      //  justifyContent:'center',
      //  height:40,
        //marginLeft:5
      }}>
      Your User ID is:
      </Text>
        <Text style={{fontSize:Fonts.size.regular,color:Colors.snow}}>
            something long here
              </Text>
              </View>

               </View>

                 <View style={styles.wrapper}>

                  <TouchableWithoutFeedback onPress = {NavigationActions.login}>
                 <Image source={Images.loginNowButton} style={styles.buttonStyle}/>

                 </TouchableWithoutFeedback>

                 <View style={styles.row}>
                   <View>
                     <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
                   </View>
                 </View>






                 </View>


</ScrollView>

    )
  }
}



export default Confirmation
