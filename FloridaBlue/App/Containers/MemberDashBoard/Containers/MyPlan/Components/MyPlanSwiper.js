import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper';
import {Colors,Metrics,Fonts, Images} from '../../../../../Themes'
import PercentageCircle from 'react-native-percentage-circle'

class MyPlanSwiper extends Component{

    render(){

      var myPlan =[];
      if (this.props.data.annualDeductible.inNetwork){
      var inNetwork = this.props.data.annualDeductible.inNetwork ;
        inNetwork.map(function(temObj){
            myPlan.push(temObj)
        });
    }

    if (this.props.data.annualDeductible.outNetwork){
    var outNetwork = this.props.data.annualDeductible.outNetwork ;
      outNetwork.map(function(temObj){
          myPlan.push(temObj)
      });
  }


      return(
<Swiper height={350} style={styles.wrapper} showsButtons={true}>
{ this.props.data.annualDeductible.inNetwork ? myPlan.map(function(network, i){

return(
<View style={styles.headerStyle}>



  <Text style={styles.headerText}>In-Network</Text>
  <Text style={styles.subHeader}> Family Out-of-Pocket (OOP) Maximum</Text>

  <View style={styles.dataContainer}>
  <View style={styles.listViewStyle}>



  <View style={{flexDirection:'row'}}>
<Text style={{marginTop:10,fontSize:Fonts.size.regular}}>{network.type} Deductable :</Text>
<Text style={{marginTop:10,fontSize:Fonts.size.regular}}>${network.value}</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{marginTop:10,fontSize:Fonts.size.regular}}>Remaining {network.type} Deductable :</Text>
<Text style={{marginTop:10,fontSize:Fonts.size.regular}}>${network.remain}</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{marginTop:10,fontSize:Fonts.size.regular}}>{network.type} Pharmacy Deductible :</Text>
<Text style={{marginTop:10,fontSize:Fonts.size.regular}}>${network.used}</Text>
</View>


</View>

  <View style={{flex:0.3, alignItems: 'center', justifyContent:'center'}}>
  <PercentageCircle radius={50} percent={50} color={Colors.flBlue.ocean} />
  </View>

  </View>

  </View>
)
i+=1
})
     : <Text></Text>}

  </Swiper>


);

    }

}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.snow

  },

  headerStyle: {
    flex:1,
    alignItems:'center',
    //justifyContent:'center',
    flexWrap:'nowrap',
    //backgroundColor:Colors.flBlue.ocean
  },
  headerText: {
    color:Colors.flBlue.night,
    fontWeight:'bold',
    //paddingBottom:10,
    marginTop:30,

    //width:Metrics.screenWidth,
    //alignSelf:'center',
    fontSize:Fonts.size.h6,
    //backgroundColor:Colors.flBlue.ocean
  },
  subHeader:{
    fontSize:Fonts.size.regular,
    marginBottom:18,
    marginTop:20
  },
  listViewBg:{
    flexDirection:'row',
    marginLeft:15,
    marginRight:15
  },
  dataContainer:{
    flexDirection:'row',
      marginLeft:13,
      marginRight:35,
    flexWrap:'wrap'
  },
  listViewStyle:{
    alignItems:'flex-start',
     flex:0.7,
     marginLeft:20,

   }

})
export default MyPlanSwiper
