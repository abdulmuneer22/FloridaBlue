import React, { Component, PropTypes } from 'react'

import { AppRegistry, 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Dimensions, 
    TouchableOpacity, 
    Image, 
    TouchableWithoutFeedback, 
    ScrollView, 
    Linking
} from 'react-native'

import styles from './ClaimDetailStyle'
import axios from 'axios'
import { Colors, Metrics, Fonts, Images } from '../../../../../Themes'
import NavItems from '../../../../../Navigation/NavItems.js'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Flb from '../../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import ClaimDetailActions from '../../../../../Redux/ClaimDetailRedux'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'

import { Card } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
const window = Dimensions.get('window')

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class ClaimDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  _renderHeader () {
    return (<Image source={Images.newHeaderImage} style={styles.headerContainer}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Claim Detail
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }

  componentDidMount () {
      console.log("im claims screen")
   this.props.attemptClaimDetail()
  }
 _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>)
    } else if (this.props.claimdetaildata && this.props.claimdetaildata.memberFirstName && this.props.claimdetaildata.memberFirstName.length !=0) {
      return (
        <View style={styles.container}>
           <ScrollView style={{flex:1}}>  
          <View style={{flex:1, backgroundColor:Colors.bg2}}>   
          
         <View style={{flex:1, backgroundColor:Colors.flBlue.grey1,marginTop:Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002,
                            flexDirection:'row',justifyContent:'center', marginBottom:Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002}}>
             {this.props.claimdetaildata ? 
         <View style={{flex:0.33, alignItems:'center', marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.001,justifyContent:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
              {this.props.claimdetaildata.dateReceived}
            </Text>             
          </View>   :null}
          {this.props.claimdetaildata ? 
         <View style={{flex:0.33, alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
              {this.props.claimdetaildata.memberFirstName}
            </Text>             
          </View>   :null}
          {this.props.claimdetaildata ? 
         <View style={{flex:0.34, alignItems:'center', marginRight:Metrics.baseMargin  * Metrics.screenWidth * 0.001,
                        marginTop:Metrics.baseMargin*Metrics.screenHeight*0.002,marginBottom:Metrics.baseMargin*Metrics.screenHeight*0.002,justifyContent:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
              {this.props.claimdetaildata.providerLastName}
            </Text>             
          </View>   :null}
        </View>
        </View>
        {this.props.claimdetaildata ?
        <View style={{flex:1, backgroundColor:Colors.bg2}}>
        <View style={{flex:1, flexDirection:'row', marginLeft:Metrics.mediumMargin* Metrics.screenWidth*0.002 }}>
            <View style={{flex:0.4}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Type:
            </Text>
            </View>
           <View style={{flex:0.6}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.claimType}
            </Text>
            </View> 
         </View>
         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:Metrics.baseMargin * Metrics.screenHeight*0.002,
                        marginRight:Metrics.mediumMargin* Metrics.screenWidth*0.001}}>
            <View style={{flex:0.4,marginLeft:Metrics.mediumMargin* Metrics.screenWidth*0.002}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Status:
            </Text>
            </View>
           <View style={{flex:0.6}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.serviceDateFrom}
            </Text>
            </View> 
         </View>:null}

           {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:Metrics.baseMargin*Metrics.screenHeight*0.002, marginBottom:Metrics.baseMargin*Metrics.screenHeight*0.002}}>
            <View style={{flex:0.4, marginLeft:Metrics.mediumMargin* Metrics.screenWidth*0.002}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Number:
            </Text>
            </View>
           <View style={{flex:0.6}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.claimNumber}
            </Text>
            </View> 
         </View>:null}
       
         </View>  :null}
         <View style={{borderWidth:0.3, borderColor:Colors.flBlue.grey3,backgroundColor:Colors.bg2,
                         marginLeft:Metrics.mediumMargin* Metrics.screenWidth*0.001, marginRight:Metrics.mediumMargin* Metrics.screenWidth*0.001}}/>
         <View style={{flex:1,backgroundColor:Colors.bg2}}>
              <View style={{flex:1, margin:15,backgroundColor:Colors.bg2}}>
             <Text  style={{color:Colors.flBlue.anvil,
                            fontWeight:'400',
                        fontSize:Fonts.size.h4 * Metrics.screenWidth * 0.0025}}>
            Overall Claims Breakdown:
            </Text>
            <View style={{flex:1}}>
                {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:Metrics.baseMargin*Metrics.screenHeight*0.002}}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Total Billed
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:Metrics.mediumMargin*Metrics.screenWidth*0.002}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}

         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:Metrics.baseMargin*Metrics.screenHeight*0.002}}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Your Responsibility*
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:Metrics.mediumMargin*Metrics.screenWidth*0.002}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}
          {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Florida Blue paid
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:Metrics.mediumMargin*Metrics.screenWidth*0.002}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}

          {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:Metrics.baseMargin*Metrics.screenHeight*0.001}}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Your Discount
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:Metrics.mediumMargin*Metrics.screenWidth*0.002}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}
            </View>
               
            </View>
             <View style={{flex:1, backgroundColor:Colors.flBlue.ocean,
                            marginTop:Metrics.baseMargin*Metrics.screenHeight*0.001}}>
                    {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:Metrics.baseMargin*Metrics.screenHeight*0.001,
                            marginBottom:Metrics.baseMargin*Metrics.screenHeight*0.001, }}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.snow,
                        fontSize:Fonts.size.h4 * Metrics.screenWidth * 0.003}}>
            You've Saved:
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:Metrics.mediumMargin*Metrics.screenWidth*0.001}}>
            <Text style={{color:Colors.snow,
                        fontSize:Fonts.size.h4 * Metrics.screenWidth * 0.003}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}
        </View>

         {/*<View style={{flex:1, backgroundColor:Colors.bg2,
                            marginTop:10, borderBottomWidth:0.4,
                            borderColor:Colors.flBlue.anvil}}>
                  
            <View style={{flex:1, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            *Your Responsibility Includes:
            </Text>
            </View>
         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <View style={{flex:0.6, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Copay:
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalCoPay}
            </Text>
            </View> 
         </View>:null}
         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <View style={{flex:0.6, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Deductible:
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalDeductable}
            </Text>
            </View> 
         </View>:null}
         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10, marginBottom:10}}>
            <View style={{flex:0.6, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Coinsurance:
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalCoInsurance}
            </Text>
            </View> 
         </View>:null}
         </View>    */}
        </View>   


            
         <View style={{flex:1, marginBottom:Metrics.baseMargin*Metrics.screenHeight*0.001, marginTop:Metrics.doubleBaseMargin*Metrics.screenHeight*0.002, margin:Metrics.baseMargin*Metrics.screenHeight*0.001}}>
                  
            <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
          <View style={{flex:0.3, flexDirection:'row'}}>
             <TouchableOpacity  style={{flex:0.3, flexDirection:'row'}}>
            <View style={{flex:0.1, alignItems:'center'}}> 
           <Flb name="rd-l-arrow" size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
           color={Colors.flBlue.ocean}/>
           </View>
            <View style={{flex:0.2}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             Prev
            </Text>
            </View>
            </TouchableOpacity>
            </View> 
             <View style={{flex:0.4, alignItems:'center'}}>
             <TouchableOpacity  onPress={()=>NavigationActions.ClaimsList()} style={{flex:0.4, alignItems:'center'}}>
             <Image source={Images.backButton} />
             </TouchableOpacity>
            </View>
          
             <View style={{flex:0.3, flexDirection:'row'}}>
                 <TouchableOpacity  style={{flex:0.3, flexDirection:'row'}}>
            <View style={{flex:0.2,alignItems:'flex-end'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             Next
            </Text>
            </View>
             <View style={{flex:0.1, alignItems:'center'}}> 
           <Flb name="rd-r-arrow" size={Metrics.icons.medium * Metrics.screenWidth * 0.002}
           color={Colors.flBlue.ocean}/>
           </View>
           </TouchableOpacity>        
            </View>
           
            </View>
          <View style={{flex:1, alignItems:'center', marginTop:Metrics.mediumMargin * Metrics.screenHeight * 0.002, 
                                marginBottom:Metrics.doubleBaseMargin * Metrics.screenHeight * 0.002}}>
              <Text style={{color:Colors.flBlue.grey4,
                        fontSize:Fonts.size.regular * Metrics.screenWidth * 0.0028}}>
             Showing 10 of 20 Claims
            </Text>
            </View>
         </View>    
        
         </ScrollView> 
        </View>   )
    } else if (this.props.data && this.props.data.tiles != null && this.props.data.tiles.length == 0) {
      Alert.alert(
                  'Claim Detail',
                   'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
                    { text: 'OK' }

        ]
                )
    } else if (this.props.error != null) {
      Alert.alert(
                  'Claim Detail',
                   'Oops! Looks like we\'re having trouble with your request. Please try again later.',
        [
                    { text: 'OK' }

        ]
                )
    }
  }


  render () {
      console.tron.log("im claims detail page" , this.props.claimdetaildata)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
      
         <View style={styles.container}>
          {this._displayCondition()}
        </View>   
      </View>
    )
  }
}


ClaimDetail.propTypes = {
  data: PropTypes.object,
  attemptClaimDetail: PropTypes.func,
  error: PropTypes.string
}

const mapStateToProps = (state) => {
  console.tron.log(state)
  return {
    fetching: state.claimdetail.fetching,
    claimdetaildata: state.claimdetail.data,
    error: state.claimdetail.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    attemptClaimDetail: (data) => dispatch(ClaimDetailActions.claimDetailRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetail)
