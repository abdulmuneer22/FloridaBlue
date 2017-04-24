import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native'

import DoctorLocation from './Components/DoctorLocation'
import Panel from './Components/Panel'
//import DoctorCard from './Components/DoctorCard'
import AcceptOptions from './Components/AcceptOptions'
import Clickables from './Components/Clickables'


const ClickablesOptions = [
    {name : "Other Locations",count : 22},
    {name : "History / Credentials"},
    {name : "Board Certifications / Eligibility"},
    {name : "Institutional Affiliations"},
    {name : "Plans Accepted"},
    {name : "Programs"},
    {name : "Hospital Options - Applicable to BlueOptions Plan"}
]

 class DoctorDetail extends Component{
    render(){
        return(
            <View style={{
                flex : 1
            }}>
               
                <ScrollView>
                    <View style={{
                        flex : 1
                    }}>
                        <DoctorLocation />
                        <View style={{flex:1}}>
                        <Panel title="Test">
                            <Text>TestData</Text>
                            </Panel>
                            </View>
                        <AcceptOptions />
                        {
                            ClickablesOptions.map((clickable,i)=>{
                                return(
                                    <Clickables key={i} label={clickable.name} count={clickable.count}/>
                                )
                            })
                        }
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default DoctorDetail