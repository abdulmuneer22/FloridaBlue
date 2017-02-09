import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  WebView,
  TouchableWithoutFeedback
} from 'react-native';

import LoginActions from '../../../../Redux/LoginRedux'
import I18n from 'react-native-i18n'
import styles from './TermsStyle'
import { Colors, Fonts, Images, Metrics } from '../../../../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MKTextField, MKColor, MKCheckbox, setTheme } from 'react-native-material-kit'
import {connect} from 'react-redux'
import RegistrationToolBar from '../RegistrationToolBar'
import {Actions as NavigationActions} from 'react-native-router-flux'


  setTheme({checkboxStyle: {
    fillColor: Colors.flBlue.ocean,
    borderOnColor: Colors.flBlue.ocean,
    borderOffColor: Colors.flBlue.ocean,
  }});


class TermsofUse extends Component{
  constructor(){
    super();
    this.state = {
      clicked : false
    }
  }

  _handleAgreeTermsOfUse(){
console.log(this.props.agreeTermsOfUse)
    if(!this.props.agreeTermsOfUse ){

    alert("Please accept Terms of Use")
  } else {
    NavigationActions.WelcomeDashBoard()
  }
}

  render(){
    return(
      <View style={styles.container}>

      <WebView
      source={{uri: 'https://www.floridablue.com/terms-of-use'}}/>

      <View style={styles.checkViewStyle}>
        <View style={styles.checkStyle}>

        <MKCheckbox
          ref='agreeTermsOfUse'
          onCheckedChange={()=> {
          var checked=this.refs.agreeTermsOfUse.state.checked
          this.props.handleChangeAgreeTermsOfUse(checked)}} />
        </View>

        <View style={styles.checkTextView}>
        <Text style={styles.checkText}>
        Yes. I certified that I have read the above Terms of Use and agree with those terms in order
        to use this apllication.
        </Text>
        </View>
      </View>

      <View style={{marginTop:20}}>
        <TouchableOpacity style={styles.agreeButton}
        onPress={()=>this._handleAgreeTermsOfUse()}
        >
        <Text style={{
          color : 'white'
        }}>
        I Agree
        </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.footerText}>{I18n.t('footerText')}</Text>
          </View>
        </View>


      </View>

    );
  }
}

const Styles = StyleSheet.create({
  progressBoxStyle : {
    flex : 1,
    alignItems :'center',
    justifyContent : 'center',
  }
});


TermsofUse.propTypes = {
  sendConfirm: PropTypes.func,
  fetching: PropTypes.bool,
  confirm : PropTypes.string,
  error: PropTypes.string,
  handleChangeAgreeTermsOfUse: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching,
    confirm : state.login.confirm ,
    error: state.login.error,
    agreeTermsOfUse: state.login.agreeTermsOfUse,
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeAgreeTermsOfUse:(agreeTermsOfUse) => dispatch(LoginActions.changeAgreeTermsOfUse(agreeTermsOfUse)),
    sendConfirm:(confirm) => dispatch(LoginActions.sendregistrationSuccessconfirm(confirm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsofUse)
