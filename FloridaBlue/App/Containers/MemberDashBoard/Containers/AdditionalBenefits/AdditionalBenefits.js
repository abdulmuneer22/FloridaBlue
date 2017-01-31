import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'


import DropDown from './Components/DropDown'
import Switch from './Components/switch'
import OutOfPocket from './Components/OutOfPocket'
import HomeHealthCare from './Components/HomeHealthCare'
import Therapies from './Components/Therapies'
import Spinal from './Components/SpinalMan'
import Nursing from './Components/Nursing'
import {Colors,Metrics,Fonts} from '../../../../Themes'
import Flb from '../../../../Themes/FlbIcon'
import NavItems from '../../../../Navigation/NavItems.js'
import {Actions as NavigationActions} from 'react-native-router-flux'
import styles from './AdditionalBenefitsStyle'



import Icon from 'react-native-vector-icons/Ionicons';
const window = Dimensions.get('window');

class AdditionalBenefits extends Component {
    constructor() {
        super();
        this.state = {
            dropVisible: false
        }
    }

    _renderHeader(){
    return( <View style={styles.headerContainer}>
      {NavItems.backButton()}
      <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Plan Benefits</Text>
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
                            <Flb name="cross" size={Metrics.icons.large} color="black" />
                            <Text style={{
                                marginTop: 5,
                                fontSize: Fonts.size.h6
                            }}>Additional Benefits</Text>
                            <Switch />


                            <View style={Style.dropWrapper}>
                                <Text style={Style.dropText}>Information about Out of Pocket Maximum</Text>
                                <TouchableWithoutFeedback
                                onPress = {()=> {this.setState({dropVisible : !this.state.dropVisible})}}
                                >
                                    <View style={{ marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
                                    <Flb name={!this.state.dropVisible ? "rd-d-arrow" : "rd-u-arrow"} size={18} color="black" />
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
