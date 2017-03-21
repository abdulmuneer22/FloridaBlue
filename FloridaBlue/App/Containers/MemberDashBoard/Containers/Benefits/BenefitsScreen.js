import React, { Component, PropTypes } from 'react'
import {
View,
Text,
StyleSheet,
Dimensions,
ScrollView,
TouchableOpacity,
Image,
Alert
} from 'react-native'

const window = Dimensions.get('window')

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts, Images} from '../../../../Themes'
import Flb from '../../../../Themes/FlbIcon'
import styles from './BenefitsStyle'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Card from './Components/BenefitCard'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()

class PlanBenefits extends Component {
  _renderHeader () {
    return (<Image style={styles.headerContainer} source={Images.themeHeader}>
     <View style={{marginLeft:Metrics.baseMargin * Metrics.screenWidth * 0.0010}}>
                {NavItems.backButton()}
                </View>
      <Text style={styles.headerTextStyle}>Plan Benefits</Text>
      <View style={{marginRight:Metrics.baseMargin * Metrics.screenWidth * 0.002}}>
                {NavItems.settingsButton()}
                </View>

    </Image>)
  }

  componentDidMount () {
    console.log('I am my plan screen')
// this.props.attemptMyPlan()
  }



  _displayCondition(){
     if(this.props.fetching){
      return(<View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View>)} 

     else if(this.props.data && this.props.data.tiles) 
          {
            return(<ScrollView>

          <View style={{
            flexDirection: 'row',
                  // backgroundColor : 'red',
            flexWrap: 'wrap',
            flex: 1,
            marginLeft: window.width * 0.04,
            marginRight: window.width * 0.03,
            marginTop: window.width * 0.03

          }}>

            {this.props.data && this.props.data.tiles ? this.props.data.tiles.map((tile, i) => {
              const index = i + 1
              const TileCount = this.props.data.tiles.length

              return (
                <Card
                  i={i}
                  key={index}
                  title={tile.tileName['en']}
                  tileType={tile.tileType}
                  icon={tile.tileIcon}
                  image={tile.backgroundImage}
                  CardCount={TileCount}
                  webURL={tile.tileType !== 'native' ? tile.tileUrl : null}
                  routerName={tile.tileType === 'native' ? tile.routerName : null}
                  objectName={tile.tileId}
                      />
              )
            }
          ) : <View style={styles.spinnerView}>
            <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
            <Text style={styles.spinnerText}>Loading Please Wait </Text>
          </View> }

          </View>
        </ScrollView>)
          }
       else if(this.props.error != null){
                Alert.alert(
                  'Plan Benefits',
                  'Oops! Looks like we\'re having trouble with your request. Click Support for help.',
                  [
                    { text: 'OK', onPress: () => NavigationActions.WelcomeDashBoard() },
                  
                  ],
                  { cancelable: false }
                )
             
  }
  }

  render () {
    var objectName = this.props.objectName
    console.log('root testing')
    var i = 0
    var tileCard = []
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._displayCondition()}
        
      </View>
    )
  }
}

PlanBenefits.propTypes = {

  data: PropTypes.object,
  attemptMyPlan: PropTypes.func,
  error: PropTypes.string,
  attemptHandleLeft: PropTypes.func,
  attemptHandleRight: PropTypes.func,
  attemptHandlePreferred: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    data: state.myplan.data,
    fetching: state.myplan.fetching,
    error: state.myplan.error,
    leftActive: state.myplan.leftActive,
    rightActive: state.myplan.rightActive,
    preferredActive: state.myplan.preferredActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
    attemptHandleLeft: () => dispatch(MyPlanActions.myplanClickleft()),
    attemptHandleRight: () => dispatch(MyPlanActions.myplanClickright()),
    attemptHandlePreferred: () => dispatch(MyPlanActions.myplanClickpreferred())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanBenefits)
