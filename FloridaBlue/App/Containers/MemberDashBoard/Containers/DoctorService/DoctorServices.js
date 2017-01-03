import React, { Component, PropTypes } from 'react';
import {Actions as NavigationActions} from 'react-native-router-flux'
import {Text,View,ScrollView} from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from './Components/Card'
//simport SecondCard from './Components/SecondCard'
import BenefitsSwiper from './Components/Swiper'
import styles from './DoctorServiceStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../../../Themes'
import {connect} from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'



class DoctorServices extends Component{

  _renderHeader(){
  return (<View style={styles.headerContainer}>
    {NavItems.backButton()}
    <Text style={[{color:Colors.snow,fontSize:Fonts.size.h4}]}>Plan Benefits</Text>
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
                    <Icon name="user-md" size={60} color="black" />
                    <Text style={{
                      marginTop : 5,
                      fontSize : 13
                    }}>Doctor Office Services</Text>

                    <Switch leftActive = {this.props.leftActive} rightActive={this.props.rightActive} attemptHandleLeft={this.props.attemptHandleLeft} attemptHandleRight={this.props.attemptHandleRight}/ >

                    </View>

                    <View style={{marginTop:15}}>
                    <Card data= {this.props.data} leftActive = {this.props.leftActive} rightActive={this.props.rightActive}/>
                    </View>

                    <View>

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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor consectetur adipisicing elit
                    </Text>
                    </View>

                    </View>

                    <BenefitsSwiper/>

                    <View style={{
                      padding : 15
                    }}>
                    <Text style={{
                      fontWeight : '400',
                      fontSize : 12
                    }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    </Text>
                    </View>

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
    data: state.myplan.data.data,
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
