import React, { Component, PropTypes } from 'react'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { 
  Text, 
  View, 
  ScrollView, 
  Image,
  TouchableWithoutFeedback 
} from 'react-native'
import Switch from './Components/switch'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './DoctorServiceStyle'
import NavItems from '../../../../Navigation/NavItems.js'
import { Colors, Metrics, Fonts, Images } from '../../../../Themes'
import Flb from '../../../../Themes/FlbIcon'
import { connect } from 'react-redux'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
import { MKTextField, MKColor, MKSpinner, getTheme } from 'react-native-material-kit'

const theme = getTheme()

import Card from './Components/Card'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle(styles.spinner)
  .build()

class DoctorServices extends Component {
  
   constructor () {
    super()
    this.state = {
      hpActive: false
    }
  }
  componentDidMount () {
    this.props.attemptHandleLeft()
  }

  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
      <View style={{marginLeft: Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
        {NavItems.backButton()}
      </View>
      <Text style={styles.headerTextStyle}>
                Plan Benefits
              </Text>
      <View style={{marginRight: Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
        {NavItems.settingsButton()}
      </View>
    </Image>)
  }
  renderHeaderText(){
    let headerTextStr = '';
    if(this.props.leftActive){
      var objectName = this.props.objectName
      //alert(objectName)
      if(objectName !=null ){
       headerTextStr =  this.props.data[objectName] !=null && this.props.data[objectName].inNetwork !=null && this.props.data[objectName].inNetwork.header_text !=undefined ? this.props.data[objectName].inNetwork.header_text.en :'';
      }
      // console.log(this.props.data[objectName].inNetwork.header_text.en)
    } else if (this.props.rightActive) {
      var objectName = this.props.objectName
      if(objectName != null){
     headerTextStr = this.props.data[objectName] !=null && this.props.data[objectName].outNetwork !=null && this.props.data[objectName].outNetwork.header_text !=undefined ? this.props.data[objectName].outNetwork.header_text.en :'';
      }
    } else if (this.props.preferredActive) {
      var objectName = this.props.objectName
       if(objectName != null){
     headerTextStr = this.props.data[objectName] !=null && this.props.data[objectName].preferredNetwork !=null && this.props.data[objectName].preferredNetwork.header_text !=undefined ? this.props.data[objectName].preferredNetwork.header_text.en :'';
    
      }
    }

    return headerTextStr;
  }

  _displayCondition () {
    if (this.props.fetching) {
      return (<View style={styles.spinnerView}>
        <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
        <Text style={styles.spinnerText}>
          Loading Please Wait
        </Text>
      </View>)
    } else if (this.props.data) {
      var temp = this.props.data
      var objectName = this.props.objectName
      var temp1 = temp[objectName]
      var tiles = this.props.data.tiles
      var tile = tiles.filter(function (tiles) { return (tiles.tileId == objectName) })

      console.log('tile' + JSON.stringify(tile))
      console.log('tiles' + JSON.stringify(tiles))
    // console.log("checking for switch options" , this.props.data.emergencyMedicalCareServices);
    const switchItems = this.props.data.emergencyMedicalCareServices
    console.log('checking for switch options', switchItems)

     return ( <ScrollView>
           <View style={{flex: 1}}>
               <View style={styles.doctorCardStyle}>
                 <Flb name={tile[0].tileIcon} size={Metrics.icons.xl * Metrics.screenWidth * 0.0025} color={Colors.flBlue.ocean} />
                 <Text style={styles.doctorTextStyle}>
                   {temp1.text['en']}
                 </Text>
                
                 <Switch
                   data={this.props.data}
                   objectName={this.props.objectName}
                   leftActive={this.props.leftActive}
                   rightActive={this.props.rightActive}
                   preferredActive={this.props.preferredActive}
                   attemptHandleLeft={this.props.attemptHandleLeft}
                   attemptHandleRight={this.props.attemptHandleRight}
                   attemptHandlePreferred={this.props.attemptHandlePreferred} />

                   {this.renderHeaderText() != '' ?
                 <View style={{ width: Metrics.screenWidth, marginTop: Metrics.baseMargin }}>
                   <TouchableWithoutFeedback onPress={() => {
                     this.setState({ hpActive: !this.state.hpActive })
                   }}>
                     <View style={{
                       flexDirection: 'row',
                       marginTop: Metrics.baseMargin,
                      // backgroundColor: Colors.flBlue.grey4,
                     }}>

                       <View style={{ flex:0.8,marginLeft: Metrics.mediumMargin }}>
                         <Text style={styles.subheading} >Information</Text>
                       </View>
                       <View style={{flex:0.4}}>
                       {

                         !this.state.hpActive


                           ? <Flb name='rd-d-arrow' size={Metrics.icons.xm} color={Colors.flBlue.anvil} />
                           : <Flb name='rd-u-arrow' size={Metrics.icons.xm } color={Colors.flBlue.anvil} />

                       }
                       </View>

                     </View>
                   </TouchableWithoutFeedback>
                  

                   {this.state.hpActive?<View><View style={{ margin: 10 }}><Text style={{fontSize:Fonts.size.xm * Metrics.screenWidth* 0.0025,
                           margin:5,textAlign:'justify'}}>{this.renderHeaderText()}</Text></View></View>: <Text/>}
                 </View>
                 :<Text/>
                  }

               </View>
               <View>
                 <Card
                   data={this.props.data}
                   objectName={this.props.objectName}
                   leftActive={this.props.leftActive}
                   rightActive={this.props.rightActive}
                   preferredActive={this.props.preferredActive} />
               </View>
             </View>
            
        </ScrollView>

      )
    } else if (this.props.error != null) {
      Alert.alert(
        'Plan Benefits',
        'Oops! Looks like we\'re having trouble with your request. Click Support for help.',
        [
          { text: 'OK', onPress: () => NavigationActions.WelcomeDashBoard() }

        ],
        { cancelable: false }
      )
    }
  }

  render () {
    return (

      <View style={styles.container}>
        {this._renderHeader()}
        {this._displayCondition()}
      </View>
    )
  }
}

DoctorServices.propTypes = {
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func,
  attemptHandlePreferred: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    data: state.myplan.data,
    fetching: state.myplan.fetching,
    leftActive: state.myplan.leftActive,
    rightActive: state.myplan.rightActive,
    preferredActive: state.myplan.preferredActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptHandleLeft: () => dispatch(MyPlanActions.myplanClickleft()),
    attemptHandleRight: () => dispatch(MyPlanActions.myplanClickright()),
    attemptHandlePreferred: () => dispatch(MyPlanActions.myplanClickpreferred())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorServices)
