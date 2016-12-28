import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import {connect} from 'react-redux'
const window = Dimensions.get('window');

class Card extends Component{
  render(){
    return(
      <View style={Style.wrapper1}>
      <View style={Style.wrapper}>
      <Text>
      Physician Services
      </Text>

      <View style={{
        flexDirection : 'row',
        marginTop : 15
      }}>
      <View style={{
        alignItems : 'center',
        // borderWidth : 1,
        // borderColor : 'black',
        flex : 1
      }}>

        {this.props.leftActive ?  <Text style={Style.CopayText}>{ this.props.data.DoctorServices.InNetwork.physicianname} </Text> :
         <Text style={Style.CopayText}> {this.props.data.DoctorServices.OutNetwork.familyname}</Text>}


        <View style={Style.Copay}>
        {this.props.leftActive ?  <Text style={Style.CopayText}>${ this.props.data.DoctorServices.InNetwork.physician} Copay </Text> :
         <Text style={Style.CopayText}> Pay {this.props.data.DoctorServices.OutNetwork.familyphysician}%</Text>}
        </View>
      </View>

      <View style={{
        alignItems : 'center',
        // borderWidth : 1,
        // borderColor : 'black',
        flex : 1
      }}>
      {this.props.leftActive ?  <Text style={Style.CopayText}>{ this.props.data.DoctorServices.InNetwork.SpecialistName} </Text> :
       <Text style={Style.CopayText}> {this.props.data.DoctorServices.OutNetwork.Specialistservice}</Text>}


      <View style={Style.Copay}>
      {this.props.leftActive ?  <Text style={Style.CopayText}>  ${this.props.data.DoctorServices.InNetwork.Specialist} Copay </Text>:
      <Text style={Style.CopayText}> Pay {this.props.data.DoctorServices.OutNetwork.Specialist}%</Text>}
      </View>

      </View>
      </View>
      </View>
      <View style={Style.wrapper1}>

        <Text style={{textAlign : 'center',padding : 15}}>Advanced Imaging in the Phycisians Office</Text>
      <Text>
      Physician Services
      </Text>

      <View style={{
        flexDirection : 'row',
        marginTop : 15
      }}>
      <View style={{
        alignItems : 'center',
        // borderWidth : 1,
        // borderColor : 'black',
        flex : 1
      }}>

      {this.props.leftActive ?  <Text style={Style.CopayText}>{ this.props.data.DoctorServices.InNetwork.physicianname} </Text> :
       <Text style={Style.CopayText}> {this.props.data.DoctorServices.OutNetwork.familyname}</Text>}

        <View style={Style.Copay}>
        {this.props.leftActive ? <Text style={Style.CopayText}>${this.props.data.DoctorServices.InNetwork.physicianservices} Copay </Text> :
           <Text style={Style.CopayText}> Pay {this.props.data.DoctorServices.OutNetwork.family}%</Text>}

        </View>
      </View>

      <View style={{
        alignItems : 'center',
        // borderWidth : 1,
        // borderColor : 'black',
        flex : 1
      }}>
      {this.props.leftActive ?  <Text style={Style.CopayText}>{ this.props.data.DoctorServices.InNetwork.SpecialistName} </Text> :
       <Text style={Style.CopayText}> {this.props.data.DoctorServices.OutNetwork.Specialistservice}</Text>}


      <View style={Style.Copay}>
        {this.props.leftActive ? <Text style={Style.CopayText}>${this.props.data.DoctorServices.InNetwork.specialists} Copay </Text>:
         <Text style={Style.CopayText}> Pay {this.props.data.DoctorServices.OutNetwork.specialists}%</Text>}
      </View>



      </View>


      </View>

      </View>

      </View>
    );
  }


}



var Style = StyleSheet.create({
  wrapper : {
    width : window.width,
    //height : 180,
    alignItems : 'center',
    padding : 10,
    marginTop : 10,
    backgroundColor : 'lightgrey'
  },
  wrapper2 : {
    width : window.width,
    //height : 180,
    alignItems : 'center',
    padding : 10,
    marginTop : 10,
    backgroundColor : 'lightgrey'
  },
  wrapper1:{
    width : window.width,
  //height : 180,
  alignItems : 'center',
  padding : 10,
  marginTop : 10,
  },
  Copay : {
    paddingTop : 40,
    paddingBottom : 40
  },
  CopayText : {
    fontSize : 20
  }
});

export default Card
