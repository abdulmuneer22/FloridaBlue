import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  TouchableOpacity,

} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors, Metrics, Fonts} from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import styles from './DoctorServiceStyle'

import {connect} from 'react-redux'



import {Actions as NavigationActions} from 'react-native-router-flux'
const window = Dimensions.get('window');

/*
type DoctorServicesProps = {
  fetching: boolean,
  userName : string ,
  data:Object,
}*/


 class DoctorServices extends Component{

   _renderHeader(){
   return <View style={styles.headerContainer}>
     {NavItems.backButton()}
     <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Plan Benefits</Text>
     {NavItems.settingsButton()}

   </View>
 }


   render(){
     console.log("data props "+this.props.data.DoctorServices.InNetwork.physician);
     return(

       <View style={Styles.conatiner}>
       {this._renderHeader()}
       <ScrollView>

       <View style={{alignItems:'center', marginTop:15}}>
       <Icon name="user-md" size={55} />

       <Text style={{marginTop:10,fontSize:20}}>
       Doctor Office Services
       </Text>
       </View>

       <View style={{margin:30,marginLeft:60,flexDirection:'row'}}>
       <TouchableOpacity style={Styles.button}>
       <Text style={Styles.buttonText}>
       In Network
       </Text>
       </TouchableOpacity>

       <TouchableOpacity style={Styles.button}>
       <Text style={Styles.buttonText}>
       Out-Network
       </Text>
       </TouchableOpacity>
       </View>

       <View style={{backgroundColor:'grey',height:160}}>
       <Text style={{marginTop:10,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>
       Physician Services
       </Text>

       <View style={{flexDirection:'row',flex:1}}>
       <View>
       <Text style={{marginLeft:25,margin:15,fontSize:15}}> Physician Services</Text>
       <Text style={{marginLeft:25,margin:15,fontSize:15}}>${ this.props.data.DoctorServices.InNetwork.physician} Copay</Text>
       </View>
       <View>
       <Text style={{marginLeft:45,margin:15,fontSize:15}}> Specialist</Text>
       <Text style={{marginLeft:45,margin:15,fontSize:15}}>${this.props.data.DoctorServices.InNetwork.Specialist} Copay</Text>
       </View>
       </View>
       </View>

       <View style={{backgroundColor:'white'}}>
       <Text style={{marginTop:10,fontSize:15,fontWeight:'bold',alignSelf:'center'}}>
       Advanced Imaging in the physicians Office
       </Text>

       <View style={{flexDirection:'row',flex:1}}>
       <View>
       <Text style={{marginLeft:25,margin:15,fontSize:15}}> physicians</Text>
       <Text style={{marginLeft:25,margin:15,fontSize:15}}>${this.props.data.DoctorServices.InNetwork.physicianservices} Copay</Text>
       </View>
       <View>
       <Text style={{marginLeft:85,margin:15,fontSize:15}}> Specialists</Text>
       <Text style={{marginLeft:85,margin:15,fontSize:15}}>${this.props.data.DoctorServices.InNetwork.specialists} Copay</Text>
       </View>
       </View>

       <Text style={{margin:20,fontSize:20,fontWeight:'bold'}}>Note:</Text>
       <Text style={{marginLeft:20,fontSize:15}}>Advanced Imaging Services Include: MRI, MRA, PET, CT & Nuclear Medicine, Authorizations are required.</Text>

       </View>


       </ScrollView>
       </View>



     );
   }
 }

const Styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  buttonText : {
    color : 'rgba(242, 246, 247   ,0.9)',
    fontWeight : 'bold'

  },
  button : {
    backgroundColor : 'rgba(17, 147, 203,0.9)',
    width : 120,
    padding : 9,
    borderColor : 'rgba(17, 147, 203,0.9)',
    borderRadius : 7,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : 10,
  //  marginBottom : 40,


      },
})

const mapStateToProps = (state) => {
  return {
    data: state.myplan.data
  }
}


export default connect(mapStateToProps)(DoctorServices)
