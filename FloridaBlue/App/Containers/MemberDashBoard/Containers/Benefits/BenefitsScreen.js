import React, { Component, PropTypes } from 'react'
import {
View,
Text,
StyleSheet,
Dimensions,
ScrollView,
TouchableOpacity
} from 'react-native'

const window = Dimensions.get('window')
// toolbar => 60
// grid => window - 60 -> 70%
// footer => window-60 -> 30%
const windowheight = window.height - 60

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import NavItems from '../../../../Navigation/NavItems.js'
import {Colors, Metrics, Fonts} from '../../../../Themes'
import Flb from '../../../../Themes/FlbIcon'
import styles from './BenefitsStyle'
import MyPlanActions from '../../../../Redux/MyPlanRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Card from './BenefitCard'
import { MKTextField, MKColor, MKSpinner } from 'react-native-material-kit'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
.withStyle(styles.spinner)
.build()


class PlanBenefits extends Component {

_renderHeader () {
return <View style={styles.headerContainer}>
{NavItems.backButton()}
<Text style={[{color: Colors.snow, fontSize: Fonts.size.h4, marginLeft: 10}]}>Plan Benefits</Text>
{NavItems.settingsButton()}

</View>
}


componentDidMount () {
console.log('I am my plan screen')
this.props.attemptMyPlan()
}

render () {
console.log('root testing' )
var color = new Array('#005b80', '#00aec7', '#0091cc', '#005b80', '#005b80', '#00aec7','#005b80','#0091cc')
var i = 0
var tileCard=[];
return (
<View style={styles.container}>
{this._renderHeader()}

<ScrollView>

<View style={{
     flexWrap: 'wrap',
     flexDirection: 'row',

   }}>

    {this.props.data && this.props.data.tiles ?
      this.props.data.tiles.map(function(tile, i) {

        onItemPress = function () {
          var action
          if (tile.tileType == 'native') {
            var routerName = tile.routerName
            var objectName = tile.tileId
            action = NavigationActions[routerName]({objectName : objectName})
          }
        }

        return (

          <TouchableOpacity style={{
            width: window.width * 0.5,
            backgroundColor: color[i],
            height: 150,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: Colors.flBlue.lightBlue,
            borderWidth: 1
          }} onPress={onItemPress.bind(this)} key={i}>

            <View style={{alignItems: 'center'}}>
              <Flb name='doctor' size={40} color='white' />
              <Text style={{
                marginTop: 20,
                fontSize: 14,
                fontWeight: '600',
                color: 'white'
              }}>
                {tile.tileName['en']}
              </Text>
            </View>
          </TouchableOpacity>


        )
        i += 1
      })

    :<View style={{alignItems: 'center', justifyContent: 'center'}}>
      <SingleColorSpinner strokeColor={Colors.flBlue.ocean} />
      <Text style={styles.spinnerText}>Loading Please Wait </Text>
      </View>
     }
    </View>


</ScrollView>
</View>
)
}

}

var Styles = StyleSheet.create({
footerWrapper: {
flexDirection: 'row',
bottom: 0
},
icon: {
flex: 0.6
// width : window.width,
// backgroundColor : 'red'
},
textWrapepr: {
// backgroundColor : 'green',
flex: 3
}
})

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
fetching: state.login.fetching,
error: state.myplan.error,
leftActive: state.myplan.leftActive,
rightActive: state.myplan.rightActive,
preferredActive :state.myplan.preferredActive
}
}

const mapDispatchToProps = (dispatch) => {
return {
attemptMyPlan: () => dispatch(MyPlanActions.myplanRequest()),
attemptHandleLeft: () => dispatch(MyPlanActions.myplanClickleft()),
attemptHandleRight: () => dispatch(MyPlanActions.myplanClickright()),
attemptHandlePreferred :() => dispatch(MyPlanActions.myplanClickpreferred())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanBenefits)
