import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window')

import Swiper from 'react-native-swiper';

class MyPlanSwiper extends Component{

    render(){
        return(
                <Swiper height={300} style={styles.wrapper} showsButtons={true}>
                <View style={styles.slide}>
                <View style={styles.outofBox}>
                    <Text style={{
                        fontSize : 14,
                        fontWeight : 'bold'
                    }}>Annual Deductable (In-Network)</Text>
                </View>

                <Text>Spent Year-to-Date: $2,250</Text>

                </View>

                <View style={styles.slide}>
                <View style={styles.outofBox}>
                    <Text style={{
                        fontSize : 14,
                        fontWeight : 'bold'
                    }}>Annual Out-of-Pocket Maximum (In-Network)</Text>
                </View>
                <Text>Spent Year-to-Date: $2,250</Text>
                </View>
                </Swiper>

        );
    }

}

var styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#eee'

  },
  slide: {
    flex:1,
    alignItems: 'center',
    flexWrap:'nowrap',
    backgroundColor: '#ccc',
  },
  outofBox:{
    backgroundColor : 'rgb(221, 227, 228)',
    padding : 10,
    alignItems : 'center',
    justifyContent : 'center',
    width : window.width,
    marginBottom : 10

  }
})
export default MyPlanSwiper
