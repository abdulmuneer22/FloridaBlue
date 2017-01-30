import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'


import DropDown from './DropDown'
import OutOfPocket from './OutOfPocket'
import HomeHealthCare from './HomeHealthCare'
import Therapies from './Therapies'
import Spinal from './SpinalMan'
import Nursing from './Nursing'
import {Colors,Metrics,Fonts} from '../../../../Themes'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'



import Icon from 'react-native-vector-icons/Ionicons';
import Switch from './switch'
const window = Dimensions.get('window');

class AdditionalBenefits extends Component {
    constructor() {
        super();
        this.state = {
            dropVisible: false
        }
    }

    _renderHeader(){
    return( <View style={{flexDirection:'row',
    height:78,
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    alignSelf:'stretch',
    width:null}}>
      <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,marginLeft:100}]}>Florida Blue</Text>
      {NavItems.settingsButton()}
    </View>)
  }

    render() {
        return (
            <View>
            {this._renderHeader()}
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            alignItems: 'center',
                            marginTop: 10
                        }}>
                            <Icon name="ios-medkit" size={60} color="black" />
                            <Text style={{
                                marginTop: 5,
                                fontSize: 13
                            }}>Additional Benefits</Text>
                            <Switch />


                            <View style={Style.dropWrapper}>
                                <Text style={Style.dropText}>Information about Out of Pocket Maximum</Text>
                                <TouchableWithoutFeedback
                                onPress = {()=> {this.setState({dropVisible : !this.state.dropVisible})}}
                                >
                                    <View style={{ marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name={!this.state.dropVisible ? "ios-arrow-dropdown" : "ios-arrow-dropup"} size={18} color="black" />
                                    </View>

                                </TouchableWithoutFeedback>


                            </View>
                            {
                                this.state.dropVisible ?
                                <DropDown />
                                :
                                null
                            }

                            <OutOfPocket/>

                            <HomeHealthCare />

                            <Therapies />

                            <Spinal />

                            <Nursing />
                        </View>







                    </View>

                </ScrollView>
            </View>
        );
    }
}


const Style = StyleSheet.create({
    dropWrapper: {
        // margin: 20,
        marginTop: 20,
        flexDirection: 'row'
    },
    dropText: {
        fontSize: 14,
        fontWeight: '500'
    }
});
export default AdditionalBenefits
