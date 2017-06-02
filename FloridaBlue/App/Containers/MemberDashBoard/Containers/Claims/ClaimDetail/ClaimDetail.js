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

  render () {
      console.tron.log("im claims detail page" , this.props.claimdetaildata)
    return (
      <View style={styles.container}>
        <View>
          {this._renderHeader()}
        </View>
      
         <View style={styles.container}>
           <ScrollView>  
          <View style={{flex:1, backgroundColor:Colors.bg2}}>   
          
         <View style={{flex:1, backgroundColor:Colors.flBlue.grey1,marginTop:20,
                            flexDirection:'row',justifyContent:'center', marginBottom:20}}>
             {this.props.claimdetaildata ? 
         <View style={{flex:0.33, alignItems:'center', marginLeft:10,justifyContent:'center'}}>
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
         <View style={{flex:0.34, alignItems:'center', marginRight:10,marginTop:10,marginBottom:10,justifyContent:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.regular * Metrics.screenWidth * 0.0025}}>
              {this.props.claimdetaildata.providerLastName}
            </Text>             
          </View>   :null}
        </View>
        </View>
        {this.props.claimdetaildata ?
        <View style={{flex:1, backgroundColor:Colors.bg2}}>
        <View style={{flex:1, flexDirection:'row', }}>
            <View style={{flex:0.5, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Type
            </Text>
            </View>
           <View style={{flex:0.5}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.claimType}
            </Text>
            </View> 
         </View>
         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <View style={{flex:0.5, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Status
            </Text>
            </View>
           <View style={{flex:0.5, alignItems:'center',marginRight:10}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.serviceDateFrom}
            </Text>
            </View> 
         </View>:null}

           {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <View style={{flex:0.5, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Claim Number
            </Text>
            </View>
           <View style={{flex:0.5}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.claimNumber}
            </Text>
            </View> 
         </View>:null}
         {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10, marginBottom:10}}>
            <View style={{flex:0.5, alignItems:'center'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             Member Number
            </Text>
            </View>
           <View style={{flex:0.5}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0025}}>
             {this.props.claimdetaildata.patientControlNbr}
            </Text>
            </View> 
         </View>:null}
         </View>  :null}
         <View style={{borderWidth:0.3, borderColor:Colors.flBlue.grey3,backgroundColor:Colors.bg2,
                         marginLeft:15, marginRight:15}}/>
         <View style={{flex:1,backgroundColor:Colors.bg2}}>
              <View style={{flex:1, margin:15,backgroundColor:Colors.bg2}}>
             <Text  style={{color:Colors.flBlue.anvil,
                            fontWeight:'400',
                        fontSize:Fonts.size.h4 * Metrics.screenWidth * 0.0025}}>
            Overall Claims Breakdown:
            </Text>
            <View style={{flex:1}}>
                {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10}}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
            Total Billed
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
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
            Your Responsibility*
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
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
           <View style={{flex:0.4, marginLeft:15}}>
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
            Your Discount
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
            <Text style={{color:Colors.flBlue.anvil,
                        fontSize:Fonts.size.h6 * Metrics.screenWidth * 0.0028}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}
            </View>
               
            </View>
             <View style={{flex:1, backgroundColor:Colors.flBlue.ocean,
                            marginBottom:10, marginTop:10}}>
                    {this.props.claimdetaildata ?
         <View style={{flex:1, flexDirection:'row', marginTop:10,
                            marginBottom:10, }}>
            <View style={{flex:0.6, alignItems:'flex-end'}}>
            <Text style={{color:Colors.snow,
                        fontSize:Fonts.size.h4 * Metrics.screenWidth * 0.003}}>
            You've Saved:
            </Text>
            </View>
           <View style={{flex:0.4, marginLeft:15}}>
            <Text style={{color:Colors.snow,
                        fontSize:Fonts.size.h4 * Metrics.screenWidth * 0.003}}>
             ${this.props.claimdetaildata.totalBilledAllowed}
            </Text>
            </View> 
         </View>:null}
        </View>

         <View style={{flex:1, backgroundColor:Colors.bg2,
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
         </View>    
        </View>   


            
         <View style={{flex:1, marginBottom:10, marginTop:20, margin:10}}>
                  
            <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
           <View style={{flex:0.3, flexDirection:'row'}}>
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
            </View> 
             <View style={{flex:0.4, alignItems:'center'}}>
             <Image source={Images.backButton}/>
            </View>
             <View style={{flex:0.3, flexDirection:'row'}}>
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
            </View>        
            </View>
         
         </View>    
        
         </ScrollView> 
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
