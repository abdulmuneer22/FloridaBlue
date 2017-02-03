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

class MyPlanSwiper extends Component{

    render(){
        return(

                <Swiper height={350} style={styles.wrapper} showsButtons={true}>
                <View style={styles.headerStyle}>

                    <Text style={styles.headerText}>Out-Network</Text>
                    <Text style={styles.subHeader}> Family Out-of-Pocket (OOP) Maximum</Text>

                    <View style={styles.listViewBg}>
                    <View style={styles.listViewStyle}>

                  <View style={{flexDirection:'row'}}>
                  <Text>Family Deductable</Text>
                <Text>${this.props.data.annualDeductible.inNetwork[1].value}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                <Text>Remaining Family Deductable</Text>
              <Text>${this.props.data.annualDeductible.remainingValue}</Text>
              </View>

                <View style={{flexDirection:'row'}}>
                <Text>Family Pharmacy Deductible:</Text>
                <Text>${this.props.data.annualDeductible.benefitValue}</Text>
                </View>

                </View>
                </View>
                </View>

                <View style={styles.headerStyle}>

                <Text style={styles.headerText}>Out-Network</Text>
                <Text style={styles.subHeader}> Family Out-of-Pocket (OOP) Maximum</Text>

                <View style={styles.listViewBg}>
                <View style={styles.listViewStyle}>

              <View style={{flexDirection:'row'}}>
              <Text>Family Deductable</Text>
              <Text>${this.props.data.oop.usedOOP}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Text>Remaining Family Deductable</Text>
              <Text>${this.props.data.oop.remainingValue}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Text>Family Pharmacy Deductible:</Text>
              <Text>${this.props.data.oop.benefitValue}</Text>
              </View>

                </View>


                <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                <Image style={{width:50,height:50}}
                source={Images.findCare}/>
                </View>
                  </View>
                </View>

                </Swiper>

        );
    }

}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eee'

  },

  headerStyle: {
    alignItems:'center',
    paddingTop:20
  },
  headerText: {
    color:Colors.flBlue.night,
    fontWeight:'bold',
    paddingBottom:10
  },
  subHeader:{
    fontSize:Fonts.size.regular,
    marginBottom:18
  },
  listViewBg:{
    flexDirection:'row',
    marginLeft:15,
    marginRight:15
  },
  listViewStyle:{
    alignItems:'flex-start',
    flex:2,
    marginLeft:15
  }
})
export default MyPlanSwiper
