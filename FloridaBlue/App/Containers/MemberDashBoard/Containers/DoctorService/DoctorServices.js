import React, { Component, PropTypes } from 'react';
import {Actions as NavigationActions} from 'react-native-router-flux'
import {Text,View,ScrollView} from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome';
//import Card from './Components/Card'
import FirstCard from './Components/FirstCard'
import SecondCard from './Components/SecondCard'
import ThirdCard from './Components/ThirdCard'
import FourthCard from './Components/FourthCard'

//import BenefitsSwiper from './Components/Swiper'
import styles from './DoctorServiceStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../../../Themes'
import {connect} from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'


class DoctorServices extends Component{

_renderHeader(){
return (<View style={styles.headerContainer}>
{NavItems.backButton()}
<Text style={[{color:Colors.snow,fontSize:Fonts.size.h4,marginLeft:10}]}>Plan Benefits</Text>
{NavItems.settingsButton()}

</View>)
}
render(){
return(

<View style={{
flex : 1 ,
backgroundColor : 'white'
}}>
          {this._renderHeader()}

          <ScrollView>
          <View style={{flex : 1}}>
          <View style={{
          alignItems : 'center',
          marginTop : 10
          }}>
          <Icon name="user-md" size={60} color="black"></Icon>
          <Text style={{
          marginTop : 5,
          fontSize : 13
          }}>Doctor Office Services</Text>

          <Switch leftActive = {this.props.leftActive} rightActive={this.props.rightActive} attemptHandleLeft={this.props.attemptHandleLeft} attemptHandleRight={this.props.attemptHandleRight}></Switch>

          </View>
          <View>
          <FirstCard />
          </View>

          <View>

          <Text style={{
            textAlign : 'center',
            paddingLeft : 15,
            paddingRight : 15,
            marginTop : 15,
            fontWeight : '500'
          }}>Advanced Imaging in the Physicians Office</Text>
          <SecondCard/>

          <View style={{
            paddingLeft : 10,
            paddingRight : 10
          }}>
          <Text style={{
            fontWeight : '500'
          }}>

          Note:
          </Text>
          <Text>
          Advanced Imaging Services Include: MRI, MRA, PET, CT & Nuclear Medicine, Authorizations are required.
          </Text>
          </View>

          </View>

            <ThirdCard />

          <View style={{
          padding : 15
          }}>
          <Text style={{textAlign : 'center', fontWeight : '600', paddingBottom : 15}}>E-Visit</Text>

          <Text style={{
            fontWeight : '400',
            fontSize : 14
          }}>
          If Your doctor has signed up for e-medcine services, you can communicate directly and securely with their office online. You can make appointments, renew prescriptions, request referrals, and even get lab test results-all
          at no charge. However, the cost below is for  an electronic visit which  entails more specific care discussions, And since you  can do this all from your home or office, it saves time and money. The plan deductible may need
          to paid before the cost shares below are applied to your medical service, or could be charged after or in ali class="tab-title"ition to your cost share. Please refer to your health contracts schedule of Benefits for more information on the costs you are responsible to pay the provider.
          </Text>


          </View>
            <FourthCard />
          </View>
          </ScrollView>

        </View>
      );
    }
}


DoctorServices.propTypes = {

attemptHandleLeft: PropTypes.func,
attemptHandleRight: PropTypes.func
}

const mapStateToProps = (state) => {
return {
data: state.myplan.data,
leftActive:state.myplan.leftActive,
rightActive:state.myplan.rightActive
}
}

const mapDispatchToProps = (dispatch) => {
return {
attemptHandleLeft:() => dispatch(MyPlanActions.myplanClickleft()),
attemptHandleRight:() => dispatch(MyPlanActions.myplanClickright())
}
}

export default connect(mapStateToProps,mapDispatchToProps)(DoctorServices)
