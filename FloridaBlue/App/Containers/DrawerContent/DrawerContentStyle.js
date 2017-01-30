// @flow
import {StyleSheet} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default {
  container: {
    flex: 1,
    padding: 20,
    //margin:15,
    backgroundColor:Colors.flBlue.ocean
  },
  container1: {
    flex: 1,
    //padding: 20,
   marginLeft:15,
    backgroundColor:Colors.flBlue.ocean
  },
  logo: {
    alignSelf: 'center'
  },
  container2: {
    flex: 1,
    padding: 10,
    //margin:10,
    //marginTop:15,
    backgroundColor:Colors.flBlue.grey1
  //  backgroundColor:'red'

  },
  logo: {
    alignSelf: 'center'
  },
  wrapper:{
  },
  options:{
    backgroundColor:Colors.bg1,
    paddingLeft:15,
    paddingTop:20
  },
  settings:{
    backgroundColor:Colors.bg2,
    paddingLeft:15,
    paddingTop:20
  },
  divider:{
    backgroundColor:Colors.snow,
    height:1,
    marginLeft:-15,
    marginTop:10,
    marginBottom:10
  },
  heading:{
    color:Colors.snow,
    fontSize:Fonts.size.h3
  },
  heading2:{
    color:Colors.bg1,
    fontSize:Fonts.size.h4
  }
}
