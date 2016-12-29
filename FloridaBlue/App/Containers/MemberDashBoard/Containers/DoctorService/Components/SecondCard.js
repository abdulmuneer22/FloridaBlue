import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import {connect} from 'react-redux'

const window = Dimensions.get('window');

class SecondCard extends Component{
  render(){
    return(
      <View style={Style.wrapper}>

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
        <Text>
        Physician Services
        </Text>

        <View style={Style.Copay}>
        <Text style={Style.CopayText}>
        ${this.props.data.DoctorServices.InNetwork.physicianservices} Copay
        </Text>
        </View>
      </View>

      <View style={{
        alignItems : 'center',
        // borderWidth : 1,
        // borderColor : 'black',
        flex : 1
      }}>
      <Text>
      Specialist
      </Text>


      <View style={Style.Copay}>
      <Text style={Style.CopayText}>
      ${this.props.data.DoctorServices.InNetwork.specialists} Copay
      </Text>
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
    // backgroundColor : 'rgb(170, 184, 187)'
  },
  Copay : {
    paddingTop : 40,
    paddingBottom : 40
  },
  CopayText : {
    fontSize : 20
  }
});


const mapStateToProps = (state) => {
  return {
    data: state.myplan.data
  }
}
export default connect(mapStateToProps)(SecondCard)
